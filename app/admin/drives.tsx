"use client";

import { useEffect, useState } from "react";
import { Drive, Company } from "@/types/drive";
import { FaEdit, FaTrash, FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import AddDriveModal from "./AddDriveModal";

export default function AdminDrives() {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDrives();
  }, []);

  async function fetchDrives() {
    try {
      const res = await fetch("/api/admin/drives");
      const data = await res.json();
      // Ensure data is an array
      const drivesArray = Array.isArray(data) ? data : [];
      setDrives(drivesArray);
     } catch (err) {
       setDrives([]); // Set to empty array on error
     } finally {
       setLoading(false);
     }
  }

  async function handleDelete(driveId: string) {
    if (!confirm("Are you sure you want to delete this drive?")) return;

    try {
      const res = await fetch("/api/admin/drives", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: driveId }),
      });

      if (res.ok) {
        fetchDrives();
      } else {
        alert("Failed to delete drive");
      }
     } catch (err) {
       alert("Failed to delete drive");
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
      case "placement":
        return "bg-purple-100 text-purple-800";
      case "internship":
        return "bg-orange-100 text-orange-800";
      case "ppt":
        return "bg-teal-100 text-teal-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  if (loading) return <p>Loading drives...</p>;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Placement Drives</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <FaPlus size={14} />
            Add Drive
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {editMode ? "Done Editing" : "Edit Drives"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {drives.map((drive) => (
          <div
            key={drive.id}
            className="rounded-xl border border-neutral-700 bg-neutral-800 p-5 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Event Image */}
              <div className="shrink-0">
                {drive.imageUrl ? (
                  <img
                    src={drive.imageUrl}
                    alt={drive.title}
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
                    <h3 className="font-medium text-white text-lg">{drive.title}</h3>
                    <p className="text-xs text-gray-400 break-all">ID: {drive.id}</p>
                  </div>
                  <div className="flex gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        drive.status
                      )}`}
                    >
                      {drive.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                        drive.type
                      )}`}
                    >
                      {drive.type}
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Date:</span>{" "}
                    {new Date(drive.startDate).toLocaleDateString()} -{" "}
                    {new Date(drive.endDate).toLocaleDateString()}
                  </p>
                  {drive.location && (
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Location:</span> {drive.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Companies */}
            {drive.companies.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Participating Companies:</p>
                <div className="flex flex-wrap gap-3">
                  {drive.companies.map((company) => {
                    const logoSrc = company.logoImage || company.logoUrl;
                    return (
                      <div key={company.id} className="flex items-center gap-2">
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={company.name}
                            className="h-6 w-6 object-contain rounded"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded bg-neutral-600 flex items-center justify-center text-xs text-white">
                            {company.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm text-gray-300">{company.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            {drive.description && (
              <p className="mt-3 text-sm text-gray-400 line-clamp-2">
                {drive.description}
              </p>
            )}

            {/* Registration Link */}
            {drive.registrationLink && (
              <div className="mt-3">
                <a
                  href={drive.registrationLink}
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
                    setSelectedDrive(drive);
                    setEditOpen(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors"
                >
                  <FaEdit size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(drive.id)}
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

      {drives.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No drives found. Click "Add Drive" to create your first drive.</p>
        </div>
      )}

      {/* Add Modal */}
      {open && (
        <AddDriveModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            fetchDrives();
            setOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {editOpen && selectedDrive && (
        <AddDriveModal
          drive={selectedDrive}
          onClose={() => {
            setEditOpen(false);
            setSelectedDrive(null);
          }}
          onSuccess={() => {
            fetchDrives();
            setEditOpen(false);
            setSelectedDrive(null);
          }}
        />
      )}
    </section>
  );
}
