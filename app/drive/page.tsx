"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Drive } from "@/types/drive";
import DriveDetailModal from "@/app/components/DriveDetailModal";
import ImageLightbox from "@/app/components/ImageLightbox";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaClock } from "react-icons/fa";

export default function DrivePage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [upcomingDrive, setUpcomingDrive] = useState<Drive | null>(null);
  const [pastDrives, setPastDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchDrives() {
      try {
        // Fetch upcoming drive
        const nextRes = await fetch("/api/drives/next");
        if (nextRes.ok) {
          const nextData = await nextRes.json();
          if (nextData.drive) {
            setUpcomingDrive(nextData.drive);
            startCountdown(nextData.drive.startDate);
          }
        }

        // Fetch past drives
        const pastRes = await fetch("/api/drives/past");
        if (pastRes.ok) {
          const pastData = await pastRes.json();
          setPastDrives(pastData.drives || []);
        }
       } catch (error) {
       } finally {
         setLoading(false);
       }
    }

    fetchDrives();

    return () => clearInterval(intervalId);

    function startCountdown(startDate: string) {
      const targetDate = new Date(startDate);

      function updateCountdown() {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(intervalId);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }

      updateCountdown();
      intervalId = setInterval(updateCountdown, 1000);
    }
  }, []);

  function getTypeLabel(type: string) {
    const labels: Record<string, string> = {
      placement: "Placement Drive",
      internship: "Internship Drive",
      ppt: "Pre-Placement Talk",
      other: "Other Event",
    };
    return labels[type] || type;
  }

  if (loading) {
    return (
      <main className="w-full py-25 sm:py-10 md:py-14">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37322F]"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="w-full py-25 sm:py-10 md:py-14">
        {/* Hero Section */}
        <section className="w-full px-4 sm:px-5 md:px-10 pt-6 sm:pt-10 md:pt-14 lg:pt-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-2xl sm:rounded-3xl border border-[rgba(55,50,47,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(55,50,47,0.14)] bg-[#F7F1E8] px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-[#37322F]">
                    Placement Drives
                  </div>

                  <h1 className="mt-3 sm:mt-4 font-(--font-yrsa) text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] tracking-wide leading-[1.1] sm:leading-[1.05] text-[#37322F]">
                    Campus Placement Drives & Career Opportunities
                  </h1>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#605A57] max-w-xl">
                    Explore upcoming and past placement drives conducted by the Training & Placement Cell, connecting students with leading recruiters, internships, and career-defining opportunities.
                  </p>

                  <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      href="https://www.slc.du.ac.in/centre/TPC"
                      className="h-10 sm:h-11 w-full sm:w-auto px-5 sm:px-6 rounded-full bg-[#37322F] text-white text-sm font-semibold flex items-center justify-center hover:bg-[#2A2520] transition-colors active:scale-95"
                    >
                      View Drive Reports
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
                      On-Campus Drives
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                      Pre-Placement Talks
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                      Internship Drives
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#37322F]">
                      Industry Partners
                    </span>
                  </div>
                </div>

                {/* Right - Upcoming Drive Card */}
                <div className="relative">
                  {upcomingDrive ? (
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F7F1E8] via-white to-[#F7F1E8] p-4 sm:p-6 md:p-8 h-full flex flex-col">
                      {/* Event Type Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#37322F] text-white px-3 py-1 text-xs font-medium">
                          <FaClock size={12} />
                          {getTypeLabel(upcomingDrive.type)}
                        </span>
                        <span className="text-xs text-[#605A57] font-medium">
                          Upcoming
                        </span>
                      </div>

                      {/* Event Title */}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#37322F] mb-2">
                        {upcomingDrive.title}
                      </h2>

                      {/* Event Description */}
                      {upcomingDrive.description && (
                        <p className="text-sm text-[#605A57] mb-4 line-clamp-2">
                          {upcomingDrive.description}
                        </p>
                      )}

                      {/* Event Photo */}
                      {upcomingDrive.imageUrl && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img
                            src={upcomingDrive.imageUrl}
                            alt={upcomingDrive.title}
                            className="w-full h-48 sm:h-56 object-cover"
                          />
                        </div>
                      )}

                      {/* Companies */}
                      {upcomingDrive.companies.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-[#605A57] mb-2">Participating Companies:</p>
                          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {upcomingDrive.companies.slice(0, 6).map((company) => {
                              const logoUrl = company.logoImage || company.logoUrl;
                              return (
                                <div 
                                  key={company.id} 
                                  className="flex-shrink-0 flex flex-col items-center"
                                >
                                  <div 
                                    className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-white border border-[rgba(55,50,47,0.12)] shadow-sm"
                                    title={company.name}
                                  >
                                    {logoUrl ? (
                                      <img
                                        src={logoUrl}
                                        alt={company.name}
                                        className="w-[85%] h-[85%] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                        onError={(e) => {
                                          // Hide broken image and show fallback
                                          (e.target as HTMLImageElement).style.display = 'none';
                                          const parent = (e.target as HTMLImageElement).parentElement;
                                          if (parent) {
                                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#37322F] font-bold text-xl">${company.name.charAt(0).toUpperCase()}</div>`;
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-[#37322F] font-bold text-xl">
                                        {company.name.charAt(0).toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <span className="mt-1.5 text-[10px] text-[#605A57] text-center max-w-[80px] truncate">
                                    {company.name}
                                  </span>
                                </div>
                              );
                            })}
                            {upcomingDrive.companies.length > 6 && (
                              <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-[#F7F1E8] border border-[rgba(55,50,47,0.12)] text-[#37322F] font-semibold text-sm">
                                  +{upcomingDrive.companies.length - 6}
                                </div>
                                <span className="mt-1.5 text-[10px] text-[#605A57]">more</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Event Details */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-[#605A57]">
                          <FaCalendarAlt className="text-[#37322F]" />
                          <span>
                            {new Date(upcomingDrive.startDate).toLocaleDateString(undefined, {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#605A57]">
                          <FaClock className="text-[#37322F]" />
                          <span>
                            {new Date(upcomingDrive.startDate).toLocaleTimeString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {upcomingDrive.location && (
                          <div className="flex items-center gap-2 text-sm text-[#605A57]">
                            <FaMapMarkerAlt className="text-[#37322F]" />
                            <span>{upcomingDrive.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Countdown Timer */}
                      <div className="mt-auto">
                        <p className="text-xs text-[#605A57] mb-3 text-center">
                          Event Starts In
                        </p>
                        <div className="grid grid-cols-4 gap-2 sm:gap-3">
                          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#37322F]">
                              {countdown.days.toString().padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs text-[#605A57] uppercase tracking-wider">
                              Days
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#37322F]">
                              {countdown.hours.toString().padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs text-[#605A57] uppercase tracking-wider">
                              Hours
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#37322F]">
                              {countdown.minutes.toString().padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs text-[#605A57] uppercase tracking-wider">
                              Mins
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#37322F]">
                              {countdown.seconds.toString().padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs text-[#605A57] uppercase tracking-wider">
                              Secs
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Registration Button */}
                      {upcomingDrive.registrationLink && (
                        <div className="mt-4 pt-4 border-t border-[rgba(55,50,47,0.1)]">
                          <a
                            href={upcomingDrive.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-10 sm:h-11 rounded-full bg-[#37322F] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#2A2520] transition-colors"
                          >
                            Register Now
                            <FaExternalLinkAlt size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F7F1E8] via-white to-[#F7F1E8] p-4 sm:p-6 md:p-8 h-full flex items-center justify-center min-h-[300px]">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-[#37322F] mb-2">
                          No Upcoming Drives
                        </h3>
                        <p className="text-sm text-[#605A57]">
                          Check back soon for new placement opportunities
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Drives Section */}
        {pastDrives.length > 0 && (
          <section className="w-full px-4 sm:px-5 md:px-10 pt-16 sm:pt-20 md:pt-24">
            <div className="mx-auto w-full max-w-6xl">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#37322F] mb-3">
                  Past Placement Drives
                </h2>
                <p className="text-sm sm:text-base text-[#605A57] max-w-2xl mx-auto">
                  Explore our successful placement drives and the companies that have recruited from our campus
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {pastDrives.map((drive) => (
                  <div
                    key={drive.id}
                    className="group rounded-2xl border border-[rgba(55,50,47,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow"
                  >
                    {/* Event Image */}
                    {drive.imageUrl ? (
                      <div
                        className="relative h-48 sm:h-56 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedDrive(drive)}
                      >
                        <img
                          src={drive.imageUrl}
                          alt={drive.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium">
                            Click to view
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 sm:h-56 bg-gradient-to-br from-[#F7F1E8] to-[#E8E2D9] flex items-center justify-center">
                        <span className="text-6xl">🎓</span>
                      </div>
                    )}

                    {/* Event Content */}
                    <div className="p-5 sm:p-6">
                      {/* Type Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F1E8] text-[#37322F] px-2.5 py-1 text-xs font-medium">
                          {getTypeLabel(drive.type)}
                        </span>
                        <span className="text-xs text-[#605A57]">
                          {new Date(drive.endDate).toLocaleDateString(undefined, {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-semibold text-[#37322F] mb-2 line-clamp-2">
                        {drive.title}
                      </h3>

                      {/* Description */}
                      {drive.description && (
                        <p className="text-sm text-[#605A57] mb-4 line-clamp-2">
                          {drive.description}
                        </p>
                      )}

                      {/* Companies */}
                      {drive.companies.length > 0 && (
                        <div className="pt-3 border-t border-[rgba(55,50,47,0.1)]">
                          <p className="text-xs text-[#605A57] mb-2">Companies:</p>
                          <div className="flex flex-wrap gap-2">
                            {drive.companies.slice(0, 4).map((company) => (
                              <div
                                key={company.id}
                                className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-[rgba(55,50,47,0.08)]"
                              >
                                {company.logoUrl ? (
                                  <img
                                    src={company.logoUrl}
                                    alt={company.name}
                                    className="h-4 w-auto object-contain"
                                  />
                                ) : (
                                  <span className="text-xs font-medium text-[#37322F]">
                                    {company.name}
                                  </span>
                                )}
                              </div>
                            ))}
                            {drive.companies.length > 4 && (
                              <span className="text-xs text-[#605A57] px-1">
                                +{drive.companies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Drive Detail Modal */}
      {selectedDrive && (
        <DriveDetailModal
          drive={selectedDrive}
          onClose={() => setSelectedDrive(null)}
          onImageClick={() => setZoomImage({ url: selectedDrive.imageUrl!, title: selectedDrive.title })}
        />
      )}

      {/* Image Zoom Lightbox */}
      {zoomImage && (
        <ImageLightbox
          imageUrl={zoomImage.url}
          title={zoomImage.title}
          onClose={() => setZoomImage(null)}
        />
      )}
    </>
  );
}