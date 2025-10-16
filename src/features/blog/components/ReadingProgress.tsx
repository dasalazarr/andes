import React, { useEffect, useState } from 'react';

interface ReadingProgressProps {
  targetId?: string; // element id to track; defaults to document.body
  color?: string; // CSS color
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ targetId, color = '#25d366' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = targetId ? document.getElementById(targetId) : document.documentElement;
    if (!el) return;
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight;
      const total = (el.scrollHeight || document.body.scrollHeight) - viewport;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrollTop / total) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-black z-40">
      <div
        className="h-full"
        style={{ width: `${progress}%`, backgroundColor: color, transition: 'width 120ms linear' }}
      />
    </div>
  );
};

export default ReadingProgress;

