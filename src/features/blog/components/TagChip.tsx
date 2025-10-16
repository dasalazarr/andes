import React from 'react';

interface TagChipProps {
  label: string;
  variant?: 'light' | 'dark';
}

const TagChip: React.FC<TagChipProps> = ({ label, variant = 'dark' }) => {
  const base = 'inline-flex items-center rounded-full text-xs font-semibold tracking-wide uppercase';
  const classes =
    variant === 'light'
      ? 'bg-[#E8F9F2] text-[#0F5132] px-3 py-1'
      : 'bg-[#006b5b]/30 text-[#25d366] px-2.5 py-0.5';

  return <span className={`${base} ${classes}`}>{label}</span>;
};

export default TagChip;
