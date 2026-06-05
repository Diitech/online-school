import { useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const txRef = searchParams.get("tx_ref");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f7ff] to-[#e8f5e9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Green top bar */}
        <div className="h-2 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]" />

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-12 h-12 text-[#2E7D32]" />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-2xl font-bold text-[#1A1A2E] mb-2">
            Payment Successful!
          </h1>
          <p className="font-body text-[#1A1A2E]/70 mb-1">
            Welcome to{" "}
            <span className="font-semibold text-[#1A3C6E]">
              {plan || "Dmultichoice Tutoring"}
            </span>
            .
          </p>
          <p className="font-body text-sm text-[#1A1A2E]/50 mb-6">
            Check your email for enrolment details and your tutor's contact.
          </p>

          {/* Tx ref */}
          {txRef && (
            <div className="bg-gray-50 rounded-lg px-4 py-2 mb-6 inline-block">
              <p className="font-body text-xs text-[#1A1A2E]/40">
                Reference:{" "}
                <span className="font-mono text-[#1A1A2E]/70">{txRef}</span>
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1A3C6E] text-white font-heading font-semibold text-sm hover:bg-[#142d52] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
            <a
              href="https://wa.me/2348158484621"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white font-heading font-semibold text-sm hover:bg-[#1ebe59] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}