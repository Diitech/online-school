import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Clock,
  Eye,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Calendar,
  User,
  MessageCircle,
  ShoppingCart,
  GraduationCap,
} from "lucide-react";
import {
  newsArticles,
  newsCategories,
  getFeaturedArticles,
  getTrendingArticles,
} from "../data/news";

const ARTICLES_PER_PAGE = 10;

export default function NewsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const featured = getFeaturedArticles();
  const trending = getTrendingArticles();

  const filtered = newsArticles.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-[#1A3C6E] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <GraduationCap className="w-6 h-6 text-[#C9921A]" />
              <span className="font-heading font-bold text-lg">Dmultichoice</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/ebooks" className="text-sm text-white/70 hover:text-white transition-colors">
                eBook Store
              </Link>
              <Link to="/#pricing" className="text-sm bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-2 rounded-lg hover:bg-[#b07d16] transition-all">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              Education News & Study Tips
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Dmultichoice Education News
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Latest updates on JAMB, WAEC, scholarships, university admissions, and expert study tips for Nigerian students.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search news, tips, JAMB, WAEC..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ARTICLES_PER_PAGE);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/news"
            className="px-4 py-2 rounded-full font-heading font-medium text-xs transition-all bg-[#1A3C6E] text-white shadow-lg"
          >
            All
          </Link>
          {newsCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/news/category/${cat.slug}`}
              className="px-4 py-2 rounded-full font-heading font-medium text-xs transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured + Trending Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Featured Main */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-heading font-bold text-xl text-[#1A1A2E] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C9921A]" />
              Featured Articles
            </h2>
            {featured.slice(0, 1).map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/news/${article.slug}`)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-[400px]"
              >
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="bg-[#C9921A] text-[#1A3C6E] text-xs font-bold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-3 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Secondary featured */}
            <div className="grid sm:grid-cols-2 gap-4">
              {featured.slice(1, 3).map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/news/${article.slug}`)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group h-[250px]"
                >
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="bg-[#C9921A] text-[#1A3C6E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-white mt-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-white/50 text-[10px]">
                      <span>{article.readTime} min read</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-xl text-[#1A1A2E] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Trending
            </h2>
            <div className="space-y-3">
              {trending.map((article, i) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/news/${article.slug}`)}
                  className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C9921A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-sm text-[#C9921A]">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#C9921A] uppercase">
                      {article.category}
                    </span>
                    <h4 className="font-heading font-semibold text-sm text-[#1A1A2E] mt-0.5 line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-gray-400 text-[10px]">
                      <span>{article.readTime} min</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#C9921A] to-[#b07d16] rounded-2xl p-5 text-white">
              <h3 className="font-heading font-bold text-lg mb-2">Start Your Journey to 300+ in JAMB</h3>
              <p className="text-white/80 text-sm mb-4">Expert tutors, CBT simulator, past questions. Join Dmultichoice today.</p>
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 bg-white text-[#C9921A] font-heading font-bold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all text-sm"
              >
                <GraduationCap className="w-4 h-4" />
                See Packages
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-[#1A1A2E] mb-6">
            {searchQuery ? `Search Results (${filtered.length})` : "Latest Articles"}
          </h2>

          <div className="space-y-6">
            {visible.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/news/${article.slug}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-72 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#C9921A]/10 text-[#C9921A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{article.readTime} min read</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#1A1A2E] mb-2 group-hover:text-[#C9921A] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </span>
                      </div>
                      <span className="text-[#C9921A] text-sm font-medium flex items-center gap-1">
                        Read More <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
                className="bg-[#1A3C6E] text-white font-heading font-semibold px-8 py-3 rounded-xl hover:bg-[#142d54] transition-all"
              >
                Load More Articles
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No articles found matching your search.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-[#1A3C6E] rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-6">
            Join Dmultichoice Tutoring today and get access to expert tutors, comprehensive past questions, and personalised study plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-8 py-3 rounded-xl hover:bg-[#b07d16] transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              See Available Packages
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/ebooks"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-heading font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <ShoppingCart className="w-5 h-5" />
              Get Premium Past Questions
            </a>
            <a
              href="https://wa.me/2348158484621"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-[#1ea855] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
