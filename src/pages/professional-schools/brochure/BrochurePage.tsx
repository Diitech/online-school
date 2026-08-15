import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import {
  getAcademyBySlug,
  getCourseBySlugs,
} from "../../../data/professional-schools";
import logo from "../../../assets/images/logo.jpeg";

function formatBrochureFallbackText(text?: string) {
  return text && text.trim().length ? text : "Content will be added soon.";
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="font-heading font-semibold text-[#1A1A2E] text-lg">
        {title}
      </div>
      <div className="mt-2 text-gray-700 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function BrochurePage() {
  const { academySlug, courseSlug } = useParams();

  const academy = useMemo(
    () => (academySlug ? getAcademyBySlug(academySlug) : undefined),
    [academySlug],
  );
  const course = useMemo(
    () =>
      academySlug && courseSlug
        ? getCourseBySlugs(academySlug, courseSlug)
        : undefined,
    [academySlug, courseSlug],
  );

  const websiteUrl = "https://tutoring.dmultichoice.com";
  const supportEmail = "support@dmultichoice.com";
  const admissionsEmail = "support@dmultichoice.com";

  if (!academy || !course) {
    return (
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <SEO title="Brochure not found" description="Brochure not found." />
        <h1 className="text-2xl font-bold text-[#1A1A2E]">
          Brochure not found
        </h1>
      </div>
    );
  }

  // Backend/static PDFs may not exist yet. We still provide a premium print/save experience.
  const handleDownload = () => {
    window.print();
  };

  const breakInsideAvoid: React.CSSProperties["breakInside"] = "avoid";

  return (
    <>
      <SEO
        title={`${course.title} Brochure — ${academy.title}`}
        description={`Download/view brochure for ${course.title}.`}
        keywords={`${academy.title}, ${course.title}, brochure`}
      />

      {/* Print-friendly layout */}
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[980px] mx-auto">
        {/* Top actions (hidden on print) */}
        <div className="no-print flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center bg-[#C9921A] text-white font-heading font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b07d16] transition-colors"
          >
            📄 Download PDF Brochure
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center bg-white text-[#1A3C6E] border border-[#1A3C6E]/20 font-heading font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1A3C6E]/5 transition-colors"
          >
            🖨️ Print / Save as PDF
          </button>

          <Link
            to={`/professional-schools/${academy.slug}/${course.slug}`}
            className="inline-flex items-center justify-center text-[#1A3C6E] font-heading font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Back to course
          </Link>
        </div>

        <div
          className="mt-6 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden print:shadow-none"
          style={{ breakInside: breakInsideAvoid }}
        >
          {/* Cover */}
          <div className="p-8 bg-gradient-to-b from-[#1A3C6E] to-[#0f2541] text-white relative">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-[70%]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Dmultichoice"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-white/80">
                      DMULTICHOICE PROFESSIONAL TRAINING INSTITUTE
                    </div>
                    <div className="font-heading font-bold text-xl">
                      Dmultichoice
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full text-xs">
                    Professional Certificate Included
                  </div>
                  <h1 className="mt-4 font-heading font-bold text-3xl sm:text-4xl leading-tight">
                    {course.title}
                  </h1>
                  <div className="mt-2 text-white/90 font-heading font-semibold">
                    {academy.title}
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    <div className="bg-white/10 rounded-2xl p-3">
                      <div className="text-xs text-white/80">Duration</div>
                      <div className="font-semibold">{course.duration}</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <div className="text-xs text-white/80">Learning Mode</div>
                      <div className="font-semibold">
                        {academy.learningModes.join(" / ")}
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <div className="text-xs text-white/80">Tuition</div>
                      <div className="font-semibold">{course.tuition}</div>
                    </div>
                  </div>

                  <div className="mt-5 text-sm text-white/85">
                    Empowering Careers Through Practical Professional Education
                  </div>
                </div>
              </div>

              {/* Placeholder professional image */}
              <div className="hidden sm:block w-[220px] h-[160px] rounded-3xl bg-white/10 border border-white/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/80 font-heading">
                  Course Image
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/70">
              Website: {websiteUrl} • Support: {supportEmail} • Admissions:{" "}
              {admissionsEmail}
            </div>
          </div>

          {/* Table of contents */}
          <div className="p-8">
            <div className="font-heading font-semibold text-[#1A1A2E] text-xl">
              Table of Contents
            </div>
            <ol className="mt-3 text-gray-700 text-sm space-y-2 list-decimal pl-5">
              <li>
                <a href="#welcome" className="text-[#1A3C6E] hover:underline">
                  Welcome Message
                </a>
              </li>
              <li>
                <a href="#overview" className="text-[#1A3C6E] hover:underline">
                  Course Overview
                </a>
              </li>
              <li>
                <a
                  href="#objectives"
                  className="text-[#1A3C6E] hover:underline"
                >
                  Learning Objectives
                </a>
              </li>
              <li>
                <a
                  href="#curriculum"
                  className="text-[#1A3C6E] hover:underline"
                >
                  Weekly Curriculum
                </a>
              </li>
              <li>
                <a href="#projects" className="text-[#1A3C6E] hover:underline">
                  Practical Projects
                </a>
              </li>
              <li>
                <a href="#tools" className="text-[#1A3C6E] hover:underline">
                  Tools & Software
                </a>
              </li>
              <li>
                <a href="#admission" className="text-[#1A3C6E] hover:underline">
                  Admission Requirements
                </a>
              </li>
              <li>
                <a
                  href="#registration"
                  className="text-[#1A3C6E] hover:underline"
                >
                  Registration
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#1A3C6E] hover:underline">
                  FAQs
                </a>
              </li>
            </ol>

            {/* Content */}
            <div id="welcome" />
            <Section title="Welcome Message">
              Welcome to {academy.title}. Under the guidance of experienced
              instructors, you will gain practical skills through weekly
              modules, hands-on tasks, and a capstone deliverable that
              strengthens career readiness.
            </Section>

            <div id="overview" />
            <Section title="Course Overview">
              {formatBrochureFallbackText(course.curriculum.overview)}
              <div className="mt-3 font-semibold text-[#1A3C6E]">
                Industry demand
              </div>
              <div className="mt-1">
                This programme is designed to build competencies aligned with
                current industry expectations—so you can deliver real work, not
                just theory.
              </div>
              <div className="mt-3 font-semibold text-[#1A3C6E]">
                Career opportunities
              </div>
              <div className="mt-1">
                {course.careerOpportunities.join(", ")}
              </div>
            </Section>

            <div id="objectives" />
            <Section title="Learning Objectives">
              <ul className="list-disc pl-5 space-y-1">
                {course.learningOutcomes.map((o, idx) => (
                  <li key={`${o}-${idx}`}>{o}</li>
                ))}
              </ul>
            </Section>

            <div id="curriculum" />
            <Section title="Detailed Weekly Timetable">
              <div className="space-y-3">
                {course.curriculum.weeklyModules.map((m) => (
                  <div
                    key={m.week}
                    className="rounded-2xl border border-gray-100 p-3"
                  >
                    <div className="font-semibold text-[#1A1A2E]">
                      Week {m.week} — {m.topic}
                    </div>
                    {m.details?.length ? (
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        {m.details.map((d, idx) => (
                          <li key={`${m.week}-${idx}`}>{d}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-2 text-gray-500 text-sm">
                        Topics will be added soon.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <div id="projects" />
            <Section title="Course Projects & Assessments">
              {course.projects?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {course.projects.map((p, idx) => (
                    <li key={`${p}-${idx}`}>{p}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  You’ll complete practical projects and weekly assessments
                  designed for real industry outcomes (capstone included).
                </div>
              )}
            </Section>

            <div id="tools" />
            <Section title="Tools & Software">
              {course.toolsSoftware?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {course.toolsSoftware.map((t, idx) => (
                    <li key={`${t}-${idx}`}>{t}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  Tools will be finalized for your cohort. Register to receive
                  the exact software/hardware checklist.
                </div>
              )}
            </Section>

            <div id="admission" />
            <Section title="Admission Requirements">
              {course.admissionRequirements?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {course.admissionRequirements.map((r, idx) => (
                    <li key={`${r}-${idx}`}>{r}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  Admission requirements for this course are currently being
                  finalized. Register to receive the full checklist via
                  WhatsApp/email.
                </div>
              )}
            </Section>

            <div id="registration" />
            <Section title="Registration">
              <div className="mt-2">
                Tuition: <span className="font-semibold">{course.tuition}</span>{" "}
                • Duration:{" "}
                <span className="font-semibold">{course.duration}</span>
              </div>

              <div className="mt-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="font-semibold text-[#1A1A2E]">
                  QR Code to Registration
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  (Printable brochure: QR placeholder — will be refined when
                  brochure PDF assets are provided.)
                </div>
                <div className="mt-3 inline-flex items-center justify-center w-32 h-32 bg-white border border-gray-200 rounded-xl">
                  QR
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  Register:{" "}
                  <a
                    className="text-[#1A3C6E] hover:underline"
                    href={`/professional-schools/${academy.slug}/${course.slug}?register=1`}
                  >
                    /professional-schools/{academy.slug}/{course.slug}
                    ?register=1
                  </a>
                </div>
              </div>
            </Section>

            <div id="faq" />
            <Section title="FAQs">
              <div className="space-y-3">
                {(course.faqs || []).slice(0, 10).map((f, idx) => (
                  <div key={`${f.q}-${idx}`}>
                    <div className="font-semibold text-[#1A1A2E]">{f.q}</div>
                    <div className="mt-1">{f.a}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Back cover */}
          <div className="px-8 pb-10">
            <div className="rounded-3xl bg-[#0f2541] text-white p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={logo}
                    alt="Dmultichoice"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-heading font-bold text-xl">
                    Dmultichoice Professional Training Institute
                  </div>
                  <div className="mt-2 text-white/80 text-sm">
                    Website: www.dmultichoice.com • Email: {supportEmail}
                    <br />
                    WhatsApp: (configurable) • Office Address: (configurable)
                  </div>
                  <div className="mt-4 text-sm text-white/90 font-semibold">
                    Take the next step in your career. Enrol today.
                  </div>
                </div>

                <div className="hidden sm:block w-28 h-28 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/70">
                  QR
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* small stylesheet tweaks */}
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print\\:shadow-none { box-shadow: none !important; }
          }
          .no-print { }
        `}</style>
      </div>
    </>
  );
}
