"use client";

import { useState } from "react";

export default function useImageUpload() {
  const [previewUrl, setPreviewUrl] = useState(""); // Local image preview URL
  const [serverUrl, setServerUrl] = useState(""); // Imgbb uploaded image URL
  const [isUploading, setIsUploading] = useState(false); // Loading state for upload process
  const [error, setError] = useState(""); // Error message storage

  // Image change handler for file input
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size cannot exceed 5MB.");
      return;
    }

    setError(""); // error reset before new upload attempt

    // Instant local preview generation
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    // Server upload process
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (result.success) {
        setServerUrl(result.data.url); // imagebb from server URL
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      setError("Network error! Could not upload to server.");
    } finally {
      setIsUploading(false); // End loading
    }
  };

  // Image removal handler to clear preview and server URL
  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up local preview URL to free memory
    }
    setPreviewUrl("");
    setServerUrl("");
    setError("");
  };

  // Return all relevant states and handlers for use in components
  return {
    previewUrl,
    serverUrl,
    isUploading,
    error,
    handleImageChange,
    handleRemoveImage,
  };
}
