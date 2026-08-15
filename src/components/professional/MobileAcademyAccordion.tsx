import { useMemo } from "react";
import { Link } from "react-router-dom";
import { professionalSchools } from "../../data/professional-schools";

export default function MobileAcademyAccordion({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const academies = useMemo(() => professionalSchools, []);

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <div className="font-heading text-[#1A1A2E] font-semibold text-sm px-3">
        Professional Schools
      </div>

      <div className="mt-2 space-y-2">
        {academies.map((academy) => (
          <details key={academy.slug} className="group px-3">
            <summary className="list-none cursor-pointer flex items-center justify-between py-3 text-[#1A1A2E] font-medium text-sm hover:text-[#C9921A] transition-colors">
              <span>{academy.title}</span>
              <span className="text-[#C9921A] text-xs">+</span>
            </summary>

            <div className="pb-3 space-y-2">
              {academy.courses?.length ? (
                academy.courses.slice(0, 8).map((course) => (
                  <Link
                    key={course.slug}
                    to={`/professional-schools/${academy.slug}/${course.slug}`}
                    onClick={() => onNavigate?.()}
                    className="block text-sm text-gray-600 hover:text-[#1A3C6E] hover:underline"
                  >
                    {course.title}
                  </Link>
                ))
              ) : (
                <div className="text-sm text-gray-600">
                  Courses coming soon.
                </div>
              )}

              <Link
                to={`/professional-schools/${academy.slug}`}
                onClick={() => onNavigate?.()}
                className="block text-sm text-[#1A3C6E] hover:underline pt-2"
              >
                View all →
              </Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
