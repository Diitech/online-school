import { useState, useCallback, useEffect, useRef } from "react";

export interface FlutterwavePaymentProps {
  amount: number;
  planName: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  productId?: string;
  buttonText?: string;
  buttonClassName?: string;
  /** When true, triggers payment immediately on mount */
  autoTrigger?: boolean;
  /**
   * Optional same-site redirect path (e.g. /jamb-holiday-lessons/success).
   * Defaults to /payment-success when omitted.
   */
  redirectUrl?: string;
  onModalClose?: () => void;
}

interface PaymentInitResponse {
  success: boolean;
  message: string;
  data?: {
    tx_ref: string;
    amount: number;
    currency: string;
    payment_link: string;
    flutterwave_ref: string;
  };
}

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "https://tutoring.dmultichoice.com").replace(/\/+$/, "") + "/api";

// -----------------------------------------------------------------------------

export default function FlutterwavePayment({
  amount,
  planName,
  customerEmail,
  customerName,
  customerPhone = "",
  productId,
  buttonText = "Pay Now",
  buttonClassName = "",
  autoTrigger = false,
  redirectUrl,
  onModalClose,
}: FlutterwavePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -- Initialize payment via backend API ------------------------------------
  const initializePayment = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Log the amount being sent to debug 0.00 issue
      console.log(`?? Sending amount: ${amount}, productId: ${productId}`);

      const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId || null,
          amount,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          redirect_url: redirectUrl || `${window.location.origin}/payment-success`,
        }),
      });

      const result: PaymentInitResponse = await response.json();

      if (!result.success || !result.data?.payment_link) {
        throw new Error(result.message || "Payment initialization failed");
      }

      const { payment_link, tx_ref } = result.data;

      // Log the initialization
      console.log(
        `?? Payment initialized: ${planName} — ?${amount} (${tx_ref})`,
      );

      // Open payment link in same tab (standard checkout flow)
      window.location.href = payment_link;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Payment initialization failed";
      console.error("? Payment initialization error:", message);
      setError(message);
      setLoading(false);
      onModalClose?.();
    }
  }, [amount, planName, customerName, customerEmail, customerPhone, productId, redirectUrl, onModalClose]);

  // -- Auto-trigger ----------------------------------------------------------
  // Trigger payment once after the component mounts.
  const autoTriggeredRef = useRef(false);

  useEffect(() => {
    if (autoTrigger && !autoTriggeredRef.current) {
      autoTriggeredRef.current = true;
      const timer = window.setTimeout(() => {
        initializePayment();
      }, 100);

      return () => window.clearTimeout(timer);
    }
  }, [autoTrigger, initializePayment]);

  // -- Render ----------------------------------------------------------------
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-heading text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg";

  return (
    <div>
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 underline hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      <button
        onClick={initializePayment}
        disabled={loading}
        className={`${baseClasses} ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        } ${buttonClassName}`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
}

