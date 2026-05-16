"use client";

import { useState } from "react";
import { Drive, Company } from "@/types/drive";
import { FaPlus, FaTrash } from "react-icons/fa";
import CloudinaryUpload from "@/app/components/CloudinaryUpload";

interface AddDriveModalProps {
  drive?: Drive;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDriveModal({ drive, onClose, onSuccess }: AddDriveModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: drive?.title || "",
    description: drive?.description || "",
    startDate: drive?.startDate ? drive.startDate.slice(0, 16) : "",
    endDate: drive?.endDate ? drive.endDate.slice(0, 16) : "",
    location: drive?.location || "",
    type: drive?.type || "placement",
    status: drive?.status || "upcoming",
    imageUrl: drive?.imageUrl || "",
    registrationLink: drive?.registrationLink || "",
    companies: drive?.companies || [],
  });

  const [newCompany, setNewCompany] = useState({ name: "", logoUrl: "", logoImage: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function addCompany() {
    if (!newCompany.name.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      companies: [
        ...prev.companies,
        { id: Date.now().toString(), name: newCompany.name, logoUrl: newCompany.logoUrl || null, logoImage: newCompany.logoImage || null },
      ],
    }));
    setNewCompany({ name: "", logoUrl: "", logoImage: "" });
  }

  function removeCompany(companyId: string) {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.filter((c) => c.id !== companyId),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "/api/admin/drives";
      const method = drive ? "PUT" : "POST";
      const body = drive
        ? { ...formData, id: drive.id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save drive");
      }
     } catch (err) {
       alert("Failed to save drive");
     } finally {
       setLoading(false);
     }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-neutral-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-6">
          {drive ? "Edit Drive" : "Add New Drive"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., TCS Campus Placement Drive 2025"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the event..."
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date & Time *
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Conference Hall, Main Building"
            />
          </div>

          {/* Type & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Event Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="placement">Placement Drive</option>
                <option value="internship">Internship Drive</option>
                <option value="ppt">Pre-Placement Talk</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Event Image Upload */}
          <CloudinaryUpload
            onUpload={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
            value={formData.imageUrl}
            folder="drives"
            entityName={formData.title || "unnamed-drive"}
            label="Event Image"
          />

          {/* Registration Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Registration Link
            </label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://forms.google.com/..."
            />
          </div>

          {/* Companies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Participating Companies
            </label>
            
            {/* Existing Companies */}
            <div className="space-y-2 mb-4">
              {formData.companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-3 p-3 bg-neutral-700 rounded-lg"
                >
                  {company.logoImage || company.logoUrl ? (
                    <img
                      src={company.logoImage || company.logoUrl || ""}
                      alt={company.name}
                      className="h-10 w-10 object-contain rounded bg-white/10 p-1"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded bg-neutral-600 flex items-center justify-center text-white text-sm">
                      {company.name.charAt(0)}
                    </div>
                  )}
                  <span className="flex-1 text-white">{company.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCompany(company.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Company */}
            <div className="space-y-3 p-4 bg-neutral-700/50 rounded-lg border border-neutral-600">
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Company name"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <CloudinaryUpload
                    onUpload={(url) =>
                      setNewCompany((prev) => ({ ...prev, logoImage: url }))
                    }
                    value={newCompany.logoImage || undefined}
                    folder="drives"
                    entityName={`companies/${newCompany.name || "unnamed-company"}`}
                    label="Company Logo"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCompany}
                  disabled={!newCompany.name.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-fit mt-6"
                >
                  <FaPlus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-neutral-700">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : drive ? "Update Drive" : "Create Drive"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}