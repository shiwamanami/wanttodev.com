import { useState } from "react";

interface SkillItemProps {
  name: string;
  image: string;
  alt?: string;
  className?: string;
  isSquare?: boolean; // 正方形かどうかを明示的に指定
  years?: number | string; // 経験年数（数値の場合は「○年」、文字列の場合はそのまま表示）
}

// 正方形の画像かどうかを判定する関数
const isSquareImage = (imageName: string): boolean => {
  const squareImages = [
    "react.svg",
    "typescript-blue.svg",
    "typescript-white.svg",
    "typescript-512.svg",
    "javascript.svg",
    "javascript-badge.svg",
    "html5.svg",
    "css.svg",
    "figma.svg",
    "laravel.svg",
    "bootstrap.svg",
    "astro-light.svg",
    "astro-dark.svg",
    "mysql.png",
    "sass.png",
  ];

  return squareImages.includes(imageName);
};

export default function SkillItem({
  name,
  image,
  alt,
  className = "",
  isSquare,
  years,
}: SkillItemProps) {
  const [imageError, setImageError] = useState(false);

  // isSquareが明示的に指定されていない場合は、画像名から判定
  const isSquareImageFlag =
    isSquare !== undefined ? isSquare : isSquareImage(image);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="flex items-center space-x-3">
        <div
          className={`${
            isSquareImageFlag
              ? "w-8 md:w-12 h-8 md:h-12"
              : "w-16 md:w-28 h-8 md:h-12"
          } flex-shrink-0`}
        >
          {!imageError ? (
            <img
              src={`/images/logo/${image}`}
              alt={alt || name}
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm md:text-base font-medium text-center">
              {name}
            </div>
          )}
        </div>
      </div>
      {years !== undefined && (
        <span className="text-xs md:text-sm text-gray-300">
          {typeof years === "number" ? `${years}年` : years}
        </span>
      )}
    </div>
  );
}
