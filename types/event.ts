export interface Event {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  location: string | null;
  type: "flagship" | "seminar" | "workshop" | "drive" | "fair";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  imageUrl: string | null;
  registrationLink: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: "flagship" | "seminar" | "workshop" | "drive" | "fair";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  imageUrl: string | null;
  registrationLink: string | null;
}
