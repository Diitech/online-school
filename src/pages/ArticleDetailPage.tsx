import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Copy,
  Check,
  MessageCircle,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import {
  getArticleBySlug,
  getRelatedArticles,
  getCategorySlug,
  newsCategories,
} from "../data/news";
import SEO from "../components/SEO";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/news"
            className="bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#b07d16] transition-all"
          >
            Browse All News
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article);
  const articleUrl = `${window.location.origin}/news/${article.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url: articleUrl });
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  // Render markdown-like content (simple transformation)
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="font-heading text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="font-heading text-xl font-bold text-[#1A1A2E] mt-6 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-heading font-bold text-lg text-[#1A3C6E] mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-gray-700 leading-relaxed mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      <SEO
        title={article.seoTitle}
        description={article.metaDescription}
        canonical={`https://dmultichoicetutoring.com/news/${article.slug}`}
        ogImage={article.featuredImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          author: { "@type": "Person", name: article.author },
          datePublished: article.publishedAt,
          image: article.featuredImage,
          publisher: {
            "@type": "Organization",
            name: "Dmultichoice Tutoring",
          },
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-[#1A3C6E] text-white sticky top-0 z-40 shadow-lg">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#C9921A]" />
                <span className="font-heading font-bold">Dmultichoice</span>
              </Link>
              <Link
                to="/news"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#1A3C6E]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/news" className="hover:text-[#1A3C6E]">News</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/news/category/${getCategorySlug(article.category)}`} className="hover:text-[#1A3C6E]">
              {article.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Article */}
            <article className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden mb-8">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-[300px] sm:h-[400px] object-cover"
                  />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Link
                    to={`/news/category/${getCategorySlug(article.category)}`}
                    className="bg-[#C9921A]/10 text-[#C9921A] text-xs font-bold px-3 py-1 rounded-full hover:bg-[#C9921A]/20 transition-all"
                  >
                    {article.category}
                  </Link>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {article.publishedAt}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min read
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="w-3 h-3" />
                    {article.views} views
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                  {article.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#C9921A] flex items-center justify-center text-white font-bold text-lg">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#1A1A2E]">{article.author}</p>
                    <p className="text-xs text-gray-500">{article.authorBio}</p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 mb-8">
                  {renderContent(article.content)}
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-[#1A1A2E] mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/news/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full hover:bg-[#C9921A]/10 hover:text-[#C9921A] transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 mb-8">
                  <button
                    onClick={shareArticle}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-[#1A3C6E] hover:text-white transition-all text-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copied ? "Copied!" : "Share Article"}
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-[#1A3C6E] hover:text-white transition-all text-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </motion.div>

              {/* In-Article CTA */}
              <div className="bg-gradient-to-br from-[#1A3C6E] to-[#142d54] rounded-2xl p-6 sm:p-8 text-white mb-8">
                <h3 className="font-display text-2xl font-bold mb-2">{article.ctaHeadline}</h3>
                <p className="text-white/70 mb-6">{article.ctaBody}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/#pricing"
                    className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-6 py-3 rounded-xl hover:bg-[#b07d16] transition-all"
                  >
                    <GraduationCap className="w-5 h-5" />
                    See Available Packages
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/ebooks"
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Get Premium Past Questions
                  </a>
                  <a
                    href="https://wa.me/2348158484621"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-5 py-3 rounded-xl hover:bg-[#1ea855] transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A2E] mb-6">
                    Related Articles
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {related.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => navigate(`/news/${rel.slug}`)}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={rel.featuredImage}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] font-bold text-[#C9921A] uppercase">
                            {rel.category}
                          </span>
                          <h3 className="font-heading font-semibold text-sm text-[#1A1A2E] mt-1 line-clamp-2">
                            {rel.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                            <span>{rel.readTime} min read</span>
                            <span>•</span>
                            <span>{rel.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-lg text-[#1A1A2E] mb-4">Categories</h3>
                <div className="space-y-2">
                  {newsCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/news/category/${cat.slug}`}
                      className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-[#1A3C6E] transition-colors border-b border-gray-50 last:border-0"
                    >
                      <span>{cat.name}</span>
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Sidebar */}
              <div className="bg-gradient-to-br from-[#C9921A] to-[#b07d16] rounded-2xl p-6 text-white">
                <BookOpen className="w-10 h-10 mb-3 opacity-80" />
                <h3 className="font-heading font-bold text-lg mb-2">Get JAMB Past Questions</h3>
                <p className="text-white/80 text-sm mb-4">
                  Comprehensive UTME past questions for all 23 Nigerian universities.
                </p>
                <a
                  href="/ebooks"
                  className="inline-flex items-center gap-2 bg-white text-[#C9921A] font-heading font-bold px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-all text-sm w-full justify-center"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Browse eBook Store
                </a>
              </div>

              {/* Support CTA */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <h3 className="font-heading font-bold text-lg text-[#1A1A2E] mb-2">Need Help?</h3>
                <p className="text-sm text-gray-500 mb-4">Chat with us on WhatsApp for instant support.</p>
                <a
                  href="https://wa.me/2348158484621"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1ea855] transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
