import { useEffect } from 'react';

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
  ogImage = 'https://dmultichoicetutoring.com/og-image.jpg',
  ogType = 'website',
  keywords,
  noindex = false,
  structuredData,
}: SEOProps) {
  const siteTitle = 'Dmultichoice Tutoring';
  const fullTitle = `${title} | ${siteTitle}`;

  useEffect(() => {
    document.title = fullTitle;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonical || window.location.href },
      { property: 'og:site_name', content: siteTitle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      let tag = name 
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[property="${property}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonical || window.location.href;

    if (structuredData) {
      let scriptTag = document.getElementById('structured-data') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, canonical, ogImage, ogType, keywords, noindex, structuredData]);

  return null;
}
