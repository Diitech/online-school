import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import logo from "../assets/images/logo.jpeg";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Courses", href: "#subjects" },
  { label: "Tutors", href: "#tutors" },
  { label: "Results", href: "#success" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#footer" },
];

interface NavigationProps {
  onNavigate: (page: "home" | "privacy" | "terms") => void;
  currentPage?: "home" | "privacy" | "terms";
}

export default function Navigation({
  onNavigate,
  currentPage = "home",
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = currentPage === "home";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGoHome = () => {
    setMobileOpen(false);
    onNavigate("home");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Back arrow for non-home pages */}
          {!isHome && (
            <button
              onClick={handleGoHome}
              className={`mr-3 p-2 rounded-lg transition-colors duration-200 ${
                scrolled || !isHome
                  ? "text-[#1A3C6E] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleGoHome();
            }}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm">
              <img
                src={logo}
                alt="Dmultichoice"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-display text-xl font-bold transition-colors duration-300 ${
                scrolled || !isHome ? "text-[#1A3C6E]" : "text-white"
              }`}
            >
              DmultichoiceTutoring
            </span>
          </a>

          {/* Desktop nav - only show on home page */}
          {isHome && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-heading text-sm font-medium transition-colors duration-200 hover:text-[#C9921A] ${
                    scrolled ? "text-[#1A1A2E]" : "text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA - only show on home page */}
          {isHome && (
            <div className="hidden md:block">
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, "#pricing")}
                className="inline-block bg-[#C9921A] text-white font-heading text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b07d16] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enroll Now
              </a>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled || !isHome
                ? "text-[#1A3C6E] hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {isHome ? (
                <>
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block font-heading text-[#1A1A2E] font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200"
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <motion.button
                    onClick={() => {
                      setMobileOpen(false);
                      onNavigate("privacy");
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="block w-full text-left font-heading text-[#1A1A2E]/60 font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200 text-sm bg-transparent border-none cursor-pointer"
                  >
                    Privacy Policy
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setMobileOpen(false);
                      onNavigate("terms");
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                    className="block w-full text-left font-heading text-[#1A1A2E]/60 font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200 text-sm bg-transparent border-none cursor-pointer"
                  >
                    Terms of Service
                  </motion.button>

                  <motion.a
                    href="#pricing"
                    onClick={(e) => handleNavClick(e, "#pricing")}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 2) * 0.05 }}
                    className="block text-center bg-[#C9921A] text-white font-heading font-semibold px-5 py-3 rounded-lg mt-4 hover:bg-[#b07d16] transition-colors duration-200"
                  >
                    Enroll Now
                  </motion.a>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    handleGoHome();
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="flex items-center gap-2 w-full text-left font-heading text-[#1A1A2E] font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
