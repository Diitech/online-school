import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import {
  getCourseBySlugs,
  getAcademyBySlug,
} from "../../../data/professional-schools";

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-gray-700">
      {items.map((it, idx) => (
        <li key={`${it}-${idx}`} className="flex gap-2">
          <span className="mt-2 w-2 h-2 rounded-full bg-[#C9921A] shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CoursePage() {
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

  if (!academy || !course) {
    return (
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Course not found</h1>
      </div>
    );
  }

  // Static brochure viewer route (download/view handled by BrochurePage via PDF asset + print)
  const brochureViewerUrl = `/professional-schools/${academy.slug}/${course.slug}/brochure`;

  const ProspectusUrl = brochureViewerUrl;
  const ProgrammeGuideUrl = brochureViewerUrl;

  // Keep "download" button pointing to viewer as well (viewer offers PDF download + print)
  const brochureDownloadUrl = brochureViewerUrl;

  return (
    <>
      <SEO
        title={`${course.title} — ${academy.title}`}
        description={`${course.title} (${course.duration}). Tuition ${course.tuition}. Register and view curriculum, objectives, projects, tools, and FAQs.`}
        keywords={`${academy.title}, ${course.title}`}
      />
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <nav className="text-sm text-gray-500 mt-6">
          <Link
            to={`/professional-schools/${academy.slug}`}
            className="hover:underline"
          >
            {academy.title}
          </Link>{" "}
          / <span className="text-gray-700">{course.title}</span>
        </nav>

        {/* Hero */}
        <section className="py-8">
          <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] font-display">
                  {course.title}
                </h1>
                <p className="mt-3 text-gray-700 max-w-3xl">
                  {course.curriculum.overview}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-[#1A1A2E]">
                      {course.duration}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                    <div className="text-xs text-gray-500">Tuition</div>
                    <div className="font-semibold text-[#1A1A2E]">
                      {course.tuition}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                    <div className="text-xs text-gray-500">Learning Mode</div>
                    <div className="font-semibold text-[#1A1A2E]">
                      {academy.learningModes.join(" / ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="text-sm text-gray-600 font-heading font-semibold">
                  Course brochure
                </div>

                <div className="mt-3 grid gap-3">
                  <a
                    href={brochureDownloadUrl}
                    className="block w-full text-center bg-[#1A3C6E] text-white font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#132d4f] transition-colors duration-200"
                  >
                    <span className="block">📄 Download Course Brochure</span>
                    <span className="mt-1 block text-[12px] font-normal text-white/90 leading-snug">
                      Overview • Objectives • Curriculum • Projects • Tools
                    </span>
                  </a>

                  <a
                    href={ProspectusUrl}
                    className="block w-full text-center bg-white text-[#1A3C6E] border border-[#1A3C6E]/20 font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#1A3C6E]/5 transition-colors duration-200"
                  >
                    <span className="block">📘 View Course Prospectus</span>
                    <span className="mt-1 block text-[12px] font-normal text-[#1A3C6E]/80 leading-snug">
                      Weekly Plan • Labs • Admission • Careers • FAQs
                    </span>
                  </a>

                  <a
                    href={ProgrammeGuideUrl}
                    className="block w-full text-center bg-white text-[#1A3C6E] border border-[#1A3C6E]/20 font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#1A3C6E]/5 transition-colors duration-200"
                  >
                    <span className="block">📥 Download Programme Guide</span>
                    <span className="mt-1 block text-[12px] font-normal text-[#1A3C6E]/80 leading-snug">
                      Tuition • Payment Plans • Registration • Timeline •
                      Support
                    </span>
                  </a>
                </div>

                <div className="mt-4 text-xs text-gray-500 leading-relaxed">
                  Brochure download generates a premium PDF with schedule,
                  tools, objectives, assessments, projects, and registration
                  details.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="pb-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
              <h2 className="text-xl font-heading font-semibold text-[#1A1A2E]">
                Learning Objectives
              </h2>
              <TextList items={course.learningOutcomes} />

              <h2 className="text-xl font-heading font-semibold text-[#1A1A2E] mt-8">
                Admission Requirements
              </h2>
              <TextList
                items={
                  course.admissionRequirements?.length
                    ? course.admissionRequirements
                    : [
                        "Admission requirements for this course are currently being finalized.\nYou can register now to receive the complete checklist via WhatsApp/email.",
                        "Typical requirements include: valid WAEC/NECO results (or qualification proof), basic ID, and payment verification.",
                        "If you’re unsure, contact us for a quick eligibility check — we’ll respond within 24 hours.",
                      ]
                }
              />

              <h2 className="text-xl font-heading font-semibold text-[#1A1A2E] mt-8">
                Weekly Curriculum
              </h2>
              <div className="mt-4 space-y-4">
                {course.curriculum.weeklyModules.map((m) => (
                  <div
                    key={m.week}
                    className="rounded-xl border border-gray-100 bg-white/60 p-4"
                  >
                    <div className="font-semibold text-[#1A1A2E]">
                      Week {m.week}: {m.topic}
                    </div>
                    {m.details?.length ? (
                      <div className="mt-2 text-gray-700 text-sm">
                        <ul className="list-disc pl-5 space-y-1">
                          {m.details.map((d, idx) => (
                            <li key={`${m.week}-${idx}`}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-heading font-semibold text-[#1A1A2E] mt-8">
                Practical Projects & Assessments
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {(course.projects?.length
                  ? course.projects
                  : [
                      "You’ll complete practical projects built around real industry workflows (capstone included).",
                      "Assessments are designed as short weekly checkpoints + final project presentation.",
                      "Join now to get the full project breakdown when the curriculum assets are published.",
                    ]
                ).map((p, idx) => (
                  <div
                    key={`${p}-${idx}`}
                    className="rounded-xl border border-gray-100 bg-white/60 p-4"
                  >
                    <div className="text-sm text-[#1A1A2E] font-semibold">
                      {idx + 1}. {p}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
              {/* Tuition section */}
              <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                <div className="text-xs text-gray-500">Tuition Fee</div>
                <div className="mt-1 text-2xl font-heading font-bold text-[#C9921A]">
                  {course.tuition}
                </div>

                <div className="mt-3 grid gap-2">
                  <a
                    href={brochureDownloadUrl}
                    className="block w-full text-center bg-[#C9921A] text-white font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#b07d16] transition-colors duration-200"
                  >
                    📄 Download Brochure (Tuition)
                  </a>
                  <div className="text-xs text-gray-500">
                    Payment options and timetable are included inside the
                    premium PDF.
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-semibold text-[#1A1A2E] text-lg mt-6">
                Registration
              </h3>
              <p className="text-gray-700 mt-2 text-sm">
                Register and select your academy + course.
              </p>

              <div className="mt-5">
                <Link
                  to={`/professional-schools/${academy.slug}/${course.slug}?register=1`}
                  className="block w-full text-center bg-[#1A3C6E] text-white font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#132d4f] transition-colors duration-200"
                >
                  Register Now
                </Link>
              </div>

              {/* Registration brochure button location requirement */}
              <div className="mt-4">
                <a
                  href={ProgrammeGuideUrl}
                  className="block w-full text-center bg-white text-[#1A3C6E] border border-[#1A3C6E]/20 font-heading font-semibold px-5 py-3 rounded-lg hover:bg-[#1A3C6E]/5 transition-colors duration-200"
                >
                  📥 Download Programme Guide (Registration)
                </a>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-600">Tools & Software</div>
                <ul className="mt-3 space-y-2 text-gray-700">
                  {course.toolsSoftware?.length ? (
                    course.toolsSoftware.map((t, idx) => (
                      <li key={`${t}-${idx}`} className="flex gap-2">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#1A3C6E]" />
                        <span>{t}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm">
                      Tools will be finalized for your cohort. Register to
                      receive the exact software/hardware checklist.
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-600">FAQs</div>
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  {(course.faqs?.length
                    ? course.faqs
                    : [{ q: "FAQs", a: "FAQs will be added soon." }]
                  )
                    .slice(0, 6)
                    .map((f, idx) => (
                      <div key={`${f.q}-${idx}`}>
                        <div className="font-semibold text-[#1A1A2E]">
                          {f.q}
                        </div>
                        <div className="mt-1">{f.a}</div>
                      </div>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
