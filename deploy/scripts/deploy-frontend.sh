#!/usr/bin/env bash
#
# Build the static export on the server and publish it atomically.
# Run as the `complivibe` service user, from anywhere:
#
#   bash /srv/complivibe/src/complivibe-frontend/deploy/scripts/deploy-frontend.sh
#
# Re-runnable. A failed build leaves the live site untouched — the symlink is
# only moved once a complete `out/` exists.

set -euo pipefail

APP_ROOT="/srv/complivibe"
SRC_DIR="${APP_ROOT}/src/complivibe-frontend"
RELEASES_DIR="${APP_ROOT}/frontend/releases"
CURRENT_LINK="${APP_ROOT}/frontend/current"
KEEP_RELEASES=5
CMS_HEALTH="http://127.0.0.1:4000/cms-api/health"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$*" >&2; exit 1; }

[[ -d "$SRC_DIR" ]] || die "no checkout at $SRC_DIR"
cd "$SRC_DIR"

log "Checking the CMS is up"
# `npm run build` runs prebuild -> scripts/fetch-content.ts, which compiles the
# CMS's published content into static modules. With CMS_FETCH_OPTIONAL unset a
# CMS outage fails the build rather than shipping an empty blog — so fail here
# instead, with a message that says what is actually wrong.
curl -fsS --max-time 10 "$CMS_HEALTH" >/dev/null \
  || die "CMS not answering on $CMS_HEALTH — start it before deploying the frontend"

log "Fetching the latest code"
git fetch --prune origin
git checkout main
git reset --hard origin/main
git log --oneline -1

log "Installing dependencies"
npm ci

log "Building (prebuild fetches CMS content, postbuild writes the sitemap)"
npm run build

[[ -f out/index.html ]]  || die "build produced no out/index.html"
[[ -f out/404.html ]]    || die "build produced no out/404.html — nginx error_page depends on it"
[[ -f out/sitemap.xml ]] || die "build produced no out/sitemap.xml"

PAGE_COUNT=$(find out -name '*.html' | wc -l)
[[ "$PAGE_COUNT" -ge 60 ]] || die "only $PAGE_COUNT pages in out/ — expected 60+, refusing to publish a partial build"
log "Built $PAGE_COUNT pages"

RELEASE="${RELEASES_DIR}/$(date -u +%Y%m%d-%H%M%S)"
log "Publishing to $RELEASE"
mkdir -p "$RELEASE"
cp -a out/. "$RELEASE/"

# Atomic swap: `ln -sfn` onto a temp name then `mv` replaces the symlink in a
# single rename(2), so no request ever sees a missing or half-written root.
ln -sfn "$RELEASE" "${CURRENT_LINK}.tmp"
mv -Tf "${CURRENT_LINK}.tmp" "$CURRENT_LINK"
log "current -> $(readlink -f "$CURRENT_LINK")"

log "Reloading nginx"
sudo systemctl reload nginx

log "Pruning old releases (keeping $KEEP_RELEASES)"
cd "$RELEASES_DIR"
ls -1dt */ 2>/dev/null | tail -n "+$((KEEP_RELEASES + 1))" | xargs -r rm -rf
ls -1dt */ 2>/dev/null | sed 's|/$||'

log "Deployed"
