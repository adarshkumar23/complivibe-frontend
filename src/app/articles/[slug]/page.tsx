import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import Markdown from "@/components/Markdown";
import ContentDetailHeader from "@/components/ContentDetailHeader";
import ContentTableOfContents from "@/components/ContentTableOfContents";
import ContentRelated from "@/components/ContentRelated";
import { articles } from "@/content/articles/articles.generated";
import {
  extractHeadings,
  formatDate,
  metaFor,
  readingMinutes,
  relatedTo,
  sortByPublished,
  toSummary,
} from "@/lib/content";
import { absoluteMediaUrl } from "@/lib/media";

const SITE_URL = "https://complivibe.in";
const ACCENT = "var(--cv-purple)";

/**
 * Below this, an outline is just a restatement of a page you can already see in
 * one scroll — so it only renders on articles long enough to navigate.
 */
const MIN_HEADINGS_FOR_TOC = 3;

export const dynamicParams = false;

/**
 * `output: "export"` rejects a dynamic route that yields zero params, which is
 * exactly what happens when CMS_FETCH_OPTIONAL lets a build proceed without the
 * CMS. Emitting one throwaway param keeps that build alive; the page 404s on it
 * and next-sitemap excludes it.
 */
const EMPTY_FALLBACK_SLUG = "unavailable";

export function generateStaticParams() {
  const slugs = Object.keys(articles);
  return (slugs.length > 0 ? slugs : [EMPTY_FALLBACK_SLUG]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  const meta = metaFor(article, "an article on AI governance from CompliVibe");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/articles/${slug}`,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const published = formatDate(article.publishedAt);
  const minutes = readingMinutes(article.body);
  const headings = extractHeadings(article.body);
  const summaries = sortByPublished(articles).map(toSummary);
  const related = relatedTo(toSummary(article), summaries);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt ?? article.title,
    url: `${SITE_URL}/articles/${article.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/articles/${article.slug}` },
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt,
    keywords: article.tags.length > 0 ? article.tags.join(", ") : undefined,
    // A CMS upload already resolves to the CMS's origin, so this only prefixes
    // the site's own paths — pasting SITE_URL onto everything would point
    // crawlers at a /uploads/ path this domain does not serve in every setup.
    image: absoluteMediaUrl(article.coverImage, SITE_URL),
    author: { "@type": "Organization", name: article.author ?? "CompliVibe" },
    publisher: {
      "@type": "Organization",
      name: "CompliVibe",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContentDetailHeader
        kicker="Article"
        backHref="/articles"
        backLabel="All articles"
        title={article.title}
        excerpt={article.excerpt}
        author={article.author}
        date={published}
        isoDate={article.publishedAt}
        minutes={minutes}
        tags={article.tags}
        coverImage={article.coverImage}
        accent={ACCENT}
      />

      <PageSection className="pt-12 pb-14 md:pt-16 md:pb-16">
        <article className="mx-auto max-w-[42rem]">
          {headings.length >= MIN_HEADINGS_FOR_TOC && (
            <ContentTableOfContents headings={headings} />
          )}
          <Markdown content={article.body} />
        </article>
      </PageSection>

      <PageSection className="pt-0 pb-20 md:pb-24">
        <ContentRelated
          items={related}
          basePath="/articles"
          accent={ACCENT}
          heading="More from the library"
          backLabel="All articles"
        />
      </PageSection>

      <PageCTA
        title="See it on your AI systems."
        subtitle="Book a walkthrough and we'll map these workflows to your real setup."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "All articles", href: "/articles" }}
      />
    </PageShell>
  );
}
