import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Play,
  X,
  Star,
  Volume2,
  Send,
  CheckCircle,
  Loader2,
  Camera,
  Video,
} from "lucide-react";

// ── Import local images from src/assets/images/ ─────────────────────────────
import chisomAvatar from "../assets/images/chisom-avatar.jpg";
import chisomResult from "../assets/images/chisom-result.jpg";
import adebayoAvatar from "../assets/images/adebayo-avatar.jpg";
import adebayoResult from "../assets/images/adebayo-result.jpg";
import blessingAvatar from "../assets/images/blessing-avatar.jpg";
import blessingResult from "../assets/images/blessing-result.jpg";
import musaAvatar from "../assets/images/musa-avatar.jpg";
import musaResult from "../assets/images/musa-result.jpg";
import chiamakaAvatar from "../assets/images/chiamaka-avatar.jpg";
import chiamakaResult from "../assets/images/chiamaka-result.jpg";
import toluAvatar from "../assets/images/tolu-avatar.jpg";
import toluResult from "../assets/images/tolu-result.jpg";

// ── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  state: string;
  exam: string;
  score: string;
  quote: string;
  avatar: string;
  resultImage: string;
  videoUrl?: string;
  rating: number;
  beforeScore?: string;
}

// ── Sample Data with Local Images ────────────────────────────────────────────
const stories: Testimonial[] = [
  {
    id: 1,
    name: "Chisom Anieke",
    state: "Enugu",
    exam: "JAMB",
    score: "347/400",
    beforeScore: "198",
    quote:
      "From 198 to 347 in just 3 months. The CBT simulator and personalized study plan made all the difference. I got admitted to study Medicine at UNN!",
    avatar: chisomAvatar,
    resultImage: chisomResult,
    rating: 5,
  },
  {
    id: 2,
    name: "Adebayo Ola",
    state: "Lagos",
    exam: "JAMB",
    score: "321/400",
    beforeScore: "245",
    quote:
      "I finally got my 300+ for Medicine. The tutors don't just teach, they mentor. Thank you Dmultichoice for making my dream come true!",
    avatar: adebayoAvatar,
    resultImage: adebayoResult,
    rating: 5,
  },
  {
    id: 3,
    name: "Blessing Okeke",
    state: "Delta",
    exam: "WAEC",
    score: "8 A1s",
    beforeScore: "5 Credits",
    quote:
      "All distinctions in my chosen subjects. Unbelievable result! The WAEC prep classes were intensive and worth every naira.",
    avatar: blessingAvatar,
    resultImage: blessingResult,
    rating: 5,
  },
  {
    id: 4,
    name: "Musa Ibrahim",
    state: "Kano",
    exam: "IELTS",
    score: "Band 7.5",
    beforeScore: "Band 5.0",
    quote:
      "Got my UK study visa approved! Best IELTS coaching ever. The speaking practice sessions built my confidence tremendously.",
    avatar: musaAvatar,
    resultImage: musaResult,
    rating: 5,
  },
  {
    id: 5,
    name: "Chiamaka Udo",
    state: "Rivers",
    exam: "SAT",
    score: "1480/1600",
    beforeScore: "1100",
    quote:
      "Scholarship to study in the US! Dreams do come true. The SAT strategies I learned here were absolute game-changers.",
    avatar: chiamakaAvatar,
    resultImage: chiamakaResult,
    rating: 5,
  },
  {
    id: 6,
    name: "Tolu Abiodun",
    state: "Oyo",
    exam: "JAMB",
    score: "308/400",
    beforeScore: "220",
    quote:
      "Repeated JAMB twice before — now admitted to UNILAG! The intensive program and mock exams prepared me perfectly.",
    avatar: toluAvatar,
    resultImage: toluResult,
    rating: 5,
  },
];

// ── Video Modal ────────────────────────────────────────────────────────────
function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        <video src={url} controls autoPlay className="w-full rounded-2xl" />
      </div>
    </motion.div>
  );
}

// ── Image Lightbox ─────────────────────────────────────────────────────────
function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        <img src={src} alt={alt} className="w-full rounded-2xl shadow-2xl" />
      </div>
    </motion.div>
  );
}

