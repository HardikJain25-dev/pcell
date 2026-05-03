"use client";

import DefaultSwapy from "../components/ui/DefaultSwapy";
import Logo from "../components/ui/Logo";

export default function Page() {
  return (
    <>
      <main className="min-h-screen w-full flex flex-col items-center justify-center mt-40 p-8">
        <div className="max-w-7xl text-center">
          <h1 className="pb-10 font-libre text-[42px] xs:text-[54px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-[300] mb-4 sm:mb-6 tracking-wide leading-[1.05] text-[#37322F]">
            Training and Placement Cell
          </h1>
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-[820px] rounded-3xl border border-[rgba(55,50,47,0.12)] bg-white/85 backdrop-blur-xl px-5 py-5 sm:px-7 sm:py-7 md:px-10 md:py-9 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-6">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.14)] bg-[#F7F1E8] px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wide text-[#37322F]">
                      Training & Placement Cell
                    </div>
                    <div className="mt-2 text-sm sm:text-base font-semibold text-[#37322F]">
                      Shyam Lal College, University of Delhi
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-[#605A57]">
                      Enabling career growth through structured training,
                      industry exposure, and campus recruitment.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.14)] bg-white px-3 py-1 text-xs font-medium text-[#37322F]">
                      Internships
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.14)] bg-white px-3 py-1 text-xs font-medium text-[#37322F]">
                      Placements
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.14)] bg-white px-3 py-1 text-xs font-medium text-[#37322F]">
                      Training
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.14)] bg-white px-3 py-1 text-xs font-medium text-[#37322F]">
                      Industry Connect
                    </span>
                  </div>
                </div>

                {/* Body copy */}
                <div className="text-left">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#37322F]">
                    Welcome to the Training & Placement Cell of Shyam Lal
                    College. We are committed to shaping career-ready
                    individuals by bridging the gap between academic learning
                    and industry expectations. Through a focused approach that
                    combines skill development, internship facilitation and
                    placement support, we ensure that students are well-prepared
                    to navigate an increasingly competitive professional
                    landscape.
                  </p>
                  <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-[#37322F]">
                    Our initiatives are designed to provide students with
                    meaningful exposure to real-world opportunities. From
                    curated training sessions and internship opportunities to
                    structured placement drives, the Cell works consistently to
                    enhance both competence and confidence. <br />
                    Our flagship event, PROSPECT, stands as a testament to these
                    efforts, connecting students with reputed organizations and
                    offering access to diverse career pathways. With strong
                    industry collaborations and the dedicated efforts of our
                    faculty, student coordinators and recruiters, we continue to
                    build a dynamic and inclusive placement ecosystem. We aim
                    not only to facilitate employment but also to empower
                    students with the clarity, skills and professionalism
                    required to excel in their chosen careers.
                  </p>
                </div>

                {/* Quick action strip */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-[rgba(55,50,47,0.12)] bg-[#F7F1E8]/60 px-4 py-3">
          <div className="text-xs font-semibold tracking-wide text-[#37322F]">For Students</div>
          <div className="mt-1 text-xs sm:text-sm text-[#605A57]">Training, internships, drives & guidance.</div>
        </div>
        <div className="rounded-2xl border border-[rgba(55,50,47,0.12)] bg-[#F7F1E8]/60 px-4 py-3">
          <div className="text-xs font-semibold tracking-wide text-[#37322F]">For Recruiters</div>
          <div className="mt-1 text-xs sm:text-sm text-[#605A57]">Hire skilled graduates & interns.</div>
        </div>
        <div className="rounded-2xl border border-[rgba(55,50,47,0.12)] bg-[#F7F1E8]/60 px-4 py-3">
          <div className="text-xs font-semibold tracking-wide text-[#37322F]">Our Focus</div>
          <div className="mt-1 text-xs sm:text-sm text-[#605A57]">Prepare → Apply → Get Hired.</div>
        </div>
      </div> */}
              </div>
            </div>
          </div>
        </div>
        <DefaultSwapy />
        <section className="w-full max-w-6xl mt-14 sm:mt-20 px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.14)] bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#37322F]">
              Our Recruiters
            </div>
            <h2 className="mt-4 font-[var(--font-yrsa)] text-2xl sm:text-3xl md:text-4xl font-[300] tracking-wide text-[#37322F]">
              Recruiters Who Have Engaged With Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#605A57] max-w-2xl mx-auto">
              We collaborate with leading organizations across domains to
              provide internships and placement opportunities for our students.
            </p>
          </div>

          <div className="w-full rounded-3xl border border-[rgba(55,50,47,0.12)] bg-white/85 backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.08)] p-5 sm:p-7 md:p-10">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {[
                { name: "Recruiter 1", src: "/aboutlogo/accenture.png" },
                { name: "Recruiter 2", src: "/aboutlogo/Zomato.png" },
                { name: "Recruiter 3", src: "/aboutlogo/EY.png" },
                { name: "Recruiter 4", src: "/aboutlogo/Deloitte.png" },
                { name: "Recruiter 5", src: "/aboutlogo/HCLTECH.png" },
                {
                  name: "Recruiter 6",
                  src: "/aboutlogo/Tata_Consultancy_Services.png",
                },
                { name: "Recruiter 7", src: "/aboutlogo/Tech Mahindra.png" },
                { name: "Recruiter 8", src: "/aboutlogo/carehealth.png" },
                { name: "Recruiter 9", src: "/aboutlogo/rupeek.png" },
                { name: "Recruiter 10", src: "/aboutlogo/upriver.png" },
                { name: "Recruiter 11", src: "/aboutlogo/ijaipuria.jpeg" },
                { name: "Recruiter 12", src: "/aboutlogo/ca.png" },
              ].map((logo) => (
                <div
                  key={logo.name}
                  className="group relative flex items-center justify-center rounded-2xl border border-[rgba(55,50,47,0.10)] bg-white p-4 sm:p-5 h-20 sm:h-24 md:h-28 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#F7F1E8] to-white" />
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="relative z-10 max-h-10 sm:max-h-12 md:max-h-24 w-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-[#605A57] text-center sm:text-left">
                *Logos are representative and may include past or current
                recruiter partners.
              </p>
              <a
                href="/recruiter"
                className="inline-flex items-center gap-2 rounded-full bg-[#37322F] text-white px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-[#2A2520] transition-colors"
              >
                Explore Recruiter Zone
                <span className="text-white/80">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
