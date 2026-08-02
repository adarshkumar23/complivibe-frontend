#!/usr/bin/env python3
"""
Phase 1 — parse CompliVibe_SEO_Keywords.xlsx and map every keyword to either an
EXISTING route in the Next.js app, or to a content GAP that needs a new page.

Stdlib only: .xlsx is a zip of XML, so no openpyxl/pandas dependency is added.

Outputs (reports/seo/):
  keyword-map.csv    one row per keyword, with its target route or gap bucket
  keyword-map.json   same data, plus the route inventory and run summary
  gap-clusters.json  the "needs new content" keywords, clustered and ranked

Run:  python3 scripts/seo/parse-keywords.py
"""

from __future__ import annotations

import collections
import csv
import json
import os
import re
import zipfile
from xml.etree import ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
XLSX = os.path.join(ROOT, "CompliVibe_SEO_Keywords.xlsx")
OUT_DIR = os.path.join(ROOT, "reports", "seo")
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


# ---------------------------------------------------------------- xlsx reader

def read_sheet(path: str, sheet: str = "xl/worksheets/sheet1.xml") -> list[list[str]]:
    """Read a worksheet into rows of strings. Handles inline + shared strings."""
    with zipfile.ZipFile(path) as z:
        shared: list[str] = []
        if "xl/sharedStrings.xml" in z.namelist():
            sst = ET.fromstring(z.read("xl/sharedStrings.xml"))
            shared = ["".join(t.text or "" for t in si.iter(f"{{{NS['m']}}}t")) for si in sst]
        root = ET.fromstring(z.read(sheet))

    rows: list[list[str]] = []
    for r in root.findall(".//m:row", NS):
        cells: list[str] = []
        for c in r.findall("m:c", NS):
            inline = c.find("m:is", NS)
            v = c.find("m:v", NS)
            if inline is not None:
                cells.append("".join(t.text or "" for t in inline.iter(f"{{{NS['m']}}}t")))
            elif v is None:
                cells.append("")
            elif c.get("t") == "s":
                cells.append(shared[int(v.text)])
            else:
                cells.append(v.text or "")
        rows.append(cells)
    return rows


# ------------------------------------------------------- route inventory (live)

def discover_routes() -> set[str]:
    """Walk src/app for page.tsx files and derive the public static route list."""
    app = os.path.join(ROOT, "src", "app")
    routes: set[str] = set()
    for dirpath, _dirs, files in os.walk(app):
        if "page.tsx" not in files:
            continue
        rel = os.path.relpath(dirpath, app)
        rel = "" if rel == "." else rel
        # strip route groups like (marketing)
        parts = [p for p in rel.split(os.sep) if p and not p.startswith("(")]
        route = "/" + "/".join(parts)
        routes.add(route if route != "/" else "/")
    return routes


def read_list(pattern: str, path: str) -> list[str]:
    """Pull a quoted-string array out of a TS source file."""
    src = open(os.path.join(ROOT, path), encoding="utf-8").read()
    m = re.search(pattern, src, re.S)
    return re.findall(r'"([^"]+)"', m.group(1)) if m else []


FRAMEWORK_SLUGS = read_list(r"const allSlugs = \[(.*?)\]", "src/app/frameworks/[slug]/page.tsx")
FRAMEWORK_ALIASES = dict(
    re.findall(
        r"(\w+):\s*\"([^\"]+)\"",
        re.search(
            r"const frameworkSlugAliases[^{]*\{(.*?)\}",
            open(os.path.join(ROOT, "src/app/frameworks/[slug]/page.tsx"), encoding="utf-8").read(),
            re.S,
        ).group(1),
    )
)
SOLUTION_DATA_SLUGS = re.findall(
    r"^  ([a-z][a-z0-9-]*): \{",
    open(os.path.join(ROOT, "src/components/solutions-data.ts"), encoding="utf-8").read(),
    re.M,
)

ROUTES = discover_routes()
SOLUTION_ROUTES = {r.split("/")[-1] for r in ROUTES if r.startswith("/solutions/") and "[" not in r}
SOLUTION_ROUTES |= set(SOLUTION_DATA_SLUGS)  # catch-all covers these too


# ------------------------------------------------------------------ vocabularies
# Every value below was enumerated from the sheet itself, not guessed.

