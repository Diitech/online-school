import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShoppingCart, ArrowRight, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Recent Buyers Data ───────────────────────────────────────────────────────
// Rotating list of fake buyer notifications to create social proof
const buyers = [
  { name: "Chidi O.", location: "Lagos", bundle: "UNILAG UTME Pack" },
  { name: "Amina B.", location: "Abuja", bundle: "MEGA BUNDLE" },
  { name: "Femi A.", location: "Ibadan", bundle: "UNIBEN UTME Pack" },
  { name: "Ngozi E.", location: "Enugu", bundle: "UI UTME Pack" },
  { name: "Tunde K.", location: "Port Harcourt", bundle: "MEGA BUNDLE" },
  { name: "Sarah J.", location: "Kaduna", bundle: "OAU UTME Pack" },
  { name: "Emeka N.", location: "Awka", bundle: "Master Bundle" },
  { name: "Blessing O.", location: "Uyo", bundle: "UNILAG UTME Pack" },
  { name: "Daniel P.", location: "Jos", bundle: "MEGA BUNDLE" },
  { name: "Grace M.", location: "Calabar", bundle: "UNN UTME Pack" },
  { name: "Ibrahim D.", location: "Kano", bundle: "ABU UTME Pack" },
  { name: "Chidinma K.", location: "Owerri", bundle: "Master Bundle" },
];

const MEGA_BUNDLE_ID = "mega-bundle";
const EBOOKS_PAGE = "/ebooks";

// ── Recent Buyer Notification Popup ──────────────────────────────────────────
function BuyerNotification() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  // Cycle through buyers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % buyers.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const buyer = buyers[current];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={buyer.name + current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 shadow-sm"
        >
          <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center flex-shrink-0">
            <Users className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm text-green-800">
            <strong>{buyer.name}</strong> from <strong>{buyer.location}</strong> just bought{" "}
            <strong>{buyer.bundle}</strong> 🎉
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function UTMEBundlePromo() {
  const navigate = useNavigate();

  const handleBuyNow = useCallback(() => {
    navigate(`/product/${MEGA_BUNDLE_ID}`);
  }, [navigate]);

  return (
    <section className="relative content-layer bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9921A] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1A3C6E] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-5">
              <Sparkles className="w-4 h-4" />
              New: Mega UTME Bundle
            </div>

            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#1A1A2E] leading-[1.15] mb-4">
              Get UTME Past Questions for{" "}
              <span className="text-[#C9921A]">All 23 Universities</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-[#1A1A2E]/70 mb-6 max-w-lg">
              Complete past questions & answers for every major Nigerian
              university — UNILAG, UI, OAU, UNIBEN, UNN, ABU, and 17 more.
              Instant PDF download after payment.
            </p>

            {/* Bundle cards preview */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex-1 bg-gradient-to-br from-[#C9921A] to-[#b07d16] rounded-xl p-4 text-white">
                <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  BEST VALUE
                </span>
                <h4 className="font-heading font-bold text-base mt-2">
                  Master Bundle
                </h4>
                <p className="text-white/80 text-xs mt-1">
                  All 23 UTME schools
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-xl font-bold">₦15,000</span>
                  <span className="text-white/50 line-through text-xs">₦34,500</span>
                </div>
              </div>

              <div className="flex-1 bg-gradient-to-br from-[#1A3C6E] to-[#142d54] rounded-xl p-4 text-white">
                <span className="bg-[#C9921A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  MEGA DEAL
                </span>
                <h4 className="font-heading font-bold text-base mt-2">
                  Mega Bundle
                </h4>
                <p className="text-white/80 text-xs mt-1">
                  All exams + all schools
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-xl font-bold">₦25,000</span>
                  <span className="text-white/50 line-through text-xs">₦52,000</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-8 py-3.5 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Mega Bundle — ₦25,000
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate(EBOOKS_PAGE)}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1A3C6E] text-[#1A3C6E] font-heading font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1A3C6E] hover:text-white transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Browse All eBooks
              </button>
            </div>
          </div>

          {/* Right: Live buyers feed */}
          <div className="flex flex-col items-center gap-6">
            {/* Big bundle icon */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-[#C9921A] to-[#b07d16] flex items-center justify-center shadow-2xl relative">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-white mx-auto mb-2" />
                <span className="text-white font-bold text-lg">MEGA</span>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20" />
              <div className="absolute -inset-3 rounded-[2rem] border border-white/10" />
            </div>

            {/* Savings badge */}
            <div className="bg-green-100 text-green-800 font-heading font-bold text-sm px-6 py-2 rounded-full">
              Save ₦27,000 — Limited Time Offer! 🔥
            </div>

            {/* Live buyer notifications */}
            <div className="w-full max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-heading font-semibold text-green-700 uppercase tracking-wider">
                  Recent Purchases
                </span>
              </div>
              <BuyerNotification />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
