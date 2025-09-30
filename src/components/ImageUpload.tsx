import React, { useState, useRef } from "react";
import { Button } from "./Button";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  thumbnail?: string;
}

interface ImageUploadProps {
  label: string;
  value: MediaItem[];
  onChange: (images: MediaItem[]) => void;
  accept?: string;
  multiple?: boolean;
}

export default function ImageUpload({
  label,
  value = [],
  onChange,
  accept = "image/*",
  multiple = true,
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: MediaItem[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const newImage: MediaItem = {
            type: "image",
            src,
            alt: file.name,
          };

          newImages.push(newImage);

          if (newImages.length === files.length) {
            onChange([...value, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      {/* アップロードエリア */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? "border-primary-500 bg-primary-500/10"
            : "border-gray-600 hover:border-gray-500"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <div className="space-y-2">
          <div className="text-gray-400">
            <svg
              className="mx-auto h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-300">
            画像をドラッグ&ドロップするか、クリックして選択
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP 形式をサポート</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* 画像プレビュー */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
                <img
                  src={image.src}
                  alt={image.alt || `画像 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <div className="mt-1 text-xs text-gray-400 truncate">
                {image.alt || `画像 ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* アップロードボタン */}
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        className="w-full"
      >
        画像を選択
      </Button>
    </div>
  );
}