# regulation head term -> existing /frameworks/<slug>, or None when no page exists
REGULATIONS: dict[str, str | None] = {
    "eu ai act": "eu-ai-act",
    "dpdp act": "dpdp",
    "india dpdp act": "dpdp",
    "digital personal data protection act": "dpdp",
    "iso 42001": "iso-42001",
    "iso/iec 42001": "iso-42001",
    "nist ai rmf": "nist",
    "nist ai risk management framework": "nist",
    "colorado ai act": "colorado-ai-act",
    "soc 2": "soc2",
    "gdpr": "gdpr",
    "hipaa": "hipaa",
    # no framework page today
    "ccpa": None,
    "china ai regulations": None,
    "uk ai regulation": None,
    "singapore ai governance framework": None,
    "canada aida": None,
    "california ai law": None,
    "new york ai law": None,
    "utah ai policy act": None,
}

# industry vertical -> existing /solutions/<slug>, or None
VERTICALS: dict[str, str | None] = {
    "healthtech": "healthcare",
    "healthcare providers": "healthcare",
    "pharma companies": "healthcare",
    "fintech": "fintech",
    "banking": "fintech",
    "insurance": "fintech",
    "insurtech": "fintech",
    "saas companies": "saas",
    "government agencies": "govt",
    "legaltech": None,
    "edtech": None,
    "hrtech": None,
    "recruiting platforms": None,
    "genai content companies": None,
    "ai agent companies": None,
    "e-commerce companies": None,
    "logistics companies": None,
    "manufacturing companies": None,
    "telecom companies": None,
    "media companies": None,
    "cybersecurity companies": None,
    "marketing agencies": None,
}

# buyer persona -> existing /solutions/<slug>, or None
PERSONAS: dict[str, str | None] = {
    "ciso": "ciso",
    "cto": "it-teams",
    "vp of engineering": "it-teams",
    "founder": "startup",
    "chief compliance officer": "grc",
    "compliance team": "grc",
    "risk manager": "grc",
    "data protection officer": None,
    "general counsel": None,
    "legal team": None,
    "head of ai": None,
    "product manager": None,
}

# geo -> existing /solutions/<slug>, or None
GEOS: dict[str, str | None] = {
    "india": "india-first",
    "delhi": "india-first",
    "mumbai": "india-first",
    "bangalore": "india-first",
    "gurgaon": "india-first",
    "usa": "us-saas",
    "united states": "us-saas",
    "california": "us-saas",
    "new york": "us-saas",
    "eu": "eu-export",
    "europe": "eu-export",
    "uk": None,
    "singapore": None,
    "uae": None,
    "dubai": None,
    "hong kong": None,
    "canada": None,
    "australia": None,
}

COMPETITORS = [
    "credo ai", "arthur ai", "holistic ai", "lakera", "guardrails ai", "vanta",
    "drata", "onetrust", "securiti ai", "ibm watson openscale", "monitaur",
    "fiddler ai", "trustarc", "robust intelligence", "fairly ai",
]

# Recurring editorial topics, used to cluster informational/pain-point keywords
# into one post per topic instead of one post per keyword.
CONCEPTS = {
    "ai risk register": None, "ai model card": None, "model card": None,
    "ai bias audit": None, "bias audit": None, "bias testing": None,
    "shadow ai": None, "evidence collection": None, "ai audit": None,
    "ai risk assessment": None, "risk assessment": None,
    "ai governance": None, "ai compliance": None, "ai risk management": None,
    "ai observability": None, "responsible ai": None, "ai trust": None,
    "continuous compliance": None, "compliance automation": None,
    "regulatory change": None, "third-party ai": None, "vendor risk": None,
    "ai inventory": None, "ai transparency": None, "ai incident": None,
    "ai governance maturity": None, "ai regulation": None,
    "cross framework compliance": None, "ai policy": None, "dpia": None,
    "data protection impact assessment": None, "ai documentation": None,
    "ai risk scoring": None, "ai compliance dashboard": None,
}

# Modifiers that signal a keyword wants an informational article, NOT a landing
# page — these go to blog/FAQ even when a matching framework page exists.
INFO_MODIFIERS = [
    "what is", "how to", "guide", "explained", "summary", "timeline", "deadline",
    "penalties", "fines", "vs ", " vs", "checklist", "template", "requirements",
    "risk assessment", "policy", "documentation", "training", "certification cost",
    "cost", "history of", "trends", "signs your",
]

# Commercial modifiers that a product/landing page can legitimately serve.
COMMERCIAL_MODIFIERS = [
    "software", "platform", "tool", "tools", "solution", "solutions", "vendor",
    "vendors", "provider", "providers", "company", "companies", "automation",
    "readiness", "consultant", "consultants", "consulting firm", "firm",
    "system", "app", "service", "services", "startup",
]


