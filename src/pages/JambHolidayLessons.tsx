import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Phone,
  Check,
  BookOpen,
  GraduationCap,
  Home,
  Camera,
  Target,
  ShieldCheck,
  ChevronDown,
  Users,
  Globe,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/SEO";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import ChatBot from "../sections/ChatBot";
import JambRegistrationForm from "../components/jamb/JambRegistrationForm";
import {
  JAMB_CAMPAIGN,
  JAMB_OG_IMAGE,
  JAMB_SUBJECT_OPTIONS,
} from "../data/jambCampaign";
import { trackJambPageView } from "../utils/tracking";
import logo from "../assets/images/logo.jpeg";

const BENEFITS = [
  {
    icon: Camera,
    title: "Live Teacher-Led Classes",
    text: "Real-time Zoom lessons with experienced tutors who guide you step by step.",
  },
  {
    icon: Zap,
    title: "Interactive & Engaging Lessons",
    text: "Ask questions, participate and learn actively — not just watch videos.",
  },
  {
    icon: BookOpen,
    title: "Practice Questions & Past Questions",
    text: "Solve past questions and practice questions to build confidence before the exam.",
  },
  {
    icon: Target,
    title: "Exam Tips & Strategies",
    text: "Learn proven techniques to manage time, avoid common mistakes and score high.",
  },
  {
    icon: Globe,
    title: "Learn From the Comfort of Home",
    text: "No travel, no stress. Join classes from your phone, tablet or laptop anywhere in Nigeria.",
  },
  {
    icon: GraduationCap,
    title: "Get Exam-Ready",
    text: "Focused holiday preparation so you enter JAMB confident and fully prepared.",
  },
];

const SUBJECT_THEMES = [
  { bg: "bg-[#1A3C6E]", icon: "📘" },
  { bg: "bg-[#E67E22]", icon: "📗" },
  { bg: "bg-[#2C3E50]", icon: "📐" },
  { bg: "bg-[#27AE60]", icon: "⚗️" },
  { bg: "bg-[#7CB342]", icon: "🧬" },
  { bg: "bg-[#8E44AD]", icon: "🏛️" },
  { bg: "bg-[#C9921A]", icon: "➕" },
];

