import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import logo from "../assets/images/logo.jpeg";

const courseLinks = [
  { label: "JAMB Lessons — ₦5,000 (Holiday)", href: "/jamb-holiday-lessons" },
  { label: "JAMB Preparation", href: "/#subjects" },
  { label: "WAEC / NECO", href: "/#subjects" },
  { label: "IELTS Coaching", href: "/#subjects" },
  { label: "SAT Prep", href: "/#subjects" },
  { label: "Mathematics", href: "/#subjects" },
  { label: "English", href: "/#subjects" },
  { label: "Coding for Kids", href: "/#subjects" },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      // Navigate to home with hash
      navigate("/");
      setTimeout(() => {
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      id="footer"
      className="relative content-layer bg-[#F5F7FA] pt-16 pb-8"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Column 1: Brand */}
          <div>
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm mb-2">
              <img
                src={logo}
                alt="Dmultichoice"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-heading font-semibold text-[#1A1A2E]">Dmultichoice Tutoring</span>
            <p className="font-body text-sm text-[#1A1A2E]/70 mt-2 mb-4">
              Empowering Students for Academic Excellence. Nigeria's most
              trusted online tutoring platform.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61580188112448"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A3C6E] flex items-center justify-center hover:bg-[#C9921A] transition-colors"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://x.com/DamzelDelia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A3C6E] flex items-center justify-center hover:bg-[#C9921A] transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/dchoice_agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A3C6E] flex items-center justify-center hover:bg-[#C9921A] transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

        {/* Column 2: Quick Links */}
        <div>
            <h4 className="font-heading text-sm font-semibold text-[#1A1A2E] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#C9921A] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/news")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  News & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/ebooks")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  eBook Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Course Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#1A1A2E] uppercase tracking-wider mb-4">
              Courses
            </h4>
            <ul className="space-y-2.5">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-sm text-[#1A1A2E]/70 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#1A1A2E] uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#1A3C6E] mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-[#1A1A2E]/70">
                  support@dmultichoice.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1A3C6E] mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-[#1A1A2E]/70">
                  +234 8158 484 621
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1A3C6E] mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-[#1A1A2E]/70">
                  Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#1A1A2E]/50">
            &copy; 2023 Dmultichoice Tutoring. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => navigate("/privacy")}
              className="font-body text-xs text-[#1A1A2E]/50 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="font-body text-xs text-[#1A1A2E]/50 hover:text-[#1A3C6E] transition-colors bg-transparent border-none cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
