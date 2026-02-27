// Central SEO metadata for site routes

export type RouteMeta = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

export const DEFAULT_META: RouteMeta = {
  title: "PCell - Training & Placement Cell, Shyam Lal College",
  description:
    "Shyam Lal College Training and Placement Cell connects students with industry opportunities and career guidance.",
  keywords: ["placement", "training", "career", "workshops", "Shyam Lal College"],
  image: "/pcell.webp",
};

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "PCell - Home",
    description: "Welcome to the Training and Placement Cell of Shyam Lal College.",
    keywords: ["home", "placement", "career"],
  },
  "/home": {
    title: "PCell - Home",
    description: "Welcome to the Training and Placement Cell of Shyam Lal College.",
    keywords: ["home", "placement"],
  },
  "/about": {
    title: "About PCell - Shyam Lal College",
    description: "Learn about the Training and Placement Cell and its mission.",
    keywords: ["about", "cell", "placement"],
  },
  "/drive": {
    title: "Drive - PCell",
    description: "Explore campus drives and placement opportunities.",
    keywords: ["drive", "recruitment", "placement"],
  },
  "/events": {
    title: "Events - PCell",
    description: "Upcoming events, workshops, and guest lectures.",
    keywords: ["events", "workshop", "guest"],
  },
  "/recruiter": {
    title: "Recruiter Portal - PCell",
    description: "Portal for recruiters to engage with Shyam Lal College students.",
    keywords: ["recruiter", "career", "jobs"],
  },
  "/team": {
    title: "Our Team - PCell",
    description: "Meet the team driving the placement initiatives.",
    keywords: ["team", "staff", "faculty"],
  },
  "/admin": {
    title: "Admin - PCell",
    description: "Administrative panel for site management.",
  },
  "/admin/login": {
    title: "Admin Login - PCell",
    description: "Login to manage drives, teams, and settings.",
  },
};
