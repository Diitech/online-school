import { useSearchParams } from "react-router-dom";
import { XCircle, RefreshCw, MessageCircle } from "lucide-react";

const REASON_MESSAGES: Record<string, string> = {
  verification_failed:
    "Your payment went through but we could not verify it on our server. Please contact support with your reference number.",
  network_error:
    "A network error occurred during verification. Check your connection and try again, or contact support.",
  payment_failed:
    "The payment was not completed. Please try again or use a different payment method.",
};

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason") ?? "payment_failed";
  const txRef = searchParams.get("tx_ref");

  const message =
    REASON_MESSAGES[reason] ??
    "Something went wrong. Please try again or contact support.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff5f5] to-[#fef2f2] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Red top bar */}
        <div className="h-2 bg-gradient-to-r from-[#b91c1c] to-[#ef4444]" />

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-2xl font-bold text-[#1A1A2E] mb-2">
            Payment Failed
          </h1>
          <p className="font-body text-[#1A1A2E]/70 mb-6 max-w-xs mx-auto">
            {message}
          </p>

          {/* Tx ref (useful for support) */}
          {txRef && (
            <div className="bg-gray-50 rounded-lg px-4 py-2 mb-6 inline-block">
              <p className="font-body text-xs text-[#1A1A2E]/40">
                Reference:{" "}
                <span className="font-mono text-[#1A1A2E]/70">{txRef}</span>
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3 justify-center">
            {/* Primary: retry via direct Flutterwave pay link */}
            <a
              href="https://flutterwave.com/pay/q4qsp5uayudc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C9921A] text-white font-heading font-semibold text-sm hover:bg-[#b07d16] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Pay Directly via Flutterwave
            </a>

            {/* Secondary: back to pricing */}
            <a
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1A3C6E] text-white font-heading font-semibold text-sm hover:bg-[#142d52] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again on Site
            </a>

            {/* Tertiary: WhatsApp support */}
            <a
              href="https://wa.me/2348158484621"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white font-heading font-semibold text-sm hover:bg-[#1ebe59] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}