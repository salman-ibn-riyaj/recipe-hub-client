"use client";


import { uploadToCloudinary } from "@/lib/action/uploadImage";
import { toast } from "@heroui/react";
import Image from "next/image";
import { useRef, useState } from "react";


export function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadToCloudinary(formData);
      onChange?.(url);
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      toast.success('Image successfully uploaded')
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <div
        onClick={() => inputRef.current?.click()}
        className="
          flex flex-col items-center justify-center gap-2
          w-full min-h-[140px] rounded-xl border-2 border-dashed
          border-primary/40 bg-mint/10
          cursor-pointer hover:bg-mint/30 hover:border-primary transition-all duration-200
          relative overflow-hidden group
        "
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-primary font-medium">Uploading...</span>
          </div>
        ) : preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
               <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">Change Image</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 bg-mint text-primary rounded-full group-hover:scale-110 transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-primary">Click to upload</span>
            <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
          </>
        )}
      </div>

      {error && <p className="text-xs text-danger mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}