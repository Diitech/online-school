import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { JAMB_CAMPAIGN } from "../data/jambCampaign";

interface JambNavCTAProps {
  compact?: boolean;
  onNavigate?: () => void;
  className?: string;
}

/**
 * Navigation CTA linking to the JAMB & Holiday lessons landing page.
 * Used in the desktop nav, mobile menu and hero.
 */
export default function JambNavCTA({
  compact = false,
  onNavigate,
  className = "",
}: JambNavCTAProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onNavigate?.();
    navigate(JAMB_CAMPAIGN.pageUrl);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 bg-[#C9921A] text-[#0F2240] font-heading font-bold transition-all hover:bg-[#b07d16] ${
        compact ? "text-xs px-3 py-2 rounded-lg" : "text-sm px-4 py-2.5 rounded-lg"
      } ${className}`}
    >
      <Zap className="w-3.5 h-3.5" />
      JAMB LESSONS — ₦5,000
    </button>
  );
}
