// ─────────────────────────────────────────────────────────────────────────────
// JAMB & Holiday Online Lessons campaign configuration.
// Edit once here — used across the landing page, homepage, form and payments.
// ─────────────────────────────────────────────────────────────────────────────

export const JAMB_CAMPAIGN = {
  pageUrl: "/jamb-holiday-lessons",
  successUrl: "/jamb-holiday-lessons/success",

  /** Registration fee in Naira — locked server-side for online payments. */
  price: 5000,
  priceLabel: "₦5,000",

  /** Product id registered in the payment backend (server-enforced price). */
  productId: "jamb-holiday-lessons",

  /** Company / brand */
  companyName: "Dmultichoice Services Ltd",
  brand: "Dmultichoice Services",
  phoneDisplay: "08158484621",
  phoneIntl: "2348158484621",

  /** Official WhatsApp class group — do NOT modify. */
  whatsappGroupUrl: "https://chat.whatsapp.com/Iu3lEeviMtZJCKVoXeMCwQ",
  whatsappNumber: "2348158484621",

  /** Subjects offered */
  subjects: [
    "English Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Government",
  ],

  /**
   * Bank transfer details — the official account already configured on this
   * website (used by the eBook store checkout). Editable from the website
   * admin panel by updating this file.
   */
  bankTransfer: {
    bankName: "Moniepoint",
    accountNumber: "7085390372",
    accountName: "Lucky Joy Oke",
    editingNote:
      "Editable from the website admin panel — app/src/data/jambCampaign.ts",
  },
} as const;

export const JAMB_SUBJECT_OPTIONS = [
  ...JAMB_CAMPAIGN.subjects,
  "Other Selected Subjects",
] as const;

/** Social / OG image used for link previews. */
export const JAMB_OG_IMAGE = "https://tutoring.dmultichoice.com/images/jamb-og.svg";
