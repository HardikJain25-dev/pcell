"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "../components/logoLoop";
import {
  GraduationCap,
  Users,
  Building2,
  Award,
  ArrowRight,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const imageLogos = [
  { src: "/logo/4.png", alt: "Company 4", href: "#", title: "Company 4" },
  { src: "/logo/5.png", alt: "Company 5", href: "#", title: "Company 5" },
  { src: "/logo/6.png", alt: "Company 6", href: "#", title: "Company 6" },
  { src: "/logo/7.png", alt: "Company 7", href: "#", title: "Company 7" },
  { src: "/logo/8.png", alt: "Company 8", href: "#", title: "Company 8" },
  { src: "/logo/9.png", alt: "Company 9", href: "#", title: "Company 9" },
  { src: "/logo/10.png", alt: "Company 10", href: "#", title: "Company 10" },
  { src: "/logo/11.png", alt: "Company 11", href: "#", title: "Company 11" },
  { src: "/logo/12.png", alt: "Company 12", href: "#", title: "Company 12" },
  { src: "/logo/13.png", alt: "Company 13", href: "#", title: "Company 13" },
  { src: "/logo/14.png", alt: "Company 14", href: "#", title: "Company 14" },
  { src: "/logo/15.png", alt: "Company 15", href: "#", title: "Company 15" },
  { src: "/logo/16.png", alt: "Company 16", href: "#", title: "Company 16" },
  { src: "/logo/17.png", alt: "Company 17", href: "#", title: "Company 17" },
  { src: "/logo/18.png", alt: "Company 18", href: "#", title: "Company 18" },
];

const stats = [
  { number: "50+", label: "Recruiting Partners", suffix: "" },
  { number: "500", label: "Students Placed", suffix: "+" },
  { number: "7.5", label: "Highest Package", suffix: "L" },
  { number: "95", label: "Placement Rate", suffix: "%" },
];

const whyRecruitCards = [
  {
    icon: GraduationCap,
    title: "Industry-Ready Training",
    description:
      "Our students undergo rigorous training including resume building, mock interviews, and skill development workshops to meet industry standards.",
  },
  {
    icon: Users,
    title: "Diverse Talent Pool",
    description:
      "Access graduates from Commerce, Humanities, and Science streams, bringing varied perspectives and skills to your organization.",
  },
  {
    icon: Building2,
    title: "Structured Process",
    description:
      "Experience a transparent, professionally coordinated recruitment process with dedicated TPC support at every stage.",
  },
  {
    icon: Award,
    title: "Proven Excellence",
    description:
      "Consistent track record of successful placements with top companies across various industries and domains.",
  },
];

export default function RecruitmentPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax section animation - only images fade, text stays static
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
          },
        });

        tl.add("start")
          .to(".bg-1", { opacity: 1 }, "start")
          .add("mid", ">")
          .to(".bg-1", { opacity: 0, ease: "none" }, "mid")
          .to(".bg-2", { opacity: 1, ease: "none" }, "mid")
          .add("end", ">")
          .to(".bg-2", { opacity: 0, ease: "none" }, "end")
          .to(".bg-3", { opacity: 1, ease: "none" }, "end");
      },
    });

    // Stats counter animation
    const statElements = statsRef.current?.querySelectorAll(".stat-number");
    statElements?.forEach((el) => {
      gsap.from(el, {
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Cards fade-up animation
    const cards = cardsRef.current?.querySelectorAll(".recruit-card");
    cards?.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="w-full bg-white/80">
      {/* HERO SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-24 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.14)] bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-[#37322F] mb-4 sm:mb-6">
                <Building2 size={14} />
                Corporate Partnerships
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#37322F] leading-tight lg:leading-[1.1] mb-4 sm:mb-6">
                Recruit Top Talent from{" "}
                <span className="text-[#605A57]">Shyam Lal College</span>
              </h1>

              <p className="text-base sm:text-lg text-[#605A57] max-w-xl mb-6 sm:mb-8 leading-relaxed">
                Partner with us to access skilled, industry-ready graduates from
                diverse academic backgrounds. Our Training & Placement Cell
                ensures a seamless recruitment experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="mailto:trainingandplacementcell@shyamlal.du.ac.in"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#37322F] text-white rounded-full text-sm sm:text-base font-semibold hover:bg-[#2A2520] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Partner With Us
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#why-recruit"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#37322F] text-[#37322F] rounded-full text-sm sm:text-base font-semibold hover:bg-[#37322F] hover:text-white transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/recurit/rec2.webp"
                  alt="Shyam Lal College Campus"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#37322F]/30 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3 max-w-[200px] sm:max-w-none">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F]" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#37322F]">
                    A+
                  </p>
                  <p className="text-xs text-[#605A57]">NAAC Grade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section
        ref={statsRef}
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-24 py-12 sm:py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 hover:bg-[#f0f0f0] transition-colors duration-300"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  <span className="stat-number">{stat.number}</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#605A57] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY RECRUIT FROM US */}
      {/* <section className="w- px-4 sm:px-6 lg:px-8 xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#37322F] mb-3 sm:mb-4">
              Why Recruit From Us?
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#37322F] mx-auto rounded-full"></div>
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {whyRecruitCards.map((card, index) => (
              <div
                key={index}
                className="recruit-card group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-[rgba(55,50,47,0.08)] hover:border-[rgba(55,50,47,0.2)] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-[#37322F] transition-colors duration-300">
                  <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#37322F] mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#605A57] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* WHY RECRUIT FROM US - DETAILED SECTION */}
      <section
        id="why-recruit"
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-24 py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#37322F] mb-4 sm:mb-6">
                Why Partner With Shyam Lal College?
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-[#37322F] rounded-full mb-6 sm:mb-8"></div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#37322F] mb-1">
                      Industry-Ready Training Programs
                    </h3>
                    <p className="text-sm text-[#605A57] leading-relaxed">
                      Our comprehensive training modules include resume building
                      workshops, mock interview sessions, communication skills
                      development, and domain-specific technical training to
                      ensure students meet industry standards from day one.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#37322F] mb-1">
                      Diverse Talent Pool
                    </h3>
                    <p className="text-sm text-[#605A57] leading-relaxed">
                      Access graduates from Commerce, Humanities, and Science
                      streams who bring varied perspectives, innovative
                      thinking, and multidisciplinary skills to your
                      organization. Our students are trained to adapt across
                      different roles and industries.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#37322F] mb-1">
                      End-to-End Support
                    </h3>
                    <p className="text-sm text-[#605A57] leading-relaxed">
                      From initial registration to final selections, our
                      dedicated Training & Placement Cell provides complete
                      support including venue arrangements, student
                      shortlisting, scheduling coordination, and post-placement
                      follow-ups.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F7F1E8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#37322F]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#37322F] mb-1">
                      Proven Track Record
                    </h3>
                    <p className="text-sm text-[#605A57] leading-relaxed">
                      Consistent placement success with top companies across IT,
                      Banking, Consulting, and FMCG sectors. Our alumni are
                      working in leading organizations and have proven their
                      excellence in diverse professional environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/recurit/rec3.jpg"
                  alt="Students at Shyam Lal College"
                  className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#37322F]/40 to-transparent"></div>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-[#37322F]">
                      500+
                    </p>
                    <p className="text-xs sm:text-sm text-[#605A57]">
                      Students Placed
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-[#37322F]">
                      50+
                    </p>
                    <p className="text-xs sm:text-sm text-[#605A57]">
                      Partner Companies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX SECTION */}
      <section
        ref={sectionRef}
        className="relative min-h-[70vh] lg:h-screen overflow-hidden"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1] m-4 sm:m-6 lg:m-10 rounded-2xl sm:rounded-3xl"></div>

        {/* Scroll-changing background */}
        <div className="absolute inset-0 m-4 sm:m-6 lg:m-10">
          <div
            className="parallax-bg bg-1 absolute inset-0 bg-cover bg-center transition-opacity duration-700 rounded-2xl sm:rounded-3xl"
            style={{ backgroundImage: "url(/recurit/rec2.webp)" }}
          />
          <div
            className="parallax-bg bg-2 absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 rounded-2xl sm:rounded-3xl"
            style={{ backgroundImage: "url(/recurit/rec3.jpg)" }}
          />
          <div
            className="parallax-bg bg-3 absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 rounded-2xl sm:rounded-3xl"
            style={{ backgroundImage: "url(/recurit/rec1.webp)" }}
          />
        </div>

        <div className="absolute z-10 inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto text-center lg:text-left">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 mb-3 sm:mb-4">
            Our Campus
          </span>

          <h1 className="parallax-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white max-w-4xl leading-tight mb-4 sm:mb-6 drop-shadow-lg">
            Recruit confident, industry-ready graduates
          </h1>

          <p className="parallax-sub max-w-xl text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 drop-shadow-md">
            Our Training & Placement Cell ensures a transparent and
            professionally coordinated recruitment process aligned with industry
            expectations.
          </p>

          <span className="parallax-meta text-xs sm:text-sm uppercase tracking-widest text-white/80">
            Shyam Lal College · University of Delhi
          </span>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-24 py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#37322F] mb-2 sm:mb-3">
              Trusted By Leading Companies
            </h2>
            <div className="w-12 sm:w-16 h-0.5 bg-[#37322F] mx-auto rounded-full"></div>
          </div>

          <LogoLoop
            logos={imageLogos}
            speed={80}
            direction="left"
            logoHeight={260}
            mobileLogoHeight={100}
            gap={48}
            hoverSpeed={0}
            scaleOnHover
            // grayscaleOnHover
            // showTooltip
            rows={1}
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Recruiting partners"
          />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-24 py-16 sm:py-20 lg:py-24 bg-[#F7F1E8]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[rgba(55,50,47,0.08)] text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#37322F] mb-3 sm:mb-4">
              Ready to Recruit?
            </h2>
            <p className="text-sm sm:text-base text-[#605A57] max-w-xl mx-auto mb-6 sm:mb-8">
              Partner with Shyam Lal College and access top-tier talent for your
              organization
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:trainingandplacementcell@shyamlal.du.ac.in"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#37322F] text-white rounded-full text-sm sm:text-base font-semibold hover:bg-[#2A2520] transition-all duration-300 hover:scale-105"
              >
                <Mail size={18} />
                Contact TPC Team
              </a>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[rgba(55,50,47,0.1)]">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#605A57]">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Shyam Lal College, University of Delhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
