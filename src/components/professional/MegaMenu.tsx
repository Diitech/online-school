import { useMemo } from "react";
import { Link } from "react-router-dom";
import { professionalSchools } from "../../data/professional-schools";

export default function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  const academies = useMemo(() => professionalSchools, []);

  return (
    <div className="absolute left-0 top-full w-full md:w-auto">
      <div className="mt-2 bg-white/95 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl overflow-hidden max-w-[1100px]">
        <div className="p-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {academies.map((academy) => (
              <div key={academy.slug} className="min-w-[240px]">
                <Link
                  to={`/professional-schools/${academy.slug}`}
                  onClick={() => onNavigate?.()}
                  className="block font-heading font-semibold text-[#1A1A2E] hover:text-[#C9921A] transition-colors"
                >
                  {academy.title}
                </Link>

                {academy.courses?.length ? (
                  <div className="mt-3 space-y-2">
                    {academy.courses.slice(0, 4).map((course) => (
                      <Link
                        key={course.slug}
                        to={`/professional-schools/${academy.slug}/${course.slug}`}
                        onClick={() => onNavigate?.()}
                        className="block text-sm text-gray-600 hover:text-[#1A3C6E] hover:underline"
                      >
                        {course.title}
                      </Link>
                    ))}
                    {academy.courses.length > 4 ? (
                      <div className="text-xs text-gray-500">
                        + {academy.courses.length - 4} more
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-gray-600">
                    Courses coming soon.
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="text-xs text-gray-500">
              Enroll in your course and get onboarding support.
            </div>
            <Link
              to="/professional-schools"
              onClick={() => onNavigate?.()}
              className="text-sm font-semibold text-[#C9921A] hover:underline"
            >
              View all →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