def has_any(kw: str, needles: list[str]) -> bool:
    return any(n in kw for n in needles)


def find_longest(kw: str, table: dict) -> str | None:
    """Longest-match a vocabulary key inside the keyword (word-boundary safe)."""
    best = None
    for key in table:
        if re.search(rf"(?:^|\W){re.escape(key)}(?:$|\W)", kw) and (best is None or len(key) > len(best)):
            best = key
    return best


# ------------------------------------------------------------------- mapping

class Result:
    __slots__ = ("target", "kind", "rule", "cluster", "gap_type")

    def __init__(self, target, kind, rule, cluster, gap_type=""):
        self.target = target      # route, or proposed URL for gaps
        self.kind = kind          # "existing" | "gap"
        self.rule = rule          # which rule fired (auditability)
        self.cluster = cluster    # cluster key for grouping
        self.gap_type = gap_type  # page type needed, for gaps


def classify(kw: str, category: str, content_type: str) -> Result:
    k = kw.lower().strip()

    # 1. Branded — always the site's own pages.
    if category == "Branded":
        if "vs " in k:
            vendor = k.split("vs ", 1)[1].strip()
            return Result(f"/compare/complivibe-vs-{vendor.replace(' ', '-')}", "gap",
                          "branded-vs", f"compare:{vendor}", "Comparison Page")
        if "pricing" in k:
            return Result("/pricing", "existing", "branded-pricing", "brand")
        if "login" in k:
            return Result("/login", "existing", "branded-login", "brand")
        if "demo" in k:
            return Result("/book-demo", "existing", "branded-demo", "brand")
        if "review" in k:
            return Result("/customer-stories", "existing", "branded-reviews", "brand")
        reg = find_longest(k, REGULATIONS)
        if reg and REGULATIONS[reg]:
            return Result(f"/frameworks/{REGULATIONS[reg]}", "existing", "branded-regulation", "brand")
        return Result("/", "existing", "branded-home", "brand")

    # 2. Competitor — comparison/alternative pages, none of which exist yet.
    if category == "Competitor":
        vendor = next((v for v in COMPETITORS if v in k), None)
        if vendor:
            slug = vendor.replace(" ", "-")
            if "alternative" in k:
                return Result(f"/compare/{slug}-alternative", "gap", "competitor-alternative",
                              f"compare:{vendor}", "Comparison Page")
            return Result(f"/compare/complivibe-vs-{slug}", "gap", "competitor-vs",
                          f"compare:{vendor}", "Comparison Page")
        return Result("/compare", "gap", "competitor-roundup", "compare:roundup", "Comparison Page")

    # 3. Geo — geo landing pages, /solutions/{india-first,us-saas,eu-export} exist.
    if category == "Geo":
        geo = find_longest(k, GEOS)
        if geo:
            slug = GEOS[geo]
            if slug:
                return Result(f"/solutions/{slug}", "existing", "geo-existing", f"geo:{geo}")
            return Result(f"/solutions/{geo.replace(' ', '-')}", "gap", "geo-gap",
                          f"geo:{geo}", "Landing Page (Geo)")
        return Result("", "gap", "geo-unmatched", "geo:other", "Landing Page (Geo)")

    # 4. Industry vertical.
    if category == "Industry Vertical":
        vert = find_longest(k, VERTICALS)
        if vert:
            slug = VERTICALS[vert]
            if slug:
                return Result(f"/solutions/{slug}", "existing", "vertical-existing", f"vertical:{vert}")
            return Result(f"/solutions/{vert.replace(' ', '-')}", "gap", "vertical-gap",
                          f"vertical:{vert}", "Landing Page (Vertical)")
        return Result("", "gap", "vertical-unmatched", "vertical:other", "Landing Page (Vertical)")

    # 5. Buyer persona.
    if category == "Buyer Persona":
        pers = find_longest(k, PERSONAS)
        if pers:
            slug = PERSONAS[pers]
            # "guide/checklist for X" is editorial even when a solution page exists
            editorial = has_any(k, ["guide", "checklist", "responsibilities"])
            if slug and not editorial:
                return Result(f"/solutions/{slug}", "existing", "persona-existing", f"persona:{pers}")
            if editorial:
                return Result("/blog", "gap", "persona-editorial", f"persona:{pers}", "Blog Post / Guide")
            return Result(f"/solutions/{pers.replace(' ', '-')}", "gap", "persona-gap",
                          f"persona:{pers}", "Landing Page (Vertical)")
        return Result("", "gap", "persona-unmatched", "persona:other", "Blog Post / Guide")

    # 6. Regulation — framework page if one exists AND intent is commercial.
    if category == "Regulation":
        reg = find_longest(k, REGULATIONS)
        # a regulation keyword scoped to a vertical belongs on the vertical page
        vert = find_longest(k, VERTICALS)
        if reg and vert:
            slug = VERTICALS[vert]
            if slug:
                return Result(f"/solutions/{slug}", "existing", "regulation-vertical",
                              f"regulation:{reg}")
            return Result(f"/solutions/{vert.replace(' ', '-')}", "gap", "regulation-vertical-gap",
                          f"vertical:{vert}", "Landing Page (Vertical)")
        if reg:
            slug = REGULATIONS[reg]
            # Test modifiers against the keyword MINUS the regulation's own name,
            # so "utah ai policy act software" isn't read as informational just
            # because "policy" appears inside the statute's title.
            rest = k.replace(reg, " ").strip()
            informational = has_any(rest, INFO_MODIFIERS)
            commercial = has_any(rest, COMMERCIAL_MODIFIERS)
            if slug and commercial and not informational:
                return Result(f"/frameworks/{slug}", "existing", "regulation-commercial",
                              f"regulation:{reg}")
            if slug and k == reg:
                return Result(f"/frameworks/{slug}", "existing", "regulation-head", f"regulation:{reg}")
            if slug:
                return Result("/blog", "gap", "regulation-editorial", f"regulation:{reg}",
                              "Blog/Pillar Page")
            # no framework page at all
            if commercial and not informational:
                return Result(f"/frameworks/{reg.replace(' ', '-').replace('/', '-')}", "gap",
                              "regulation-no-page", f"regulation:{reg}", "Landing/Product Page")
            return Result("/blog", "gap", "regulation-no-page-editorial", f"regulation:{reg}",
                          "Blog/Pillar Page")
        return Result("/blog", "gap", "regulation-unmatched", "regulation:other", "Blog/Pillar Page")

    # 7. Informational + pain point -> editorial.
    if category in ("Informational", "Pain Point / Bottom Funnel"):
        # bottom-funnel product searches inside the pain-point set still convert
        if category == "Pain Point / Bottom Funnel" and has_any(k, ["tool", "software", "platform", "dashboard"]):
            return Result("/platform", "existing", "painpoint-product", "product:platform")
        topic = find_longest(k, REGULATIONS) or find_longest(k, CONCEPTS) or " ".join(k.split()[:3])
        ctype = "Blog Post / How-To" if k.startswith("how to") else (
            "Blog Post / FAQ" if k.startswith("what ") else "Blog Post / Guide")
        return Result("/blog", "gap", "editorial", f"editorial:{topic}", ctype)

    # 8. Feature-specific -> /platform today; dedicated feature pages are a gap.
    if category == "Feature-Specific":
        base = re.sub(
            r"\s+(pricing|demo|free trial|for enterprise|for startups)$", "", k
        ).strip()
        if k.endswith("pricing"):
            return Result("/pricing", "existing", "feature-pricing", f"feature:{base}")
        if k.endswith("demo") or k.endswith("free trial"):
            return Result("/book-demo", "existing", "feature-demo", f"feature:{base}")
        if k.endswith("for enterprise"):
            return Result("/enterprise", "existing", "feature-enterprise", f"feature:{base}")
        if k.endswith("for startups"):
            return Result("/solutions/startup", "existing", "feature-startup", f"feature:{base}")
        return Result(f"/platform/{base.replace(' ', '-')}", "gap", "feature-page",
                      f"feature:{base}", "Feature Page")

    # 9. Core product -> homepage / platform / pricing / demo.
    if category == "Core Product":
        vert = find_longest(k, VERTICALS)
        if vert and VERTICALS[vert]:
            return Result(f"/solutions/{VERTICALS[vert]}", "existing", "core-vertical", f"vertical:{vert}")
        if has_any(k, ["pricing", "cost", "price", "how much"]):
            return Result("/pricing", "existing", "core-pricing", "product:pricing")
        if has_any(k, ["demo", "free trial", "trial", "book a"]):
            return Result("/book-demo", "existing", "core-demo", "product:demo")
        if has_any(k, ["review", "reviews", "testimonial", "case study"]):
            return Result("/customer-stories", "existing", "core-reviews", "product:reviews")
        if has_any(k, ["for enterprise", "enterprise"]):
            return Result("/enterprise", "existing", "core-enterprise", "product:enterprise")
        if has_any(k, ["for small business", "for startups", "for startup"]):
            return Result("/solutions/startup", "existing", "core-startup", "product:startup")
        if has_any(k, ["security", "soc 2 report", "trust center"]):
            return Result("/security", "existing", "core-security", "product:security")
        if has_any(k, ["platform", "software", "tool", "tools", "system", "dashboard", "engine"]):
            return Result("/platform", "existing", "core-platform", "product:platform")
        return Result("/", "existing", "core-home", "product:home")

    return Result("", "gap", "unclassified", "other", content_type)


