import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Globe,
  Calculator,
  PenTool,
  Atom,
  FlaskConical,
  Dna,
  TrendingUp,
  Code,
  GraduationCap,
  Award,
  Bot,
  Briefcase,
  Laptop,
  BarChart3,
  Palette,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Megaphone,
  Video,
} from "lucide-react";

const subjects = [
  {
    icon: Award,
    name: "JAMB Prep",
    description:
      "Comprehensive UTME preparation with mock exams and expert coaching.",
  },
  {
    icon: FileText,
    name: "WAEC / NECO",
    description:
      "Ace your O-Level exams with structured lessons and past questions.",
  },
  {
    icon: Globe,
    name: "IELTS",
    description:
      "Band 7+ training with certified instructors for study and work abroad.",
  },
  {
    icon: BookOpen,
    name: "SAT",
    description:
      "Score 1400+ with our proven SAT math, reading, and writing strategies.",
  },
  {
    icon: Calculator,
    name: "Mathematics",
    description:
      "From algebra to calculus — master math at any level with expert tutors.",
  },
  {
    icon: PenTool,
    name: "English",
    description:
      "Grammar, comprehension, essay writing, and literature made simple.",
  },
  {
    icon: Atom,
    name: "Physics",
    description:
      "Understand mechanics, electromagnetism, and modern physics clearly.",
  },
  {
    icon: FlaskConical,
    name: "Chemistry",
    description:
      "Organic, inorganic, and physical chemistry with practical examples.",
  },
  {
    icon: Dna,
    name: "Biology",
    description:
      "Cell biology, genetics, ecology, and human anatomy explained in depth.",
  },
  {
    icon: TrendingUp,
    name: "Economics",
    description: "Micro and macroeconomics, trade, and development studies.",
  },
  {
    icon: Code,
    name: "Coding for Kids",
    description:
      "Introduce your child to programming with fun, interactive lessons.",
  },
  {
    icon: GraduationCap,
    name: "University Foundation",
    description: "Bridge courses to prepare for university-level academics.",
  },
  // NEW: AI & Automation
  {
    icon: Bot,
    name: "AI Automation",
    description:
      "Learn ChatGPT, prompt engineering, and AI tools to automate workflows.",
  },
  // NEW: Business School
  {
    icon: Briefcase,
    name: "Business School",
    description:
      "Entrepreneurship, leadership, strategy, and startup fundamentals.",
  },
  // NEW: Web Development
  {
    icon: Laptop,
    name: "Web Development",
    description:
      "Build modern websites with HTML, CSS, JavaScript, React, and Node.js.",
  },
  // NEW: Data Analytics
  {
    icon: BarChart3,
    name: "Data Analytics",
    description:
      "Master Excel, SQL, Python, and visualization tools like Power BI.",
  },
  // NEW: UI/UX Design
  {
    icon: Palette,
    name: "UI/UX Design",
    description:
      "Design beautiful interfaces with Figma, prototyping, and user research.",
  },
  // NEW: Mobile App Dev
  {
    icon: Smartphone,
    name: "Mobile App Dev",
    description: "Create iOS and Android apps with React Native and Flutter.",
  },
  // NEW: Data Science
  {
    icon: Database,
    name: "Data Science",
    description:
      "Machine learning, deep learning, and predictive modeling with Python.",
  },
  // NEW: Cloud Computing
  {
    icon: Cloud,
    name: "Cloud Computing",
    description:
      "AWS, Azure, and Google Cloud — deploy and scale applications globally.",
  },
  // NEW: Cybersecurity
  {
    icon: Shield,
    name: "Cybersecurity",
    description:
      "Ethical hacking, network security, and digital forensics essentials.",
  },
  // NEW: Digital Marketing
  {
    icon: Megaphone,
    name: "Digital Marketing",
    description:
      "SEO, social media marketing, Google Ads, and content strategy.",
  },
  // NEW: Video Editing
  {
    icon: Video,
    name: "Video Editing",
    description:
      "Professional editing with Premiere Pro, After Effects, and CapCut.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeaturedSubjects() {
  return (
    <section
      id="subjects"
      className="relative content-layer bg-white py-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[28px] sm:text-[40px] font-bold text-[#1A1A2E] leading-[1.2]">
            Master Any Subject, Ace Every Exam
          </h2>
          <p className="font-body text-lg text-[#1A1A2E]/70 mt-4 max-w-2xl mx-auto">
            From JAMB to AI Automation, we cover every major academic and
            digital skill with expert-led courses.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-[#F5F7FA] rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg hover:border-[#C9921A] border-2 border-transparent"
            >
              <subject.icon className="w-10 h-10 text-[#1A3C6E] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-base font-semibold text-[#1A1A2E] mb-2">
                {subject.name}
              </h3>
              <p className="font-body text-sm text-[#1A1A2E]/70 leading-relaxed">
                {subject.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
