"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  folder: "drives" | "team" | "events";
  entityName: string;
  label?: string;
}

export default function CloudinaryUpload({
  onUpload,
  value,
  folder,
  entityName,
  label = "Image",
}: CloudinaryUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const sanitizeName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

   const validateFile = (file: File): string | null => {
     const maxSize = 5 * 1024 * 1024; // 5MB
     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

     if (!allowedTypes.includes(file.type)) {
       return "Invalid file type. Please upload JPG, PNG, or WebP images only.";
     }

     if (file.size > maxSize) {
       return "File too large. Maximum size is 5MB.";
     }

     return null;
   };

  const uploadToCloudinary = async (file: File) => {
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing");
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    
    // Create folder path
    const sanitizedEntityName = sanitizeName(entityName) || "unnamed";
    const timestamp = Date.now();
    const publicId = `${folder}/${sanitizedEntityName}-${timestamp}`;
    formData.append("public_id", publicId);

     try {
       const response = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         {
           method: "POST",
           body: formData,
         }
       );

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error?.message || "Upload failed");
       }

       const data = await response.json();
       // Use the secure_url from Cloudinary response
       const imageUrl = data.secure_url;
       
       setPreviewUrl(imageUrl);
       onUpload(imageUrl);
       setUploadProgress(100);
       
       return imageUrl;
     } catch (err) {
       const errorMessage = err instanceof Error ? err.message : "Upload failed. Please try again.";
       setError(errorMessage);
       throw err;
     } finally {
       setIsUploading(false);
     }
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Create local preview
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setError(null);

      try {
        await uploadToCloudinary(file);
      } catch {
        // Error is handled in uploadToCloudinary
        // Revert to previous value if exists
        if (value) {
          setPreviewUrl(value);
        }
      } finally {
        // Clean up local preview URL
        URL.revokeObjectURL(localPreview);
      }
    },
    [entityName, folder, onUpload, value]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

   const handleInputChange = useCallback(
     (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0];
       if (file) {
         handleFileSelect(file);
       }
     },
     [handleFileSelect]
   );

  const handleRemove = useCallback(() => {
    setPreviewUrl(undefined);
    onUpload("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  }, [onUpload]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>

      {!previewUrl ? (
        // Upload Zone
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-6 cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragging 
              ? "border-blue-500 bg-blue-500/10" 
              : "border-neutral-600 hover:border-neutral-500 hover:bg-neutral-800/50"
            }
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-300">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG or WebP (max 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Preview with Remove Button
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden bg-neutral-800">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-contain"
            />
            
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isUploading}
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Upload Progress Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm text-white">Uploading... {uploadProgress}%</p>
                <div className="w-32 h-1 bg-neutral-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Change Image Button */}
          {!isUploading && (
            <button
              onClick={handleClick}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Change image
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg">
          <span className="flex-shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Folder Info */}
      <p className="text-xs text-gray-500">
        Will be saved to: <span className="text-gray-400">{folder}/</span>
        {entityName ? sanitizeName(entityName) : "[name required]"}
      </p>
    </div>
  );
}
