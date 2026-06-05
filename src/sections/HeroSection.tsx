import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { MessageCircle, X, Phone } from "lucide-react";
import { Users, GraduationCap, TrendingUp, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Students" },
  { icon: GraduationCap, value: 200, suffix: "+", label: "Expert Tutors" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Success Rate" },
  { icon: Clock, value: 10, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.floor(obj.val) + suffix;
              }
            },
          });
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix, hasAnimated]);

  return <span ref={counterRef}>0{suffix}</span>;
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-[#1A3C6E]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#1A3C6E]/70" />
    </div>
  );
}

// ── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-xl font-bold text-[#1A1A2E] mb-2">
          Book Free Consultation
        </h3>
        <p className="font-body text-sm text-[#1A1A2E]/60 mb-6">
          Choose how you'd like to connect with us
        </p>

        <div className="space-y-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/2348158484621?text=Hi%20DChoice%20Tutoring!%20I%20want%20to%20book%20a%20free%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 border-2 border-[#25D366] hover:bg-[#25D366]/20 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold text-[#1A1A2E]">WhatsApp</p>
              <p className="font-body text-xs text-[#1A1A2E]/50">Fastest response</p>
            </div>
          </a>

          {/* Facebook Messenger */}
          <a
            href="https://m.me/61580188112448"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#1877F2]/10 border-2 border-[#1877F2] hover:bg-[#1877F2]/20 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold text-[#1A1A2E]">Facebook Messenger</p>
              <p className="font-body text-xs text-[#1A1A2E]/50">Chat on Facebook</p>
            </div>
          </a>

          {/* Phone Call */}
          <a
            href="tel:+2348158484621"
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold text-[#1A1A2E]">Call Us</p>
              <p className="font-body text-xs text-[#1A1A2E]/50">+234 815 848 4621</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center content-layer overflow-hidden"
    >
      <VideoBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.1] shimmer-text mb-6"
        >
          Nigeria's #1 Online
          <br />
          Tutoring Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="font-heading text-lg sm:text-2xl text-white/90 mb-10"
        >
          Live lessons, assignment solving, homework help, task assistance, and
          exam preparation for JAMB, WAEC, NECO, IELTS, SAT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#pricing")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-[#C9921A] text-[#1A3C6E] font-heading font-semibold text-base px-8 py-4 rounded-lg hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Enroll Now
          </a>
          <button
            onClick={() => setShowBooking(true)}
            className="inline-block bg-transparent text-white font-heading font-semibold text-base px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            Book Free Consultation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-[#C9921A] mx-auto mb-2" />
              <div className="font-display text-3xl sm:text-[48px] font-bold text-[#C9921A] leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-sm text-white/70 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </section>
  );
}