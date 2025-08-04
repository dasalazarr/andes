import React, { Suspense } from 'react';
import { useLazyLoad } from '../hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  minHeight?: string;
  className?: string;
}

const DefaultSkeleton = ({ minHeight }: { minHeight: string }) => (
  <div 
    className="animate-pulse bg-gray-100 rounded-lg mx-4"
    style={{ minHeight }}
  >
    <div className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"></div>
  </div>
);

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  delay = 0,
  minHeight = "400px",
  className = ""
}) => {
  const { targetRef, shouldLoad } = useLazyLoad(delay);

  return (
    <div ref={targetRef} className={className} style={{ minHeight }}>
      {shouldLoad ? (
        <Suspense fallback={fallback || <DefaultSkeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        fallback || <DefaultSkeleton minHeight={minHeight} />
      )}
    </div>
  );
};

// Specialized lazy sections for common use cases
export const LazyPricingSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LazySection
    minHeight="600px"
    delay={500}
    fallback={
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }
  >
    {children}
  </LazySection>
);

export const LazyArticlesSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LazySection
    minHeight="500px"
    delay={1000}
    fallback={
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }
  >
    {children}
  </LazySection>
);

export const LazyFormSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LazySection
    minHeight="600px"
    delay={1500}
    fallback={
      <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-green-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  >
    {children}
  </LazySection>
);

export default LazySection;
