import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, X, CreditCard, ExternalLink } from "lucide-react";
import FlutterwavePayment from "../components/ui/FlutterwavePayment";

// ── Plan data ─────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter Plan",
    price: "₦50,000",
    rawPrice: 50000,
    period: "/month",
    sessions: "2 sessions/week",
    classType: "Group classes (max 8)",
    bestFor: "Secondary school subjects",
    features: [
      "2 live group sessions per week",
      "Access to recorded lessons",
      "Study materials & PDFs",
      "Mock quizzes",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "JAMB Intensive",
    price: "₦75,000",
    rawPrice: 75000,
    period: "/month",
    sessions: "5 sessions/week",
    classType: "Group + Mock CBT",
    bestFor: "UTME candidates",
    features: [
      "5 live sessions per week",
      "Full JAMB CBT simulator access",
      "10,000+ practice questions",
      "Mock exams under real conditions",
      "Personalized study plan",
      "Priority tutor support",
    ],
    cta: "Enroll Now",
    popular: true,
  },
  {
    name: "Private 1-on-1",
    price: "₦120,000",
    rawPrice: 120000,
    period: "/month",
    sessions: "3 sessions/week",
    classType: "One-on-One live",
    bestFor: "Personalized coaching",
    features: [
      "3 private 1-on-1 sessions/week",
      "Customized lesson plans",
      "Dedicated tutor assignment",
      "Flexible scheduling",
      "Parent progress reports",
      "24/7 WhatsApp support",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const PAYMENT_LINK = "https://flutterwave.com/pay/q4qsp5uayudc";

// ── Types ─────────────────────────────────────────────────────────────────────
type Plan = (typeof plans)[number];
type PaymentMethod = "modal" | "link";

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: "easeOut" as const } },
};

