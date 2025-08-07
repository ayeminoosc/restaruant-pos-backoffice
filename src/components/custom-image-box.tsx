'use client';

import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from '@/components/ui/image-crop';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState, useEffect } from 'react';

interface ImageBoxProps {
  imageUrl?: string | null;
  onImageCropped?: (imageData: string) => void;
  onImageRemoved?: () => void;
}

const ImageBox = ({ imageUrl, onImageCropped, onImageRemoved }: ImageBoxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    setCroppedImage(imageUrl || null);
  }, [imageUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };

  const handleCroppedImage = (croppedImageData: string) => {
    setCroppedImage(croppedImageData);
    setSelectedFile(null);
    onImageCropped?.(croppedImageData);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCroppedImage(null);
    onImageRemoved?.();
  };

  if (!selectedFile && !croppedImage) {
    return (
      <div className="space-y-4">
        <div
          className="w-[15rem] h-[13.625rem] max-w-full relative flex flex-col items-center justify-center bg-[#F9F9F9] rounded-[0.625rem] cursor-pointer overflow-hidden hover:bg-gray-100 transition-colors"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <rect
              x="0.5"
              y="0.5"
              width="calc(100% - 0.625rem)"
              height="calc(100% - 0.625rem)"
              fill="none"
              stroke="#A7A7A7"
              strokeWidth="1"
              strokeDasharray="10 5"
              rx="10"
              ry="10"
            />
          </svg>
          <svg
            className="w-[2.6rem] h-[2.6rem] text-gray-400 mb-2 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="text-black text-center font-inter text-[0.875rem] font-normal leading-none relative z-10">
            Add Photo
          </div>
        </div>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  if (croppedImage && !selectedFile) {
    return (
      <div className="space-y-1">
        <div className="flex justify-end items-center gap-1">
          <Button
            onClick={handleReset}
            size="icon"
            type="button"
            variant="ghost"
          >
            <XIcon className="size-6" />
          </Button>
        </div>
        <div
          className="w-[15rem] h-[13.625rem] max-w-full relative flex flex-col items-center justify-center bg-[#F9F9F9] rounded-[0.625rem] cursor-pointer overflow-hidden hover:bg-gray-100 transition-colors"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <rect
              x="0.5"
              y="0.5"
              width="calc(100% - 0.625rem)"
              height="calc(100% - 0.625rem)"
              fill="none"
              stroke="#A7A7A7"
              strokeWidth="1"
              strokeDasharray="10 5"
              rx="10"
              ry="10"
            />
          </svg>
          <Image
            alt="Category"
            src={croppedImage}
            unoptimized
            fill
            className="object-cover rounded-[0.625rem] z-10"
          />
        </div>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <ImageCrop
        aspect={1}
        file={selectedFile}
        maxImageSize={1024 * 1024}
        onChange={console.log}
        onComplete={console.log}
        onCrop={handleCroppedImage}
      >
        <div className="flex justify-end items-center gap-1">
          <ImageCropApply type='button' />
          <Button
            onClick={handleReset}
            size="icon"
            type="button"
            variant="ghost"
          >
            <XIcon className="size-6" />
          </Button>
        </div>
        <ImageCropContent className="max-w-md" />
      </ImageCrop>
    </div>
  );
};

export default ImageBox;