export type PaymentPlan = "full" | "installments";

export type CourseFaq = { q: string; a: string };

export type WeeklyModule = {
  week: number;
  topic: string;
  details?: string[];
};

export type CourseCurriculum = {
  overview: string;
  weeklyModules: WeeklyModule[];
};

export type Course = {
  academySlug: string;
  slug: string; // course slug
  title: string;
  duration: string;
  tuition: string; // formatted (e.g. ₦180,000)
  tuitionMin?: string;
  tuitionMax?: string;
  learningOutcomes: string[];
  targetAudience: string[];
  admissionRequirements: string[];
  curriculum: CourseCurriculum;
  projects: string[];
  toolsSoftware: string[];
  capstoneProject?: string;
  certificationPrep?: string[];
  careerOpportunities: string[];
  faqs: CourseFaq[];
  relatedCourseSlugs?: string[];
  paymentPlans: {
    defaultPlan: PaymentPlan;
    plans: Array<{
      type: PaymentPlan;
      label: string;
      description: string;
    }>;
  };
  studentTestimonials?: Array<{ name: string; role?: string; quote: string }>;
};

export type Academy = {
  slug: string;
  title: string;
  hero: {
    headline: string;
    subheadline: string;
  };
  about: {
    description: string;
    keyPoints: string[];
  };
  whyChooseUs: string[];
  industryPartners: string[];
  studentSuccessStories: string[];
  admissionProcess: string[];
  learningModes: string[];
  careerOutcomes: string[];
  featuredCourseSlugs: string[];
  tuitionOverview: string;
  faqs: CourseFaq[];
  registerCtaText: string;
  courses: Course[];
};

const courseTuitionBusinessManagement = {
  full: "₦180,000",
} as const;

