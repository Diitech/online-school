import { useEffect } from "react";

const CORRECT_DOMAIN = "https://tutoring.dmultichoice.com";
const DEFAULT_OG_IMAGE = `${CORRECT_DOMAIN}/og-image.jpg`;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  noindex = false,
  structuredData,
}: SEOProps) {
  const siteTitle = "Dmultichoice Tutoring";
  const fullTitle = `${title} | ${siteTitle}`;

  useEffect(() => {
    document.title = fullTitle;

    // Ensure title is under 60 chars for SEO
    if (fullTitle.length > 60 && title.length > 30) {
      // Truncate only the page title part if combined exceeds 60
      const maxPageTitleLen = 60 - siteTitle.length - 3; // account for " | "
      if (maxPageTitleLen > 0 && title.length > maxPageTitleLen) {
        document.title = `${title.substring(0, maxPageTitleLen - 3)}... | ${siteTitle}`;
      }
    }

    // Determine canonical URL — always self-referencing to correct domain
    const canonicalUrl = canonical || window.location.href;
    // Ensure it uses the correct domain
    const fixedCanonical = canonicalUrl
      .replace(/https?:\/\/dmultichoicetutoring\.com/g, CORRECT_DOMAIN)
      .replace(/https?:\/\/dmultichoice\.com(?![./])/g, CORRECT_DOMAIN)
      .split("#")[0]; // Remove hash fragments

    const metaTags: { name?: string; property?: string; content: string }[] = [
      { name: "description", content: description },
      { name: "keywords", content: keywords || "" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      {
        property: "og:image",
        content: ogImage.replace(
          /https?:\/\/dmultichoicetutoring\.com/g,
          CORRECT_DOMAIN,
        ),
      },
      { property: "og:url", content: fixedCanonical },
      { property: "og:site_name", content: siteTitle },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: ogImage.replace(
          /https?:\/\/dmultichoicetutoring\.com/g,
          CORRECT_DOMAIN,
        ),
      },
      {
        name: "robots",
        content: noindex
          ? "noindex,nofollow"
          : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
      },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? "name" : "property";
      const value = name || property || "";
      let tag = name
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[property="${property}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Canonical tag
    let canonicalTag = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = fixedCanonical;

    // Structured data — ensure url field uses correct domain
    if (structuredData) {
      const fixedData = JSON.parse(
        JSON.stringify(structuredData).replace(
          /https?:\/\/dmultichoicetutoring\.com/g,
          CORRECT_DOMAIN,
        ),
      );
      let scriptTag = document.getElementById(
        "structured-data",
      ) as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "structured-data";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(fixedData);
    }
  }, [
    fullTitle,
    title,
    description,
    canonical,
    ogImage,
    ogType,
    keywords,
    noindex,
    structuredData,
  ]);

  return null;
}
