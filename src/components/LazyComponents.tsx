import { lazy } from 'react';

// Lazy load non-critical components to reduce initial bundle size
export const LazyBenefitsSection = lazy(() => import('./BenefitsSection'));
export const LazyPricingSection = lazy(() => import('./PricingSection'));
export const LazyCityCommunitySection = lazy(() => import('./CityCommunitySection'));
export const LazyPlanRequestForm = lazy(() => import('./PlanRequestForm'));

// Component loading with error boundaries
export const ComponentLoader = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[200px] flex items-center justify-center">
    {children}
  </div>
);

// Skeleton components for better loading experience
export const SectionSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div className="animate-pulse" style={{ height }}>
    <div className="bg-gray-200 rounded-lg h-full"></div>
  </div>
);

export const PricingSkeleton = () => (
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
);

export const ArticlesSkeleton = () => (
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
);

export default {
  LazyBenefitsSection,
  LazyPricingSection,
  LazyCityCommunitySection,
  LazyPlanRequestForm,
  ComponentLoader,
  SectionSkeleton,
  PricingSkeleton,
  ArticlesSkeleton
};
