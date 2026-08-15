import { useState } from "react";
import { X, Zap } from "lucide-react";
import { JAMB_CAMPAIGN } from "../data/jambCampaign";

const STORAGE_KEY = "dchoice-holiday-announcement-dismissed";

/**
 * Slim promotional announcement bar shown at the top of the homepage.
 * Dismissible — stays dismissed per browser (localStorage).
 */
export default function HolidayAnnouncement() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable — just hide for this visit
    }
  };

  if (!visible) return null;

  return (
    <div className="relative z-30 bg-[#0F2240] border-b-2 border-[#C9921A]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0 text-center flex-1 sm:text-left">
            <p className="text-white font-heading font-bold text-xs sm:text-sm leading-tight">
              HOLIDAY ONLINE LESSONS ARE NOW OPEN!
            </p>
            <p className="text-[#C9921A] font-heading font-bold text-xs sm:text-sm leading-tight">
              JAMB LESSONS — ONLY ₦5,000
              <span className="hidden sm:inline text-white/80 font-medium"> • LIVE ZOOM CLASSES • REGISTER NOW</span>
            </p>
            <p className="text-white/60 text-[10px] sm:hidden font-medium">
              LIVE ZOOM CLASSES • REGISTER NOW
            </p>
          </div>

          <a
            href={JAMB_CAMPAIGN.pageUrl}
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#C9921A] text-[#0F2240] font-heading font-bold text-xs sm:text-sm px-3 sm:px-5 py-2 rounded-lg hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 shadow"
          >
            <Zap className="w-3.5 h-3.5" />
            REGISTER NOW
          </a>

          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
