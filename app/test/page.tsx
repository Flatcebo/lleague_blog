"use client";

import {useState} from "react";

export default function ImageUploader() {
  const [images, setImages] = useState<(string | null)[]>([null, null]);

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result as string;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex gap-4">
      {[0, 1].map((idx) => (
        <div
          key={idx}
          className="w-[150px] aspect-square bg-[#eaeaea] relative rounded-md overflow-hidden"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChangeImage(e, idx)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {images[idx] && (
            <img
              src={images[idx]!}
              alt={`미리보기 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          )}
          {!images[idx] && (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              이미지 선택
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
