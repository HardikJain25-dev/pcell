"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import CloudinaryUpload from "@/app/components/CloudinaryUpload";

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  year?: string;
  course?: string;
  about?: string;
  image?: string;
  linkedin?: string;
  email?: string;
  github?: string;
};

type EditMemberModalProps = {
  member: TeamMember;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMemberModal({
  member,
  onClose,
  onSuccess,
}: EditMemberModalProps) {
  const [form, setForm] = useState<TeamMember>(member);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Debug: log field updates to help trace where updates may break
    console.log("Admin: field updated", name, value, "for member", member?.id);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Log payload before sending
      console.log("Admin: PUT /api/admin/team payload", form);
      const res = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    setLoading(true);
    try {
      // Log delete payload
      console.log("Admin: DELETE /api/admin/team payload", { id: form.id });
      const res = await fetch("/api/admin/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-neutral-800 p-6 shadow-lg relative text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Edit Team Member</h2>
            <p className="text-xs text-gray-400 break-all">
              ID: {form.id}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-700 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Position
              </label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="e.g., President"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Year
              </label>
              <input
                name="year"
                value={form.year || ""}
                onChange={handleChange}
                placeholder="e.g., 3rd Year"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Course
              </label>
              <input
                name="course"
                value={form.course || ""}
                onChange={handleChange}
                placeholder="e.g., B.Com (Hons)"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Profile Photo Upload */}
          <CloudinaryUpload
            onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))}
            value={form.image}
            folder="team"
            entityName={form.name || "unnamed-member"}
            label="Profile Photo"
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              About
            </label>
            <textarea
              name="about"
              value={form.about || ""}
              onChange={handleChange}
              placeholder="Brief description..."
              rows={3}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                LinkedIn URL
              </label>
              <input
                name="linkedin"
                value={form.linkedin || ""}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                GitHub URL
              </label>
              <input
                name="github"
                value={form.github || ""}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-700 flex justify-between items-center">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Delete Member
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-neutral-600 text-white hover:bg-neutral-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
