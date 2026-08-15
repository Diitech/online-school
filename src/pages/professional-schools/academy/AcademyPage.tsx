import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { getAcademyBySlug } from "../../../data/professional-schools";
import type { Course } from "../../../data/professional-schools";

function CourseCard({
  course,
  academySlug,
}: {
  course: Course;
  academySlug: string;
}) {
  return (
    <Link
      to={`/professional-schools/${academySlug}/${course.slug}`}
      className="block rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow p-5"
    >
      <div className="font-heading font-semibold text-[#1A1A2E]">
        {course.title}
      </div>
      <div className="text-sm text-gray-600 mt-1">{course.duration}</div>
      <div className="text-sm text-gray-600 mt-2">
        Tuition: {course.tuition}
      </div>
      <div className="text-sm text-[#C9921A] mt-4">View course →</div>
    </Link>
  );
}

export default function AcademyPage() {
  const { academySlug } = useParams();
  const academy = useMemo(
    () => (academySlug ? getAcademyBySlug(academySlug) : undefined),
    [academySlug],
  );

  if (!academy) {
    return (
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Academy not found</h1>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${academy.title}`}
        description={`${academy.title} — detailed course curriculum, tuition, and registration options.`}
        keywords={academy.title}
      />
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <section className="py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] font-display">
            {academy.title}
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">
            {academy.hero.subheadline}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 pb-16">
          {academy.courses.length ? (
            academy.courses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                academySlug={academy.slug}
              />
            ))
          ) : (
            <div className="md:col-span-3 text-gray-700">
              Courses for this academy will appear here soon. Meanwhile, download the brochure and register to get priority access.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
