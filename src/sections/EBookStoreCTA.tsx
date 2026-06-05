import { motion } from "framer-motion";
import { BookOpen, ArrowRight, GraduationCap, FileText, Star } from "lucide-react";

// Pre-defined positions for background circles (no Math.random during render)
const circlePositions = [
  { top: "15%", left: "10%", scale: 1.2 },
  { top: "65%", left: "85%", scale: 1.5 },
  { top: "80%", left: "20%", scale: 0.8 },
  { top: "30%", left: "75%", scale: 1.1 },
  { top: "50%", left: "50%", scale: 1.3 },
  { top: "10%", left: "60%", scale: 0.9 },
];

export default function EBookStoreCTA() {
  return (
    <section id="ebooks" className="py-20 bg-[#1A3C6E] relative overflow-hidden">
      {/* Background Pattern - Static positions */}
      <div className="absolute inset-0 opacity-10">
        {circlePositions.map((circle, i) => (
          <div
            key={i}
            className="absolute w-40 h-40 border-2 border-white rounded-full"
            style={{
              top: circle.top,
              left: circle.left,
              transform: `scale(${circle.scale})`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              New: eBook Store
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Get Past Questions &<br />
              <span className="text-[#C9921A]">Study Guides</span> Instantly
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-lg">
              UTME past questions for 23 top Nigerian universities, WAEC, NECO, JAMB, IELTS, SAT prep materials. Download immediately after payment.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: FileText, text: "UTME Past Questions — 23 Universities" },
                { icon: GraduationCap, text: "WAEC, NECO, JAMB Complete Guides" },
                { icon: Star, text: "IELTS & SAT Premium Packs" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-[#C9921A]" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href="/ebooks"
              className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-8 py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              Browse eBook Store
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Right Preview Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-5 shadow-xl"
              >
                <div className="w-12 h-12 bg-[#1A3C6E] rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#C9921A]" />
                </div>
                <h4 className="font-heading font-bold text-[#1A1A2E] mb-1">UNILAG UTME</h4>
                <p className="text-xs text-gray-500 mb-3">Past Questions & Answers</p>
                <span className="text-[#C9921A] font-bold">₦1,500</span>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-5 shadow-xl mt-8"
              >
                <div className="w-12 h-12 bg-[#C9921A] rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-heading font-bold text-[#1A1A2E] mb-1">Master Bundle</h4>
                <p className="text-xs text-gray-500 mb-3">All 23 Universities</p>
                <span className="text-[#C9921A] font-bold">₦15,000</span>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-5 shadow-xl"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-heading font-bold text-[#1A1A2E] mb-1">IELTS Pack</h4>
                <p className="text-xs text-gray-500 mb-3">Complete Guide</p>
                <span className="text-[#C9921A] font-bold">₦5,000</span>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#C9921A] rounded-2xl p-5 shadow-xl mt-8 text-white"
              >
                <div className="text-center">
                  <span className="font-display text-3xl font-bold">23</span>
                  <p className="text-sm text-white/80 mt-1">Universities<br />Covered</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}