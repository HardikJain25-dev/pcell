"use client";

import { Tabs } from "../tabs";

export function TabsDemo() {
  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block bg-[#F7F1E8] text-[#605A57] text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mr-1.5 sm:mr-2 mb-1.5 sm:mb-2 select-none">
      {children}
    </span>
  );

  const tabs = [
    {
      title: "Flagship Events",
      value: "flagship-events",
      content: (
        <div className="bg-[#F7F1E8] w-full h-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between text-[#37322F] relative overflow-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Flagship Events</h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
              Our flagship TPC initiatives that connect students with opportunities, industry exposure, and career guidance.
            </p>
            <div className="flex flex-wrap">
              <Tag>PROSPECT'25</Tag>
              <Tag>COMPITO'24</Tag>
              <Tag>Recruiter Connect</Tag>
              <Tag>Career Fair</Tag>
              <Tag>Opportunity Hub</Tag>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/prospect1.jpeg"
                alt="PROSPECT'25"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">PROSPECT'25</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Flagship career fair connecting students with recruiters, internships, and placement pathways.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/compito1.png"
                alt="COMPITO'24"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover justify-center"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">COMPITO'24</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Student engagement drive focused on skills, internships, and career readiness initiatives.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Seminars & Talks",
      value: "seminars-talks",
      content: (
        <div className="bg-[#F7F1E8] w-full h-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between text-[#37322F] relative overflow-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Seminars & Talks</h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
              Expert-led sessions to guide students on interviews, career planning, and current industry expectations.
            </p>
            <div className="flex flex-wrap">
              <Tag>Interview Preparation</Tag>
              <Tag>Career Guidance</Tag>
              <Tag>Industry Insights</Tag>
              <Tag>Higher Education</Tag>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/seminar1.jpeg"
                alt="How to Ace Interviews"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">How to Ace Interviews</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Actionable strategies on interviews, resume screening, and professional communication.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/seminar2.webp"
                alt="UPES Seminar"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">UPES Seminar</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Career orientation session highlighting emerging opportunities and skill requirements.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Workshops & Training",
      value: "workshops-training",
      content: (
        <div className="bg-[#F7F1E8] w-full h-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between text-[#37322F] relative overflow-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Workshops & Training</h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
              Hands-on training sessions to build placement-ready skills—aptitude, resume building, and communication.
            </p>
            <div className="flex flex-wrap">
              <Tag>Aptitude Training</Tag>
              <Tag>Resume Building</Tag>
              <Tag>Mock Interviews</Tag>
              <Tag>GD/PI Practice</Tag>
              <Tag>Soft Skills</Tag>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/workshop1.png"
                alt="ReactJS Workshop"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">Workshop</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Skill workshop to strengthen technical profile and project readiness for internships.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/workshop2.png"
                alt="Leadership Training"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">Leadership Training</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Training to improve confidence, teamwork, and workplace professionalism.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Drives & Fairs",
      value: "drives-fairs",
      content: (
        <div className="bg-[#F7F1E8] w-full h-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between text-[#37322F] relative overflow-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Drives & Fairs</h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
              On-campus drives and engagement fairs that help students explore roles and interact with recruiters.
            </p>
            <div className="flex flex-wrap">
              <Tag>Internship Drives</Tag>
              <Tag>Placement Drives</Tag>
              <Tag>Company Sessions</Tag>
              <Tag>Shortlisting</Tag>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/drive1.png"
                alt="Summer Internship Drive"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">Summer Internship Drive</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Internship opportunities with partner organizations across domains and roles.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex-1">
              <img
                src="/event/drive2.jpeg"
                alt="Annual Job Fair"
                className="mb-2 rounded w-full h-32 sm:h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget.style.display = "none");
                }}
              />
              <h3 className="font-semibold text-base sm:text-lg mb-1">Annual Job Fair</h3>
              <p className="text-xs sm:text-sm text-[#605A57]">Campus opportunity fair enabling recruiter-student interaction and drive participation.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[28rem] sm:h-[32rem] md:h-[36rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-6 sm:my-8 md:my-10">
      <Tabs tabs={tabs} />
    </div>
  );
}