// ── Customer details modal ────────────────────────────────────────────────────
function CustomerModal({
  plan,
  onClose,
  onConfirm,
}: {
  plan: Plan;
  onClose: () => void;
  onConfirm: (details: CustomerDetails) => void;
}) {
  const [form, setForm] = useState<CustomerDetails>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  function validate(): boolean {
    const e: Partial<CustomerDetails> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onConfirm(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="font-heading text-xl font-bold text-[#1A1A2E]">
            Complete Your Enrolment
          </h3>
          <p className="font-body text-sm text-[#1A1A2E]/60 mt-1">
            <span className="font-semibold text-[#1A3C6E]">{plan.name}</span>
            {" — "}
            {plan.price}
            {plan.period}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full name */}
          <div>
            <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Chidi Okonkwo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border font-body text-sm text-[#1A1A2E] placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1A3C6E]/30 ${
                errors.name
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50 focus:border-[#1A3C6E]"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. chidi@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border font-body text-sm text-[#1A1A2E] placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1A3C6E]/30 ${
                errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50 focus:border-[#1A3C6E]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +2348012345678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border font-body text-sm text-[#1A1A2E] placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1A3C6E]/30 ${
                errors.phone
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50 focus:border-[#1A3C6E]"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-lg font-heading font-semibold text-base text-white transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              plan.popular
                ? "bg-[#C9921A] hover:bg-[#b07d16]"
                : "bg-[#1A3C6E] hover:bg-[#142d52]"
            }`}
          >
            Proceed to Payment →
          </button>
        </form>

        <p className="mt-4 text-center font-body text-xs text-[#1A1A2E]/40">
          Your details are used only for payment &amp; enrolment purposes.
        </p>
      </motion.div>
    </div>
  );
}

// ── Payment method selection modal ────────────────────────────────────────────
function PaymentMethodModal({
  plan,
  customer,
  onClose,
  onSelectMethod,
}: {
  plan: Plan;
  customer: CustomerDetails;
  onClose: () => void;
  onSelectMethod: (method: PaymentMethod) => void;
}) {
  const accentColor = plan.popular ? "#C9921A" : "#1A3C6E";
 

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-2">
          <h3 className="font-heading text-xl font-bold text-[#1A1A2E]">
            Choose Payment Method
          </h3>
          <p className="font-body text-sm text-[#1A1A2E]/60 mt-1">
            <span className="font-semibold text-[#1A3C6E]">{plan.name}</span>
            {" — "}
            {plan.price}
            {plan.period}
          </p>
        </div>

        <p className="font-body text-sm text-[#1A1A2E]/50 mb-6">
          Hi{" "}
          <span className="font-medium text-[#1A1A2E]/70">
            {customer.name.split(" ")[0]}
          </span>
          , how would you like to pay?
        </p>

        <div className="space-y-3">
          {/* Option 1 — inline Flutterwave checkout */}
          <button
            onClick={() => onSelectMethod("modal")}
            style={{ borderColor: accentColor }}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              style={{ backgroundColor: accentColor }}
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 text-white" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-[#1A1A2E]">
                Pay with Card / Bank Transfer
              </p>
              <p className="font-body text-xs text-[#1A1A2E]/50 mt-0.5">
                Card, bank transfer, or USSD — powered by Flutterwave
              </p>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="font-body text-xs text-[#1A1A2E]/30">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Option 2 — hosted payment link */}
          <button
            onClick={() => onSelectMethod("link")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-left transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 hover:bg-gray-100"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-[#1A1A2E]">
                Use Payment Link
              </p>
              <p className="font-body text-xs text-[#1A1A2E]/50 mt-0.5">
                Opens our secure Flutterwave payment page in a new tab
              </p>
            </div>
          </button>
        </div>

        <p className="mt-6 text-center font-body text-xs text-[#1A1A2E]/40">
          All payments are secured and encrypted by Flutterwave.
        </p>
      </motion.div>
    </div>
  );
}

// ── Invisible payment launcher (inline modal) ─────────────────────────────────
function PaymentLauncher({
  plan,
  customer,
  onDone,
}: {
  plan: Plan;
  customer: CustomerDetails;
  onDone: () => void;
}) {
  return (
    <div className="hidden" aria-hidden="true">
      <FlutterwavePayment
        amount={plan.rawPrice}
        planName={plan.name}
        customerEmail={customer.email}
        customerName={customer.name}
        customerPhone={customer.phone}
        buttonText={plan.cta}
        autoTrigger
        onModalClose={onDone}
      />
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function PricingSection() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  // "form"    → customer details modal
  // "method"  → payment method picker modal
  // "paying"  → Flutterwave inline modal launched
  const [step, setStep] = useState<"form" | "method" | "paying" | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);

  function handlePlanClick(plan: Plan) {
    setCustomer(null);
    setActivePlan(plan);
    setStep("form");
  }

  function handleFormConfirm(details: CustomerDetails) {
    setCustomer(details);
    setStep("method");
  }

  function handleMethodSelect(method: PaymentMethod) {
    if (method === "link") {
      window.open(PAYMENT_LINK, "_blank", "noopener,noreferrer");
      handleClose();
    } else {
      setStep("paying");
    }
  }

  function handleClose() {
    setStep(null);
    setActivePlan(null);
    setCustomer(null);
  }

  return (
    <section
      id="pricing"
      className="relative content-layer bg-white py-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
            Invest in Your Future
          </h2>
          <p className="font-body text-lg text-[#1A1A2E]/70 mt-4 max-w-2xl mx-auto">
            Choose a plan that fits your goals. All plans include access to our
            learning platform and expert tutors.
          </p>
        </motion.div>

        {/* ── Plan cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                plan.popular
                  ? "border-t-4 border-[#C9921A] md:-mt-4 md:mb-4"
                  : "border border-gray-100"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C9921A] text-white text-xs font-heading font-semibold rounded-full shadow-md">
                    <Zap className="w-3.5 h-3.5" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-heading text-xl font-semibold text-[#1A1A2E] mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="font-display text-4xl font-bold text-[#1A3C6E]">
                  {plan.price}
                </span>
                <span className="font-body text-sm text-[#1A1A2E]/60">
                  {plan.period}
                </span>
              </div>

              {/* Plan details */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                <p className="font-body text-sm text-[#1A1A2E]/80">
                  <strong>{plan.sessions}</strong>
                </p>
                <p className="font-body text-sm text-[#1A1A2E]/80">
                  {plan.classType}
                </p>
                <p className="font-body text-sm text-[#1A1A2E]/60">
                  Best for: {plan.bestFor}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-[#1A1A2E]/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3.5 rounded-lg font-heading font-semibold text-base transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  plan.popular
                    ? "bg-[#C9921A] text-white hover:bg-[#b07d16]"
                    : "bg-[#1A3C6E] text-white hover:bg-[#142d52]"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Step 1: Customer details form ── */}
      <AnimatePresence>
        {step === "form" && activePlan && (
          <CustomerModal
            plan={activePlan}
            onClose={handleClose}
            onConfirm={handleFormConfirm}
          />
        )}
      </AnimatePresence>

      {/* ── Step 2: Payment method picker ── */}
      <AnimatePresence>
        {step === "method" && activePlan && customer && (
          <PaymentMethodModal
            plan={activePlan}
            customer={customer}
            onClose={handleClose}
            onSelectMethod={handleMethodSelect}
          />
        )}
      </AnimatePresence>

      {/* ── Step 3: Inline Flutterwave modal ── */}
      {step === "paying" && activePlan && customer && (
        <PaymentLauncher
          plan={activePlan}
          customer={customer}
          onDone={handleClose}
        />
      )}
    </section>
  );
}