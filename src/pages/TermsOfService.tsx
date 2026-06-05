import { motion } from "framer-motion";
import {
  Scale,
  UserCheck,
  CreditCard,
  BookOpen,
  AlertTriangle,
  Copyright,
  MessageSquare,
  Ban,
  Gavel,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";
import SEO from "@/components/SEO";

export default function TermsOfService() {
  const sections = [
    {
      icon: Scale,
      title: "Agreement to Terms",
      content: `Welcome to Dmultichoice. These Terms of Service ("Terms") constitute a legally binding agreement between you and Dmultichoice Limited ("Company," "we," "us," or "our") governing your access to and use of our website, mobile applications, and tutoring services (collectively, the "Services").

By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.

These Terms are governed by the laws of the Federal Republic of Nigeria, including the Companies and Allied Matters Act (CAMA) 2020, the Nigeria Data Protection Regulation (NDPR) 2019, and the Consumer Protection Framework.`,
    },
    {
      icon: UserCheck,
      title: "Eligibility and Account Registration",
      content: `To use our Services, you must:

• Be at least 13 years of age. Users between 13 and 18 must have verifiable parental consent.
• Provide accurate, current, and complete information during registration.
• Maintain the security of your account credentials.
• Notify us immediately of any unauthorized access or security breach.
• Be responsible for all activities that occur under your account.

We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.`,
    },
    {
      icon: BookOpen,
      title: "Services Description",
      content: `Dmultichoice provides online and in-person tutoring services for Nigerian examinations including:

• JAMB (Joint Admissions and Matriculation Board) preparation
• WAEC (West African Examinations Council) preparation
• NECO (National Examinations Council) preparation
• Post-UTME screening preparation
• Continuous assessment support
• Skill development courses

Our Services include live tutoring sessions, recorded video lessons, practice questions, study materials, and progress tracking. We do not guarantee specific examination scores or admission outcomes.`,
    },
    {
      icon: CreditCard,
      title: "Payment and Refund Policy",
      content: `All fees for our Services are displayed on our pricing page and are subject to change with notice.

Payment Terms:
• Full payment is required before accessing paid Services.
• We accept payments via bank transfer, debit cards, and mobile money.
• All payments are processed through CBN-licensed payment service providers.
• Prices are quoted in Nigerian Naira (?) and inclusive of applicable taxes.

Refund Policy:
• Full refund available within 7 days of purchase if no sessions have been attended.
• 50% refund available if less than 25% of purchased sessions have been used.
• No refund for completed courses or attended live sessions.
• Refund requests must be submitted via email to support@dmultichoice.com.
• Refunds are processed within 14 business days.`,
    },
    {
      icon: Copyright,
      title: "Intellectual Property Rights",
      content: `All content on our platform, including but not limited to:

• Video lessons and recordings
• Text content and study materials
• Graphics, logos, and branding
• Software and platform code
• Practice questions and assessments

is the exclusive property of Dmultichoice or our licensors and is protected by Nigerian copyright laws, international copyright treaties, and other intellectual property laws.

You are granted a limited, non-exclusive, non-transferable license to access and use the content for personal, non-commercial educational purposes only. You may not:

• Reproduce, distribute, or publicly display our content
• Create derivative works from our materials
• Sell, license, or commercially exploit our content
• Remove copyright or proprietary notices from any materials`,
    },
    {
      icon: MessageSquare,
      title: "User Conduct and Content",
      content: `By using our Services, you agree not to:

• Harass, abuse, or discriminate against tutors or other users
• Share account credentials with third parties
• Record or distribute tutoring sessions without written consent
• Upload viruses, malware, or harmful code
• Use the platform for unauthorized commercial purposes
• Impersonate any person or entity
• Share false or misleading information
• Violate any applicable Nigerian laws or regulations

We reserve the right to remove any user-generated content that violates these Terms and to suspend or terminate accounts for serious or repeated violations.`,
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer of Warranties",
      content: `OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

To the fullest extent permitted by Nigerian law, we disclaim all warranties, including but not limited to:

• Merchantability and fitness for a particular purpose
• Non-infringement of intellectual property rights
• Accuracy, reliability, or completeness of content
• Uninterrupted or error-free service
• Specific examination results or academic outcomes

While we strive to provide high-quality educational services, we do not guarantee admission into any institution or specific scores in any examination.`,
    },
    {
      icon: Ban,
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by law, Dmultichoice and its directors, employees, partners, and agents shall not be liable for:

• Indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, or business opportunities
• Personal injury or property damage arising from Services use
• Unauthorized access to or alteration of your transmissions or data
• Statements or conduct of any third party on the platform

Our total liability for any claim arising from these Terms or your use of the Services shall not exceed the total amount paid by you to us in the 12 months preceding the claim.`,
    },
    {
      icon: RefreshCw,
      title: "Modifications and Termination",
      content: `We reserve the right to modify, suspend, or discontinue any part of our Services at any time with reasonable notice.

We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including:

• Breach of these Terms
• Fraudulent or illegal activity
• Non-payment of fees
• Extended period of inactivity
• Conduct that harms other users or our reputation

Upon termination, your right to use the Services will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`,
    },
    {
      icon: Gavel,
      title: "Governing Law and Dispute Resolution",
      content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.

Any dispute arising from these Terms or your use of the Services shall be resolved through:

1. Negotiation: Both parties will attempt to resolve the dispute through good faith negotiation within 30 days.
2. Mediation: If negotiation fails, the dispute will be referred to mediation under the Lagos Multi-Door Courthouse or Abuja Multi-Door Courthouse rules.
3. Arbitration: If mediation fails, the dispute shall be finally resolved by arbitration in Lagos or Abuja under the Arbitration and Conciliation Act (Cap A18, LFN 2004).

The arbitration shall be conducted by a sole arbitrator appointed by mutual agreement. The decision of the arbitrator shall be final and binding on both parties.`,
    },
  ];

  return (
    <>
      <SEO
        title="Terms of Service | Dmultichoice Tutoring"
        description="Terms and conditions for using Dmultichoice Tutoring online lessons, assignment solving, and homework help services."
        canonical="https://dmultichoicetutoring.com/terms"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] to-[#0F2847] pt-28 pb-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#C9921A]/10 border border-[#C9921A]/20 rounded-full px-5 py-2 mb-6">
              <Scale className="w-4 h-4 text-[#C9921A]" />
              <span className="text-[#E5B84A] text-sm font-heading font-semibold tracking-wide uppercase">
                Legal
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Terms of <span className="gold-gradient-text">Service</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Last updated: May 1, 2026. Please read these terms carefully before
              using our tutoring services.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9921A]/20 to-[#C9921A]/5 flex items-center justify-center border border-[#C9921A]/20 shrink-0">
                    <section.icon className="w-6 h-6 text-[#C9921A]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="text-white/60 leading-relaxed whitespace-pre-line font-body">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 glass-card rounded-2xl p-8 text-center"
          >
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-white/50 mb-6">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@dmultichoice.com"
                className="btn-premium text-sm inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                support@dmultichoice.com
              </a>
              <a
                href="tel:+234XXXXXXXXXX"
                className="btn-outline-premium text-sm inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                +234 8158 484 621
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
