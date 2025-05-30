import React from 'react';
import Image from 'next/image';

interface FormImageUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  previewUrl?: string | null;
  onPreviewChange?: (url: string | null) => void;
}

export function FormImageUpload({
  label,
  error,
  previewUrl,
  onPreviewChange,
  className = '',
  onChange,
  ...props
}: FormImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onPreviewChange?.(url);
    } else {
      onPreviewChange?.(null);
    }
    onChange?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F8F6F3] file:text-[#B86B2B] hover:file:bg-[#E6A15A] hover:file:text-white ${className}`}
          onChange={handleChange}
          {...props}
        />
        {previewUrl && (
          <div className="relative w-20 h-20">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover rounded"
            />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
