import { motion } from 'framer-motion';

const partners = [
  'JAMB Approved',
  'WAEC Partner',
  'NECO Certified',
  'IELTS Official',
  'SAT Prep Center',
  'Nigeria EdTech Awards',
  'Ministry of Education',
  'Lagos State Govt',
];

const scoreCards = [
  { name: 'Chisom A.', score: '347/400', exam: 'JAMB' },
  { name: 'Adebayo O.', score: '321/400', exam: 'JAMB' },
  { name: 'Blessing O.', score: '8 A1s', exam: 'WAEC' },
  { name: 'Musa I.', score: 'Band 7.5', exam: 'IELTS' },
];

export default function SocialProof() {
  return (
    <section className="relative content-layer bg-[#F5F7FA] py-12 overflow-hidden">
      {/* Partner Logos Marquee */}
      <div className="relative mb-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((partner, index) => (
            <span
              key={index}
              className="inline-flex items-center mx-8 font-heading text-sm font-semibold text-[#1A3C6E]/40 uppercase tracking-wider"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      {/* Score Highlight Cards */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {scoreCards.map((card) => (
            <div
              key={card.name}
              className="bg-white rounded-xl p-4 border-l-4 border-[#2E7D32] shadow-sm"
            >
              <div className="font-heading text-xs text-[#1A1A2E]/60 uppercase tracking-wide mb-1">
                {card.exam}
              </div>
              <div className="font-display text-xl font-bold text-[#1A3C6E]">
                {card.name}
              </div>
              <div className="font-display text-lg font-bold text-[#2E7D32]">
                Scored {card.score}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
