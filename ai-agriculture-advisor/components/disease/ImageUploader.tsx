"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

export function ImageUploader({ onImageSelect, className }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && files[0].type.startsWith("image/")) {
        handleFileSelect(files[0]);
      }
    },
    []
  );

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onImageSelect(selectedFile);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200",
              isDragging
                ? "border-primary-500 bg-primary-500/10"
                : "border-white/20 bg-agri-900/30 hover:border-primary-500/50"
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary-500/20 rounded-2xl">
                <Upload className="h-12 w-12 text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isDragging ? "Drop image here" : "Upload crop image"}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Drag and drop or click to browse
                </p>
                <p className="text-gray-500 text-xs">
                  Supports: JPG, PNG, HEIC (max 10MB)
                </p>
              </div>
              <label>
                <Button type="button" className="cursor-pointer">
                  <FileImage className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 auth-form-glow"
          >
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-contain rounded-xl bg-black/50"
              />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black rounded-lg text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleAnalyze}
                className="flex-1 bg-primary-600 hover:bg-primary-500"
              >
                <Camera className="h-4 w-4 mr-2" />
                Analyze Image
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Choose Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
