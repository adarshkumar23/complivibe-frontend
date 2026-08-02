/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://complivibe.in',
  outDir: './out',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  // /blog/unavailable and /articles/unavailable are the throwaway params those
  // routes emit when the CMS was unreachable during a CMS_FETCH_OPTIONAL build.
  // /admin/* is the internal CMS panel — never public, never indexed.
  exclude: [
    '/login',
    '/signup',
    '/api/*',
    '/admin',
    '/admin/*',
    '/blog/unavailable',
    '/articles/unavailable',
  ],
  // Priorities are tiered by the keyword map in reports/seo/keyword-map.json:
  // routes carrying a P1 cluster or a high volume of mapped commercial keywords
  // rank highest, thin/utility routes lowest. Regenerate that report before
  // retuning these numbers — see scripts/seo/parse-keywords.py.
  additionalPaths: async () => [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
    { loc: '/articles', priority: 0.7, changefreq: 'weekly' },
    { loc: '/faq', priority: 0.7, changefreq: 'monthly' },
    { loc: '/platform', priority: 0.9, changefreq: 'monthly' },
    { loc: '/pricing', priority: 0.9, changefreq: 'weekly' },
    { loc: '/book-demo', priority: 0.9, changefreq: 'monthly' },
    { loc: '/score', priority: 0.8, changefreq: 'monthly' },
    { loc: '/solutions', priority: 0.9, changefreq: 'monthly' },
    // 0.9 — 40+ mapped commercial keywords each
    { loc: '/solutions/startup', priority: 0.9 },
    { loc: '/solutions/fintech', priority: 0.9 },
    { loc: '/solutions/healthcare', priority: 0.9 },
    { loc: '/solutions/india-first', priority: 0.9 },
    // 0.8 — 15-40 mapped keywords
    { loc: '/solutions/us-saas', priority: 0.8 },
    { loc: '/solutions/saas', priority: 0.8 },
    { loc: '/solutions/eu-export', priority: 0.8 },
    { loc: '/solutions/mid-market', priority: 0.8 },
    // 0.7 — fewer mapped keywords today; persona demand largely sits in the
    // editorial gap (see Phase 1), so these are not demoted below 0.7.
    { loc: '/solutions/grc', priority: 0.7 },
    { loc: '/solutions/ciso', priority: 0.7 },
    { loc: '/solutions/govt', priority: 0.7 },
    { loc: '/solutions/it-teams', priority: 0.7 },
    { loc: '/solutions/travel', priority: 0.7 },
    { loc: '/frameworks', priority: 0.8, changefreq: 'monthly' },
    // Framework detail pages, tiered by mapped keyword volume.
    { loc: '/frameworks/dpdp', priority: 0.8, changefreq: 'monthly' },
    { loc: '/frameworks/iso-42001', priority: 0.8, changefreq: 'monthly' },
    { loc: '/frameworks/nist', priority: 0.8, changefreq: 'monthly' },
    { loc: '/frameworks/eu-ai-act', priority: 0.8, changefreq: 'monthly' },
    { loc: '/frameworks/soc2', priority: 0.7, changefreq: 'monthly' },
    { loc: '/frameworks/gdpr', priority: 0.7, changefreq: 'monthly' },
    { loc: '/frameworks/hipaa', priority: 0.7, changefreq: 'monthly' },
    { loc: '/frameworks/colorado-ai-act', priority: 0.7, changefreq: 'monthly' },
    { loc: '/enterprise', priority: 0.9, changefreq: 'monthly' },
    { loc: '/about', priority: 0.7, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.7 },
    { loc: '/resources', priority: 0.7, changefreq: 'weekly' },
    { loc: '/careers', priority: 0.6, changefreq: 'weekly' },
    { loc: '/security', priority: 0.6 },
    { loc: '/trust', priority: 0.6 },
    { loc: '/docs', priority: 0.7, changefreq: 'weekly' },
    { loc: '/changelog', priority: 0.6, changefreq: 'weekly' },
    { loc: '/customer-stories', priority: 0.7 },
    { loc: '/legal/privacy-policy', priority: 0.4, changefreq: 'yearly' },
    { loc: '/legal/terms', priority: 0.4, changefreq: 'yearly' },
    { loc: '/legal/cookies', priority: 0.4, changefreq: 'yearly' },
    { loc: '/legal/dpa', priority: 0.4, changefreq: 'yearly' },
  ],
};
