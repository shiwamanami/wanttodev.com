import { ReactNode } from "react";

interface AboutSectionProps {
  title: string;
  titleJa: string;
  children: ReactNode;
  className?: string;
}

/**
 * Aboutページで使用するセクションコンポーネント
 */
export function AboutSection({
  title,
  titleJa,
  children,
  className = "",
}: AboutSectionProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-20 ${className}`}>
      <h3 className="md:w-1/6 text-primary-500 text-nowrap">
        {title}
        <span className="md:block text-sm md:text-base text-gray-300 pl-5 md:pl-0">
          {titleJa}
        </span>
      </h3>
      <div className="md:w-5/6">{children}</div>
    </div>
  );
}

