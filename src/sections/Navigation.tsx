import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import logo from "../assets/images/logo.jpeg";
import MegaMenu from "../components/professional/MegaMenu";
import MobileAcademyAccordion from "../components/professional/MobileAcademyAccordion";
import JambNavCTA from "./JambNavCTA";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#subjects" },
  { label: "Tutors", href: "/#tutors" },
  { label: "Results", href: "/#success" },
  { label: "Pricing", href: "/#pricing" },
  { label: "News", href: "/news" },
  { label: "eBooks", href: "/ebooks" },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      // Navigate to home with hash scrolling
      if (location.pathname === "/") {
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const id = href.replace("/#", "");
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  const handleGoHome = () => {
    setMobileOpen(false);
    navigate("/");
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
              onClick={() => navigate(-1)}
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

          {/* Logo - clickable to home */}
          <button
            onClick={handleGoHome}
            className="flex items-center gap-3 shrink-0 bg-transparent border-none cursor-pointer"
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
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-heading text-sm font-medium transition-colors duration-200 hover:text-[#C9921A] bg-transparent border-none cursor-pointer ${
                  scrolled ? "text-[#1A1A2E]" : "text-white/90"
                } ${location.pathname === link.href ? "text-[#C9921A]" : ""}`}
              >
                {link.label}
              </button>
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => handleNavClick("/professional-schools")}
                className={`font-heading text-sm font-medium transition-colors duration-200 hover:text-[#C9921A] bg-transparent border-none cursor-pointer ${
                  scrolled ? "text-[#1A1A2E]" : "text-white/90"
                } ${
                  location.pathname.startsWith("/professional-schools")
                    ? "text-[#C9921A]"
                    : ""
                }`}
                aria-label="Professional Schools"
              >
                Professional Schools
              </button>

              {/* Show mega menu when on a pro-school route (keeps behavior simple + stable) */}
              {location.pathname.startsWith("/professional-schools") ? (
                <div className="pt-4">
                  <MegaMenu onNavigate={() => setMobileOpen(false)} />
                </div>
              ) : null}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/privacy")}
              className={`font-heading text-xs font-medium transition-colors duration-200 hover:text-[#C9921A] bg-transparent border-none cursor-pointer ${
                scrolled ? "text-[#1A1A2E]/60" : "text-white/60"
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className={`font-heading text-xs font-medium transition-colors duration-200 hover:text-[#C9921A] bg-transparent border-none cursor-pointer ${
                scrolled ? "text-[#1A1A2E]/60" : "text-white/60"
              }`}
            >
              Terms
            </button>
            <JambNavCTA />
            <button
              onClick={() => handleNavClick("/#pricing")}
              className="inline-block bg-[#C9921A] text-white font-heading text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b07d16] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Enroll Now
            </button>
          </div>

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
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block w-full text-left font-heading text-[#1A1A2E] font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Mobile expandable accordion for Professional Schools */}
              <div className="mt-2">
                <MobileAcademyAccordion
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                >
                  <JambNavCTA
                    onNavigate={() => setMobileOpen(false)}
                    className="w-full justify-center py-3"
                  />
                </motion.div>
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/privacy");
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  className="block w-full text-left font-heading text-[#1A1A2E]/60 font-medium py-3 px-3 rounded-lg hover:text-[#C9921A] hover:bg-[#C9921A]/5 transition-colors duration-200 text-sm bg-transparent border-none cursor-pointer"
                >
                  Privacy Policy
                </motion.button>
              </div>

              <motion.button
                onClick={() => handleNavClick("/#pricing")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 2) * 0.05 }}
                className="block w-full text-center bg-[#C9921A] text-white font-heading font-semibold px-5 py-3 rounded-lg mt-4 hover:bg-[#b07d16] transition-colors duration-200 bg-[#C9921A] border-none cursor-pointer"
              >
                Enroll Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
