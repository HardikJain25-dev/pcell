"use client";

import Link from "next/link";
import { TabsDemo } from "../components/ui/eventsTab";

export default function Page() {
  return (
    <main className="w-full py-25 sm:py-10 md:py-14">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-5 md:px-10 pt-6 sm:pt-10 md:pt-14 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl sm:rounded-3xl border border-[rgba(55,50,47,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Left */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(55,50,47,0.14)] bg-[#F7F1E8] px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-[#37322F]">
                  TPC Events
                </div>

                <h1 className="mt-3 sm:mt-4 font-[var(--font-yrsa)] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-[300] tracking-wide leading-[1.1] sm:leading-[1.05] text-[#37322F]">
                  Events & Industry Engagement
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#605A57] max-w-xl">
                  Seminars, workshops, fairs, and flagship events organized by the Training & Placement Cell to prepare students for internships and placements.
                </p>

                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="https://www.slc.du.ac.in/centre/TPC"
                    className="h-10 sm:h-11 w-full sm:w-auto px-5 sm:px-6 rounded-full bg-[#37322F] text-white text-sm font-semibold flex items-center justify-center hover:bg-[#2A2520] transition-colors active:scale-95"
                  >
                    View Reports
                  </Link>

                  <Link
                    href="/contact"
                    className="h-10 sm:h-11 w-full sm:w-auto px-5 sm:px-6 rounded-full border border-[rgba(55,50,47,0.18)] bg-white/70 text-[#37322F] text-sm font-semibold flex items-center justify-center hover:bg-white transition-colors active:scale-95"
                  >
                    Contact TPC
                  </Link>
                </div>

                <div className="mt-5 sm:mt-6 md:mt-7 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                    Seminars
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                    Workshops
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                    Job Fairs
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                    Industry Talks
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="relative mt-6 md:mt-0 min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F7F1E8] via-white to-[#F7F1E8]" />

                {/* Decorative event poster / collage placeholder */}
                <div className="absolute inset-0 p-3 sm:p-4 md:p-5 lg:p-7">
                  <div className="h-full w-full grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                    {[
                      {
                        label: "Event Photo 1",
                        hint: "PROSPECT / Seminar",
                        src: "/event/event1.jpg",
                      },
                      {
                        label: "Event Photo 2",
                        hint: "Workshop",
                        src: "/event/event2.jpg",
                      },
                      {
                        label: "Event Photo 3",
                        hint: "Guest Session",
                        src: "/event/event3.jpg",
                      },
                      {
                        label: "Event Photo 4",
                        hint: "Drive / Fair",
                        src: "/event/event4.webp",
                      },
                    ].map((ph) => (
                      <div
                        key={ph.label}
                        className="group relative rounded-lg sm:rounded-xl overflow-hidden border border-[rgba(55,50,47,0.10)] bg-white"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F1E8] via-white to-[#F7F1E8]" />

                        <img
                          src={ph.src}
                          alt={ph.label}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />

                        {/* Fallback overlay (shows nicely even if images aren't added yet) */}
                        {/* <div className="absolute inset-0 grid place-items-center p-2">
                          <div className="text-center">
                            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#37322F] leading-tight">
                              {ph.label}
                            </div>
                            <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] md:text-xs text-[#605A57]">
                              {ph.hint}
                            </div>
                            <div className="mt-2 sm:mt-3 inline-flex items-center rounded-full border border-[rgba(55,50,47,0.16)] bg-white/70 px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wide text-[#37322F]">
                              Replace with image
                            </div>
                          </div>
                        </div> */}

                        {/* Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#37322F]/[0.03]" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 md:left-6 md:bottom-6 lg:left-8 lg:bottom-8">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#37322F] text-white px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-semibold shadow-[0_14px_40px_rgba(0,0,0,0.14)]">
                      PROSPECT'25 • COMPITO'24
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs / Events Content */}
      <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 px-4 sm:px-5 md:px-10 pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <TabsDemo />
        </div>
      </section>
    </main>
  );
}