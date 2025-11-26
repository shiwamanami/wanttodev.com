import { useEffect } from 'react';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitalsの監視
    const reportWebVitals = (metric: any) => {
      console.log('📊 Performance Metric:', {
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });

      // パフォーマンスが悪い場合の警告
      if (metric.name === 'LCP' && metric.value > 2500) {
        console.warn('⚠️ LCPが遅いです:', metric.value + 'ms (推奨: <2500ms)');
      }
      if (metric.name === 'FID' && metric.value > 100) {
        console.warn('⚠️ FIDが遅いです:', metric.value + 'ms (推奨: <100ms)');
      }
      if (metric.name === 'CLS' && metric.value > 0.1) {
        console.warn('⚠️ CLSが高いです:', metric.value + ' (推奨: <0.1)');
      }
    };

    // 画像読み込み時間の監視
    const monitorImageLoading = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        const startTime = performance.now();
        
        img.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          if (loadTime > 1000) {
            console.warn(`⚠️ 画像読み込みが遅いです: ${img.src} (${loadTime.toFixed(0)}ms)`);
          }
        });
      });
    };

    // バンドルサイズの監視
    const monitorBundleSize = () => {
      const scripts = document.querySelectorAll('script[src]');
      
      scripts.forEach((script) => {
        const src = script.getAttribute('src');
        if (src && src.includes('static/js/')) {
          // 実際のサイズは取得できないため、ファイル名から推定
          console.log('📦 読み込み済みスクリプト:', src);
        }
      });
    };

    // 初期化
    monitorImageLoading();
    monitorBundleSize();

    // Web Vitalsの監視を設定
    if (typeof window !== 'undefined' && 'performance' in window) {
      // 既存のreportWebVitals関数があれば使用
      if (window.reportWebVitals) {
        window.reportWebVitals(reportWebVitals);
      }
    }

    return () => {
      // クリーンアップ
    };
  }, []);
};

// グローバル型定義
declare global {
  interface Window {
    reportWebVitals?: (metric: any) => void;
  }
}
