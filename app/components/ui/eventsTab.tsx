"use client";

import { useEffect, useState } from "react";
import { Tabs } from "../tabs";
import NextImageCompat from '../../libs/NextImageCompat';
import { Event } from "@/types/event";

export function TabsDemo() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      // Ensure data is an array
      const eventsArray = Array.isArray(data) ? data : [];
      setEvents(eventsArray);
      // console.log("Fetched events:", eventsArray); // For debugging
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-[28rem] sm:h-[32rem] md:h-[36rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-6 sm:my-8 md:my-10">
        <div className="flex items-center justify-center py-12">Loading events...</div>
      </div>
    );
  }

  // Handle case where events might be empty or not an array
  if (!Array.isArray(events)) {
    console.error("Events is not an array:", events);
    return (
      <div className="h-[28rem] sm:h-[32rem] md:h-[36rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-6 sm:my-8 md:my-10">
        <div className="flex items-center justify-center py-12">Error loading events data</div>
      </div>
    );
  }

  // Group events by type
  const groupedEvents = {
    "flagship-events": events.filter(event => event.type === "flagship"),
    "seminars-talks": events.filter(event => event.type === "seminar"),
    "workshops-training": events.filter(event => event.type === "workshop"),
    "drives-fairs": events.filter(event => event.type === "drive" || event.type === "fair")
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div className="flex items-center justify-center">
              {groupedEvents["flagship-events"].length > 0 ? (
                <div className="w-full max-w-md">
                  {groupedEvents["flagship-events"].map((event) => (
                    <div key={event.id} className="mb-6">
                      <NextImageCompat 
                        src={event.imageUrl || "/event/event1.avif"} 
                        alt={event.title} 
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="h-[260px] w-full rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-500">
                    No Image
                  </div>
                </div>
              )}
            </div>
            
             {/* Right side - Content */}
             <div className="space-y-4">
               <div>
                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Flagship Events</h2>
                 <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
                   Our flagship TPC initiatives that connect students with opportunities, industry exposure, and career guidance.
                 </p>
                 {groupedEvents["flagship-events"].length > 0 ? (
                   <div className="space-y-3">
                     {groupedEvents["flagship-events"].map((event) => (
                       <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                         <h3 className="font-medium text-[#37322F] mb-1">{event.title}</h3>
                         <p className="text-sm text-[#605A57] leading-relaxed">{event.description || 'No description available'}</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8">
                     <Tag>No flagship events</Tag>
                   </div>
                 )}
               </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div className="flex items-center justify-center">
              {groupedEvents["seminars-talks"].length > 0 ? (
                <div className="w-full max-w-md">
                  {groupedEvents["seminars-talks"].map((event) => (
                    <div key={event.id} className="mb-6">
                      <NextImageCompat 
                        src={event.imageUrl || "/event/seminar1.jpeg"} 
                        alt={event.title} 
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="h-[260px] w-full rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-500">
                    No Image
                  </div>
                </div>
              )}
            </div>
            
             {/* Right side - Content */}
             <div className="space-y-4">
               <div>
                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Seminars & Talks</h2>
                 <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
                   Expert-led sessions to guide students on interviews, career planning, and current industry expectations.
                 </p>
                 {groupedEvents["seminars-talks"].length > 0 ? (
                   <div className="space-y-3">
                     {groupedEvents["seminars-talks"].map((event) => (
                       <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                         <h3 className="font-medium text-[#37322F] mb-1">{event.title}</h3>
                         <p className="text-sm text-[#605A57] leading-relaxed">{event.description || 'No description available'}</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8">
                     <Tag>No seminars</Tag>
                   </div>
                 )}
               </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div className="flex items-center justify-center">
              {groupedEvents["workshops-training"].length > 0 ? (
                <div className="w-full max-w-md">
                  {groupedEvents["workshops-training"].map((event) => (
                    <div key={event.id} className="mb-6">
                      <NextImageCompat 
                        src={event.imageUrl || "/event/workshop1.png"} 
                        alt={event.title} 
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="h-[260px] w-full rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-500">
                    No Image
                  </div>
                </div>
              )}
            </div>
            
             {/* Right side - Content */}
             <div className="space-y-4">
               <div>
                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Workshops & Training</h2>
                 <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
                   Hands-on training sessions to build placement-ready skills—aptitude, resume building, and communication.
                 </p>
                 {groupedEvents["workshops-training"].length > 0 ? (
                   <div className="space-y-3">
                     {groupedEvents["workshops-training"].map((event) => (
                       <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                         <h3 className="font-medium text-[#37322F] mb-1">{event.title}</h3>
                         <p className="text-sm text-[#605A57] leading-relaxed">{event.description || 'No description available'}</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8">
                     <Tag>No workshops</Tag>
                   </div>
                 )}
               </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div className="flex items-center justify-center">
              {groupedEvents["drives-fairs"].length > 0 ? (
                <div className="w-full max-w-md">
                  {groupedEvents["drives-fairs"].map((event) => (
                    <div key={event.id} className="mb-6">
                      <NextImageCompat 
                        src={event.imageUrl || "/event/drive1.png"} 
                        alt={event.title} 
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div className="h-[260px] w-full rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-500">
                    No Image
                  </div>
                </div>
              )}
            </div>
            
             {/* Right side - Content */}
             <div className="space-y-4">
               <div>
                 <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Drives & Fairs</h2>
                 <p className="mb-3 sm:mb-4 text-sm sm:text-base text-[#605A57] max-w-xl">
                   On-campus drives and engagement fairs that help students explore roles and interact with recruiters.
                 </p>
                 {groupedEvents["drives-fairs"].length > 0 ? (
                   <div className="space-y-3">
                     {groupedEvents["drives-fairs"].map((event) => (
                       <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                         <h3 className="font-medium text-[#37322F] mb-1">{event.title}</h3>
                         <p className="text-sm text-[#605A57] leading-relaxed">{event.description || 'No description available'}</p>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8">
                     <Tag>No drives/fairs</Tag>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[48rem] sm:h-[42rem] md:h-[43rem] [perspective:2000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-6 sm:my-8 md:my-10">
      <Tabs tabs={tabs} />
    </div>
  );
}
