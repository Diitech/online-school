import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Download,
  Lock,
  Mail,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
  Banknote,
  CreditCard,
  ExternalLink,
  X,
  ImageIcon,
} from "lucide-react";
import { generateTransactionRef } from "../utils/transaction";

// ── Types ────────────────────────────────────────────────────────────────────
interface EBook {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  school?: string;
  pages: number;
  format: string;
  fileSize: string;
  rating: number;
  reviews: number;
  badge?: string;
  downloadLink?: string;
  imageUrl?: string;
  features: string[];
  tableOfContents: string[];
}

// ── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "2348158484621";
const BANK_NAME = "Moniepoint";
const ACCOUNT_NUMBER = "7085390372";
const ACCOUNT_NAME = "Lucky Joy Oke";
const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "https://tutoring.dmultichoice.com").replace(/\/+$/, "") + "/api";

// ── UTME Schools Data ─────────────────────────────────────────────────────────
const utmeSchools = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Benin (UNIBEN)",
  "University of Nigeria Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Ilorin (UNILORIN)",
  "University of Jos (UNIJOS)",
  "University of Port Harcourt (UNIPORT)",
  "University of Abuja (UNIABUJA)",
  "Lagos State University (LASU)",
  "Olabisi Onabanjo University (OOU)",
  "Ekiti State University (EKSU)",
  "Delta State University (DELSU)",
  "Ambrose Alli University (AAU)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "Federal University of Technology Akure (FUTA)",
  "Federal University of Technology Minna (FUTMINNA)",
  "Federal University of Technology Owerri (FUTO)",
  "University of Uyo (UNIUYO)",
  "University of Calabar (UNICAL)",
  "Bayero University Kano (BUK)",
  "Usmanu Danfodiyo University (UDUSOK)",
];

// ── Product Images (same mapping as EBookStorePage) ─────────────────────────
const UTME_IMAGE_POOL = [
  "https://lh3.googleusercontent.com/d/1ge5Uz3JTRPQbiVWXbQEaFCP4G8XsaGl5=s800",
  "https://lh3.googleusercontent.com/d/1faO208ZggzTwSWV29vkgWvybpYl_mycJ=s800",
  "https://lh3.googleusercontent.com/d/1m_uIe7pIPYDBAfHvlEgEfVU-shObAn9f=s800",
  "https://lh3.googleusercontent.com/d/1cyN4sQcKQMCJiH2QnZyfjvuyVWDPnm3t=s800",
];

const PRODUCT_IMAGES: Record<string, string> = {
  "master-bundle":
    "https://lh3.googleusercontent.com/d/1_1nQxjkMLobZq_2whu68p1k3GRKsX5kx=s800",
  "mega-bundle":
    "https://lh3.googleusercontent.com/d/1EFFbs_6JMB035MvrxDfewtjvD7TFxkqM=s800",
  "waec-complete":
    "https://lh3.googleusercontent.com/d/1_SL5NAt3ODwqPgMqkICNadLdW0h3VpSl=s800",
  "neco-complete":
    "https://lh3.googleusercontent.com/d/1Rywv_dfdaMpgCIf7Bi9-AVSrGxvhDlrr=s800",
  "jamb-math":
    "https://lh3.googleusercontent.com/d/1OlIw7-UeYUAEGNsgf9ky_cFjtpeYM8-x=s800",
  "jamb-english":
    "https://lh3.googleusercontent.com/d/1S76RG3kNbpaI6TH7veVu6GYxuDO-jTPJ=s800",
  "ielts-pack":
    "https://lh3.googleusercontent.com/d/19AdBCekClsy9xvjJwVEL0h38kWC2WJph=s800",
  "sat-pack":
    "https://lh3.googleusercontent.com/d/1fA2YBVtYT_3GPuJ7lbZmjGpg9RzPPLzD=s800",
};

// Build UTME image mapping — cycles through the 4 available images
for (let i = 0; i < utmeSchools.length; i++) {
  PRODUCT_IMAGES[`utme-${i + 1}`] = UTME_IMAGE_POOL[i % UTME_IMAGE_POOL.length];
}

