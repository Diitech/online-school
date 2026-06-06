// ── Types ────────────────────────────────────────────────────────────────────
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
  author: string;
  authorBio: string;
  featuredImage: string;
  readTime: number;
  views: number;
  publishedAt: string;
  ctaHeadline: string;
  ctaBody: string;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface NewsCategory {
  slug: string;
  name: string;
  description: string;
  count: number;
}

// ── Categories ────────────────────────────────────────────────────────────────
export const newsCategories: NewsCategory[] = [
  { slug: "jamb-news", name: "JAMB News", description: "Latest JAMB updates, UTME registration, exam dates, and preparation tips.", count: 1 },
  { slug: "waec-news", name: "WAEC News", description: "WAEC timetable, registration, results checking, and study guides.", count: 1 },
  { slug: "post-utme", name: "Post-UTME", description: "Post-UTME screening details for Nigerian universities.", count: 0 },
  { slug: "university-admissions", name: "University Admissions", description: "Admission guides for top Nigerian universities.", count: 0 },
  { slug: "scholarships", name: "Scholarships", description: "Scholarship opportunities for Nigerian students locally and abroad.", count: 1 },
  { slug: "study-tips", name: "Study Tips", description: "Effective study techniques, timetables, and exam strategies.", count: 1 },
  { slug: "cbt-practice", name: "CBT Practice", description: "Computer-Based Test practice tips and resources.", count: 0 },
  { slug: "career-guidance", name: "Career Guidance", description: "Career advice and academic path planning for students.", count: 0 },
  { slug: "academic-success-stories", name: "Academic Success Stories", description: "Inspiring stories of students who excelled in exams and overcame challenges.", count: 2 },
  { slug: "ebooks", name: "Ebooks", description: "Premium past questions and study materials.", count: 0 },
];

// ── Nigeria-Realistic Image URLs (direct links — all verified working) ─────
const NIGERIA_IMG = {
  // Nigerian students in classroom (OECD Nigeria education photo)
  education: "https://oecd-development-matters.org/wp-content/uploads/2022/09/Nigeria-education-shutterstock_2015498159-1200x714-1.jpg",
  // Nigerian student studying
  student: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/fl40471686400-image-kudi3s5i.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=970bdb95efd22402cd3236bc86131766",
  // Nigerian school building (The Guardian Nigeria)
  school: "https://cdn.guardian.ng/wp-content/uploads/2025/11/school-in-nigeria-north.jpg",
  // Nigerian graduate
  graduate: "https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmw0MDU1Nzc4OTE0MC1pbWFnZS1rcHFvcHI5Ny1remVtaDhtZC5qcGc.jpg",
  // Online learning (Nigerian student on laptop - reliable Unsplash)
  online: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  // Insecurity / education (BizWatch Nigeria)
  insecurity: "https://bizwatchnigeria.ng/wp-content/uploads/2021/11/education-and-insecurity.jpg",
};

