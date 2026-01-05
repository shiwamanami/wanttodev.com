"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface VideoScrollAnimationProps {
  videoSrc: string;
  children: ReactNode;
  className?: string;
}

export const VideoScrollAnimation = ({
  videoSrc,
  children,
  className = "",
}: VideoScrollAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isBackground, setIsBackground] = useState(false);
  const [isTopFixed, setIsTopFixed] = useState(false);
  const [scale, setScale] = useState(0.4);
  const [opacity, setOpacity] = useState(1);
  const [fixedTimer, setFixedTimer] = useState<NodeJS.Timeout | null>(null);
  const [topFixedTimer, setTopFixedTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [contentVisible, setContentVisible] = useState(false);
  const [contentTransform, setContentTransform] = useState(100);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const containerHeight = rect.height;

          // 動画が画面に入ってくる位置（画面の下から）
          const enterThreshold = windowHeight * 0.8;
          // 動画が固定表示される位置（画面中央）
          const fixedThreshold = windowHeight * 0.5;
          // 動画が背景になる位置（画面の上から）
          const backgroundThreshold = windowHeight * 0.2;

          // 動画が画面に入ってくる
          if (
            rect.top <= enterThreshold &&
            rect.top > fixedThreshold &&
            !isFixed &&
            !isTopFixed
          ) {
            const progress =
              (enterThreshold - rect.top) / (enterThreshold - fixedThreshold);
            setScale(0.4 + progress * 0.05); // より小さな変化量
            setIsFixed(false);
            setIsBackground(false);
            setIsTopFixed(false);
          }
          // 動画が最上部に達した時の固定
          else if (rect.top <= 50 && !isTopFixed) {
            console.log("最上部固定開始", rect.top); // デバッグ用
            setScale(1.0);
            setIsTopFixed(true);
            setIsFixed(false);
            setIsBackground(false);

            // 3秒後に最上部固定を解除
            if (topFixedTimer) clearTimeout(topFixedTimer);
            const timer = setTimeout(() => {
              console.log("最上部固定終了"); // デバッグ用
              setIsTopFixed(false);
              setIsBackground(true);
            }, 3000);
            setTopFixedTimer(timer);
          }
          // 動画が固定表示される（最上部固定中は実行しない）
          else if (
            rect.top <= fixedThreshold &&
            rect.top > backgroundThreshold &&
            !isTopFixed
          ) {
            setScale(0.8); // 固定表示時も緩やかなscale
            if (!isFixed) {
              setIsFixed(true);
              setIsBackground(false);
              setContentVisible(true);
              setContentTransform(0);

              // 2秒後に固定表示を解除
              if (fixedTimer) clearTimeout(fixedTimer);
              const timer = setTimeout(() => {
                setIsFixed(false);
                setIsBackground(true);
              }, 2000);
              setFixedTimer(timer);
            }
          }
          // 動画が背景になる（最上部固定中は実行しない）
          else if (rect.top <= backgroundThreshold && !isFixed && !isTopFixed) {
            setScale(1.0); // 背景時も緩やかなscale
            setIsFixed(false);
            setIsBackground(true);
            setIsTopFixed(false);

            // テキストコンテンツを表示開始
            if (!contentVisible) {
              setContentVisible(true);
              setContentTransform(100); // 下から開始

              // 少し遅延させてからアニメーション開始
              setTimeout(() => {
                setContentTransform(0); // 上に移動
              }, 100);
            }
          }
          // 初期状態（最上部固定中は実行しない）
          else if (!isFixed && !isTopFixed) {
            setScale(0.4);
            setIsFixed(false);
            setIsBackground(false);
            setIsTopFixed(false);
            setContentVisible(false);
            setContentTransform(100);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態を設定

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (fixedTimer) clearTimeout(fixedTimer);
      if (topFixedTimer) clearTimeout(topFixedTimer);
    };
  }, [fixedTimer, topFixedTimer, isFixed, isTopFixed]);

  useEffect(() => {
    if (videoRef.current) {
      if (isFixed || isBackground || isTopFixed) {
        // 固定表示時、背景時、または最上部固定時は動画を再生
        videoRef.current.play();
      } else {
        // それ以外の場合は一時停止
        videoRef.current.pause();
      }
    }
  }, [isFixed, isBackground, isTopFixed]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className={`transition-all duration-1000 ease-out ${
          isFixed || isBackground || isTopFixed
            ? "top-0 left-0 w-full h-screen z-10"
            : "relative"
        }`}
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* 背景動画の上に表示されるコンテンツ */}
      <div
        className={`transition-all duration-1000 ease-out ${
          isBackground || isFixed
            ? "inset-0 z-40 flex items-center justify-center"
            : "relative z-30"
        }`}
        style={{
          opacity: contentVisible || isFixed ? 1 : 0,
          transform: `translateY(${contentTransform}px)`,
        }}
      >
        <div className="text-center ">{children}</div>
      </div>

      {/* 固定表示時のオーバーレイ */}
      {isFixed && (
        <div className="inset-0 bg-black/30 z-50 flex items-center justify-center"></div>
      )}

      {/* 最上部固定時のオーバーレイ */}
      {isTopFixed && (
        <div className="inset-0 bg-black/20 z-50 flex items-center justify-center"></div>
      )}

      {/* 背景動画の上に黒いブラーオーバーレイ */}
      {/* {isBackground && <div className="fixed inset-0 bg-black/40 z-20"></div>} */}
    </div>
  );
};