function scrollToRegister() {
  document
    .getElementById("register")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function JambHolidayLessons() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    trackJambPageView();

    const handleScroll = () => {
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F2240]">
      <SEO
        title="JAMB Lessons Online — Only ₦5,000 | Holiday Online Lessons"
        description="JAMB lessons online for just ₦5,000. Live Zoom classes, practice questions, past-question review and exam strategies. Learn from home. Register now — limited spaces!"
        canonical="https://tutoring.dmultichoice.com/jamb-holiday-lessons"
        ogImage={JAMB_OG_IMAGE}
        ogType="website"
        keywords="JAMB lessons online, JAMB online lessons Nigeria, JAMB preparation classes, online JAMB classes, holiday lessons online, online lessons for students, JAMB lessons ₦5,000, live zoom classes JAMB"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Holiday & JAMB Online Lessons",
          "description":
            "Live Zoom JAMB lessons with practice questions, past-question review and exam strategies. Registration Fee: ₦5,000.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Dmultichoice Services Ltd",
            "url": "https://tutoring.dmultichoice.com",
          },
          "offers": {
            "@type": "Offer",
            "price": "5000",
            "priceCurrency": "NGN",
            "availability": "https://schema.org/InStock",
            "url": "https://tutoring.dmultichoice.com/jamb-holiday-lessons",
          },
        }}
      />

      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F2240] text-white overflow-hidden pt-[72px]">
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-2 border-white" />
          <div className="absolute top-40 right-0 w-64 h-64 rounded-full border-2 border-[#C9921A]" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full border-2 border-white/60" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {/* Logo row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-[#C9921A]/50">
              <img
                src={logo}
                alt="Dmultichoice Services"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-sm leading-tight">
                Dmultichoice Services
              </p>
              <p className="text-[11px] text-[#C9921A] font-semibold tracking-wide">
                EXCELLENCE • INNOVATION • VERSATILITY
              </p>
            </div>
          </motion.div>

          {/* Live Zoom badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#C9921A] text-[#0F2240] font-heading font-bold text-sm px-4 py-1.5 rounded-full">
              <Zap className="w-4 h-4" />
              LIVE ZOOM CLASSES
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-center"
          >
            HOLIDAY <span className="text-[#C9921A]">ONLINE</span> LESSONS
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-heading text-lg sm:text-2xl text-white/80 text-center font-semibold mt-4 uppercase tracking-widest"
          >
            JAMB LESSONS — ONLY ₦5,000
          </motion.h2>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-center mt-8"
          >
            <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-[#C9921A] drop-shadow-lg">
              ₦5,000
            </span>
            <p className="text-white/60 font-medium mt-2">
              Make your holiday productive. Learn, improve and get ahead!
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <button
              onClick={scrollToRegister}
              className="bg-[#C9921A] text-[#0F2240] font-heading font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-2xl shadow-lg"
            >
              REGISTER & PAY ₦5,000
            </button>
            <button
              onClick={scrollToRegister}
              className="bg-transparent text-white font-heading font-bold text-lg px-8 py-4 rounded-xl border-2 border-white/60 hover:bg-white/10 transition-all"
            >
              JOIN THE CLASS
            </button>
          </motion.div>

          {/* Quick trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: Home, label: "Learn From Home" },
              { icon: Camera, label: "Live Zoom Classes" },
              { icon: Target, label: "JAMB Preparation" },
              { icon: ShieldCheck, label: "Only ₦5,000" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5"
              >
                <item.icon className="w-4 h-4 text-[#C9921A]" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center pb-8">
          <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ── JAMB OFFER ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F2240] text-white rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-[#C9921A]" />
              <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full border-2 border-white/60" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8">
              <div className="p-8 sm:p-12">
                <span className="inline-flex items-center gap-2 bg-[#C9921A] text-[#0F2240] font-heading font-bold px-4 py-1.5 rounded-full text-sm mb-6">
                  <Zap className="w-4 h-4" /> LIMITED SPACES AVAILABLE!
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
                  JAMB <span className="text-[#C9921A]">LESSONS</span>
                </h2>
                <p className="text-white/90 text-lg font-medium mb-2">
                  Prepare smarter. Learn from home. Get exam-ready.
                </p>
                <p className="text-white/60 mb-8">
                  Registration Fee:{" "}
                  <span className="text-[#C9921A] font-bold">₦5,000</span>
                </p>

                <ul className="space-y-3">
                  {[
                    "Live teacher-led classes",
                    "Zoom lessons",
                    "Interactive learning",
                    "Practice questions",
                    "Past-question review",
                    "Exam preparation",
                    "Exam tips and strategies",
                    "Learn from the comfort of home",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-[#C9921A] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#0F2240]" />
                      </span>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToRegister}
                  className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9921A] text-[#0F2240] font-heading font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  REGISTER NOW — ₦5,000
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 sm:p-12 bg-[#C9921A] text-[#0F2240] relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
                  PAY ₦5,000 • REGISTER • JOIN THE CLASS
                </h3>
                <p className="text-sm sm:text-base font-medium mb-8">
                  Get focused preparation for your JAMB examination with live
                  classes, guided lessons, practice questions and exam
                  strategies.
                </p>
                <div className="text-center py-6">
                  <p className="text-sm font-bold tracking-widest mb-1">
                    REGISTRATION FEE
                  </p>
                  <p className="font-display text-6xl sm:text-7xl font-black">
                    ₦5,000
                  </p>
                </div>
                <div className="bg-[#0F2240] text-white rounded-2xl p-5">
                  <p className="text-center text-sm sm:text-base">
                    Register today and get the class details to join our{" "}
                    <span className="text-[#C9921A] font-bold">
                      LIVE ZOOM CLASS
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SUBJECTS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] text-center mb-4"
          >
            SUBJECTS AVAILABLE
          </motion.h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Choose the subjects you want to focus on. Additional options are
            available on request.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {JAMB_SUBJECT_OPTIONS.map((subject, i) => {
              const theme = SUBJECT_THEMES[i % SUBJECT_THEMES.length];
              return (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div
                    className={`w-12 h-12 ${theme.bg} rounded-full flex items-center justify-center mx-auto mb-3 text-xl`}
                  >
                    {theme.icon}
                  </div>
                  <p className="font-heading font-semibold text-sm text-[#1A1A2E]">
                    {subject}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIVE ONLINE CLASSES ──────────────────────────────────────────── */}
      <section className="bg-[#0F2240] text-white py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-extrabold text-center mb-4"
          >
            LIVE <span className="text-[#C9921A]">ONLINE</span> CLASSES
          </motion.h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto text-lg mb-10">
            Attend live classes remotely using Zoom — from anywhere in Nigeria.
            Class details are sent after registration.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Live", icon: Zap },
              { label: "Interactive", icon: Users },
              { label: "Engaging", icon: Camera },
              { label: "Effective", icon: Target },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9921A]/60 transition-colors"
              >
                <item.icon className="w-8 h-8 text-[#C9921A] mx-auto mb-3" />
                <p className="font-heading font-bold text-lg">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN / BENEFITS ──────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] text-center mb-4"
          >
            WHY JOIN OUR CLASSES?
          </motion.h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Everything you need to stay ahead in your JAMB preparation.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-[#1A3C6E] rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#C9921A]" />
                </div>
                <h3 className="font-heading font-bold text-[#1A1A2E] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA after benefits */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToRegister}
              className="bg-[#C9921A] text-[#0F2240] font-heading font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-2xl shadow-lg"
            >
              REGISTER NOW — ₦5,000
            </button>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION / PAYMENT ───────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] py-16 sm:py-20" id="register-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-5 gap-10"
          >
            {/* Left copy */}
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 bg-[#C9921A] text-[#0F2240] font-heading font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                <ShieldCheck className="w-4 h-4" /> SECURE REGISTRATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                Register in 2 Minutes
              </h2>
              <p className="text-gray-600 mb-8">
                Fill the form, choose your payment method and secure your spot.
                Limited spaces available.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A3C6E] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#1A1A2E]">
                      Online Payment (Recommended)
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay ₦5,000 securely via card, bank transfer or USSD.
                      Instant confirmation and access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A3C6E] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#1A1A2E]">
                      Bank Transfer
                    </p>
                    <p className="text-sm text-gray-500">
                      Transfer ₦5,000 to the official account, then send your
                      proof on WhatsApp. Confirmation is pending verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A3C6E] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#1A1A2E]">
                      Get Class Details
                    </p>
                    <p className="text-sm text-gray-500">
                      Join the class WhatsApp group and receive joining
                      instructions for your live Zoom lessons.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-2xl p-5 border border-gray-100">
                <p className="text-sm text-gray-600 mb-3">
                  Need help? Call/WhatsApp:
                </p>
                <a
                  href={`tel:+234${JAMB_CAMPAIGN.phoneIntl}`}
                  className="inline-flex items-center gap-2 text-[#1A3C6E] font-heading font-bold text-lg hover:text-[#C9921A] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {JAMB_CAMPAIGN.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="font-heading font-bold text-2xl text-[#1A1A2E]">
                  JAMB LESSONS REGISTRATION
                </h3>
                <p className="text-[#C9921A] font-display text-3xl font-bold mt-1">
                  ₦5,000
                </p>
              </div>
              <JambRegistrationForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F2240] py-16 text-center text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-5xl font-extrabold mb-4"
          >
            DON'T WASTE THE HOLIDAY. <br className="hidden sm:block" />
            <span className="text-[#C9921A]">LEARN TODAY. SUCCEED TOMORROW.</span>
          </motion.h2>
          <button
            onClick={scrollToRegister}
            className="mt-8 bg-[#C9921A] text-[#0F2240] font-heading font-bold text-xl px-10 py-4 rounded-xl hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-2xl shadow-lg"
          >
            REGISTER NOW — ₦5,000
          </button>
        </div>
      </section>

      <Footer />
      <ChatBot />

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#0F2240]/95 backdrop-blur-md border-t-2 border-[#C9921A] px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-white">
            <p className="font-heading font-bold text-sm">JAMB LESSONS</p>
            <p className="text-[#C9921A] font-display font-bold">₦5,000</p>
          </div>
          <button
            onClick={scrollToRegister}
            className="bg-[#C9921A] text-[#0F2240] font-heading font-bold text-sm px-5 py-3 rounded-lg hover:bg-[#b07d16] transition-colors"
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
}