# ---------------------------------------------------------------------- main

def main() -> None:
    rows = read_sheet(XLSX)
    header, data = rows[0], [r for r in rows[1:] if len(r) >= 7 and r[1].strip()]

    records = []
    for r in data:
        sno, kw, cat, intent, diff, prio, ctype = (r + [""] * 7)[:7]
        res = classify(kw, cat, ctype)
        exists = res.kind == "existing" and (
            res.target in ROUTES
            or (res.target.startswith("/frameworks/") and res.target.split("/")[-1] in FRAMEWORK_SLUGS)
            or (res.target.startswith("/solutions/") and res.target.split("/")[-1] in SOLUTION_ROUTES)
        )
        records.append({
            "sno": sno, "keyword": kw, "category": cat, "intent": intent,
            "difficulty": diff, "priority": prio, "suggestedType": ctype,
            "target": res.target,
            "status": "existing" if exists else "gap",
            "rule": res.rule, "cluster": res.cluster,
            "gapType": "" if exists else (res.gap_type or ctype),
        })

    os.makedirs(OUT_DIR, exist_ok=True)

    # ---- csv
    with open(os.path.join(OUT_DIR, "keyword-map.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(records[0].keys()))
        w.writeheader()
        w.writerows(records)

    # ---- gap clusters
    gaps = [r for r in records if r["status"] == "gap"]
    existing = [r for r in records if r["status"] == "existing"]
    clusters: dict[str, dict] = {}
    for r in gaps:
        # a cluster splits by the kind of page it needs — "china ai regulations"
        # yields both a framework landing page and a set of editorial posts.
        key = f"{r['cluster']}|{r['gapType']}"
        c = clusters.setdefault(key, {
            "cluster": r["cluster"], "proposedUrl": r["target"], "gapType": r["gapType"],
            "count": 0, "p1": 0, "p2": 0, "p3": 0, "keywords": [],
        })
        c["count"] += 1
        c["p1" if r["priority"].startswith("P1") else "p2" if r["priority"] == "P2" else "p3"] += 1
        c["keywords"].append(r["keyword"])
    ranked = sorted(clusters.values(), key=lambda c: (-c["p1"], -c["count"]))

    with open(os.path.join(OUT_DIR, "gap-clusters.json"), "w", encoding="utf-8") as f:
        json.dump(ranked, f, indent=2)

    summary = {
        "totalKeywords": len(records),
        "mappedToExisting": len(existing),
        "needNewContent": len(gaps),
        "byStatusPriority": {
            s: dict(collections.Counter(r["priority"] for r in records if r["status"] == s))
            for s in ("existing", "gap")
        },
        "gapsByType": dict(collections.Counter(r["gapType"] for r in gaps)),
        "gapsByTypePriority": {
            t: dict(collections.Counter(r["priority"] for r in gaps if r["gapType"] == t))
            for t in sorted({r["gapType"] for r in gaps})
        },
        "existingPageCoverage": dict(collections.Counter(r["target"] for r in existing)),
        "clusterCount": len(ranked),
    }
    with open(os.path.join(OUT_DIR, "keyword-map.json"), "w", encoding="utf-8") as f:
        json.dump({
            "summary": summary,
            "routeInventory": sorted(ROUTES),
            "frameworkSlugs": sorted(FRAMEWORK_SLUGS),
            "solutionSlugs": sorted(SOLUTION_ROUTES),
            "keywords": records,
        }, f, indent=2)

    # ---- console report
    def bar(n, total, width=34):
        return "#" * int(round(width * n / total)) if total else ""

    print("=" * 78)
    print("PHASE 1 — KEYWORD → PAGE MAP")
    print("=" * 78)
    t = len(records)
    print(f"\nTotal keywords parsed: {t}")
    print(f"  Map to EXISTING pages : {len(existing):5d}  ({len(existing)/t:5.1%})  {bar(len(existing), t)}")
    print(f"  Need NEW content      : {len(gaps):5d}  ({len(gaps)/t:5.1%})  {bar(len(gaps), t)}")

    print("\n-- BY PRIORITY --")
    print(f"{'priority':22} {'existing':>9} {'gap':>7} {'total':>7}")
    for p in ("P1 - Quick Win", "P2", "P3 - Long Term"):
        e = summary["byStatusPriority"]["existing"].get(p, 0)
        g = summary["byStatusPriority"]["gap"].get(p, 0)
        print(f"{p:22} {e:9d} {g:7d} {e+g:7d}")

    print("\n-- NEW CONTENT NEEDED, BY TYPE AND PRIORITY --")
    print(f"{'content type':30} {'P1':>4} {'P2':>6} {'P3':>5} {'total':>7}")
    for ty, counts in sorted(summary["gapsByTypePriority"].items(), key=lambda x: -sum(x[1].values())):
        p1 = counts.get("P1 - Quick Win", 0)
        p2 = counts.get("P2", 0)
        p3 = counts.get("P3 - Long Term", 0)
        print(f"{ty:30} {p1:4d} {p2:6d} {p3:5d} {p1+p2+p3:7d}")

    print("\n-- EXISTING PAGES, BY KEYWORDS ABSORBED (top 25) --")
    for route, n in collections.Counter(r["target"] for r in existing).most_common(25):
        print(f"  {n:5d}  {route}")

    print(f"\n-- TOP GAP CLUSTERS ({len(ranked)} total, showing 30) --")
    print(f"{'cluster':38} {'kw':>4} {'P1':>3}  proposed url")
    for c in ranked[:30]:
        print(f"{c['cluster'][:38]:38} {c['count']:4d} {c['p1']:3d}  {c['proposedUrl']}")

    # ---- markdown report
    md: list[str] = []
    md.append("# Phase 1 — Keyword → Page Map\n")
    md.append(f"Source: `CompliVibe_SEO_Keywords.xlsx` · **{t} keywords** parsed\n")
    md.append("| | count | share |")
    md.append("|---|---:|---:|")
    md.append(f"| Map to an **existing** page | {len(existing)} | {len(existing)/t:.1%} |")
    md.append(f"| Need **new** content | {len(gaps)} | {len(gaps)/t:.1%} |\n")

    md.append("## By priority\n")
    md.append("| priority | existing | gap | total |")
    md.append("|---|---:|---:|---:|")
    for p in ("P1 - Quick Win", "P2", "P3 - Long Term"):
        e = summary["byStatusPriority"]["existing"].get(p, 0)
        g = summary["byStatusPriority"]["gap"].get(p, 0)
        md.append(f"| {p} | {e} | {g} | {e+g} |")

    md.append("\n## New content needed, by type\n")
    md.append("| content type | P1 | P2 | P3 | total | distinct pages |")
    md.append("|---|---:|---:|---:|---:|---:|")
    for ty, counts in sorted(summary["gapsByTypePriority"].items(), key=lambda x: -sum(x[1].values())):
        p1, p2, p3 = counts.get("P1 - Quick Win", 0), counts.get("P2", 0), counts.get("P3 - Long Term", 0)
        pages = len({c["cluster"] for c in ranked if c["gapType"] == ty})
        md.append(f"| {ty} | {p1} | {p2} | {p3} | {p1+p2+p3} | {pages} |")

    md.append("\n## Existing pages, by keywords absorbed\n")
    md.append("| route | keywords |")
    md.append("|---|---:|")
    for route, n in collections.Counter(r["target"] for r in existing).most_common():
        md.append(f"| `{route}` | {n} |")

    md.append(f"\n## Gap clusters ({len(ranked)})\n")
    md.append("| cluster | keywords | P1 | type | proposed URL |")
    md.append("|---|---:|---:|---|---|")
    for c in ranked:
        md.append(f"| {c['cluster']} | {c['count']} | {c['p1']} | {c['gapType']} | `{c['proposedUrl']}` |")

    with open(os.path.join(OUT_DIR, "phase1-report.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(md) + "\n")

    print("\nWrote: reports/seo/{keyword-map.csv,keyword-map.json,gap-clusters.json,phase1-report.md}")


if __name__ == "__main__":
    main()
