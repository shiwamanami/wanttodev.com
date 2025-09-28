import { useState } from "react";

interface SkillItemProps {
  name: string;
  image: string;
  alt?: string;
  className?: string;
  isSquare?: boolean; // 正方形かどうかを明示的に指定
}

// 正方形の画像かどうかを判定する関数
const isSquareImage = (imageName: string): boolean => {
  const squareImages = [
    'react.svg',
    'typescript-blue.svg',
    'typescript-white.svg',
    'typescript-512.svg',
    'javascript.svg',
    'javascript-badge.svg',
    'html5.svg',
    'css.svg',
    'figma.svg',
    'laravel.svg',
    'bootstrap.svg',
    'astro-light.svg',
    'astro-dark.svg',
    'mysql.png',
    'sass.png'
  ];
  
  return squareImages.includes(imageName);
};

export default function SkillItem({ name, image, alt, className = "", isSquare }: SkillItemProps) {
  const [imageError, setImageError] = useState(false);
  
  // isSquareが明示的に指定されていない場合は、画像名から判定
  const isSquareImageFlag = isSquare !== undefined ? isSquare : isSquareImage(image);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${isSquareImageFlag ? 'w-8 md:w-20 h-8 md:h-20' : 'w-40 h-8 md:h-20'} flex-shrink-0`}>
        {!imageError ? (
          <img
            src={`/images/logo/${image}`}
            alt={alt || name}
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700/50 rounded text-xs text-gray-300 font-medium text-center px-1">
            {name}
          </div>
        )}
      </div>
      {/* <span className="text-sm text-gray-200">{name}</span> */}
    </div>
  );
}
