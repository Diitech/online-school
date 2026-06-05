import { motion } from 'framer-motion';
import { UserCheck, Calendar, Video, Trophy } from 'lucide-react';

const features = [
  {
    icon: UserCheck,
    title: 'Expert Certified Tutors',
    description:
      'Every tutor is thoroughly vetted with verified qualifications and teaching experience. Only the best make it to our platform.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description:
      'Book classes that fit your schedule — weekdays, weekends, evenings. Learning should adapt to your life, not the other way around.',
  },
  {
    icon: Video,
    title: 'Live \u0026 Recorded Classes',
    description:
      'Attend live sessions for real-time interaction or watch recordings at your own pace. Never miss a lesson again.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description:
      '95% of our students achieve their target scores with documented proof. Your success is our success.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="relative content-layer bg-[#1A3C6E] py-[100px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-white leading-[1.2]">
            Why Nigeria Trusts Dmultichoice Tutoring
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9921A]/20 mb-5">
                <feature.icon className="w-8 h-8 text-[#C9921A]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-base text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