// ── Star Rating Component ─────────────────────────────────────────────────
function StarRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${star <= rating ? "text-[#C9921A] fill-[#C9921A]" : "text-gray-300"}`}
          />
        </button>
      ))}
    </div>
  );
}

// ── File Preview ─────────────────────────────────────────────────────────────
function FilePreview({
  file,
  type,
  onRemove,
}: {
  file: File;
  type: "image" | "video";
  onRemove: () => void;
}) {
  const [preview, setPreview] = useState<string>("");
  const reader = new FileReader();
  reader.onloadend = () => setPreview(reader.result as string);
  reader.readAsDataURL(file);

  return (
    <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
      {type === "image" ? (
        <img src={preview} alt="Preview" className="w-full h-32 object-cover" />
      ) : (
        <video src={preview} className="w-full h-32 object-cover" />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-body px-2 py-1 rounded">
        {type === "image" ? "📷 Image" : "🎥 Video"}
      </div>
    </div>
  );
}

// ── Submit Testimonial Form ─────────────────────────────────────────────────
function SubmitTestimonialForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    examType: "",
    scoreBefore: "",
    scoreAfter: "",
    testimonial: "",
    rating: 5,
  });
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const examTypes = ["JAMB", "WAEC", "NECO", "IELTS", "SAT", "Other"];

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.examType) e.examType = "Select an exam type";
    if (!form.scoreAfter.trim()) e.scoreAfter = "Your final score is required";
    if (!form.testimonial.trim() || form.testimonial.length < 20) {
      e.testimonial = "Testimonial must be at least 20 characters";
    }
    if (images.length === 0 && videos.length === 0) {
      e.files = "Please upload at least one image or video proof";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function uploadToGoogleDrive(
    files: File[],
    folderName: string,
  ): Promise<string[]> {
    return files.map(
      (_, i) =>
        `https://drive.google.com/file/d/placeholder_${folderName}_${i}`,
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const folderName = `${form.name.replace(/\s+/g, "_")}_${Date.now()}`;
      const imageUrls =
        images.length > 0
          ? await uploadToGoogleDrive(images, `${folderName}/images`)
          : [];
      const videoUrls =
        videos.length > 0
          ? await uploadToGoogleDrive(videos, `${folderName}/videos`)
          : [];

      const formData = {
        timestamp: new Date().toISOString(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        examType: form.examType,
        scoreBefore: form.scoreBefore,
        scoreAfter: form.scoreAfter,
        testimonial: form.testimonial,
        rating: form.rating,
        imageUrls: imageUrls.join(", "),
        videoUrls: videoUrls.join(", "),
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbxceohZIHKz3rPXiBv96A3cI9fYP_9FQcS_ZKOqXUqyNpPwVSUFgvZEXSjoVlC6BB_c/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      setShowSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        examType: "",
        scoreBefore: "",
        scoreAfter: "",
        testimonial: "",
        rating: 5,
      });
      setImages([]);
      setVideos([]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Submission failed. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/"),
    );
    setImages((prev) => [...prev, ...files].slice(0, 5));
  }

  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("video/"),
    );
    setVideos((prev) => [...prev, ...files].slice(0, 2));
  }

  return (
    <section id="submit-testimonial" className="bg-white py-[100px]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
            Share Your Success Story
          </h2>
          <p className="font-body text-lg text-[#1A1A2E]/70 mt-4">
            Your journey could inspire the next student. Upload your results and
            tell us how Dmultichoice changed your life.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-2xl p-8 shadow-lg space-y-6"
        >
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
                placeholder="e.g. Chidi Okonkwo"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
                placeholder="e.g. chidi@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
                placeholder="e.g. +234 815 848 4621"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Exam Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.examType}
                onChange={(e) => setForm({ ...form, examType: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors ${errors.examType ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
              >
                <option value="">Select exam...</option>
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.examType && (
                <p className="mt-1 text-xs text-red-500">{errors.examType}</p>
              )}
            </div>
          </div>

          {/* Score Before/After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Score Before (Optional)
              </label>
              <input
                type="text"
                value={form.scoreBefore}
                onChange={(e) =>
                  setForm({ ...form, scoreBefore: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                placeholder="e.g. 198 or F9"
              />
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Score After <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.scoreAfter}
                onChange={(e) =>
                  setForm({ ...form, scoreAfter: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors ${errors.scoreAfter ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
                placeholder="e.g. 320 or A1"
              />
              {errors.scoreAfter && (
                <p className="mt-1 text-xs text-red-500">{errors.scoreAfter}</p>
              )}
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
              Your Story <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.testimonial}
              onChange={(e) =>
                setForm({ ...form, testimonial: e.target.value })
              }
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-colors resize-none ${errors.testimonial ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"}`}
              placeholder="Tell us about your experience with Dmultichoice Tutoring. How did we help you succeed?"
            />
            {errors.testimonial && (
              <p className="mt-1 text-xs text-red-500">{errors.testimonial}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
              Your Rating
            </label>
            <StarRating
              rating={form.rating}
              setRating={(r) => setForm({ ...form, rating: r })}
            />
          </div>

          {/* File Uploads */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-heading font-semibold text-[#1A1A2E] mb-4">
              Upload Proof
            </h4>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Result Images (Max 5) <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img, i) => (
                  <div key={i} className="w-24">
                    <FilePreview
                      file={img}
                      type="image"
                      onRemove={() =>
                        setImages(images.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-[#1A3C6E] hover:bg-[#1A3C6E]/5 transition-colors"
                  >
                    <Camera className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-body">
                      Add Photo
                    </span>
                  </button>
                )}
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="block font-body text-sm font-medium text-[#1A1A2E] mb-2">
                Video Testimonial (Max 2)
              </label>
              <div className="flex flex-wrap gap-3 mb-3">
                {videos.map((vid, i) => (
                  <div key={i} className="w-32">
                    <FilePreview
                      file={vid}
                      type="video"
                      onRemove={() =>
                        setVideos(videos.filter((_, idx) => idx !== i))
                      }
                    />
                  </div>
                ))}
                {videos.length < 2 && (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-[#1A3C6E] hover:bg-[#1A3C6E]/5 transition-colors"
                  >
                    <Video className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-body">
                      Add Video
                    </span>
                  </button>
                )}
              </div>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                className="hidden"
              />
            </div>

            {errors.files && (
              <p className="mt-2 text-xs text-red-500">{errors.files}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#C9921A] text-white font-heading font-semibold text-base rounded-lg hover:bg-[#b07d16] transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading to Google Drive...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Testimonial
              </>
            )}
          </button>

          <p className="text-center font-body text-xs text-[#1A1A2E]/40">
            All submissions are reviewed before publication. Files are securely
            stored in Google Drive.
          </p>
        </motion.form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-[#2E7D32]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1A1A2E] mb-2">
                Thank You!
              </h3>
              <p className="font-body text-sm text-[#1A1A2E]/70 mb-6">
                Your testimonial has been uploaded to Google Drive for review.
                Once verified, it will appear on our website.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-[#1A3C6E] text-white font-heading font-semibold px-8 py-3 rounded-lg hover:bg-[#142d52] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({
  story,
  onImageClick,
  onVideoClick,
}: {
  story: Testimonial;
  onImageClick: (src: string) => void;
  onVideoClick: (url: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      {/* Result Image / Video Thumbnail */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={story.resultImage}
          alt={`${story.name}'s result`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onImageClick(story.resultImage)}
        />

        {story.videoUrl && (
          <button
            onClick={() => onVideoClick(story.videoUrl!)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-[#1A3C6E] ml-1" />
            </div>
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-body font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              VIDEO
            </div>
          </button>
        )}

        <div className="absolute bottom-3 left-3 bg-[#C9921A] text-white font-heading font-bold text-sm px-3 py-1.5 rounded-lg shadow-lg">
          {story.score}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {story.beforeScore && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center flex-1">
              <p className="font-body text-xs text-gray-500">Before</p>
              <p className="font-heading font-bold text-red-500">
                {story.beforeScore}
              </p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">
              <p className="font-body text-xs text-gray-500">After</p>
              <p className="font-heading font-bold text-[#2E7D32]">
                {story.score}
              </p>
            </div>
          </div>
        )}

        <div className="relative mb-4">
          <Quote className="w-6 h-6 text-[#C9921A]/20 absolute -top-1 -left-1" />
          <p className="font-body text-sm text-[#1A1A2E]/80 leading-relaxed pl-5">
            "{story.quote}"
          </p>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(story.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-[#C9921A] fill-[#C9921A]" />
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <img
            src={story.avatar}
            alt={story.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-heading font-semibold text-[#1A1A2E] text-sm">
              {story.name}
            </h4>
            <p className="font-body text-xs text-[#1A1A2E]/60">
              {story.state} • {story.exam}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function SuccessStories() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <section
        id="success"
        className="relative content-layer bg-[#F5F7FA] py-[100px]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
              Real Results from Real Students
            </h2>
            <p className="font-body text-lg text-[#1A1A2E]/70 mt-4 max-w-2xl mx-auto">
              See proof of transformations from our students. Every result is
              verified and documented with images and video testimonials.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <TestimonialCard
                key={story.id}
                story={story}
                onImageClick={setActiveImage}
                onVideoClick={setActiveVideo}
              />
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
              <div className="flex -space-x-2">
                {stories.slice(0, 4).map((s) => (
                  <img
                    key={s.id}
                    src={s.avatar}
                    alt={s.name}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-[#1A1A2E]/70">
                <span className="font-semibold text-[#1A3C6E]">
                  500+ verified
                </span>{" "}
                success stories
              </p>
            </div>
          </motion.div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {activeVideo && (
            <VideoModal
              url={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          )}
          {activeImage && (
            <ImageLightbox
              src={activeImage}
              alt="Student result"
              onClose={() => setActiveImage(null)}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Submit Testimonial Form */}
      <SubmitTestimonialForm />
    </>
  );
}