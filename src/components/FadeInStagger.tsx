"use client";
import React, { useEffect, useState, useRef, ReactNode } from "react";

const fadeInLeftStyle = `
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeOutLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
  
  .fade-in-left-animation {
    animation: fadeInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .fade-out-left-animation {
    animation: fadeOutLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .fade-out-state {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

interface FadeInStaggerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
  repeat?: boolean;
}

export const FadeInStagger = ({
  children,
  delay = 0,
  staggerDelay = 200,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  repeat = false,
}: FadeInStaggerProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // サーバーサイドレンダリング時とクライアント初期状態は同じ
  const shouldShowAnimation = isMounted && isVisible;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating) {
          setIsVisible(true);
          setIsAnimating(true);
          setIsFadingOut(false);

          // 子要素を配列に変換
          const childrenArray = React.Children.toArray(children);

          // 各子要素に対して遅延を設定
          childrenArray.forEach((_, index) => {
            setTimeout(
              () => {
                setVisibleLines((prev) => [...prev, index]);
              },
              delay + index * staggerDelay
            );
          });

          // 繰り返しモードでない場合は監視を停止
          if (!repeat) {
            observer.disconnect();
          }
        } else if (!entry.isIntersecting && isVisible) {
          // 要素が画面外に出た場合
          setIsFadingOut(true);

          // フェードアウトアニメーション完了後に状態をリセット
          setTimeout(() => {
            setIsVisible(false);
            setVisibleLines([]);
            setIsAnimating(false);
            setIsFadingOut(false);
          }, 1000); // フェードアウトアニメーションの時間
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [
    isMounted,
    children,
    delay,
    staggerDelay,
    threshold,
    rootMargin,
    repeat,
    isVisible,
    isAnimating,
  ]);

  return (
    <>
      <style>{fadeInLeftStyle}</style>
      <div ref={containerRef}>
        {React.Children.map(children, (child, index) => {
          let className = "opacity-0 -translate-x-16";

          if (isFadingOut) {
            className = "fade-out-left-animation";
          } else if (shouldShowAnimation && visibleLines.includes(index)) {
            className = "fade-in-left-animation";
          }

          return (
            <div key={index} className={className}>
              {child}
            </div>
          );
        })}
      </div>
    </>
  );
};
