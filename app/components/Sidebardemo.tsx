"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconCalendar,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import AdminTeam from "@/app/admin/team";
import AdminDrives from "@/app/admin/drives";
import AdminEvents from "@/app/admin/events";
import { useRouter } from "next/navigation";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"drives" | "team" | "events">("drives");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (section === "team" || section === "drives" || section === "events") {
      setActiveSection(section);
    }
  }, []);

  const links = [
    {
      label: "Drives",
      href: "#",
      onClick: () => {
        setActiveSection("drives");
        window.history.replaceState(null, "", "?section=drives");
      },
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Events",
      href: "#",
      onClick: () => {
        setActiveSection("events");
        window.history.replaceState(null, "", "?section=events");
      },
      icon: (
        <IconCalendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Team",
      href: "#",
      onClick: () => {
        setActiveSection("team");
        window.history.replaceState(null, "", "?section=team");
      },
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => {
        // Clear admin auth (adjust keys if you use different ones)
        localStorage.removeItem("admin-auth");
        document.cookie = "admin-auth=; Max-Age=0; path=/";

        // Redirect to login or home
        router.push("/admin/login");
      },
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-9xl flex-1 flex-col overflow-hidden  border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Traning And Placement Cell",
                href: "#",
                icon: (
                  <img
                    src="/pcell.webp"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard activeSection={activeSection} />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Traning And Placement Cell
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

type DashboardProps = {
  activeSection: "drives" | "team" | "events";
};

const Dashboard = ({ activeSection }: DashboardProps) => {
  return (
    <div className="flex flex-1 pt-30">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 overflow-y-auto dark:border-neutral-700 dark:bg-neutral-900">

        {activeSection === "drives" && (
          <section id="drives" className="space-y-6">
            <AdminDrives />
          </section>
        )}

        {activeSection === "team" && (
          <section id="team" className="space-y-6">
            <AdminTeam />
          </section>
        )}

        {activeSection === "events" && (
          <section id="events" className="space-y-6">
            <AdminEvents />
          </section>
        )}

      </div>
    </div>
  );
};
