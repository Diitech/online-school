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
import Footer from '../sections/Footer'
import WhatsAppButton from '../sections/WhatsAppButton'

type Page = 'home' | 'privacy' | 'terms'

interface HomeProps {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
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
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <main className="content-layer">
        <HeroSection />
        <SocialProof />
        <FeaturedSubjects />
        <WhyChooseUs />
        <TutorsCarousel />
        <SuccessStories />
        <PricingSection />
        <LearningProcess />
        <FAQSection />
        <FinalCTA />
        <Footer onNavigate={onNavigate} />
      </main>
      <WhatsAppButton />
    </>
  )
}
