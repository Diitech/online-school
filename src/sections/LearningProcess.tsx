import { motion } from 'framer-motion';
import { UserPlus, UserCheck, PlayCircle, Trophy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Register \u0026 Choose Course',
    description:
      'Create your account in minutes and browse our wide range of courses. Pick the subjects and exams you want to prepare for.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Get Matched with Tutor',
    description:
      'Our system pairs you with the best tutor for your needs based on your goals, schedule, and learning style.',
  },
  {
    number: '03',
    icon: PlayCircle,
    title: 'Attend Live/Recorded Classes',
    description:
      'Join live interactive sessions or watch recorded lessons at your convenience. Access study materials anytime.',
  },
  {
    number: '04',
    icon: Trophy,
    title: 'Ace Your Exams',
    description:
      'Take mock tests, track your progress, and walk into your exam hall with confidence. Success is guaranteed.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function LearningProcess() {
  return (
    <section className="relative content-layer bg-[#1A3C6E] py-[100px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-white leading-[1.2]">
            Your Path to Academic Excellence
          </h2>
          <p className="font-body text-lg text-white/70 mt-4 max-w-2xl mx-auto">
            Four simple steps to transform your academic performance and achieve your goals.
          </p>
        </motion.div>

        {/* Timeline - Desktop: horizontal, Mobile: vertical */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-[#C9921A]/40" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative text-center"
              >
                {/* Connecting Line - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-full w-0.5 h-8 border-l-2 border-dashed border-[#C9921A]/40 -translate-x-1/2" />
                )}

                {/* Number Circle */}
                <div className="inline-flex items-center justify-center w-[120px] h-[120px] rounded-full bg-[#C9921A] mb-6 relative z-10">
                  <div className="text-center">
                    <step.icon className="w-8 h-8 text-[#1A3C6E] mx-auto mb-1" />
                    <span className="font-display text-lg font-bold text-[#1A3C6E]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
