import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  X,
  Star,
  Download,
  ShoppingCart,
  CheckCircle,
  MessageCircle,
  GraduationCap,
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  User,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  ImageIcon,
} from "lucide-react";
import { generateTransactionRef } from "../utils/transaction";
import { useLazyImage } from "../hooks/useLazyImage";

// ── Types ────────────────────────────────────────────────────────────────────
interface EBook {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: "UTME" | "POST-UTME" | "WAEC" | "NECO" | "JAMB" | "IELTS" | "SAT" | "BUNDLE";
  subcategory?: string;
  school?: string;
  pages: number;
  format: string;
  fileSize: string;
  rating: number;
  reviews: number;
  badge?: string;
  inBundle?: boolean;
  downloadLink?: string;
  /** Full-size image URL (used on detail page) */
  imageUrl?: string;
  /** Smaller thumbnail for card grid */
  thumbUrl?: string;
}

interface CartItem {
  ebook: EBook;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

// ── Constants ────────────────────────────────────────────────────────────────
const FLUTTERWAVE_LINK = "https://flutterwave.com/pay/q4qsp5uayudc";
const WHATSAPP_NUMBER = "2348158484621";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzyVtvCcAfkOj2I8vZTxsZKrSib_Wxnzzv0ZXvLhh0iC2SSqsNMb5-mMgKg-0CP9sdUXg/exec";

// ── Data ─────────────────────────────────────────────────────────────────────
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

const utmeData = [
  { pages: 420, fileSize: "18MB", rating: 4.7, reviews: 120 },
  { pages: 380, fileSize: "15MB", rating: 4.8, reviews: 95 },
  { pages: 510, fileSize: "22MB", rating: 4.6, reviews: 180 },
  { pages: 450, fileSize: "20MB", rating: 4.9, reviews: 210 },
  { pages: 390, fileSize: "16MB", rating: 4.5, reviews: 145 },
  { pages: 470, fileSize: "19MB", rating: 4.7, reviews: 170 },
  { pages: 410, fileSize: "17MB", rating: 4.8, reviews: 200 },
  { pages: 440, fileSize: "21MB", rating: 4.6, reviews: 130 },
  { pages: 360, fileSize: "14MB", rating: 4.9, reviews: 250 },
  { pages: 490, fileSize: "23MB", rating: 4.5, reviews: 110 },
  { pages: 400, fileSize: "16MB", rating: 4.7, reviews: 160 },
  { pages: 430, fileSize: "18MB", rating: 4.8, reviews: 190 },
  { pages: 370, fileSize: "15MB", rating: 4.6, reviews: 140 },
  { pages: 460, fileSize: "20MB", rating: 4.9, reviews: 220 },
  { pages: 380, fileSize: "17MB", rating: 4.5, reviews: 100 },
  { pages: 420, fileSize: "19MB", rating: 4.7, reviews: 175 },
  { pages: 450, fileSize: "22MB", rating: 4.8, reviews: 205 },
  { pages: 390, fileSize: "16MB", rating: 4.6, reviews: 135 },
  { pages: 410, fileSize: "18MB", rating: 4.9, reviews: 240 },
  { pages: 440, fileSize: "21MB", rating: 4.5, reviews: 115 },
  { pages: 370, fileSize: "15MB", rating: 4.7, reviews: 155 },
  { pages: 480, fileSize: "24MB", rating: 4.8, reviews: 185 },
  { pages: 400, fileSize: "17MB", rating: 4.6, reviews: 125 },
];

// ── Product Image helpers ────────────────────────────────────────────────────
// Full-size images for detail page (800px wide)
// Thumbnail images for card grid (400px wide — 4x smaller)
function thumb(url: string): string {
  return url.replace("=s800", "=s400");
}

const UTME_THUMBS = [
  "https://lh3.googleusercontent.com/d/1ge5Uz3JTRPQbiVWXbQEaFCP4G8XsaGl5=s400",
  "https://lh3.googleusercontent.com/d/1faO208ZggzTwSWV29vkgWvybpYl_mycJ=s400",
  "https://lh3.googleusercontent.com/d/1m_uIe7pIPYDBAfHvlEgEfVU-shObAn9f=s400",
  "https://lh3.googleusercontent.com/d/1cyN4sQcKQMCJiH2QnZyfjvuyVWDPnm3t=s400",
];

const PRODUCT_IMAGES: Record<string, string> = {
  "master-bundle": "https://lh3.googleusercontent.com/d/1_1nQxjkMLobZq_2whu68p1k3GRKsX5kx=s800",
  "mega-bundle": "https://lh3.googleusercontent.com/d/1EFFbs_6JMB035MvrxDfewtjvD7TFxkqM=s800",
  "waec-complete": "https://lh3.googleusercontent.com/d/1_SL5NAt3ODwqPgMqkICNadLdW0h3VpSl=s800",
  "neco-complete": "https://lh3.googleusercontent.com/d/1Rywv_dfdaMpgCIf7Bi9-AVSrGxvhDlrr=s800",
  "jamb-math": "https://lh3.googleusercontent.com/d/1OlIw7-UeYUAEGNsgf9ky_cFjtpeYM8-x=s800",
  "jamb-english": "https://lh3.googleusercontent.com/d/1S76RG3kNbpaI6TH7veVu6GYxuDO-jTPJ=s800",
  "ielts-pack": "https://lh3.googleusercontent.com/d/19AdBCekClsy9xvjJwVEL0h38kWC2WJph=s800",
  "sat-pack": "https://lh3.googleusercontent.com/d/1fA2YBVtYT_3GPuJ7lbZmjGpg9RzPPLzD=s800",
};

const UTME_IMAGE_POOL = [
  "https://lh3.googleusercontent.com/d/1ge5Uz3JTRPQbiVWXbQEaFCP4G8XsaGl5=s800",
  "https://lh3.googleusercontent.com/d/1faO208ZggzTwSWV29vkgWvybpYl_mycJ=s800",
  "https://lh3.googleusercontent.com/d/1m_uIe7pIPYDBAfHvlEgEfVU-shObAn9f=s800",
  "https://lh3.googleusercontent.com/d/1cyN4sQcKQMCJiH2QnZyfjvuyVWDPnm3t=s800",
];

// Build UTME image mapping — cycles through the 4 available images
for (let i = 0; i < utmeSchools.length; i++) {
  PRODUCT_IMAGES[`utme-${i + 1}`] = UTME_IMAGE_POOL[i % UTME_IMAGE_POOL.length];
}

// thumbUrl is always the 400px version for fast loading in cards
const PRODUCT_THUMBS: Record<string, string> = {};
for (const [key, url] of Object.entries(PRODUCT_IMAGES)) {
  PRODUCT_THUMBS[key] = key.startsWith("utme-")
    ? UTME_THUMBS[parseInt(key.replace("utme-", ""), 10) % UTME_THUMBS.length]
    : thumb(url);
}

const ebooks: EBook[] = [
  ...utmeSchools.map((school, index) => {
    const data = utmeData[index];
    const shortName = school.split("(")[1]?.replace(")", "") || school;
    const id = `utme-${index + 1}`;
    return {
      id,
      title: `${shortName} UTME Past Questions & Answers`,
      description: `Complete UTME past questions and detailed answers for ${school}. Covers all subjects with step-by-step solutions.`,
      price: 1500,
      originalPrice: 2500,
      category: "UTME" as const,
      subcategory: "Past Questions",
      school,
      pages: data.pages,
      format: "PDF",
      fileSize: data.fileSize,
      rating: data.rating,
      reviews: data.reviews,
      inBundle: true,
      downloadLink: `https://drive.google.com/file/d/YOUR_FILE_ID_${index + 1}/view?usp=sharing`,
      imageUrl: PRODUCT_IMAGES[id],
      thumbUrl: PRODUCT_THUMBS[id],
    };
  }),
  {
    id: "waec-complete",
    title: "WAEC Complete Past Questions (All Subjects)",
    description: "10 years of WAEC past questions with detailed solutions for all subjects.",
    price: 3000,
    originalPrice: 5000,
    category: "WAEC",
    pages: 800,
    format: "PDF",
    fileSize: "45MB",
    rating: 4.8,
    reviews: 456,
    downloadLink: "https://drive.google.com/file/d/YOUR_WAEC_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["waec-complete"],
    thumbUrl: PRODUCT_THUMBS["waec-complete"],
  },
  {
    id: "neco-complete",
    title: "NECO Complete Past Questions (All Subjects)",
    description: "Comprehensive NECO past questions with expert solutions and marking schemes.",
    price: 2500,
    originalPrice: 4000,
    category: "NECO",
    pages: 700,
    format: "PDF",
    fileSize: "38MB",
    rating: 4.7,
    reviews: 312,
    downloadLink: "https://drive.google.com/file/d/YOUR_NECO_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["neco-complete"],
    thumbUrl: PRODUCT_THUMBS["neco-complete"],
  },
  {
    id: "jamb-math",
    title: "JAMB Mathematics Master Pack",
    description: "Advanced JAMB mathematics with 500+ solved problems, formulas, and shortcuts.",
    price: 2000,
    originalPrice: 3500,
    category: "JAMB",
    pages: 400,
    format: "PDF",
    fileSize: "22MB",
    rating: 4.9,
    reviews: 289,
    downloadLink: "https://drive.google.com/file/d/YOUR_JAMB_MATH_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["jamb-math"],
    thumbUrl: PRODUCT_THUMBS["jamb-math"],
  },
  {
    id: "jamb-english",
    title: "JAMB English Language Ultimate Guide",
    description: "Comprehension, lexis, structure, and oral English mastery for JAMB candidates.",
    price: 1800,
    originalPrice: 3000,
    category: "JAMB",
    pages: 320,
    format: "PDF",
    fileSize: "18MB",
    rating: 4.8,
    reviews: 234,
    downloadLink: "https://drive.google.com/file/d/YOUR_JAMB_ENG_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["jamb-english"],
    thumbUrl: PRODUCT_THUMBS["jamb-english"],
  },
  {
    id: "ielts-pack",
    title: "IELTS Complete Preparation Bundle",
    description: "Reading, writing, speaking, listening modules with 10 full practice tests.",
    price: 5000,
    originalPrice: 8000,
    category: "IELTS",
    pages: 600,
    format: "PDF",
    fileSize: "55MB",
    rating: 4.9,
    reviews: 567,
    downloadLink: "https://drive.google.com/file/d/YOUR_IELTS_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["ielts-pack"],
    thumbUrl: PRODUCT_THUMBS["ielts-pack"],
  },
  {
    id: "sat-pack",
    title: "SAT Math & Verbal Complete Guide",
    description: "Dual preparation for SAT Math and Evidence-Based Reading & Writing.",
    price: 4500,
    originalPrice: 7000,
    category: "SAT",
    pages: 550,
    format: "PDF",
    fileSize: "48MB",
    rating: 4.7,
    reviews: 198,
    downloadLink: "https://drive.google.com/file/d/YOUR_SAT_ID/view?usp=sharing",
    imageUrl: PRODUCT_IMAGES["sat-pack"],
    thumbUrl: PRODUCT_THUMBS["sat-pack"],
  },
  {
    id: "master-bundle",
    title: "MASTER BUNDLE: All 23 Universities UTME Pack",
    description: "Get ALL 23 university UTME past questions in one mega bundle. Save big with complete coverage for every major Nigerian university.",
    price: 15000,
    originalPrice: 34500,
    category: "BUNDLE",
    badge: "BEST VALUE",
    pages: 8000,
    format: "PDF",
    fileSize: "280MB",
    rating: 5.0,
    reviews: 89,
    downloadLink: "https://drive.google.com/drive/folders/YOUR_MASTER_BUNDLE_FOLDER?usp=sharing",
    imageUrl: PRODUCT_IMAGES["master-bundle"],
    thumbUrl: PRODUCT_THUMBS["master-bundle"],
  },
  {
    id: "mega-bundle",
    title: "MEGA BUNDLE: All Exams + All Schools",
    description: "The ultimate package: UTME (all 23 schools) + WAEC + NECO + JAMB + IELTS + SAT. Everything you need in one download.",
    price: 25000,
    originalPrice: 52000,
    category: "BUNDLE",
    badge: "MEGA DEAL",
    pages: 12000,
    format: "PDF",
    fileSize: "450MB",
    rating: 5.0,
    reviews: 45,
    downloadLink: "https://drive.google.com/drive/folders/YOUR_MEGA_BUNDLE_FOLDER?usp=sharing",
    imageUrl: PRODUCT_IMAGES["mega-bundle"],
    thumbUrl: PRODUCT_THUMBS["mega-bundle"],
  },
];

const categories = ["All", "UTME", "POST-UTME", "WAEC", "NECO", "JAMB", "IELTS", "SAT", "BUNDLE"];

// ── Google Sheets Logger ─────────────────────────────────────────────────────
async function logToGoogleSheets(data: Record<string, unknown>) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch {
    console.log("Google Sheets logging attempted");
  }
}

