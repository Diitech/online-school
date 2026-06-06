import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  BookMarked,
} from "lucide-react";
import SEO from "../components/SEO";

const milestones = [
  {
    year: "2020",
    title: "Founded",
    desc: "Dmultichoice Tutoring launched to bridge the gap in Nigerian education.",
  },
  {
    year: "2021",
    title: "1,000+ Students",
    desc: "Reached our first major milestone of enrolled students.",
  },
  {
    year: "2023",
    title: "CBT Simulator Launch",
    desc: "Launched full JAMB CBT simulator with 10,000+ practice questions.",
  },
  {
    year: "2025",
    title: "eBook Store",
    desc: "Expanded to digital study materials with 23+ university UTME packs.",
  },
];

const values = [
  {
    icon: Target,
    title: "Academic Excellence",
    desc: "Every student deserves the tools and guidance to achieve their best.",
  },
  {
    icon: Users,
    title: "Expert Tutors",
    desc: "200+ qualified tutors providing personalized 1-on-1 and group lessons.",
  },
  {
    icon: BookMarked,
    title: "Proven Materials",
    desc: "10+ years of curated past questions and study guides for Nigerian exams.",
  },
  {
    icon: CheckCircle,
    title: "Results-Driven",
    desc: "95% success rate — our students consistently achieve their target scores.",
  },
];

export default function AboutUs() {
  return (
    <>
      <SEO
        title="About Dmultichoice Tutoring — Nigeria's Exam Preparation Platform"
        description="Learn about Dmultichoice Tutoring, the education division of Dmultichoice.com. JAMB preparation, UTME tutoring, WAEC NECO coaching, and online tutoring for Nigerian students since 2020."
        canonical="https://tutoring.dmultichoice.com/about"
        keywords="about Dmultichoice Tutoring, JAMB preparation Nigeria, UTME tutoring, WAEC NECO coaching, online tutoring Nigeria, exam preparation platform, study guide Nigeria, Dmultichoice education, Nigerian tutoring"
      />

      <div className="min-h-screen bg-gray-50 pt-[72px]">
        {/* Hero */}
        <div className="bg-[#1A3C6E] text-white py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#C9921A] text-[#1A3C6E] font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                <GraduationCap className="w-4 h-4" />
                About Us
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Empowering Nigerian Students for Academic Excellence
              </h1>
              <p className="text-white/80 max-w-3xl mx-auto text-lg">
                Dmultichoice Tutoring is the education service division of{" "}
                <a
                  href="https://dmultichoice.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9921A] font-semibold hover:underline"
                >
                  Dmultichoice.com
                </a>{" "}
                — Nigeria's trusted{" "}
                <strong className="text-white">
                  exam preparation platform
                </strong>{" "}
                providing
                <strong className="text-white"> JAMB preparation</strong>,{" "}
                <strong className="text-white">UTME tutoring</strong>,
                <strong className="text-white"> WAEC NECO coaching</strong>, and
                expert-led online tutoring.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C9921A] font-bold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="font-display text-3xl font-bold text-[#1A1A2E] mt-2 mb-4">
                Making Quality Education Accessible to Every Nigerian Student
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Dmultichoice Tutoring, we believe every Nigerian student
                deserves access to high-quality
                <strong> exam preparation</strong> and{" "}
                <strong>online tutoring</strong>. Whether you're preparing for
                JAMB, WAEC, NECO, IELTS, or SAT, our platform connects you with
                certified tutors, comprehensive <strong>study guides</strong>,
                and proven learning materials.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Since 2020, we've helped thousands of students improve their
                scores, gain admission to their dream universities, and build
                confidence in their academic abilities. Our
                <strong> online tutoring Nigeria</strong> platform combines live
                lessons, assignment solving, homework help, and CBT simulator
                access — everything you need to excel.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="font-heading font-bold text-lg text-[#1A1A2E] mb-4">
                Our Impact at a Glance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "5,000+", label: "Students Taught" },
                  { value: "200+", label: "Expert Tutors" },
                  { value: "95%", label: "Success Rate" },
                  { value: "10+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl font-bold text-[#C9921A]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A3C6E] to-[#142d54] rounded-2xl p-8 sm:p-10 text-white mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-center">
              A Story of Transformation
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-xl p-6 border-l-4 border-[#C9921A]">
                <p className="text-lg italic leading-relaxed mb-4">
                  "Before Dmultichoice, I was completely lost with my{" "}
                  <strong className="text-[#C9921A]">JAMB preparation</strong>.
                  I had tried self-study, watched countless YouTube videos, but
                  nothing stuck. My first mock score was 180 — I felt like
                  giving up.
                </p>
                <p className="text-lg italic leading-relaxed mb-4">
                  Then a friend recommended Dmultichoice Tutoring. I signed up
                  for the{" "}
                  <strong className="text-[#C9921A]">JAMB Intensive</strong>{" "}
                  program, and everything changed. My tutor broke down each
                  subject, the{" "}
                  <strong className="text-[#C9921A]">CBT simulator</strong>{" "}
                  helped me practice under real exam conditions, and the{" "}
                  <strong className="text-[#C9921A]">study guides</strong> were
                  incredibly detailed.
                </p>
                <p className="text-lg italic leading-relaxed">
                  Three months later, I scored 287 in my UTME. I'm now at UNILAG
                  studying Computer Science. Dmultichoice didn't just help me
                  pass — it changed my future."
                </p>
                <p className="mt-4 font-semibold text-[#C9921A]">
                  — Chidi O., UNILAG Aspirant
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-8 text-center">
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all"
                >
                  <v.icon className="w-10 h-10 text-[#C9921A] mb-3" />
                  <h3 className="font-heading font-bold text-[#1A1A2E] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-8 text-center">
              Our Journey
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-gray-100 text-center relative"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9921A] text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    {m.year}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-heading font-bold text-[#1A1A2E] mb-1">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-500">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#C9921A] to-[#b07d16] rounded-2xl p-8 text-center text-white">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-6">
              Join thousands of Nigerian students who have improved their scores
              and gained admission to their dream universities with Dmultichoice
              Tutoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 bg-white text-[#C9921A] font-heading font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all"
              >
                <GraduationCap className="w-5 h-5" />
                Start Learning Today
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/ebooks"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-heading font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                <BookOpen className="w-5 h-5" />
                Explore Study Materials
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
