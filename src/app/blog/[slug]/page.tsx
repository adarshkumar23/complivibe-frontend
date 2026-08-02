import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PageSection from "@/components/PageSection";
import PageCTA from "@/components/PageCTA";
import Markdown from "@/components/Markdown";
import ContentDetailHeader from "@/components/ContentDetailHeader";
import ContentRelated from "@/components/ContentRelated";
import { posts } from "@/content/blog/posts.generated";
import {
  formatDate,
  metaFor,
  readingMinutes,
  relatedTo,
  sortByPublished,
  toSummary,
} from "@/lib/content";
import { absoluteMediaUrl } from "@/lib/media";

const SITE_URL = "https://complivibe.in";
const ACCENT = "var(--cv-blue)";

export const dynamicParams = false;

/**
 * `output: "export"` rejects a dynamic route that yields zero params, which is
 * exactly what happens when CMS_FETCH_OPTIONAL lets a build proceed without the
 * CMS. Emitting one throwaway param keeps that build alive; the page 404s on it
 * and next-sitemap excludes it.
 */
const EMPTY_FALLBACK_SLUG = "unavailable";

export function generateStaticParams() {
  const slugs = Object.keys(posts);
  return (slugs.length > 0 ? slugs : [EMPTY_FALLBACK_SLUG]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};

  const meta = metaFor(post, "field notes on AI governance from CompliVibe");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const published = formatDate(post.publishedAt);
  const minutes = readingMinutes(post.body);
  const summaries = sortByPublished(posts).map(toSummary);
  const related = relatedTo(toSummary(post), summaries);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt ?? post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
    // A CMS upload already resolves to the CMS's origin, so this only prefixes
    // the site's own paths — pasting SITE_URL onto everything would point
    // crawlers at a /uploads/ path this domain does not serve in every setup.
    image: absoluteMediaUrl(post.coverImage, SITE_URL),
    author: { "@type": "Organization", name: post.author ?? "CompliVibe" },
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
        kicker="Field Note"
        backHref="/blog"
        backLabel="All field notes"
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        date={published}
        isoDate={post.publishedAt}
        minutes={minutes}
        tags={post.tags}
        coverImage={post.coverImage}
        accent={ACCENT}
      />

      {/* The header already carries the top spacing, so this section only needs
          its own breathing room below. */}
      <PageSection className="pt-12 pb-14 md:pt-16 md:pb-16">
        <article className="mx-auto max-w-[42rem]">
          <Markdown content={post.body} />
        </article>
      </PageSection>

      <PageSection className="pt-0 pb-20 md:pb-24">
        <ContentRelated
          items={related}
          basePath="/blog"
          accent={ACCENT}
          heading="Keep reading"
          backLabel="All field notes"
        />
      </PageSection>

      <PageCTA
        title="Turn this into practice."
        subtitle="Map obligations to your AI systems, controls, and evidence — then generate trust reports that stay current."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "All field notes", href: "/blog" }}
      />
    </PageShell>
  );
}
