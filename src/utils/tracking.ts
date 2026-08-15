// ─────────────────────────────────────────────────────────────────────────────
// Conversion tracking — Google Tag Manager dataLayer events.
// GTM container GTM-P5825J2X is already installed site-wide (see index.html),
// so we only push events; no duplicate tracking codes are added.
//
// Standard funnel events:
//   page_view                → landing/pageview conversion
//   jamb_registration_started
//   jamb_registration_submitted
//   jamb_payment_initiated
//   jamb_payment_success     → primary conversion (JAMB REGISTRATION COMPLETED)
//   jamb_whatsapp_group_click
// ─────────────────────────────────────────────────────────────────────────────

type FunnelStep =
  | "page_view"
  | "registration_started"
  | "registration_submitted"
  | "payment_initiated"
  | "payment_success"
  | "whatsapp_group_click";

interface TrackingEvent {
  event: "jamb_funnel";
  funnel_step: FunnelStep;
  campaign: "holiday-jamb-lessons";
  value: number;
  currency: "NGN";
  [key: string]: string | number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(payload: TrackingEvent) {
  try {
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ ...payload, event: "jamb_funnel" });
      console.info(`📈 [tracking] funnel:${payload.funnel_step}`, payload);
    }
  } catch (error) {
    // Tracking must never break the landing page.
    console.warn("⚠️ [tracking] failed to push event", error);
  }
}

/** Page view — fired on mount of the landing page. */
export function trackJambPageView() {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "page_view",
    campaign: "holiday-jamb-lessons",
    value: 0,
    currency: "NGN",
  });
}

/** Visitor opened the registration form. */
export function trackJambRegistrationStarted() {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "registration_started",
    campaign: "holiday-jamb-lessons",
    value: 5000,
    currency: "NGN",
  });
}

/** Registration form submitted successfully with a ref. */
export function trackJambRegistrationSubmitted(regRef: string) {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "registration_submitted",
    campaign: "holiday-jamb-lessons",
    reg_ref: regRef,
    value: 5000,
    currency: "NGN",
  });
}

/** Student initiated the ₦5,000 online payment. */
export function trackJambPaymentInitiated(regRef: string) {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "payment_initiated",
    campaign: "holiday-jamb-lessons",
    reg_ref: regRef,
    value: 5000,
    currency: "NGN",
  });
}

/**
 * Primary conversion — successful ₦5,000 payment / completed registration.
 * Maps to GTM "JAMB REGISTRATION COMPLETED — ₦5,000".
 */
export function trackJambPaymentSuccess(regRef?: string) {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "payment_success",
    campaign: "holiday-jamb-lessons",
    ...(regRef ? { reg_ref: regRef } : {}),
    value: 5000,
    currency: "NGN",
  });
}

/** Click on the JOIN THE CLASS WHATSAPP GROUP button. */
export function trackJambWhatsAppGroupClick() {
  pushEvent({
    event: "jamb_funnel",
    funnel_step: "whatsapp_group_click",
    campaign: "holiday-jamb-lessons",
    value: 5000,
    currency: "NGN",
  });
}