// ── Generate All eBooks Dynamically ──────────────────────────────────────────
function generateAllEBooks(): EBook[] {
  const books: EBook[] = [];

  // UTME Books
  utmeSchools.forEach((school, index) => {
    const shortName = school.split("(")[1]?.replace(")", "") || school;
    const id = `utme-${index + 1}`;
    books.push({
      id,
      title: `${shortName} UTME Past Questions & Answers`,
      description: `Complete UTME past questions and detailed answers for ${school}. Covers all subjects with step-by-step solutions, marking schemes, and expert tips to score 280+.`,
      price: 3000,
      originalPrice: 4000,
      category: "UTME",
      school,
      pages: 350 + ((index * 37) % 200),
      format: "PDF",
      fileSize: `${12 + ((index * 3) % 15)}MB`,
      rating: 4.5 + (index % 5) * 0.1,
      reviews: 50 + ((index * 13) % 300),
      downloadLink: `https://drive.google.com/file/d/YOUR_FILE_ID_${index + 1}/view?usp=sharing`,
      imageUrl: PRODUCT_IMAGES[id],
      features: [
        "10 years of past questions (2014-2024)",
        "Detailed step-by-step solutions",
        "Subject-by-subject breakdown",
        "Time management strategies",
        "Common mistake analysis",
        "Bonus: Post-UTME prep guide",
      ],
      tableOfContents: [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Government",
        "Literature",
        "Solutions & Explanations",
        "Post-UTME Preparation",
      ],
    });
  });

  // Other Exams
  books.push(
    {
      id: "waec-complete",
      title: "WAEC Complete Past Questions (All Subjects)",
      description:
        "10 years of WAEC past questions with detailed solutions for all subjects.",
      price: 3000,
      originalPrice: 5000,
      category: "WAEC",
      pages: 800,
      format: "PDF",
      fileSize: "45MB",
      rating: 4.8,
      reviews: 456,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_WAEC_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["waec-complete"],
      features: [
        "10 years past questions",
        "All subjects covered",
        "Marking schemes included",
        "Practical guides",
        "Expert solutions",
        "Bonus tips",
      ],
      tableOfContents: [
        "Mathematics",
        "English",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Government",
        "Literature",
        "Solutions",
        "Practical Guide",
      ],
    },
    {
      id: "neco-complete",
      title: "NECO Complete Past Questions (All Subjects)",
      description:
        "Comprehensive NECO past questions with expert solutions and marking schemes.",
      price: 2500,
      originalPrice: 4000,
      category: "NECO",
      pages: 700,
      format: "PDF",
      fileSize: "38MB",
      rating: 4.7,
      reviews: 312,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_NECO_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["neco-complete"],
      features: [
        "10 years past questions",
        "All subjects covered",
        "Marking schemes",
        "Expert solutions",
      ],
      tableOfContents: [
        "Mathematics",
        "English",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Government",
        "Literature",
        "Solutions",
      ],
    },
    {
      id: "jamb-math",
      title: "JAMB Mathematics Master Pack",
      description:
        "Advanced JAMB mathematics with 500+ solved problems, formulas, and shortcuts.",
      price: 2000,
      originalPrice: 3500,
      category: "JAMB",
      pages: 400,
      format: "PDF",
      fileSize: "22MB",
      rating: 4.9,
      reviews: 289,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_JAMB_MATH_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["jamb-math"],
      features: [
        "500+ solved problems",
        "All formulas included",
        "Shortcut methods",
        "Practice tests",
        "Expert tips",
      ],
      tableOfContents: [
        "Algebra",
        "Calculus",
        "Geometry",
        "Trigonometry",
        "Statistics",
        "Probability",
        "Practice Tests",
        "Solutions",
      ],
    },
    {
      id: "jamb-english",
      title: "JAMB English Language Ultimate Guide",
      description:
        "Comprehension, lexis, structure, and oral English mastery for JAMB candidates.",
      price: 1800,
      originalPrice: 3000,
      category: "JAMB",
      pages: 320,
      format: "PDF",
      fileSize: "18MB",
      rating: 4.8,
      reviews: 234,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_JAMB_ENG_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["jamb-english"],
      features: [
        "Comprehension mastery",
        "Lexis & structure",
        "Oral English",
        "Essay writing",
        "Practice tests",
      ],
      tableOfContents: [
        "Comprehension",
        "Lexis",
        "Structure",
        "Oral English",
        "Essay Writing",
        "Practice Tests",
        "Solutions",
      ],
    },
    {
      id: "ielts-pack",
      title: "IELTS Complete Preparation Bundle",
      description:
        "Reading, writing, speaking, listening modules with 10 full practice tests.",
      price: 5000,
      originalPrice: 8000,
      category: "IELTS",
      pages: 600,
      format: "PDF",
      fileSize: "55MB",
      rating: 4.9,
      reviews: 567,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_IELTS_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["ielts-pack"],
      features: [
        "All 4 modules covered",
        "10 practice tests",
        "Band score strategies",
        "Speaking tips",
        "Writing templates",
      ],
      tableOfContents: [
        "Reading Module",
        "Writing Module",
        "Speaking Module",
        "Listening Module",
        "Practice Test 1-10",
        "Band Score Guide",
        "Tips & Strategies",
      ],
    },
    {
      id: "sat-pack",
      title: "SAT Math & Verbal Complete Guide",
      description:
        "Dual preparation for SAT Math and Evidence-Based Reading & Writing.",
      price: 4500,
      originalPrice: 7000,
      category: "SAT",
      pages: 550,
      format: "PDF",
      fileSize: "48MB",
      rating: 4.7,
      reviews: 198,
      downloadLink:
        "https://drive.google.com/file/d/YOUR_SAT_ID/view?usp=sharing",
      imageUrl: PRODUCT_IMAGES["sat-pack"],
      features: [
        "Math complete guide",
        "Verbal complete guide",
        "Practice tests",
        "Score strategies",
        "Calculator tips",
      ],
      tableOfContents: [
        "Heart of Algebra",
        "Problem Solving",
        "Passport to Advanced Math",
        "Reading",
        "Writing & Language",
        "Essay",
        "Practice Tests",
        "Solutions",
      ],
    },
    {
      id: "master-bundle",
      title: "MASTER BUNDLE: All 23 Universities UTME Pack",
      description:
        "Get ALL 23 university UTME past questions in one mega bundle. Save big with complete coverage for every major Nigerian university.",
      price: 15000,
      originalPrice: 34500,
      category: "BUNDLE",
      badge: "BEST VALUE",
      pages: 8000,
      format: "PDF",
      fileSize: "280MB",
      rating: 5.0,
      reviews: 89,
      downloadLink:
        "https://drive.google.com/drive/folders/YOUR_MASTER_FOLDER?usp=sharing",
      imageUrl: PRODUCT_IMAGES["master-bundle"],
      features: [
        "All 23 universities",
        "10+ years per school",
        "8,000+ pages",
        "Detailed solutions",
        "Post-UTME bonus",
        "Lifetime updates",
      ],
      tableOfContents: [
        "UNILAG",
        "UI",
        "OAU",
        "UNIBEN",
        "UNN",
        "ABU",
        "UNILORIN",
        "UNIJOS",
        "UNIPORT",
        "UNIABUJA",
        "LASU",
        "OOU",
        "EKSU",
        "DELSU",
        "AAU",
        "UNIZIK",
        "FUTA",
        "FUTMINNA",
        "FUTO",
        "UNIUYO",
        "UNICAL",
        "BUK",
        "UDUSOK",
        "Post-UTME Guide",
      ],
    },
    {
      id: "mega-bundle",
      title: "MEGA BUNDLE: All Exams + All Schools",
      description:
        "The ultimate package: UTME (all 23 schools) + WAEC + NECO + JAMB + IELTS + SAT. Everything you need in one download.",
      price: 25000,
      originalPrice: 52000,
      category: "BUNDLE",
      badge: "MEGA DEAL",
      pages: 12000,
      format: "PDF",
      fileSize: "450MB",
      rating: 5.0,
      reviews: 45,
      downloadLink:
        "https://drive.google.com/drive/folders/YOUR_MEGA_FOLDER?usp=sharing",
      imageUrl: PRODUCT_IMAGES["mega-bundle"],
      features: [
        "All 23 UTME schools",
        "WAEC complete",
        "NECO complete",
        "JAMB complete",
        "IELTS complete",
        "SAT complete",
      ],
      tableOfContents: [
        "UTME All Schools",
        "WAEC",
        "NECO",
        "JAMB Math",
        "JAMB English",
        "IELTS",
        "SAT",
        "Bonus Materials",
      ],
    },
  );

  return books;
}

