import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { JAMB_CAMPAIGN } from "../data/jambCampaign";

const POPUP_DISMISS_KEY = "dchoice-holiday-popup-dismissed";

/**
 * One-time promotional popup for the JAMB holiday offer.
 * Shows on homepage entry unless the visitor already dismissed it
 * (persisted in localStorage so it does not reappear repeatedly).
 */
export default function HolidayPromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = (() => {
      try {
        return localStorage.getItem(POPUP_DISMISS_KEY) === "1";
      } catch {
        return false;
      }
    })();

    if (dismissed) return;

    // Small delay so the page paints first (no jarring flash).
    const timer = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(POPUP_DISMISS_KEY, "1");
    } catch {
      // storage unavailable — just hide for this visit
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Gold top strip */}
            <div className="h-2 bg-gradient-to-r from-[#C9921A] to-[#e5b53a]" />

            <button
              onClick={dismiss}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              aria-label="Maybe later"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popup body */}
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-[#0F2240] text-[#C9921A] font-heading font-bold text-sm px-4 py-1.5 rounded-full mb-5">
                <Zap className="w-4 h-4" />
                HOLIDAY ONLINE LESSONS
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-2">
                JAMB LESSONS —{" "}
                <span className="text-[#C9921A]">ONLY ₦5,000</span>
              </h3>

              <p className="text-gray-600 mt-3 mb-2">
                Live online classes via Zoom.
              </p>
              <p className="font-heading font-semibold text-[#1A3C6E]">
                Prepare. Practice. Get Exam-Ready.
              </p>

              <div className="space-y-3 mt-7">
                <a
                  href={JAMB_CAMPAIGN.pageUrl}
                  onClick={dismiss}
                  className="block w-full bg-[#C9921A] text-[#0F2240] font-heading font-bold text-lg py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  REGISTER NOW
                </a>
                <button
                  onClick={dismiss}
                  className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors"
                >
                  MAYBE LATER
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
