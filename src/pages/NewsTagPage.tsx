import { useParams, Link } from "react-router-dom";
import { getArticlesByTag, slugToTag } from "../data/news";
import { Calendar, Eye, ChevronRight, ArrowLeft, GraduationCap } from "lucide-react";

export default function NewsTagPage() {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const tagName = tagSlug ? slugToTag(tagSlug) : "";
  const articles = tagSlug ? getArticlesByTag(tagName) : [];

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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#1A3C6E]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/news" className="hover:text-[#1A3C6E]">News</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">Tag: {tagName}</span>
        </div>

        <h1 className="font-display text-3xl font-bold text-[#1A1A2E] mb-6">
          Articles Tagged: "{tagName}"
        </h1>

        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found with this tag.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all"
              >
                <span className="text-[10px] font-bold text-[#C9921A] uppercase">{article.category}</span>
                <h2 className="font-heading font-bold text-lg text-[#1A1A2E] hover:text-[#C9921A] transition-colors mt-1">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.publishedAt}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