const allEBooks = generateAllEBooks();

// ── Payment Modal ────────────────────────────────────────────────────────────
function PaymentModal({
  ebook,
  onClose,
}: {
  ebook: EBook;
  onClose: () => void;
}) {
  const [step, setStep] = useState<
    "form" | "payment" | "flutterwave" | "bank_transfer" | "success" | "failed"
  >("form");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [transactionRef] = useState(() => generateTransactionRef());
  const [copied, setCopied] = useState(false);
  const [wasBankTransfer, setWasBankTransfer] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleProceedToFlutterwave = () => {
    setStep("flutterwave");
  };

  const handleProceedToBankTransfer = () => {
    setStep("bank_transfer");
  };

  const handlePaymentSuccess = () => {
    setStep("success");
  };

  const handleBankTransferSent = () => {
    setWasBankTransfer(true);
    setStep("success");
  };

  const handlePaymentFailed = () => {
    setStep("failed");
  };

  const copyTransactionRef = () => {
    navigator.clipboard.writeText(transactionRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappBankTransferMessage = `Hi%20DChoice%20Tutoring!%0A%0AI%20made%20a%20bank%20transfer%20for%20my%20eBook.%0A%0A*Transaction%20Ref:*%20${transactionRef}%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Email:*%20${encodeURIComponent(formData.email)}%0A*Phone:*%20${encodeURIComponent(formData.phone)}%0A%0A*eBook:*%20${encodeURIComponent(ebook.title)}%0A*Amount%20Sent:*%20₦${ebook.price.toLocaleString()}%0A*Bank:*%20${encodeURIComponent(BANK_NAME)}%0A*Account:*%20${encodeURIComponent(ACCOUNT_NUMBER)}%0A%0A📸%20Here%20is%20my%20transfer%20proof%20(screenshot).%20Please%20verify%20and%20send%20my%20eBook.`;

  const whatsappSuccessMessage = `Hi%20DChoice%20Tutoring!%0A%0AI%20just%20completed%20payment%20for%20my%20eBook.%0A%0A*Transaction%20Ref:*%20${transactionRef}%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Email:*%20${encodeURIComponent(formData.email)}%0A*Phone:*%20${encodeURIComponent(formData.phone)}%0A%0A*eBook:*%20${encodeURIComponent(ebook.title)}%0A*Price:*%20₦${ebook.price.toLocaleString()}%0A%0AHere%20is%20my%20proof%20of%20payment.%20Please%20send%20my%20eBook.`;

  const whatsappSupportMessage = `Hi%20DChoice%20Tutoring!%0A%0AI%20need%20help%20with%20my%20eBook%20purchase.%0A%0A*Transaction%20Ref:*%20${transactionRef}%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Email:*%20${encodeURIComponent(formData.email)}%0A*Phone:*%20${encodeURIComponent(formData.phone)}%0A%0A*Issue:*%20My%20payment%20failed%20or%20I%20need%20assistance.%20Please%20help%20me.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#1A3C6E] p-6 text-white">
          <h3 className="font-heading font-bold text-xl">Checkout</h3>
          <p className="text-white/70 text-sm mt-1">{ebook.title}</p>
        </div>

        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <h4 className="font-heading font-semibold text-[#1A1A2E]">
                Your Information
              </h4>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all"
              >
                Continue to Payment — ₦{ebook.price.toLocaleString()}
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-[#1A1A2E]">
                Order Summary
              </h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{ebook.title}</span>
                  <span className="font-bold">
                    ₦{ebook.price.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#C9921A]">
                    ₦{ebook.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <h4 className="font-heading font-semibold text-[#1A1A2E] pt-2">Choose Payment Method</h4>
              <div className="space-y-3">
                <button
                  onClick={handleProceedToFlutterwave}
                  className="w-full bg-white border-2 border-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#C9921A]/5 transition-all flex items-center justify-center gap-3"
                >
                  <CreditCard className="w-5 h-5 text-[#C9921A]" />
                  <span>Pay with Flutterwave (Card/USSD/Bank)</span>
                </button>
                <button
                  onClick={handleProceedToBankTransfer}
                  className="w-full bg-[#1A3C6E] text-white font-heading font-bold py-3 rounded-lg hover:bg-[#142d54] transition-all flex items-center justify-center gap-3"
                >
                  <Banknote className="w-5 h-5" />
                  <span>Bank Transfer — Moniepoint</span>
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Flutterwave is currently down. We recommend <strong>Bank Transfer</strong> for instant processing.</span>
                </p>
              </div>
            </div>
          )}

          {step === "flutterwave" && (
            <FlutterwavePayButton
              ebook={ebook}
              formData={formData}
              transactionRef={transactionRef}
              copied={copied}
              copyTransactionRef={copyTransactionRef}
              onSuccess={handlePaymentSuccess}
              onFailed={handlePaymentFailed}
            />
          )}

          {step === "bank_transfer" && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"><Banknote className="w-8 h-8 text-green-600" /></div>
              <h4 className="font-heading font-bold text-xl">Bank Transfer</h4>
              <p className="text-gray-600 text-sm">Send <strong>₦{ebook.price.toLocaleString()}</strong> to:</p>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Bank</span><span className="font-bold text-[#1A1A2E]">{BANK_NAME}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Account Number</span><span className="font-bold text-lg text-[#1A3C6E] font-mono">{ACCOUNT_NUMBER}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Account Name</span><span className="font-bold text-[#1A1A2E]">{ACCOUNT_NAME}</span></div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-display text-2xl font-bold text-[#C9921A]">₦{ebook.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Transaction Ref: <code className="bg-white px-2 py-1 rounded text-sm font-mono border">{transactionRef}</code></p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">After sending, click below and send screenshot proof on WhatsApp.</p>
              </div>
              <button onClick={handleBankTransferSent} className="w-full bg-[#25D366] text-white font-heading font-bold py-3 rounded-lg hover:bg-[#1ea855] transition-all flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> I Have Sent the Money
              </button>
              <button onClick={() => setStep("payment")} className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-all">← Back to Payment Methods</button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-heading font-bold text-xl">
                Payment Successful!
              </h4>
              <div className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl p-5">
                <p className="text-sm text-gray-700 mb-3">
                  Send proof on WhatsApp for instant delivery:
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${wasBankTransfer ? whatsappBankTransferMessage : whatsappSuccessMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> Send Proof
                </a>
              </div>
              {ebook.downloadLink && (
                <a
                  href={ebook.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg p-3 hover:bg-gray-200 transition-all"
                >
                  <Download className="w-5 h-5 text-[#C9921A]" />
                  <span className="text-sm font-medium flex-1 text-left">
                    Download {ebook.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              )}
            </div>
          )}

          {step === "failed" && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-heading font-bold text-xl">Payment Issue</h4>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappSupportMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-all w-full justify-center"
              >
                <MessageCircle className="w-5 h-5" /> Get Help on WhatsApp
              </a>
              <button
                onClick={() => setStep("flutterwave")}
                className="w-full bg-[#1A3C6E] text-white font-semibold py-3 rounded-lg hover:bg-[#142d54]"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── FlutterwavePayButton ─────────────────────────────────────────────────────
// Inline component that calls the backend to initialize payment
const MIN_AMOUNT = 1000;
const SUGGESTED_AMOUNTS = [1000, 2000, 5000, 10000];

function FlutterwavePayButton({
  ebook,
  formData,
  transactionRef,
  copied,
  copyTransactionRef,
  onSuccess,
  onFailed,
}: {
  ebook: EBook;
  formData: { name: string; email: string; phone: string };
  transactionRef: string;
  copied: boolean;
  copyTransactionRef: () => void;
  onSuccess: () => void;
  onFailed: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const validateAmount = (val: string): string | null => {
    if (!val || val.trim() === "") return null; // Optional — will use product price
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return "Enter a valid amount (minimum ₦1,000)";
    if (num < MIN_AMOUNT) return `Minimum amount is ₦${MIN_AMOUNT.toLocaleString()}`;
    return null;
  };

  const initializePayment = async () => {
    // Determine effective amount
    const effectiveAmount = customAmount.trim() ? parseFloat(customAmount) : ebook.price;

    // Validate before sending
    if (customAmount.trim()) {
      const validationError = validateAmount(customAmount);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`💳 eBook payment: ${ebook.title} — ₦${effectiveAmount}`);

      const body: Record<string, unknown> = {
        product_id: ebook.id,
        amount: effectiveAmount,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
      };

      const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!result.success || !result.data?.payment_link) {
        throw new Error(result.message || "Payment initialization failed");
      }

      setPaymentLink(result.data.payment_link);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Payment initialization failed";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-5">
      <div className="w-16 h-16 bg-[#C9921A]/10 rounded-full flex items-center justify-center mx-auto">
        <ExternalLink className="w-8 h-8 text-[#C9921A]" />
      </div>
      <div>
        <h4 className="font-heading font-bold text-xl">Complete Payment</h4>
        <p className="text-gray-600 text-sm">
          {customAmount.trim()
            ? `Pay ₦${parseFloat(customAmount).toLocaleString()} via Flutterwave`
            : `Pay ₦${ebook.price.toLocaleString()} via Flutterwave`}
        </p>
      </div>

      {/* Amount Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <label className="block text-sm font-medium text-[#1A1A2E] mb-2 text-left">
          Enter Amount (NGN)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setCustomAmount(amt.toString());
                setError(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                customAmount === amt.toString()
                  ? "bg-[#C9921A] text-white border-[#C9921A]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#C9921A]"
              }`}
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400 font-semibold text-sm">₦</span>
          <input
            type="number"
            min={MIN_AMOUNT}
            placeholder="Or enter custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setError(null);
            }}
            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20"
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-left">
          Leave empty to use product price (₦{ebook.price.toLocaleString()})
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Transaction Ref:</span>
          <div className="flex items-center gap-2">
            <code className="bg-white px-2 py-1 rounded text-sm font-mono border">
              {transactionRef}
            </code>
            <button
              onClick={copyTransactionRef}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {paymentLink ? (
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all text-center"
        >
          {customAmount.trim()
            ? `Pay ₦${parseFloat(customAmount).toLocaleString()}`
            : `Pay ₦${ebook.price.toLocaleString()}`}
        </a>
      ) : (
        <button
          onClick={initializePayment}
          disabled={loading}
          className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onSuccess}
          className="bg-green-100 text-green-700 font-semibold py-2.5 rounded-lg hover:bg-green-200 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" /> I Paid
        </button>
        <button
          onClick={onFailed}
          className="bg-red-100 text-red-700 font-semibold py-2.5 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center gap-2"
        >
          <AlertCircle className="w-4 h-4" /> Issue
        </button>
      </div>
    </div>
  );
}

