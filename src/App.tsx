import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy } from "react";
import Navigation from "./sections/Navigation";
import HolidayAnnouncement from "./sections/HolidayAnnouncement";
import HolidayPromoPopup from "./sections/HolidayPromoPopup";

// Lazy load Three.js globe (650KB) — only loaded on homepage
const GlobeBackground = lazy(() => import("./sections/GlobeBackground"));
import HeroSection from "./sections/HeroSection";
import SocialProof from "./sections/SocialProof";
import FeaturedSubjects from "./sections/FeaturedSubjects";
import WhyChooseUs from "./sections/WhyChooseUs";
import TutorsCarousel from "./sections/TutorsCarousel";
import SuccessStories from "./sections/SuccessStories";
import PricingSection from "./sections/PricingSection";
import LearningProcess from "./sections/LearningProcess";
import FAQSection from "./sections/FAQSection";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";
import ChatBot from "./sections/ChatBot";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import LatestNews from "./sections/LatestNews";
import NewsletterSection from "./sections/NewsletterSection";
import UTMEBundlePromo from "./sections/UTMEBundlePromo";
import EBookStoreCTA from "./sections/EBookStoreCTA";
import EBookStorePage from "./pages/EBookStorePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NewsPage from "./pages/NewsPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import AboutUs from "./pages/AboutUs";
import NewsCategoryPage from "./pages/NewsCategoryPage";
import NewsTagPage from "./pages/NewsTagPage";
import ProfessionalSchoolsLanding from "./pages/professional-schools/ProfessionalSchoolsLanding";
import JambHolidayLessons from "./pages/JambHolidayLessons";
import JambHolidaySuccess from "./pages/JambHolidaySuccess";
import AcademyPage from "./pages/professional-schools/academy/AcademyPage";
import CoursePage from "./pages/professional-schools/course/CoursePage";
import BrochurePage from "./pages/professional-schools/brochure/BrochurePage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Home page with all sections
function HomePage() {
  return (
    <>
      <GlobeBackground />
      <HolidayAnnouncement />
      <Navigation />
      <HolidayPromoPopup />
      <main className="content-layer">
        <HeroSection />
        <SocialProof />
        <UTMEBundlePromo />
        <FeaturedSubjects />
        <WhyChooseUs />
        <TutorsCarousel />
        <SuccessStories />
        <PricingSection />
        <EBookStoreCTA />
        <LearningProcess />
        <FAQSection />
        <FinalCTA />
        <NewsletterSection />
        <LatestNews />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}

// Simple page layout for legal pages
function SimplePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

// eBook store page layout
function EBookStoreLayout() {
  return (
    <>
      <EBookStorePage />
      <ChatBot />
    </>
  );
}

// Product detail layout
function ProductDetailLayout() {
  return (
    <>
      <ProductDetailPage />
      <ChatBot />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={
            <SimplePage>
              <PrivacyPolicy />
            </SimplePage>
          }
        />
        <Route
          path="/terms"
          element={
            <SimplePage>
              <TermsOfService />
            </SimplePage>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/ebooks" element={<EBookStoreLayout />} />
        <Route path="/product/:productId" element={<ProductDetailLayout />} />
        <Route path="/news" element={<NewsPage />} />
        <Route
          path="/news/category/:categorySlug"
          element={<NewsCategoryPage />}
        />
        <Route path="/news/tag/:tagSlug" element={<NewsTagPage />} />
        <Route path="/news/:slug" element={<ArticleDetailPage />} />
        <Route
          path="/about"
          element={
            <SimplePage>
              <AboutUs />
            </SimplePage>
          }
        />
        <Route
          path="/professional-schools"
          element={<ProfessionalSchoolsLanding />}
        />
        <Route path="/jamb-holiday-lessons" element={<JambHolidayLessons />} />
        <Route
          path="/jamb-holiday-lessons/success"
          element={<JambHolidaySuccess />}
        />
        <Route
          path="/professional-schools/:academySlug"
          element={<AcademyPage />}
        />
        <Route
          path="/professional-schools/:academySlug/:courseSlug"
          element={<CoursePage />}
        />
        <Route
          path="/professional-schools/:academySlug/:courseSlug/brochure"
          element={<BrochurePage />}
        />
      </Routes>
    </>
  );
}