export const professionalSchools: Academy[] = [
  {
    slug: "business-school",
    title: "Business School",
    hero: {
      headline: "Learn practical business skills that drive real growth",
      subheadline:
        "From management and analytics to entrepreneurship and leadership—build job-ready capability.",
    },
    about: {
      description:
        "Our Business School programs are designed for hands-on learning, guided by industry practices and project-based outcomes.",
      keyPoints: [
        "Project-led learning",
        "Career-focused curriculum",
        "Instructor support & mentoring",
        "Tools and real-world case studies",
      ],
    },
    whyChooseUs: [
      "Curriculum mapped to workplace competencies",
      "Weekly practical deliverables",
      "Capstone projects for portfolio-ready outcomes",
    ],
    industryPartners: [
      "Industry-led case studies",
      "Professional mentorship network",
    ],
    studentSuccessStories: [
      "Career switch support and placement readiness",
      "Portfolio projects built across the program",
    ],
    admissionProcess: [
      "Register with your selected academy + course",
      "Complete payment plan (full or installments)",
      "Get onboarding schedule and learning mode confirmation",
    ],
    learningModes: ["Online", "Physical", "Hybrid"],
    careerOutcomes: [
      "Business operations support roles",
      "Project coordination & management paths",
      "Analytics and reporting capability",
    ],
    featuredCourseSlugs: [
      "business-management",
      "project-management-professional",
      "business-analytics",
      "executive-leadership-programme",
    ],
    tuitionOverview: "Tuition from ₦150,000 to ₦450,000",
    faqs: [
      {
        q: "Do you offer installments?",
        a: "Yes—payment plans are available per course. Select your preferred plan at registration.",
      },
      {
        q: "How long is the program?",
        a: "Programs run from 4 to 12 weeks depending on the course.",
      },
    ],
    registerCtaText: "Register for Business School",
    courses: [
      {
        academySlug: "business-school",
        slug: "business-management",
        title: "Business Management",
        duration: "8 Weeks",
        tuition: courseTuitionBusinessManagement.full,
        learningOutcomes: [
          "Understand business strategy fundamentals",
          "Manage operations and performance metrics",
          "Deliver practical business plans",
        ],
        targetAudience: [
          "Aspiring business managers",
          "Undergraduates and graduates",
          "Professionals seeking career advancement",
        ],
        admissionRequirements: [
          "Basic literacy and access to learning device",
          "Willingness to complete weekly assignments",
        ],
        curriculum: {
          overview:
            "A structured curriculum covering core business management topics with weekly practical deliverables.",
          weeklyModules: [
            {
              week: 1,
              topic: "Business Management Foundations",
              details: [
                "Case study analysis",
                "Team activity: business model draft",
              ],
            },
            {
              week: 2,
              topic: "Operations & Performance",
              details: ["KPIs and dashboards basics"],
            },
            {
              week: 3,
              topic: "Planning & Strategy",
              details: ["Strategic planning workshop"],
            },
            {
              week: 4,
              topic: "Leadership & Decision Making",
              details: ["Leadership framework practice"],
            },
            {
              week: 5,
              topic: "Business Analytics Overview",
              details: ["Report building and interpretation"],
            },
            {
              week: 6,
              topic: "Financial Management Basics",
              details: ["Budgeting and forecasting exercise"],
            },
            {
              week: 7,
              topic: "Project-Driven Management",
              details: ["Weekly project milestone delivery"],
            },
            {
              week: 8,
              topic: "Capstone & Career Readiness",
              details: ["Final business portfolio presentation"],
            },
          ],
        },
        projects: [
          "Business management capstone portfolio",
          "Weekly operational improvement tasks",
        ],
        toolsSoftware: [
          "Spreadsheet tools",
          "Presentation tools",
          "Analytics templates",
        ],
        capstoneProject:
          "Capstone: Build and present a complete business management plan.",
        certificationPrep: [
          "Portfolio review checklist",
          "Career readiness interview preparation",
        ],
        careerOpportunities: [
          "Business operations assistant",
          "Team coordinator",
          "Junior business analyst pathway",
        ],
        faqs: [
          {
            q: "Is there a capstone project?",
            a: "Yes. You will complete a capstone project to build a portfolio.",
          },
          {
            q: "What should I bring?",
            a: "A laptop/phone, internet access, and willingness to complete weekly tasks.",
          },
        ],
        relatedCourseSlugs: [
          "project-management-professional",
          "business-analytics",
        ],
        paymentPlans: {
          defaultPlan: "installments",
          plans: [
            {
              type: "full",
              label: "Full Payment",
              description: "Pay the full tuition to get instant onboarding.",
            },
            {
              type: "installments",
              label: "Installments",
              description: "Pay in parts as scheduled during registration.",
            },
          ],
        },
        studentTestimonials: [
          {
            name: "Student",
            role: "Career switch",
            quote:
              "The weekly projects made the learning feel real and practical.",
          },
        ],
      },
      {
        academySlug: "business-school",
        slug: "project-management-professional",
        title: "Project Management Professional",
        duration: "8 Weeks",
        tuition: "₦300,000",
        learningOutcomes: [
          "Plan and manage projects",
          "Use project documentation effectively",
          "Deliver a capstone project plan",
        ],
        targetAudience: [
          "Aspiring PMs",
          "Team leaders",
          "Graduates seeking project management skills",
        ],
        admissionRequirements: [
          "Access to learning device",
          "Ability to complete weekly assignments",
        ],
        curriculum: {
          overview:
            "Learn project planning, execution, and monitoring through practical weekly modules and capstone deliverables.",
          weeklyModules: [
            {
              week: 1,
              topic: "Project Initiation",
              details: ["Problem statement & scope mapping"],
            },
            {
              week: 2,
              topic: "Planning & Scheduling",
              details: ["Timeline and milestone planning"],
            },
            {
              week: 3,
              topic: "Execution & Communication",
              details: ["Stakeholder communication templates"],
            },
            {
              week: 4,
              topic: "Risk & Quality",
              details: ["Risk register exercise"],
            },
            {
              week: 5,
              topic: "Cost & Budget Control",
              details: ["Budget planning worksheet"],
            },
            {
              week: 6,
              topic: "Monitoring & Reporting",
              details: ["Progress reporting artifacts"],
            },
            {
              week: 7,
              topic: "Procurement & Delivery",
              details: ["Procurement plan mock"],
            },
            {
              week: 8,
              topic: "Capstone Presentation",
              details: ["Final project plan demo"],
            },
          ],
        },
        projects: [
          "Capstone project plan",
          "Weekly project management artifacts",
        ],
        toolsSoftware: ["Planning spreadsheets", "Presentation tools"],
        capstoneProject:
          "Capstone: Create a complete project plan from scope to delivery.",
        certificationPrep: ["Portfolio review and interview guidance"],
        careerOpportunities: [
          "Project coordinator",
          "Operations project support",
          "PM assistant pathway",
        ],
        faqs: [
          {
            q: "Do you provide templates?",
            a: "Yes—resources and templates are used throughout the program.",
          },
        ],
        relatedCourseSlugs: ["business-management", "business-analytics"],
        paymentPlans: {
          defaultPlan: "installments",
          plans: [
            {
              type: "full",
              label: "Full Payment",
              description: "Pay the full tuition for priority onboarding.",
            },
            {
              type: "installments",
              label: "Installments",
              description: "Split payment into scheduled installments.",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "cybersecurity-academy",
    title: "Cybersecurity Academy",
    hero: {
      headline: "Hands-on cybersecurity training with real-world lab practice",
      subheadline:
        "Build fundamentals, master security concepts, and prep for certifications with practical labs.",
    },
    about: {
      description:
        "Our cybersecurity academy focuses on lab-based learning to strengthen defense, detection, and incident handling skills.",
      keyPoints: [
        "Security labs",
        "Tools & workflows",
        "Capstone security assessments",
      ],
    },
    whyChooseUs: [
      "Lab-first learning",
      "Career-focused outcomes",
      "Mentoring and certification prep",
    ],
    industryPartners: [
      "Security labs & case studies",
      "Career readiness network",
    ],
    studentSuccessStories: ["Practical portfolios built through capstone work"],
    admissionProcess: [
      "Register with selected course",
      "Receive onboarding and lab access schedule",
      "Complete weekly labs and assessments",
    ],
    learningModes: ["Online", "Hybrid"],
    careerOutcomes: [
      "SOC Analyst pathway",
      "Security operations roles",
      "Security tester readiness",
    ],
    featuredCourseSlugs: [
      "cybersecurity-fundamentals",
      "comptia-security-plus",
      "ethical-hacking",
    ],
    tuitionOverview: "Tuition from ₦180,000 to ₦750,000+",
    faqs: [
      {
        q: "Do you cover certifications?",
        a: "Yes—courses include certification prep where applicable.",
      },
    ],
    registerCtaText: "Register for Cybersecurity Academy",
    courses: [
      {
        academySlug: "cybersecurity-academy",
        slug: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        duration: "6 Weeks",
        tuition: "₦180,000",
        learningOutcomes: [
          "Understand security basics",
          "Learn threat modeling concepts",
          "Apply lab-based defensive practices",
        ],
        targetAudience: [
          "Beginners in cybersecurity",
          "IT professionals",
          "Students seeking security foundations",
        ],
        admissionRequirements: [
          "Internet access",
          "Willingness to complete weekly labs",
        ],
        curriculum: {
          overview:
            "A structured foundation with weekly hands-on lab practice.",
          weeklyModules: [
            {
              week: 1,
              topic: "Security Fundamentals",
              details: ["Core concepts workshop"],
            },
            {
              week: 2,
              topic: "Networking & Threats",
              details: ["Wireshark intro lab"],
            },
            {
              week: 3,
              topic: "Linux Essentials for Security",
              details: ["Hands-on environment basics"],
            },
            {
              week: 4,
              topic: "Vulnerability & Assessment Basics",
              details: ["Nmap scanning fundamentals"],
            },
            {
              week: 5,
              topic: "Incident Mindset & Response",
              details: ["Triage and reporting practice"],
            },
            {
              week: 6,
              topic: "Capstone: Security Assessment",
              details: ["Final lab assessment"],
            },
          ],
        },
        projects: ["Capstone security assessment", "Weekly lab writeups"],
        toolsSoftware: ["Wireshark", "Nmap", "Kali Linux"],
        capstoneProject:
          "Capstone: Perform a guided security assessment and report findings.",
        certificationPrep: [
          "Foundation checklist for next certification paths",
        ],
        careerOpportunities: [
          "Junior security analyst pathway",
          "SOC readiness foundation",
        ],
        faqs: [
          {
            q: "Is it beginner-friendly?",
            a: "Yes. The course is designed to guide beginners through practical labs.",
          },
        ],
        paymentPlans: {
          defaultPlan: "installments",
          plans: [
            {
              type: "full",
              label: "Full Payment",
              description: "Instant onboarding after successful payment.",
            },
            {
              type: "installments",
              label: "Installments",
              description:
                "Pay in parts; lab schedule starts after onboarding.",
            },
          ],
        },
      },
      {
        academySlug: "cybersecurity-academy",
        slug: "comptia-security-plus",
        title: "CompTIA Security+",
        duration: "10 Weeks",
        tuition: "₦380,000",
        learningOutcomes: [
          "Cover core Security+ concepts",
          "Build hands-on confidence with security tools",
          "Prep for certification readiness",
        ],
        targetAudience: [
          "IT professionals",
          "Students preparing for Security+ certification",
        ],
        admissionRequirements: ["Basic computer/network understanding"],
        curriculum: {
          overview:
            "A certification-aligned learning track with hands-on labs.",
          weeklyModules: [
            {
              week: 1,
              topic: "Security+ Domains Overview",
              details: ["Concept mapping and baseline quiz"],
            },
            {
              week: 2,
              topic: "Threats, Attacks, and Vulnerabilities",
              details: ["Lab: scanning and analysis"],
            },
            {
              week: 3,
              topic: "Identity & Access Management",
              details: ["Lab: access workflows"],
            },
            {
              week: 4,
              topic: "Risk Management",
              details: ["Lab: risk register building"],
            },
            {
              week: 5,
              topic: "Network Security",
              details: ["Lab: packet analysis"],
            },
            {
              week: 6,
              topic: "Cryptography Basics",
              details: ["Lab: encryption/decryption practice"],
            },
            {
              week: 7,
              topic: "Incident Response",
              details: ["Lab: triage playbook"],
            },
            {
              week: 8,
              topic: "Cloud Security Fundamentals",
              details: ["Lab: misconfig checklists"],
            },
            {
              week: 9,
              topic: "Review & Practice Exams",
              details: ["Practice test sessions"],
            },
            {
              week: 10,
              topic: "Capstone + Final Prep",
              details: ["Final assessment and guidance"],
            },
          ],
        },
        projects: [
          "Capstone: Security+ aligned lab report",
          "Practice exam preparation",
        ],
        toolsSoftware: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite"],
        capstoneProject:
          "Capstone: Build a security operations summary for a simulated environment.",
        certificationPrep: ["Practice exams and review sessions"],
        careerOpportunities: ["Security+ readiness for SOC and security roles"],
        faqs: [
          {
            q: "Do you include practice exams?",
            a: "Yes—weekly review sessions and practice tests are included.",
          },
        ],
        paymentPlans: {
          defaultPlan: "installments",
          plans: [
            {
              type: "full",
              label: "Full Payment",
              description:
                "Complete tuition payment for priority review sessions.",
            },
            {
              type: "installments",
              label: "Installments",
              description: "Split payment across the program timeline.",
            },
          ],
        },
      },
    ],
  },
  // Placeholder academies to be fully expanded in later phases.
  {
    slug: "ai-automation",
    title: "AI & Automation Academy",
    hero: {
      headline: "Automate workflows with practical AI and automation skills",
      subheadline:
        "Build AI agents, n8n workflows, and productivity pipelines.",
    },
    about: {
      description: "Learn modern automation patterns with hands-on projects.",
      keyPoints: [
        "AI workflows",
        "Automation tooling",
        "Project-based learning",
      ],
    },
    whyChooseUs: [
      "Practical automation labs",
      "AI agent projects",
      "Career-ready portfolios",
    ],
    industryPartners: ["Automation case studies"],
    studentSuccessStories: [
      "Portfolio projects and capstone automation builds",
    ],
    admissionProcess: ["Register", "Onboarding", "Complete weekly labs"],
    learningModes: ["Online", "Hybrid"],
    careerOutcomes: [
      "Automation consultant pathway",
      "AI workflow builder roles",
    ],
    featuredCourseSlugs: ["prompt-engineering", "ai-agents"],
    tuitionOverview: "Tuition from ₦180,000–₦350,000",
    faqs: [
      {
        q: "Is coding required?",
        a: "Basic programming concepts help, but the course is guided with practical exercises.",
      },
    ],
    registerCtaText: "Register for AI & Automation Academy",
    courses: [],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics Academy",
    hero: {
      headline: "Turn data into decisions with analytics tools",
      subheadline: "Excel, SQL, Power BI, Tableau, and more—learn by building.",
    },
    about: {
      description:
        "Hands-on analytics training designed for real business reporting.",
      keyPoints: ["Dashboards", "SQL queries", "Data visualization"],
    },
    whyChooseUs: [
      "Project-driven learning",
      "Weekly labs",
      "Career-focused outcomes",
    ],
    industryPartners: ["Analytics case studies"],
    studentSuccessStories: ["Build portfolio dashboards and reports"],
    admissionProcess: ["Register", "Onboarding", "Complete weekly labs"],
    learningModes: ["Online", "Hybrid"],
    careerOutcomes: ["BI analyst pathway", "Data visualization roles"],
    featuredCourseSlugs: ["sql", "power-bi"],
    tuitionOverview: "Tuition from ₦180,000–₦350,000",
    faqs: [
      {
        q: "Will I learn from scratch?",
        a: "Yes. Beginners are supported with structured labs and projects.",
      },
    ],
    registerCtaText: "Register for Data Analytics Academy",
    courses: [],
  },
  {
    slug: "software-development",
    title: "Software Development Academy",
    hero: {
      headline: "Build software skills for real-world development",
      subheadline: "Front-end and full-stack training with modern tooling.",
    },
    about: {
      description:
        "Learn web development by building applications with guided labs.",
      keyPoints: ["Modern JS", "React & Next.js", "Full-stack practice"],
    },
    whyChooseUs: [
      "Portfolio projects",
      "Weekly deliverables",
      "Mentored learning",
    ],
    industryPartners: ["Development case studies"],
    studentSuccessStories: ["Build full projects portfolio"],
    admissionProcess: ["Register", "Onboarding", "Complete weekly labs"],
    learningModes: ["Online", "Hybrid"],
    careerOutcomes: [
      "Front-end developer pathway",
      "Full-stack developer roles",
    ],
    featuredCourseSlugs: ["react-js", "full-stack-development"],
    tuitionOverview: "Tuition from ₦180,000–₦380,000",
    faqs: [
      {
        q: "Do you cover UI/UX?",
        a: "Yes—UI/UX is included as part of modern development learning.",
      },
    ],
    registerCtaText: "Register for Software Development Academy",
    courses: [],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Academy",
    hero: {
      headline: "Master digital marketing to grow brands",
      subheadline: "SEO, Ads, Analytics, content and performance marketing.",
    },
    about: {
      description:
        "Learn marketing strategies and execution across channels with practical exercises.",
      keyPoints: ["SEO", "Ads", "Analytics"],
    },
    whyChooseUs: [
      "Campaign-based learning",
      "Analytics skills",
      "Practical content projects",
    ],
    industryPartners: ["Marketing case studies"],
    studentSuccessStories: ["Build marketing campaign portfolios"],
    admissionProcess: ["Register", "Onboarding", "Complete weekly labs"],
    learningModes: ["Online", "Physical", "Hybrid"],
    careerOutcomes: [
      "Digital marketing specialist pathway",
      "Performance marketing roles",
    ],
    featuredCourseSlugs: ["seo", "google-ads"],
    tuitionOverview: "Tuition from ₦150,000–₦300,000",
    faqs: [
      {
        q: "Will I learn analytics?",
        a: "Yes—Google Analytics and performance measurement are included.",
      },
    ],
    registerCtaText: "Register for Digital Marketing Academy",
    courses: [],
  },
  {
    slug: "executive-education",
    title: "Executive Education",
    hero: {
      headline: "Leadership learning for professionals",
      subheadline:
        "Executive programs focused on impact, strategy and management.",
    },
    about: {
      description:
        "Executive learning with structured outcomes and career impact focus.",
      keyPoints: ["Leadership", "Strategy", "Management"],
    },
    whyChooseUs: [
      "High-impact modules",
      "Practical outcomes",
      "Mentored learning",
    ],
    industryPartners: ["Executive network"],
    studentSuccessStories: ["Leadership impact projects"],
    admissionProcess: ["Register", "Onboarding", "Complete program modules"],
    learningModes: ["Physical", "Hybrid"],
    careerOutcomes: [
      "Executive leadership pathway",
      "Strategic management roles",
    ],
    featuredCourseSlugs: ["executive-leadership-programme"],
    tuitionOverview: "Tuition tailored per program",
    faqs: [
      {
        q: "Is this for working professionals?",
        a: "Yes—programs are designed for professionals balancing work and learning.",
      },
    ],
    registerCtaText: "Register for Executive Education",
    courses: [],
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    hero: {
      headline: "Upskill teams with custom training",
      subheadline: "Tailored programs for organizations and corporate teams.",
    },
    about: {
      description:
        "Custom corporate training built around your goals, timeline and team capability.",
      keyPoints: ["Custom curriculum", "Team onboarding", "Impact reporting"],
    },
    whyChooseUs: [
      "Tailored learning tracks",
      "Corporate-ready outcomes",
      "Flexible delivery",
    ],
    industryPartners: ["Corporate partners"],
    studentSuccessStories: ["Team upskilling outcomes"],
    admissionProcess: [
      "Request corporate training",
      "Discuss scope and timeline",
      "Enroll team",
    ],
    learningModes: ["Physical", "Hybrid", "Onsite/Remote"],
    careerOutcomes: [
      "Team capability improvement",
      "Operational performance uplift",
    ],
    featuredCourseSlugs: [],
    tuitionOverview: "From ₦750,000+ (custom)",
    faqs: [
      {
        q: "Can you customize content?",
        a: "Yes—content and modules can be tailored to your organization.",
      },
    ],
    registerCtaText: "Request Corporate Training",
    courses: [],
  },
];

export function getAcademyBySlug(academySlug: string) {
  return professionalSchools.find((a) => a.slug === academySlug);
}

export function getCourseBySlugs(academySlug: string, courseSlug: string) {
  const academy = getAcademyBySlug(academySlug);
  return academy?.courses.find((c) => c.slug === courseSlug);
}

export function getAllCourseTuples() {
  return professionalSchools.flatMap((a) =>
    a.courses.map((c) => ({ academySlug: a.slug, courseSlug: c.slug })),
  );
}