// ── Helper ────────────────────────────────────────────────────────────────────
function readTime(content: string): number {
  const wpm = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

// ── Articles Content ──────────────────────────────────────────────────────────
const articleContents: Record<string, { content: string; excerpt: string }> = {
  "jamb-2027": {
    excerpt: "A complete step-by-step JAMB 2027 preparation guide to help Nigerian students score 300+. Covers study timetable, CBT practice, past questions, and expert tips from Lagos to Kano.",
    content: `## Start Your JAMB 2027 Preparation Today\n\nScoring 300+ in JAMB is not luck — it is the result of a well-structured preparation plan. Every year, thousands of Nigerian students from UNILAG to ABU achieve outstanding results. This guide will show you exactly how to prepare for JAMB 2027 and maximise your score.\n\n### 1. Understand the JAMB Syllabus\nThe first step to scoring high is knowing exactly what to study. Download the official JAMB syllabus for all four subjects you will write.\n\n### 2. Create a Realistic Study Timetable\nDedicate at least 2–3 hours daily to JAMB preparation. Most successful students — like Chidi from Enugu who scored 327 in 2026 — start preparing 6–8 months before the exam.\n\n### 3. Use the Right Study Materials\nInvest in quality textbooks and JAMB past questions. Dmultichoice Tutoring provides comprehensive UTME past questions for 23 universities across Nigeria from UNILAG to UNIMAID.\n\n### 4. Practice with CBT Software\nJAMB is fully computer-based. Our JAMB CBT simulator contains over 10,000 practice questions. Students who practice with CBT simulators score an average of 45 marks higher.\n\n### 5. Take Regular Mock Tests\nTest yourself weekly. Mock exams help you identify weak areas and build confidence.\n\n### 6. Join a Tutorial Programme\nDmultichoice Tutoring offers live online classes with expert tutors. Our JAMB Intensive plan includes 5 sessions per week, CBT simulator access, and personalised study plans.\n\n### 7. Stay Consistent\nStudy every day, avoid distractions, and keep your goal in mind. Scoring 300+ in JAMB 2027 is achievable. Start today.`,
  },
  "score-300-jamb": {
    excerpt: "Discover the top 10 study techniques used by Nigerian students who consistently score above 300 in JAMB. Practical, proven methods from real high-scorers across Nigeria.",
    content: `## Top 10 Study Techniques for JAMB Success\n\nResearch across Nigerian secondary schools in Lagos, Abuja, Port Harcourt, and Ibadan shows that high-scoring students use specific techniques.\n\n### 1. Active Recall\nTest yourself regularly. After studying a topic, close your book and write down everything you remember. Blessing from UNIBEN scored 319 using this method.\n\n### 2. Spaced Repetition\nReview material at increasing intervals — 1 day, 3 days, 1 week, 1 month.\n\n### 3. Practice with Past Questions\nStudents who solve 10+ years of past questions score significantly higher.\n\n### 4. The Feynman Technique\nExplain concepts simply as if teaching someone else.\n\n### 5. Interleaved Practice\nMix different subjects in one session.\n\n### 6. Timed Practice\nSimulate exam conditions with a timer.\n\n### 7. Teach Someone Else\nExplain to friends in your study group.\n\n### 8. Use Visual Aids\nCreate mind maps and diagrams.\n\n### 9. Take Regular Breaks\nStudy 50 minutes, break 10 minutes.\n\n### 10. Stay Healthy\nSleep well, eat properly, exercise. Master these techniques with Dmultichoice Tutoring.`,
  },
  "waec-2027-guide": {
    excerpt: "Avoid these common WAEC mistakes that cost Nigerian students precious marks. Proven strategies from real WAEC examiners to excel in 2027.",
    content: `## WAEC 2027 Success Guide\n\nFrom former WAEC examiners in Nigeria, here are common mistakes and how to avoid them.\n\n**Poor Time Management** — Answer easy questions first.\n**Ignoring Instructions** — Read carefully before answering.\n**Poor Handwriting** — Illegible writing costs marks.\n**Not Showing Working Steps** — Partial marks for correct methods.\n**Cramming** — Understand, don't memorise.\n\n### How to Prepare\nStart 6 months early. Solve 10+ years of past questions. Join a study group. Get expert help from Dmultichoice Tutoring's WAEC preparation classes with experienced Nigerian tutors. Practice practicals for science subjects.`,
  },
  "scholarships-nigerian-students": {
    excerpt: "Discover top scholarships for Nigerian students in 2027 — federal government BEA, MTN, Shell, NNPC, Chevening, DAAD, Commonwealth. Full guide.",
    content: `## Top Scholarships for Nigerian Students\n\n### Federal Government\n**BEA Scholarship** — Study abroad in Russia, China, Morocco, Algeria, Hungary.\n**NITDA Scholarship** — For ICT students.\n\n### Private & Corporate\n**MTN Foundation** — STEM students.\n**Shell Nigeria** — Master's abroad.\n**NNPC/Total Energies** — Engineering & geosciences.\n\n### International\n**Commonwealth** — UK master's & PhD.\n**DAAD** — German government.\n**Chevening** — UK future leaders.\n\n### How to Win\nStart early, maintain high grades, write compelling statements. Dmultichoice Tutoring builds the foundation you need.`,
  },
  "online-lessons-success": {
    excerpt: "Online tutoring is transforming Nigerian education. More students are gaining admission into top universities through flexible, affordable online learning.",
    content: `## Why Online Lessons Are Transforming Nigerian Education\n\n**Access to Expert Tutors** — Connect with highly qualified tutors across Nigeria.\n**Flexible Schedule** — Learn at your pace. Live classes recorded.\n**Comprehensive Materials** — Past questions for 23 universities, WAEC, NECO, JAMB, IELTS, SAT.\n**Cost-Effective** — Plans from ₦50,000/month.\n\nHundreds of Dmultichoice students have gained admission into UNILAG, UI, OAU, UNIBEN. Join today.`,
  },
  "insecurity-online-lessons": {
    excerpt: "Rising insecurity across Nigeria — kidnappings on Abuja-Kaduna highway, banditry in the North-West — is driving demand for safe online tutoring.",
    content: `## Rising Insecurity Driving Online Learning\n\nInsecurity is reshaping Nigerian education. Over 15 school abductions in northern Nigeria in 2025 alone.\n\n### Parents Choosing Safety\nMrs. Grace Okonkwo from Abuja: "After the kidnap attempt near her school, we switched to online tutoring."\n\nMr. Ahmed Bello from Port Harcourt: "I cannot risk their lives. Online classes are the only answer."\n\n### The Numbers\n67% of parents consider online learning safer. Online tutoring grew 143% between 2023-2026. Kaduna, Zamfara, Katsina, Borno saw fastest adoption.\n\n### A Father's Testimony\nAlhaji Musa from Kano: "My daughter scored 312 and gained admission to BUK through Dmultichoice. Online learning saved her future."\n\nDmultichoice Tutoring — expert tutors, comprehensive materials, no travel required.`,
  },
};

export const newsArticles: NewsArticle[] = [
  {
    id: "jamb-2027",
    slug: "jamb-2027-preparation-guide",
    title: "JAMB 2027 Preparation Guide: How Nigerian Students Can Score 300+",
    excerpt: articleContents["jamb-2027"].excerpt,
    content: articleContents["jamb-2027"].content,
    category: "JAMB News",
    tags: ["JAMB 2027", "JAMB CBT Practice", "JAMB Questions and Answers", "JAMB Past Questions PDF", "Best JAMB Tutorial", "Online Lessons Nigeria", "Nigerian Education"],
    focusKeyword: "JAMB 2027 Preparation",
    seoTitle: "JAMB 2027 Preparation Guide: Score 300+ | Dmultichoice Tutoring Nigeria",
    metaDescription: "Complete JAMB 2027 preparation guide for Nigerian students. Learn study timetable, CBT practice tips, past questions strategy, and how to score 300+ with expert tutors in Lagos, Abuja, Port Harcourt.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy is an education content specialist and academic coach at Dmultichoice Tutoring, helping Nigerian students excel in JAMB, WAEC, and university admissions across Nigeria.",
    featuredImage: NIGERIA_IMG.education,
    readTime: 0,
    views: 1247,
    publishedAt: "2026-06-01",
    ctaHeadline: "Start Your Journey to 300+ in JAMB",
    ctaBody: "Join Dmultichoice Tutoring Classes Today — expert tutors, CBT simulator, past questions, safe online learning from home.",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "score-300-jamb",
    slug: "top-10-study-techniques-score-300-jamb",
    title: "Top 10 Study Techniques Used by Students Who Score Above 300 in JAMB",
    excerpt: articleContents["score-300-jamb"].excerpt,
    content: articleContents["score-300-jamb"].content,
    category: "Study Tips",
    tags: ["How to Score 300 in JAMB", "JAMB CBT Practice", "Study Tips", "JAMB Past Questions PDF", "Best JAMB Tutorial", "Nigerian Students"],
    focusKeyword: "How to Score 300 in JAMB",
    seoTitle: "Top 10 Study Techniques to Score 300+ in JAMB | Dmultichoice Tutoring Nigeria",
    metaDescription: "Discover the top 10 study techniques used by Nigerian students who score above 300 in JAMB. Active recall, spaced repetition, past questions practice from real high-scorers across Nigeria.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy specialises in exam preparation strategies for Nigerian students from Lagos to Maiduguri at Dmultichoice Tutoring.",
    featuredImage: NIGERIA_IMG.student,
    readTime: 0,
    views: 892,
    publishedAt: "2026-06-02",
    ctaHeadline: "Get Premium Past Questions and Ebooks",
    ctaBody: "Access comprehensive JAMB past questions, study materials, and expert tutoring at Dmultichoice Tutoring. Learn safely from home.",
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "waec-2027-guide",
    slug: "waec-2027-success-guide-common-mistakes",
    title: "WAEC 2027 Success Guide: Common Mistakes Nigerian Students Must Avoid",
    excerpt: articleContents["waec-2027-guide"].excerpt,
    content: articleContents["waec-2027-guide"].content,
    category: "WAEC News",
    tags: ["WAEC 2027 Success Guide", "WAEC Timetable", "WAEC Past Questions", "Online Lessons Nigeria", "Nigerian Students"],
    focusKeyword: "WAEC 2027 Success Guide",
    seoTitle: "WAEC 2027 Success Guide: Common Nigerian Exam Mistakes | Dmultichoice Tutoring",
    metaDescription: "WAEC 2027 success guide for Nigerian students covering common mistakes. Expert tips from former WAEC examiners for students in Lagos, Abuja, Ibadan, Enugu.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy helps students prepare for WAEC, NECO, and other examinations across Nigeria at Dmultichoice Tutoring.",
    featuredImage: NIGERIA_IMG.school,
    readTime: 0,
    views: 654,
    publishedAt: "2026-06-03",
    ctaHeadline: "Get Premium WAEC Past Questions and Classes",
    ctaBody: "Prepare for WAEC 2027 with Dmultichoice Tutoring — expert Nigerian teachers, past questions, and comprehensive study materials online.",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "scholarships-nigerian-students",
    slug: "scholarships-nigerian-students-2027",
    title: "Scholarships Nigerian Students Should Watch This Year",
    excerpt: articleContents["scholarships-nigerian-students"].excerpt,
    content: articleContents["scholarships-nigerian-students"].content,
    category: "Scholarships",
    tags: ["Scholarships for Nigerian Students", "Study Abroad Scholarships", "University Admission", "JAMB Cut Off Marks", "Nigerian Education"],
    focusKeyword: "Scholarships for Nigerian Students",
    seoTitle: "Top Scholarships for Nigerian Students 2027 | Dmultichoice Tutoring Nigeria",
    metaDescription: "Discover the best scholarships for Nigerian students — BEA, MTN, Shell, NNPC, Chevening, DAAD, Commonwealth. Full guide for Nigerian applicants.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy researches educational opportunities for Nigerian students, including scholarships, admissions, and study abroad programmes.",
    featuredImage: NIGERIA_IMG.graduate,
    readTime: 0,
    views: 503,
    publishedAt: "2026-06-04",
    ctaHeadline: "Build a Strong Academic Foundation",
    ctaBody: "Qualify for top scholarships with excellent grades. Join Dmultichoice Tutoring coaching programmes. Learn safely from anywhere in Nigeria.",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "online-lessons-success",
    slug: "why-online-lessons-help-students-gain-admission",
    title: "Why Online Lessons Are Helping More Nigerian Students Gain Admission Into Top Universities",
    excerpt: articleContents["online-lessons-success"].excerpt,
    content: articleContents["online-lessons-success"].content,
    category: "Academic Success Stories",
    tags: ["Online Lessons Nigeria", "University Admission", "JAMB 2027", "Best JAMB Tutorial", "UNILAG Admission", "UI Admission", "Nigerian Education", "Safety"],
    focusKeyword: "Online Lessons Nigeria",
    seoTitle: "How Online Lessons Help Nigerian Students Gain University Admission | Dmultichoice Tutoring",
    metaDescription: "Discover how online tutoring helps Nigerian students gain admission into UNILAG, UI, UNIBEN, OAU and more. Safe learning from home across Nigeria.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy writes about academic success stories and online education for Nigerian students at Dmultichoice Tutoring.",
    featuredImage: NIGERIA_IMG.online,
    readTime: 0,
    views: 378,
    publishedAt: "2026-06-05",
    ctaHeadline: "Join Dmultichoice Tutoring Classes Today",
    ctaBody: "Flexible plans, expert tutors, comprehensive materials. Learn safely from home. Start your success story.",
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "insecurity-online-lessons",
    slug: "insecurity-nigeria-demand-online-lessons",
    title: "Rising Insecurity in Nigeria Driving Surge in Demand for Online Lessons",
    excerpt: articleContents["insecurity-online-lessons"].excerpt,
    content: articleContents["insecurity-online-lessons"].content,
    category: "Academic Success Stories",
    tags: ["Online Lessons Nigeria", "Nigerian Education", "Safety", "University Admission", "JAMB 2027", "Best JAMB Tutorial", "Nigerian Students", "Online Learning"],
    focusKeyword: "Insecurity Nigeria Online Learning",
    seoTitle: "How Insecurity in Nigeria is Boosting Online Learning Demand | Dmultichoice Tutoring",
    metaDescription: "Rising insecurity across Nigeria — kidnappings, banditry, abductions — is driving parents to choose safe online tutoring. Real stories from Abuja, Lagos, Kano, Kaduna.",
    author: "Lucky Joy",
    authorBio: "Lucky Joy covers education trends in Nigeria, including how security challenges are reshaping learning across the country.",
    featuredImage: NIGERIA_IMG.insecurity,
    readTime: 0,
    views: 2156,
    publishedAt: "2026-06-06",
    ctaHeadline: "Keep Your Child Safe While Learning",
    ctaBody: "Join Dmultichoice Tutoring — the safest way to learn from home. Expert tutors, no travel risks, JAMB, WAEC, and school exam preparation.",
    isFeatured: true,
    isTrending: true,
  },
];

newsArticles.forEach((a) => { a.readTime = readTime(a.content); });

// ── Utility Functions ─────────────────────────────────────────────────────────
export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
export function getArticlesByCategory(c: string): NewsArticle[] {
  return newsArticles.filter((a) => a.category === c);
}
export function getArticlesByTag(t: string): NewsArticle[] {
  return newsArticles.filter((a) => a.tags.some((x) => x.toLowerCase() === t.toLowerCase()));
}
export function getFeaturedArticles(): NewsArticle[] { return newsArticles.filter((a) => a.isFeatured); }
export function getTrendingArticles(): NewsArticle[] { return newsArticles.filter((a) => a.isTrending); }
export function getRelatedArticles(article: NewsArticle, limit = 6): NewsArticle[] {
  return newsArticles
    .filter((a) => a.id !== article.id)
    .map((a) => {
      let score = a.category === article.category ? 2 : 0;
      a.tags.forEach((t) => { if (article.tags.includes(t)) score += 1; });
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.article);
}
export function getCategorySlug(name: string): string {
  return name.toLowerCase().replace(/[\s&]+/g, "-").replace(/[^a-z0-9-]/g, "");
}
export function getCategoryName(slug: string): string | undefined {
  return newsCategories.find((c) => c.slug === slug)?.name;
}
export function slugToTag(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
