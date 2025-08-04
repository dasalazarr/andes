import React from 'react';

interface OptimizedLoadingProps {
  text?: string;
  minimal?: boolean;
}

export const OptimizedLoading: React.FC<OptimizedLoadingProps> = ({ 
  text = "Loading...", 
  minimal = false 
}) => {
  if (minimal) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="loading-spinner">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

// Skeleton loader for better perceived performance
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// Hero section skeleton
export const HeroSkeleton: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
      <SkeletonLoader className="h-16 w-3/4 mx-auto" />
      <SkeletonLoader className="h-6 w-2/3 mx-auto" />
      <SkeletonLoader className="h-12 w-48 mx-auto rounded-full" />
    </div>
  </div>
);

export default OptimizedLoading;
