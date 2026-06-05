import { useEffect, useRef, useCallback } from "react";

export interface FlutterwavePaymentProps {
  amount: number;
  planName: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  buttonText?: string;
  buttonClassName?: string;
  /** When true, the Flutterwave modal opens automatically on mount */
  autoTrigger?: boolean;
  /**
   * "modal"  – opens the inline Flutterwave checkout modal (default)
   * "link"   – opens the hosted payment link in a new tab
   * "both"   – renders two separate buttons (modal + link)
   */
  paymentMode?: "modal" | "link" | "both";
  /** Override the hosted payment link. Defaults to the Dmultichoice link. */
  paymentLink?: string;
  /** Label for the hosted-link button when paymentMode="both" */
  linkButtonText?: string;
  /** Extra classes for the hosted-link button when paymentMode="both" */
  linkButtonClassName?: string;
  /** Called when the Flutterwave modal is closed by the user */
  onModalClose?: () => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (config: Record<string, unknown>) => void;
  }
}

// ── Environment variables ─────────────────────────────────────────────────────
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FLUTTERWAVE_PUBLIC_KEY =
  import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ||
  "FLWPUBK-6c573ee5c8bde3a0876b9a2585b75ebd-X";

const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_URL ||
  "https://script.google.com/macros/s/AKfycbxOV9X6WLTqpl7vBzghzOXMuT_E7hZ8UUUOxva2z5ReznI5E1SPwrZyYfTW9TK0Yx5M4A/exec";

/** The default Flutterwave hosted payment page for Dmultichoice Tutoring */
const DEFAULT_PAYMENT_LINK = "https://flutterwave.com/pay/q4qsp5uayudc";

