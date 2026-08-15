import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  Phone,
  MessageCircle,
  Mail,
  BookOpen,
  CreditCard,
  Banknote,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import FlutterwavePayment from "../ui/FlutterwavePayment";
import { JAMB_CAMPAIGN, JAMB_SUBJECT_OPTIONS } from "../../data/jambCampaign";
import {
  trackJambRegistrationStarted,
  trackJambRegistrationSubmitted,
  trackJambPaymentInitiated,
} from "../../utils/tracking";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "https://tutoring.dmultichoice.com").replace(
    /\/+$/,
    "",
  ) + "/api";

type PaymentMethod = "online" | "bank_transfer";
type Step = "form" | "online_pay" | "bank_transfer";

interface FormState {
  studentName: string;
  parentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  subjects: string[];
  paymentMethod: PaymentMethod;
}

const initialForm: FormState = {
  studentName: "",
  parentName: "",
  phone: "",
  whatsapp: "",
  email: "",
  subjects: [],
  paymentMethod: "online",
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border font-body text-sm text-[#1A1A2E] placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#C9921A]/30 focus:border-[#C9921A]";

export default function JambRegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regRef, setRegRef] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [trackedStarted, setTrackedStarted] = useState(false);
  const [trackedPaymentInit, setTrackedPaymentInit] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Fire "registration started" once the visitor interacts with the form ──
  const handleFirstInteraction = () => {
    if (!trackedStarted) {
      setTrackedStarted(true);
      trackJambRegistrationStarted();
    }
  };

  // ── Field helpers ─────────────────────────────────────────────────────────
  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSubject = (subject: string) => {
    setField(
      "subjects",
      form.subjects.includes(subject)
        ? form.subjects.filter((s) => s !== subject)
        : [...form.subjects, subject],
    );
  };

  const validate = (): string | null => {
    if (!form.studentName.trim()) return "Please enter the student's full name.";
    if (!form.parentName.trim()) return "Please enter the parent/guardian name.";
    if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim()))
      return "Enter a valid phone number.";
    if (!/^\+?[\d\s-]{10,15}$/.test(form.whatsapp.trim()))
      return "Enter a valid WhatsApp number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Enter a valid email address.";
    if (form.subjects.length === 0)
      return "Select at least one JAMB subject.";
    return null;
  };

  // ── Submit registration ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleFirstInteraction();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const status =
        form.paymentMethod === "bank_transfer"
          ? "pending_verification"
          : "pending_payment";

      const response = await fetch(`${API_BASE_URL}/jamb-registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: form.studentName.trim(),
          parent_name: form.parentName.trim(),
          phone: form.phone.trim(),
          whatsapp: form.whatsapp.trim(),
          email: form.email.trim(),
          subjects: form.subjects,
          payment_method: form.paymentMethod,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not save your registration.");
      }

      const ref: string = result.data?.reg_ref || "";
      setRegRef(ref);
      trackJambRegistrationSubmitted(ref);

      if (form.paymentMethod === "online") {
        setStep("online_pay");
      } else {
        setStep("bank_transfer");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Fire payment-initiated once the online pay step renders ───────────────
  useEffect(() => {
    if (step === "online_pay" && !trackedPaymentInit && regRef) {
      setTrackedPaymentInit(true);
      trackJambPaymentInitiated(regRef);
    }
  }, [step, trackedPaymentInit, regRef]);

  const copyRegRef = () => {
    navigator.clipboard.writeText(regRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappProofUrl = `https://wa.me/${JAMB_CAMPAIGN.whatsappNumber}?text=${encodeURIComponent(
    `Hi Dmultichoice Services! I just registered for the JAMB Holiday Online Lessons.\n\nRegistration Ref: ${regRef}\nStudent: ${form.studentName}\nPhone: ${form.phone}\nWhatsApp: ${form.whatsapp}\nAmount Sent: ₦5,000\nBank: ${JAMB_CAMPAIGN.bankTransfer.bankName}\nAccount: ${JAMB_CAMPAIGN.bankTransfer.accountNumber}\n\nHere is my transfer proof. Please verify and confirm my registration.`,
  )}`;

  const handleBankTransferSent = () => {
    navigate(
      `/jamb-holiday-lessons/success?mode=pending_verification&ref=${encodeURIComponent(regRef)}`,
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div ref={scrollRef} id="register" className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            onFocus={handleFirstInteraction}
            className="space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Student Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Chidi Okonkwo"
                    value={form.studentName}
                    onChange={(e) => setField("studentName", e.target.value)}
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Parent/Guardian Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Mr. Okonkwo"
                    value={form.parentName}
                    onChange={(e) => setField("parentName", e.target.value)}
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="e.g. 08123456789"
                    value={form.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value)}
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="e.g. chidi@gmail.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                JAMB Subjects / Intended Subjects <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {JAMB_SUBJECT_OPTIONS.map((subject) => {
                  const active = form.subjects.includes(subject);
                  return (
                    <button
                      type="button"
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-left transition-all ${
                        active
                          ? "border-[#C9921A] bg-[#C9921A]/10 text-[#1A3C6E] font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#C9921A]/50"
                      }`}
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm leading-tight">{subject}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setField("paymentMethod", "online")}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    form.paymentMethod === "online"
                      ? "border-[#C9921A] bg-[#C9921A]/10"
                      : "border-gray-200 bg-white hover:border-[#C9921A]/50"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#1A3C6E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-[#1A1A2E]">
                      Option 1 — Online Payment
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Pay ₦5,000 securely now via card, bank transfer or USSD.
                      Instant confirmation.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setField("paymentMethod", "bank_transfer")}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    form.paymentMethod === "bank_transfer"
                      ? "border-[#C9921A] bg-[#C9921A]/10"
                      : "border-gray-200 bg-white hover:border-[#C9921A]/50"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#1A3C6E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-[#1A1A2E]">
                      Option 2 — Bank Transfer
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Transfer ₦5,000 and submit your proof. Confirmation is
                      pending verification.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold text-base py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                `REGISTER NOW — ₦${JAMB_CAMPAIGN.price.toLocaleString()}`
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Your details are used only for registration & payment.
            </p>
          </motion.form>
        )}

        {step === "online_pay" && (
          <motion.div
            key="online"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-5"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-heading font-bold text-xl text-[#1A1A2E]">
              Almost there!
            </h4>
            <p className="text-gray-600 text-sm">
              Your registration was saved. Complete your{" "}
              <strong>₦5,000</strong> payment to confirm your spot.
            </p>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">
                Registration Ref:{" "}
                <code className="bg-white px-2 py-1 rounded text-sm font-mono border">
                  {regRef}
                </code>
              </p>
              <p className="text-xs text-gray-400">
                After payment you'll be redirected to your success page.
              </p>
            </div>

            <FlutterwavePayment
              amount={JAMB_CAMPAIGN.price}
              planName="Holiday & JAMB Online Lessons Registration"
              customerEmail={form.email}
              customerName={form.studentName}
              customerPhone={form.phone}
              productId={JAMB_CAMPAIGN.productId}
              redirectUrl="/jamb-holiday-lessons/success"
              buttonText={`Pay ₦${JAMB_CAMPAIGN.price.toLocaleString()} Now`}
              buttonClassName="w-full !px-8 !py-4 !text-base bg-[#C9921A] text-[#1A3C6E] hover:bg-[#b07d16] rounded-xl"
            />

            <p className="text-xs text-gray-400">
              Secure payment powered by Flutterwave.
            </p>
          </motion.div>
        )}

        {step === "bank_transfer" && (
          <motion.div
            key="bank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1A3C6E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Banknote className="w-8 h-8 text-[#1A3C6E]" />
              </div>
              <h4 className="font-heading font-bold text-xl text-[#1A1A2E]">
                Bank Transfer
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                Send <strong>₦5,000</strong> to:
              </p>
            </div>

            <div className="bg-[#1A3C6E] rounded-xl p-5 text-white space-y-3">
              <div className="flex justify-between items-center gap-4">
                <span className="text-white/70 text-sm">Bank</span>
                <span className="font-bold text-sm">{JAMB_CAMPAIGN.bankTransfer.bankName}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-white/70 text-sm">Account Number</span>
                <span className="font-bold font-mono text-lg text-[#C9921A]">
                  {JAMB_CAMPAIGN.bankTransfer.accountNumber}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-white/70 text-sm">Account Name</span>
                <span className="font-bold text-sm text-right">
                  {JAMB_CAMPAIGN.companyName}
                </span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between items-center gap-4">
                <span className="text-white/70 text-sm">Amount</span>
                <span className="font-display text-2xl font-bold text-[#C9921A]">
                  ₦5,000
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">Your Registration Ref</p>
                <code className="text-sm font-mono font-semibold text-[#1A3C6E]">
                  {regRef}
                </code>
              </div>
              <button
                onClick={copyRegRef}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#1A3C6E] hover:text-[#C9921A] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Keep your payment receipt/reference. After transferring, send
                your proof on WhatsApp for verification.
              </p>
            </div>

            <a
              href={whatsappProofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-heading font-bold py-4 rounded-xl hover:bg-[#1ea855] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Send Proof on WhatsApp
            </a>

            <button
              onClick={handleBankTransferSent}
              className="w-full bg-[#1A3C6E] text-white font-heading font-bold py-4 rounded-xl hover:bg-[#142d54] transition-all"
            >
              I Have Sent the Money
            </button>

            <p className="text-xs text-gray-400 text-center">
              Your registration is{" "}
              <strong>pending verification</strong> until payment is confirmed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
