"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { FaEdit, FaTrash, FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import AddEventModal from "./AddEventModal";

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      // Ensure data is an array
      const eventsArray = Array.isArray(data) ? data : [];
      setEvents(eventsArray);
     } catch (err) {
       setEvents([]); // Set to empty array on error
     } finally {
       setLoading(false);
     }
  }

  async function handleDelete(eventId: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: eventId }),
      });

      if (res.ok) {
        fetchEvents();
      } else {
        alert("Failed to delete event");
      }
     } catch (err) {
       alert("Failed to delete event");
     }
  }

  function getStatusBadgeColor(status: string) {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getTypeBadgeColor(type: string) {
    switch (type) {
      case "flagship":
        return "bg-purple-100 text-purple-800";
      case "seminar":
        return "bg-orange-100 text-orange-800";
      case "workshop":
        return "bg-teal-100 text-teal-800";
      case "drive":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  if (loading) return <p>Loading events...</p>;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Events Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <FaPlus size={14} />
            Add Event
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {editMode ? "Done Editing" : "Edit Events"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-neutral-700 bg-neutral-800 p-5 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Event Image */}
              <div className="shrink-0">
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-white text-lg">{event.title}</h3>
                    <p className="text-xs text-gray-400 break-all">ID: {event.id}</p>
                  </div>
                  <div className="flex gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                        event.type
                      )}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Date:</span>{" "}
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Location:</span> {event.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <p className="mt-3 text-sm text-gray-400 line-clamp-2">
                {event.description}
              </p>
            )}

            {/* Registration Link */}
            {event.registrationLink && (
              <div className="mt-3">
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                >
                  <FaExternalLinkAlt size={12} />
                  Registration Link
                </a>
              </div>
            )}

            {/* Actions */}
            {editMode && (
              <div className="mt-4 flex gap-2 pt-3 border-t border-neutral-700">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setEditOpen(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors"
                >
                  <FaEdit size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors"
                >
                  <FaTrash size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No events found. Click "Add Event" to create your first event.</p>
        </div>
      )}

      {/* Add Modal */}
      {open && (
        <AddEventModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            fetchEvents();
            setOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {editOpen && selectedEvent && (
        <AddEventModal
          event={selectedEvent}
          onClose={() => {
            setEditOpen(false);
            setSelectedEvent(null);
          }}
          onSuccess={() => {
            fetchEvents();
            setEditOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </section>
  );
}
