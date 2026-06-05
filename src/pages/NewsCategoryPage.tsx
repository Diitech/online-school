import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  newsArticles,
  newsCategories,
  getCategoryName,
} from "../data/news";
import {
  Search,
  Calendar,
  Eye,
  ChevronRight,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

export default function NewsCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const categoryName = categorySlug ? getCategoryName(categorySlug) : undefined;
  const category = newsCategories.find((c) => c.slug === categorySlug);

  let articles = categoryName
    ? newsArticles.filter((a) => a.category === categoryName)
    : newsArticles;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1A3C6E] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#C9921A]" />
              <span className="font-heading font-bold">Dmultichoice</span>
            </Link>
            <Link to="/news" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              All News
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#1A3C6E]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/news" className="hover:text-[#1A3C6E]">News</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">{categoryName || "All Categories"}</span>
        </div>

        <h1 className="font-display text-3xl font-bold text-[#1A1A2E] mb-2">
          {categoryName || "All News"}
        </h1>
        {category && (
          <p className="text-gray-500 mb-6">{category.description}</p>
        )}

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20"
          />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No articles found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#C9921A] uppercase">{article.category}</span>
                  <span className="text-[10px] text-gray-400">{article.readTime} min read</span>
                </div>
                <h2 className="font-heading font-bold text-lg text-[#1A1A2E] hover:text-[#C9921A] transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {article.views}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
