import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer:
      'Simply choose your preferred plan, create an account, and complete payment via Paystack or Flutterwave. You\'ll get immediate access to your dashboard and can start scheduling classes right away.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept debit/credit cards, bank transfers, USSD payments, and QR code payments through Paystack and Flutterwave. Installment options are also available — pay 50% now and 50% after 15 days.',
  },
  {
    question: 'Are the classes live or pre-recorded?',
    answer:
      'Both! You get access to live interactive classes via our embedded video platform (no Zoom needed) and full access to recorded lessons you can watch anytime at your own pace.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a full refund within 14 days if you\'ve attended fewer than 3 classes. We\'re confident in our service, but we want you to feel secure in your investment.',
  },
  {
    question: 'What devices do I need?',
    answer:
      'You only need a smartphone, tablet, or computer with internet access. Our platform works on all devices and browsers. For the best experience, we recommend a laptop or tablet for the live classes.',
  },
  {
    question: 'How qualified are your tutors?',
    answer:
      'All our tutors have verified academic qualifications (minimum B.Ed. or B.Sc. in their subject area) and at least 5 years of teaching experience. Many are former examiners and certified trainers.',
  },
  {
    question: 'Can parents track their child\'s progress?',
    answer:
      'Absolutely! Our Parent Dashboard lets you view attendance, scores, assignments, and tutor feedback in real time. You also get weekly progress reports via email every Sunday.',
  },
  {
    question: 'How does the JAMB CBT simulator work?',
    answer:
      'Our simulator contains 10,000+ questions across all JAMB subjects. It replicates the exact JAMB exam interface with a 2-hour countdown timer, randomized questions, instant scoring, and detailed explanations for every answer.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-heading text-base font-semibold text-[#1A1A2E] group-hover:text-[#1A3C6E] transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#1A3C6E]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-[#1A1A2E]/70 leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative content-layer bg-white py-[100px]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg text-[#1A1A2E]/70 mt-4">
            Everything you need to know about our tutoring platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5F7FA] rounded-2xl p-6 sm:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
