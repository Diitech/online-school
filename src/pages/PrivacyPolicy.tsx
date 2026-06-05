import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Bell,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "Introduction",
      content: `Dmultichoice ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our tutoring services.

This policy complies with the Nigeria Data Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act 2023. By accessing or using our services, you agree to the terms of this Privacy Policy.`,
    },
    {
      icon: Eye,
      title: "Information We Collect",
      content: `We collect several types of information from and about users of our services:

• Personal Information: Name, email address, phone number, postal address, date of birth, and profile picture.
• Academic Information: School name, class/grade level, examination types (JAMB, WAEC, NECO), academic performance data, and learning preferences.
• Payment Information: Billing address, payment method details (processed securely through our payment partners).
• Usage Data: IP address, browser type, device information, pages visited, time spent on pages, and referring website addresses.
• Communication Data: Records of your correspondence with us, including emails, chat messages, and phone calls.`,
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: `We use the information we collect for the following purposes:

• To provide and maintain our tutoring services
• To personalize your learning experience and recommend relevant courses
• To process payments and manage your account
• To communicate with you about your account, sessions, and updates
• To send promotional materials and newsletters (with your consent)
• To analyze usage patterns and improve our platform
• To comply with legal obligations and protect our rights
• To prevent fraud and ensure platform security`,
    },
    {
      icon: FileText,
      title: "Legal Basis for Processing (NDPR)",
      content: `Under the Nigeria Data Protection Regulation, we process your personal data based on the following legal grounds:

• Consent: You have given clear consent for us to process your personal data for specific purposes.
• Contract: Processing is necessary for the performance of a contract with you.
• Legal Obligation: Processing is necessary for compliance with a legal obligation.
• Legitimate Interests: Processing is necessary for our legitimate interests, provided your rights do not override those interests.

For users under 18 years of age, we require verifiable parental consent before collecting personal data.`,
    },
    {
      icon: Bell,
      title: "Data Sharing and Disclosure",
      content: `We do not sell your personal information. We may share your information with:

• Tutors: Limited information necessary to facilitate tutoring sessions.
• Service Providers: Third-party vendors who perform services on our behalf (payment processing, cloud hosting, analytics).
• Legal Authorities: When required by law, court order, or government regulation.
• Business Transfers: In connection with a merger, acquisition, or sale of assets.

All third-party service providers are contractually obligated to protect your data in accordance with NDPR standards.`,
    },
    {
      icon: Trash2,
      title: "Data Retention and Deletion",
      content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:

• Account Information: Retained while your account is active and for 2 years after closure.
• Academic Records: Retained for 5 years for verification and reporting purposes.
• Payment Records: Retained for 7 years in accordance with Nigerian tax laws.
• Marketing Data: Retained until you withdraw consent or unsubscribe.

You have the right to request deletion of your personal data at any time, subject to legal retention requirements.`,
    },
    {
      icon: Mail,
      title: "Your Data Protection Rights",
      content: `Under the NDPR, you have the following rights regarding your personal data:

• Right to Access: Request copies of your personal data.
• Right to Rectification: Request correction of inaccurate or incomplete data.
• Right to Erasure: Request deletion of your personal data.
• Right to Restrict Processing: Request limitation on how we use your data.
• Right to Data Portability: Request transfer of your data to another service.
• Right to Object: Object to processing based on legitimate interests or direct marketing.
• Right to Withdraw Consent: Withdraw consent at any time.

To exercise these rights, contact our Data Protection Officer at privacy@dmultichoice.com.`,
    },
    {
      icon: Phone,
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

• Email: support@dmultichoice.com
• Phone: +234 8158 484 621
• Address: Lagos, Nigeria
• Data Protection Officer: support@dmultichoice.com

We will respond to all inquiries within 30 days in accordance with NDPR requirements.`,
    },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy | Dmultichoice Tutoring"
        description="Dmultichoice Tutoring privacy policy. Learn how we protect your data when you use our online lessons, assignment help, and tutoring services."
        canonical="https://dmultichoicetutoring.com/privacy"
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
              <Shield className="w-4 h-4 text-[#C9921A]" />
              <span className="text-[#E5B84A] text-sm font-heading font-semibold tracking-wide uppercase">
                Legal
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Privacy <span className="gold-gradient-text">Policy</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Last updated: May 1, 2026. We are committed to protecting your
              personal information in compliance with Nigerian data protection
              laws.
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

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-white/40 text-sm">
              This Privacy Policy is designed to comply with the Nigeria Data
              Protection Regulation (NDPR) 2019 and the Nigeria Data Protection
              Act 2023.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}