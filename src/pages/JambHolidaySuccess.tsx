import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  MessageCircle,
  Phone,
  ArrowLeft,
  Home,
} from "lucide-react";
import SEO from "../components/SEO";
import { JAMB_CAMPAIGN, JAMB_OG_IMAGE } from "../data/jambCampaign";
import {
  trackJambPaymentSuccess,
  trackJambWhatsAppGroupClick,
} from "../utils/tracking";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";

export default function JambHolidaySuccess() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const ref = searchParams.get("ref");
  const isPending = mode === "pending_verification";

  // Primary conversion: online payment completed → registration completed.
  useEffect(() => {
    if (!isPending) {
      trackJambPaymentSuccess(ref || undefined);
    }
  }, [isPending, ref]);

  const handleGroupClick = () => {
    trackJambWhatsAppGroupClick();
  };

  return (
    <div className="min-h-screen bg-[#0F2240] text-white">
      <SEO
        title={
          isPending
            ? "Registration Received — Holiday & JAMB Online Lessons"
            : "Registration Successful! — Holiday & JAMB Online Lessons"
        }
        description="Thank you for registering for the DMultichoice Holiday & JAMB Online Lessons. Join the official class WhatsApp group for class information and joining instructions."
        canonical={
          isPending
            ? "https://tutoring.dmultichoice.com/jamb-holiday-lessons/success?mode=pending_verification"
            : "https://tutoring.dmultichoice.com/jamb-holiday-lessons/success?mode=paid"
        }
        ogImage={JAMB_OG_IMAGE}
        noindex
      />

      <Navigation />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isPending ? "bg-[#C9921A]/15" : "bg-green-500/15"
            }`}
          >
            {isPending ? (
              <Clock className="w-10 h-10 text-[#C9921A]" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-400" />
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
            {isPending ? "REGISTRATION RECEIVED" : "REGISTRATION SUCCESSFUL!"}
          </h1>

          <p className="text-white/80 text-lg mb-2">
            Thank you for registering for the{" "}
            <span className="text-[#C9921A] font-semibold">
              DMultichoice Holiday & JAMB Online Lessons
            </span>
            .
          </p>

          {isPending && (
            <div className="bg-white/5 border border-[#C9921A]/40 rounded-2xl p-5 mt-6 text-left">
              <p className="text-white/85 text-sm leading-relaxed">
                Your registration has been received and your payment is{" "}
                <span className="text-[#C9921A] font-semibold">
                  awaiting verification
                </span>
                . Please keep your payment receipt/reference available.
              </p>
            </div>
          )}

          {ref && (
            <div className="inline-block mt-6 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <p className="text-xs text-white/50">Registration Reference</p>
              <p className="font-mono font-semibold text-[#C9921A]">{ref}</p>
            </div>
          )}

          {/* ── NEXT STEP ────────────────────────────────────────────────── */}
          <div className="mt-10 text-left bg-white rounded-3xl p-6 sm:p-8 text-[#1A1A2E]">
            <h2 className="font-heading font-bold text-xl text-[#1A3C6E] mb-2 text-center">
              YOUR NEXT STEP
            </h2>
            <p className="text-gray-600 text-sm mb-5 text-center">
              Join the official class WhatsApp group to receive important class
              information, updates and joining instructions.
            </p>

            <a
              href={JAMB_CAMPAIGN.whatsappGroupUrl}
              onClick={handleGroupClick}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-heading font-bold text-base py-4 rounded-xl hover:bg-[#1ea855] transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              JOIN THE CLASS WHATSAPP GROUP
            </a>

            {isPending && (
              <p className="text-xs text-gray-400 text-center mt-3">
                Please note: access/class participation may depend on payment
                verification.
              </p>
            )}

            <div className="border-t border-gray-100 mt-5 pt-5 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Need help? Call/WhatsApp:
              </p>
              <a
                href={`https://wa.me/${JAMB_CAMPAIGN.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#1A3C6E] font-heading font-bold text-lg hover:text-[#C9921A] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {JAMB_CAMPAIGN.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Back links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={JAMB_CAMPAIGN.pageUrl}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Registration
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