// ── Main Product Detail Page ────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  const ebook = allEBooks.find((b) => b.id === productId);

  if (!ebook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">
            eBook Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/ebooks")}
            className="bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#b07d16] transition-all"
          >
            Browse All eBooks
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - ebook.price / ebook.originalPrice) * 100);
  const productUrl = `${window.location.origin}/product/${ebook.id}`;

  const copyProductLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ebook.title,
          text: ebook.description,
          url: productUrl,
        });
      } catch {
        copyProductLink();
      }
    } else {
      copyProductLink();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1A3C6E] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-heading font-bold">Back</span>
            </button>
            <button
              onClick={() => navigate("/ebooks")}
              className="font-heading font-bold hover:bg-white/10 p-2 rounded-lg transition-all"
            >
              All eBooks
            </button>
          </div>
        </div>
      </header>

      {/* Product Hero */}
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div
                className={`w-64 h-64 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative ${
                  ebook.category === "BUNDLE" ? "bg-[#C9921A]" : "bg-white/10"
                }`}
              >
                {!imgError && ebook.imageUrl ? (
                  <img
                    src={ebook.imageUrl}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : ebook.category === "BUNDLE" ? (
                  <div className="text-center">
                    <div className="flex justify-center -space-x-4 mb-4">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-14 h-14 bg-white/20 rounded-full border-2 border-white flex items-center justify-center"
                        >
                          <BookOpen className="w-7 h-7 text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-white font-bold text-2xl">
                      {ebook.badge}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <ImageIcon className="w-24 h-24 text-[#C9921A]/50" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#C9921A] text-[#1A3C6E] text-xs font-bold px-3 py-1 rounded-full">
                  {ebook.category}
                </span>
                {ebook.badge && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {ebook.badge}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                {ebook.title}
              </h1>

              <p className="text-white/80 text-lg mb-6">{ebook.description}</p>

              <div className="flex items-center gap-2 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(ebook.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/30"}`}
                  />
                ))}
                <span className="text-white/80 ml-2">
                  {ebook.rating} ({ebook.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display text-4xl font-bold text-[#C9921A]">
                  ₦{ebook.price.toLocaleString()}
                </span>
                <span className="text-xl text-white/50 line-through">
                  ₦{ebook.originalPrice.toLocaleString()}
                </span>
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                  -{discount}%
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowPayment(true)}
                  className="flex-1 bg-[#C9921A] text-[#1A3C6E] font-heading font-bold px-8 py-4 rounded-xl hover:bg-[#b07d16] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now — ₦{ebook.price.toLocaleString()}
                </button>
                <button
                  onClick={shareProduct}
                  className="flex items-center justify-center gap-2 bg-white/10 text-white font-heading font-semibold px-6 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  {copiedLink ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Share2 className="w-5 h-5" />
                  )}
                  {copiedLink ? "Link Copied!" : "Share"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Pages", value: ebook.pages.toLocaleString() },
                { label: "Format", value: ebook.format },
                { label: "File Size", value: ebook.fileSize },
                { label: "Reviews", value: ebook.reviews.toString() },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"
                >
                  <div className="font-display text-2xl font-bold text-[#1A3C6E]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3 className="font-heading font-bold text-xl text-[#1A1A2E] mb-4">
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {ebook.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <h3 className="font-heading font-bold text-xl text-[#1A1A2E] mb-4">
                Table of Contents
              </h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {ebook.tableOfContents.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-5 py-3 ${
                      i !== ebook.tableOfContents.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <span className="w-6 h-6 bg-[#C9921A]/10 text-[#C9921A] rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <div className="text-center mb-6">
                <span className="font-display text-4xl font-bold text-[#1A3C6E]">
                  ₦{ebook.price.toLocaleString()}
                </span>
                <span className="text-gray-400 line-through ml-2">
                  ₦{ebook.originalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-4 rounded-xl hover:bg-[#b07d16] transition-all mb-4 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Download className="w-4 h-4 text-[#C9921A]" />
                  <span>Instant download after verification</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Lock className="w-4 h-4 text-[#C9921A]" />
                  <span>Secure Flutterwave payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="w-4 h-4 text-[#C9921A]" />
                  <span>WhatsApp support available</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 text-center">
                  Share this eBook with friends:
                </p>
                <button
                  onClick={shareProduct}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-all"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedLink ? "Copied!" : "Copy Product Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal ebook={ebook} onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
}
