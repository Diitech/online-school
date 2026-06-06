import SEO from '@/components/SEO'
import GlobeBackground from '../sections/GlobeBackground'
import Navigation from '../sections/Navigation'
import HeroSection from '../sections/HeroSection'
import SocialProof from '../sections/SocialProof'
import FeaturedSubjects from '../sections/FeaturedSubjects'
import WhyChooseUs from '../sections/WhyChooseUs'
import TutorsCarousel from '../sections/TutorsCarousel'
import SuccessStories from '../sections/SuccessStories'
import PricingSection from '../sections/PricingSection'
import LearningProcess from '../sections/LearningProcess'
import FAQSection from '../sections/FAQSection'
import FinalCTA from '../sections/FinalCTA'
import NewsletterSection from '../sections/NewsletterSection'
import Footer from '../sections/Footer'
import ChatBot from '../sections/ChatBot'
import UTMEBundlePromo from '../sections/UTMEBundlePromo'

export default function Home() {
  return (
    <>
      <SEO
        title="Online Lessons, Assignment Help & Homework Assistance Nigeria"
        description="Get expert help with assignments, homework, online lessons, and exam preparation. Live tutoring, assignment solving, task assistance. JAMB, WAEC, NECO, IELTS, SAT. Plans from ?5,000."
        canonical="https://dmultichoicetutoring.com"
        keywords="online lessons Nigeria, assignment help, homework help, task solving, assignment solving, homework assistance, online tutoring Nigeria, JAMB tutoring, WAEC tutoring, NECO tutoring, IELTS coaching, SAT prep, private tutor Lagos, solve assignment, academic help, task help"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Dmultichoice Tutoring - Online Lessons & Assignment Help Nigeria",
          "description": "Online lessons, assignment solving, homework help, and exam preparation for Nigerian students",
          "url": "https://dmultichoicetutoring.com",
          "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "Dmultichoice Tutoring",
            "offers": {
              "@type": "Offer",
              "priceRange": "??"
            }
          }
        }}
      />
      
      <GlobeBackground />
      <Navigation />
      <main className="content-layer">
        <HeroSection />
        <SocialProof />
        <UTMEBundlePromo />
        <FeaturedSubjects />
        <WhyChooseUs />
        <TutorsCarousel />
        <SuccessStories />
        <PricingSection />
        <LearningProcess />
        <FAQSection />
        <FinalCTA />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
