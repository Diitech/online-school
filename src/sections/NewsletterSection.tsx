import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Loader2, Send } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKxqC6jR8dFXB1LBXwTVNopKN7Rf7j_xyd5Yn1j--EFvzhpKsxh5DyXhDnaS_n2UvJBg/exec";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "newsletter",
          event: "subscription",
          email: email.trim().toLowerCase(),
          name: name.trim() || "(not provided)",
        }),
      });
      setStatus("success");
      setEmail("");
      setName("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMsg("Could not subscribe. Please try again.");
    }
  }

  return (
    <section className="relative content-layer bg-[#1A3C6E] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9921A] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-5">
            <Mail className="w-4 h-4" />
            Stay Updated
          </div>

          <h2 className="font-display text-[28px] sm:text-[36px] font-bold text-white leading-[1.15] mb-4">
            Get the Latest Study Tips & Offers
          </h2>

          <p className="font-body text-base sm:text-lg text-white/70 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter and receive exam tips, new course
            announcements, and exclusive discounts straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/30 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/30 transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="inline-flex items-center justify-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-6 py-3 rounded-xl hover:bg-[#b07d16] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>

          {/* Success message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              You're subscribed! Check your inbox for updates.
            </motion.div>
          )}

          {/* Error message */}
          {status === "error" && (
            <p className="mt-4 text-red-400 text-sm">{errorMsg}</p>
          )}

          <p className="mt-6 text-white/40 text-xs">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
