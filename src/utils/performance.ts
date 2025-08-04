// Performance monitoring utilities for Andes Runners

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer?: PerformanceObserver;

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Observe paint metrics (FCP, LCP)
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
              this.reportMetric('FCP', entry.startTime);
            }
          }
        });
        this.observer.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.fid = (entry as any).processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.metrics.cls = clsValue;
          this.reportMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }

    // Time to First Byte
    if ('performance' in window && 'timing' in window.performance) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        this.metrics.ttfb = timing.responseStart - timing.navigationStart;
        this.reportMetric('TTFB', this.metrics.ttfb);
      });
    }
  }

  public reportMetric(name: string, value: number) {
    // Only report in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Send to analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'performance_metric', {
          event_category: 'performance',
          metric_name: name,
          metric_value: Math.round(value),
          custom_map: {
            metric_id: name.toLowerCase()
          }
        });
      }

      // Send to TikTok Pixel for campaign optimization
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track('ViewContent', {
          content_type: 'performance_metric',
          content_name: name,
          value: Math.round(value)
        });
      }
    }

    // Log in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log(`🚀 Performance Metric - ${name}: ${Math.round(value)}ms`);
    }
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Manual performance marking
  mark(name: string) {
    if ('performance' in window && 'mark' in window.performance) {
      window.performance.mark(name);
    }
  }

  // Measure between marks
  measure(name: string, startMark: string, endMark?: string) {
    if ('performance' in window && 'measure' in window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        this.reportMetric(name, measure.duration);
        return measure.duration;
      } catch (error) {
        console.warn('Performance measure failed:', error);
      }
    }
    return 0;
  }

  // Track component render time
  trackComponentRender(componentName: string, renderFn: () => void) {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    
    this.mark(startMark);
    renderFn();
    this.mark(endMark);
    
    return this.measure(`${componentName}-render`, startMark, endMark);
  }

  // Track resource loading
  trackResourceLoad(resourceName: string, url: string) {
    if ('performance' in window) {
      const entries = window.performance.getEntriesByName(url);
      if (entries.length > 0) {
        const entry = entries[0];
        this.reportMetric(`resource-${resourceName}`, entry.duration);
      }
    }
  }

  // Cleanup observers
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const trackPageLoad = () => {
  performanceMonitor.mark('page-load-start');
  
  window.addEventListener('load', () => {
    performanceMonitor.mark('page-load-end');
    performanceMonitor.measure('page-load-total', 'page-load-start', 'page-load-end');
  });
};

export const trackInteraction = (interactionName: string, callback: () => void) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  
  performanceMonitor.reportMetric(`interaction-${interactionName}`, endTime - startTime);
};

// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 }
};

export const getPerformanceGrade = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = WEB_VITALS_THRESHOLDS[metric as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!thresholds) return 'good';
  
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

export default performanceMonitor;