// ── Lazy Image Component ─────────────────────────────────────────────────────
function LazyCardImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const { ref, isVisible } = useLazyImage();
  const [imgError, setImgError] = useState(false);
  const showImg = isVisible && src && !imgError;

  return (
    <div ref={ref} className={`absolute inset-0 ${className ?? ""}`}>
      {showImg ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading={isVisible ? "lazy" : undefined}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A3C6E]">
          <ImageIcon className="w-16 h-16 text-[#C9921A]/50" />
        </div>
      )}
    </div>
  );
}

// ── Payment Modal ────────────────────────────────────────────────────────────
function PaymentModal({
  cart,
  onClose,
}: {
  cart: CartItem[];
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "payment" | "flutterwave" | "success" | "failed">("form");
  const [formData, setFormData] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [transactionRef] = useState(() => generateTransactionRef());
  const [copied, setCopied] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.ebook.price * item.quantity, 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleProceedToFlutterwave = async () => {
    await logToGoogleSheets({
      transactionRef,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: cart.map((item) => `${item.ebook.title} (₦${item.ebook.price.toLocaleString()})`).join(", "),
      totalAmount: total,
      status: "PENDING_PAYMENT",
      paymentMethod: "Flutterwave",
    });
    setStep("flutterwave");
  };

  const handlePaymentSuccess = async () => {
    await logToGoogleSheets({
      transactionRef,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: cart.map((item) => `${item.ebook.title} (₦${item.ebook.price.toLocaleString()})`).join(", "),
      totalAmount: total,
      status: "PAID",
      paymentMethod: "Flutterwave",
      downloadLinks: cart.map((item) => item.ebook.downloadLink).join(", "),
    });
    setStep("success");
  };

  const handlePaymentFailed = async () => {
    await logToGoogleSheets({
      transactionRef,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: cart.map((item) => `${item.ebook.title} (₦${item.ebook.price.toLocaleString()})`).join(", "),
      totalAmount: total,
      status: "FAILED",
      paymentMethod: "Flutterwave",
    });
    setStep("failed");
  };

  const copyTransactionRef = () => {
    navigator.clipboard.writeText(transactionRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const orderSummary = cart
    .map((item) => `*${item.ebook.title}* — ₦${(item.ebook.price * item.quantity).toLocaleString()}`)
    .join("%0A");

  const whatsappSuccessMessage = `Hi%20DChoice%20Tutoring!%0A%0AI%20just%20completed%20payment%20for%20my%20eBooks.%0A%0A*Transaction%20Ref:*%20${transactionRef}%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Email:*%20${encodeURIComponent(formData.email)}%0A*Phone:*%20${encodeURIComponent(formData.phone)}%0A%0A*Order:*%0A${orderSummary}%0A%0A*Total:*%20₦${total.toLocaleString()}%0A%0AHere%20is%20my%20proof%20of%20payment.%20Please%20send%20my%20eBooks.`;

  const whatsappSupportMessage = `Hi%20DChoice%20Tutoring!%0A%0AI%20need%20help%20with%20my%20eBook%20purchase.%0A%0A*Transaction%20Ref:*%20${transactionRef}%0A*Name:*%20${encodeURIComponent(formData.name)}%0A*Email:*%20${encodeURIComponent(formData.email)}%0A*Phone:*%20${encodeURIComponent(formData.phone)}%0A%0A*Issue:*%20My%20payment%20failed%20or%20I%20need%20assistance.%20Please%20help%20me.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#1A3C6E] p-6 text-white">
          <h3 className="font-heading font-bold text-xl">Checkout</h3>
          <p className="text-white/70 text-sm mt-1">
            {cart.length} item{cart.length > 1 ? "s" : ""} • Total: ₦{total.toLocaleString()}
          </p>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-[#1A1A2E]">Your Information</h4>
                <p className="text-sm text-gray-500">We'll send your eBooks to this email after payment verification.</p>

                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for eBook delivery)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (WhatsApp)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="font-heading font-semibold text-[#1A1A2E]">Order Summary</h4>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.ebook.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.ebook.title}</span>
                      <span className="font-semibold">₦{(item.ebook.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#C9921A]">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>You'll be redirected to Flutterwave to complete payment. After payment, return here to verify.</span>
                  </p>
                </div>

                <button
                  onClick={handleProceedToFlutterwave}
                  className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Flutterwave <ExternalLink className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === "flutterwave" && (
              <motion.div
                key="flutterwave"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 text-center"
              >
                <div className="w-16 h-16 bg-[#C9921A]/10 rounded-full flex items-center justify-center mx-auto">
                  <ExternalLink className="w-8 h-8 text-[#C9921A]" />
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xl text-[#1A1A2E]">Complete Your Payment</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Click the button below to pay ₦{total.toLocaleString()} via Flutterwave.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Transaction Reference:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-sm font-mono border">{transactionRef}</code>
                      <button
                        onClick={copyTransactionRef}
                        className="p-1 hover:bg-gray-200 rounded transition-all"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Save this reference — you'll need it for verification.</p>
                </div>

                <a
                  href={`${FLUTTERWAVE_LINK}?amount=${total}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&name=${encodeURIComponent(formData.name)}&tx_ref=${transactionRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all text-center"
                >
                  Pay ₦{total.toLocaleString()} on Flutterwave
                </a>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">After payment, click one:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePaymentSuccess}
                      className="bg-green-100 text-green-700 font-semibold py-2.5 rounded-lg hover:bg-green-200 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> I Paid Successfully
                    </button>
                    <button
                      onClick={handlePaymentFailed}
                      className="bg-red-100 text-red-700 font-semibold py-2.5 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" /> Payment Failed
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-5"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xl text-[#1A1A2E]">
                    Payment Successful!
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Your order <strong>#{transactionRef}</strong> is being processed.
                  </p>
                </div>

                <div className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl p-5 space-y-3">
                  <p className="text-sm text-gray-700">
                    <strong>Step 1:</strong> Send your proof of payment on WhatsApp for instant verification:
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappSuccessMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Proof on WhatsApp
                  </a>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left space-y-2">
                  <p className="text-sm text-blue-800 font-semibold">What happens next:</p>
                  <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                    <li>We verify your payment on WhatsApp</li>
                    <li>Your eBooks are sent to <strong>{formData.email}</strong></li>
                    <li>Download links appear below after verification</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#1A1A2E]">Your Downloads (available after verification):</p>
                  {cart.map((item) => (
                    <a
                      key={item.ebook.id}
                      href={item.ebook.downloadLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-all"
                    >
                      <Download className="w-4 h-4 text-[#C9921A]" />
                      <span className="text-sm text-[#1A3C6E] font-medium flex-1 text-left">{item.ebook.title}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "failed" && (
              <motion.div
                key="failed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-5"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xl text-[#1A1A2E]">
                    Payment Issue
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Don't worry — we're here to help you complete your purchase.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800 mb-2">
                    Your transaction reference: <strong>#{transactionRef}</strong>
                  </p>
                  <p className="text-sm text-red-700">
                    Common issues: network error, insufficient funds, or bank decline. Our support team can help resolve this instantly.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappSupportMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-all w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat Support on WhatsApp
                  </a>

                  <button
                    onClick={() => setStep("flutterwave")}
                    className="w-full bg-[#1A3C6E] text-white font-heading font-semibold py-3 rounded-lg hover:bg-[#142d54] transition-all"
                  >
                    Try Payment Again
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-all"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ── EBook Card ───────────────────────────────────────────────────────────────
function EBookCard({
  ebook,
  onAddToCart,
  isInCart,
}: {
  ebook: EBook;
  onAddToCart: (ebook: EBook) => void;
  isInCart: boolean;
}) {
  const navigate = useNavigate();
  const discount = Math.round((1 - ebook.price / ebook.originalPrice) * 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-all ${
        ebook.category === "BUNDLE" ? "border-[#C9921A] ring-2 ring-[#C9921A]/20" : "border-gray-100"
      }`}
    >
      {/* Cover Image - Clickable to product page */}
      <div 
        className={`relative h-48 flex items-center justify-center overflow-hidden cursor-pointer ${
          ebook.category === "BUNDLE" ? "bg-[#C9921A]" : "bg-[#1A3C6E]"
        }`}
        onClick={() => navigate(`/product/${ebook.id}`)}
      >
        {/* Lazy-loaded thumbnail (400px — 4x smaller) */}
        <LazyCardImage src={ebook.thumbUrl} alt={ebook.title} />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {ebook.category === "BUNDLE" && (
          <div className="relative z-10 text-center">
            <div className="flex justify-center -space-x-3 mb-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-10 h-10 bg-white/20 rounded-full border-2 border-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <span className="text-white font-bold text-lg">{ebook.badge}</span>
          </div>
        )}

        {ebook.badge && ebook.category !== "BUNDLE" && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {ebook.badge}
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 text-[#1A3C6E] text-xs font-bold px-2 py-1 rounded-full z-10">
          {ebook.format}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title - Clickable to product page */}
        <div 
          className="cursor-pointer"
          onClick={() => navigate(`/product/${ebook.id}`)}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              ebook.category === "BUNDLE"
                ? "bg-[#C9921A] text-white"
                : "text-[#C9921A] bg-[#C9921A]/10"
            }`}>
              {ebook.category}
            </span>
            {ebook.school && (
              <span className="text-xs text-gray-500 truncate max-w-[150px]">{ebook.school}</span>
            )}
          </div>

          <h3 className="font-heading font-bold text-[#1A1A2E] mb-2 line-clamp-2 text-sm hover:text-[#C9921A] transition-colors">
            {ebook.title}
          </h3>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {ebook.description}
          </p>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(ebook.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({ebook.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-display text-xl font-bold text-[#1A3C6E]">
              ₦{ebook.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through ml-1">
              ₦{ebook.originalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(ebook);
            }}
            disabled={isInCart}
            className={`flex-1 font-heading font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-green-100 text-green-700 cursor-default"
                : ebook.category === "BUNDLE"
                ? "bg-[#C9921A] text-white hover:bg-[#b07d16]"
                : "bg-[#1A3C6E] text-white hover:bg-[#142d54]"
            }`}
          >
            {isInCart ? (
              <>
                <CheckCircle className="w-4 h-4" /> In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>

          <button
            onClick={() => navigate(`/product/${ebook.id}`)}
            className="px-3 py-2.5 border-2 border-[#1A3C6E] text-[#1A3C6E] rounded-lg hover:bg-[#1A3C6E] hover:text-white transition-all"
            title="View Details"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  cart,
  onRemove,
  onCheckout,
  onClose,
}: {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.ebook.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
    >
      <div className="p-5 border-b flex items-center justify-between bg-[#1A3C6E] text-white">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <h3 className="font-heading font-bold">Your Cart ({cart.length})</h3>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.ebook.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
              {/* Cart Item Image */}
              <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#1A3C6E]">
                {item.ebook.thumbUrl ? (
                  <img
                    src={item.ebook.thumbUrl}
                    alt={item.ebook.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <BookOpen className="w-6 h-6 text-[#C9921A]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-[#1A1A2E] line-clamp-2">{item.ebook.title}</h4>
                <p className="text-[#C9921A] font-bold text-sm mt-1">₦{item.ebook.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onRemove(item.ebook.id)}
                className="text-red-400 hover:text-red-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-5 border-t space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#C9921A]">₦{total.toLocaleString()}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-[#C9921A] text-[#1A3C6E] font-heading font-bold py-3 rounded-lg hover:bg-[#b07d16] transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function EBookStorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const filteredEBooks = ebooks.filter((ebook) => {
    const matchesCategory = selectedCategory === "All" || ebook.category === selectedCategory;
    const matchesSearch =
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ebook.school && ebook.school.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (ebook: EBook) => {
    if (!cart.find((item) => item.ebook.id === ebook.id)) {
      setCart([...cart, { ebook, quantity: 1 }]);
      setShowCart(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.ebook.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1A3C6E] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-heading font-bold">Back to Home</span>
            </a>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9921A] text-[#1A3C6E] text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-[#1A3C6E] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              eBook Store
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Premium Study Materials
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              UTME past questions for 23 top universities, WAEC, NECO, JAMB, IELTS, SAT & more.
              Instant download after payment verification.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Bundles */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ebooks
            .filter((e) => e.category === "BUNDLE")
            .map((bundle) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#C9921A] rounded-2xl p-6 text-white relative overflow-hidden"
              >
                {/* Background Image for Bundle — uses thumb for faster load */}
                {bundle.thumbUrl && (
                  <img
                    src={bundle.thumbUrl}
                    alt={bundle.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                    loading="lazy"
                  />
                )}
                <div className="relative z-10">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {bundle.badge}
                  </span>
                  <h3 className="font-heading font-bold text-xl mt-3 mb-2">{bundle.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{bundle.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-bold">₦{bundle.price.toLocaleString()}</span>
                    <span className="text-white/60 line-through">₦{bundle.originalPrice.toLocaleString()}</span>
                    <span className="bg-white/20 text-xs font-bold px-2 py-1 rounded-full">
                      Save ₦{(bundle.originalPrice - bundle.price).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(bundle)}
                    className="mt-4 bg-white text-[#C9921A] font-heading font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute right-10 bottom-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2" />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by school, exam, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9921A] focus:ring-2 focus:ring-[#C9921A]/20 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-heading font-medium text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-[#1A3C6E] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Showing {filteredEBooks.length} result{filteredEBooks.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEBooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <EBookCard
                ebook={ebook}
                onAddToCart={addToCart}
                isInCart={cart.some((item) => item.ebook.id === ebook.id)}
              />
            </motion.div>
          ))}
        </div>

        {filteredEBooks.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No eBooks found matching your search.</p>
          </div>
        )}
      </div>

      {/* Trust Section */}
      <div className="bg-white border-t py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Download, label: "Instant Download", desc: "After verification" },
              { icon: Lock, label: "Secure Payment", desc: "Flutterwave protected" },
              { icon: Mail, label: "Email Delivery", desc: "Sent to your inbox" },
              { icon: GraduationCap, label: "Expert Content", desc: "Verified by tutors" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <item.icon className="w-8 h-8 text-[#C9921A] mx-auto" />
                <h4 className="font-heading font-semibold text-[#1A1A2E]">{item.label}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Overlay */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <CartSidebar
              cart={cart}
              onRemove={removeFromCart}
              onCheckout={() => {
                setShowCart(false);
                setShowPayment(true);
              }}
              onClose={() => setShowCart(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <PaymentModal
            cart={cart}
            onClose={() => setShowPayment(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