// ── Google Sheets logger ──────────────────────────────────────────────────────
async function logToGoogleSheets(payload: Record<string, unknown>) {
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    });
  } catch (err) {
    console.warn("Google Sheets log failed:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function FlutterwavePayment({
  amount,
  planName,
  customerEmail,
  customerName,
  customerPhone = "",
  buttonText = "Pay Now",
  buttonClassName = "",
  autoTrigger = false,
  paymentMode = "modal",
  paymentLink = DEFAULT_PAYMENT_LINK,
  linkButtonText = "Pay via Payment Link",
  linkButtonClassName = "",
  onModalClose,
}: FlutterwavePaymentProps) {
  const scriptReady = useRef(typeof window.FlutterwaveCheckout === "function");
  // Prevent autoTrigger from firing more than once per mount
  const autoTriggered = useRef(false);

  // ── Load Flutterwave script ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window.FlutterwaveCheckout === "function") {
      scriptReady.current = true;
      return;
    }

    const existingScript = document.getElementById("flutterwave-script");

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        scriptReady.current = true;
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "flutterwave-script";
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => {
      scriptReady.current = true;
    };
    script.onerror = () => {
      console.error("Failed to load Flutterwave payment script.");
    };
    document.body.appendChild(script);
  }, []);

  // ── Backend payment verification ──────────────────────────────────────────
  const verifyPayment = useCallback(
    async (transactionId: number, txRef: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/payments/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: transactionId,
            tx_ref: txRef,
            expected_amount: amount,
          }),
        });

        const data = await response.json();
        console.log("Backend verification:", data);

        if (data.success) {
          await logToGoogleSheets({
            event: "payment_success",
            tx_ref: txRef,
            transaction_id: transactionId,
            plan: planName,
            amount,
            currency: "NGN",
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            timestamp: new Date().toISOString(),
          });

          window.location.href = `/payment-success?plan=${encodeURIComponent(planName)}&tx_ref=${txRef}`;
        } else {
          await logToGoogleSheets({
            event: "payment_verification_failed",
            tx_ref: txRef,
            transaction_id: transactionId,
            plan: planName,
            amount,
            currency: "NGN",
            customer_name: customerName,
            customer_email: customerEmail,
            timestamp: new Date().toISOString(),
            reason: data.message || "verification_failed",
          });

          window.location.href = `/payment-failed?reason=verification_failed&tx_ref=${txRef}`;
        }
      } catch (error) {
        console.error("Verification error:", error);

        await logToGoogleSheets({
          event: "payment_network_error",
          tx_ref: txRef,
          transaction_id: transactionId,
          plan: planName,
          amount,
          currency: "NGN",
          customer_name: customerName,
          customer_email: customerEmail,
          timestamp: new Date().toISOString(),
          reason: error instanceof Error ? error.message : "network_error",
        });

        window.location.href = `/payment-failed?reason=network_error&tx_ref=${txRef}`;
      }
    },
    [amount, planName, customerName, customerEmail, customerPhone],
  );

  // ── Core checkout opener (modal) ──────────────────────────────────────────
  const openCheckout = useCallback(() => {
    if (!scriptReady.current) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }

    if (!FLUTTERWAVE_PUBLIC_KEY) {
      console.error("Missing VITE_FLUTTERWAVE_PUBLIC_KEY in your .env file.");
      alert("Payment configuration error. Please contact support.");
      return;
    }

    const txRef = `DM-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    logToGoogleSheets({
      event: "payment_initiated",
      tx_ref: txRef,
      plan: planName,
      amount,
      currency: "NGN",
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      timestamp: new Date().toISOString(),
    });

    window.FlutterwaveCheckout({
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      customer: {
        email: customerEmail,
        phone_number: customerPhone,
        name: customerName,
      },
      customizations: {
        title: "Dmultichoice Tutoring",
        description: `Payment for ${planName}`,
        logo: "/logo.png",
      },
      callback: (response: Record<string, unknown>) => {
        console.log("Payment response:", response);
        if (
          response.status === "successful" &&
          typeof response.transaction_id === "number"
        ) {
          verifyPayment(response.transaction_id, txRef);
        } else {
          logToGoogleSheets({
            event: "payment_failed",
            tx_ref: txRef,
            plan: planName,
            amount,
            currency: "NGN",
            customer_name: customerName,
            customer_email: customerEmail,
            timestamp: new Date().toISOString(),
            flw_status: response.status,
          });

          window.location.href = `/payment-failed?reason=payment_failed&tx_ref=${txRef}`;
        }
      },
      onclose: () => {
        console.log("Payment modal closed by user");
        logToGoogleSheets({
          event: "payment_modal_closed",
          tx_ref: txRef,
          plan: planName,
          amount,
          currency: "NGN",
          customer_name: customerName,
          customer_email: customerEmail,
          timestamp: new Date().toISOString(),
        });
        onModalClose?.();
      },
    });
  }, [
    amount,
    customerEmail,
    customerName,
    customerPhone,
    planName,
    verifyPayment,
    onModalClose,
  ]);

  // ── Direct payment link opener ────────────────────────────────────────────
  const openPaymentLink = useCallback(() => {
    logToGoogleSheets({
      event: "payment_link_clicked",
      plan: planName,
      amount,
      currency: "NGN",
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      payment_link: paymentLink,
      timestamp: new Date().toISOString(),
    });

    window.open(paymentLink, "_blank", "noopener,noreferrer");
  }, [
    planName,
    amount,
    customerName,
    customerEmail,
    customerPhone,
    paymentLink,
  ]);

  // ── Auto-trigger on mount (used by PricingSection's PaymentLauncher) ──────
  useEffect(() => {
    if (!autoTrigger || autoTriggered.current) return;

    // Only auto-trigger the modal; link mode doesn't make sense for auto-trigger
    if (paymentMode === "link") {
      autoTriggered.current = true;
      openPaymentLink();
      return;
    }

    // Poll every 100 ms until the script is ready (max 5 s)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (typeof window.FlutterwaveCheckout === "function") {
        clearInterval(interval);
        scriptReady.current = true;
        autoTriggered.current = true;
        openCheckout();
      } else if (attempts > 50) {
        clearInterval(interval);
        alert("Payment system took too long to load. Please try again.");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [autoTrigger, paymentMode, openCheckout, openPaymentLink]);

  // ── Shared button base classes ────────────────────────────────────────────
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-heading text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg";

  // ── Render ────────────────────────────────────────────────────────────────

  // Modal only (original behaviour)
  if (paymentMode === "modal") {
    return (
      <button
        onClick={openCheckout}
        className={`${baseClasses} ${buttonClassName}`}
      >
        {buttonText}
      </button>
    );
  }

  // Direct link only
  if (paymentMode === "link") {
    return (
      <button
        onClick={openPaymentLink}
        className={`${baseClasses} ${buttonClassName}`}
      >
        {buttonText}
      </button>
    );
  }

  // Both modal + link buttons
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button
        onClick={openCheckout}
        className={`${baseClasses} ${buttonClassName}`}
      >
        {buttonText}
      </button>

      <span className="text-xs text-gray-400 select-none hidden sm:block">
        or
      </span>

      <button
        onClick={openPaymentLink}
        className={`${baseClasses} ${linkButtonClassName}`}
      >
        {/* External link icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {linkButtonText}
      </button>
    </div>
  );
}
