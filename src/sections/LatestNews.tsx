import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Newspaper,
  Clock,
  Eye,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";
import { newsArticles } from "../data/news";

export default function LatestNews() {
  const navigate = useNavigate();
  const latest = newsArticles.slice(0, 3);

  return (
    <section className="relative content-layer bg-gray-50 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1A3C6E] text-white font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                <Newspaper className="w-4 h-4" />
                Latest Education News
              </div>
              <h2 className="font-display text-[28px] sm:text-[36px] font-bold text-[#1A1A2E] leading-[1.15]">
                Stay Updated with <span className="text-[#C9921A]">Educational News</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/news")}
              className="hidden sm:inline-flex items-center gap-2 text-[#1A3C6E] font-heading font-semibold text-sm hover:text-[#C9921A] transition-colors"
            >
              View All News
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* News Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {latest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(`/news/${article.slug}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#C9921A] text-[#1A3C6E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#1A1A2E] mb-2 line-clamp-2 group-hover:text-[#C9921A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile View All */}
          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigate("/news")}
              className="inline-flex items-center gap-2 bg-[#1A3C6E] text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-[#142d54] transition-all"
            >
              View All News
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
