import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { professionalSchools } from "../../data/professional-schools";

export default function ProfessionalSchoolsLanding() {
  return (
    <>
      <SEO
        title="Professional Schools"
        description="Explore Business School, Cybersecurity Academy, AI & Automation Academy, Data Analytics Academy, Software Development Academy, Digital Marketing Academy and more."
      />
      <div className="pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <section className="py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] font-display">
            Professional Schools
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">
            Choose an academy to view detailed course curriculum, tuition, and
            registration options.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-16">
          {professionalSchools.map((academy) => (
            <Link
              key={academy.slug}
              to={`/professional-schools/${academy.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow p-5"
            >
              <div className="text-[#1A1A2E] font-semibold font-heading">
                {academy.title}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {academy.tuitionOverview}
              </div>
              <div className="text-sm text-[#C9921A] mt-4 group-hover:underline">
                Explore →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
