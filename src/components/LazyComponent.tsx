import React, { Suspense, lazy } from 'react';

// 遅延読み込み用のローディングコンポーネント
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
  </div>
);

// 高階コンポーネントでラップした遅延読み込み
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return (props: P) => (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// 個別の遅延読み込みコンポーネント
export const LazyWorksSwiper = withLazyLoading(
  lazy(() => import('./WorksSwiper').then(module => ({ default: module.default })))
);

export const LazyContactForm = withLazyLoading(
  lazy(() => import('./ContactForm').then(module => ({ default: module.ContactForm })))
);

export const LazyCta = withLazyLoading(
  lazy(() => import('./Cta').then(module => ({ default: module.default })))
);
