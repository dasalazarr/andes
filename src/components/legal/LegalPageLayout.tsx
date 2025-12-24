import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  intro?: string;
  updatedAt?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  intro,
  updatedAt,
  eyebrow = 'Legal',
  children,
}) => {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#27e97c]">{eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">{title}</h1>
          {updatedAt ? <p className="text-sm text-slate-400">{updatedAt}</p> : null}
          {intro ? <p className="text-base text-slate-300">{intro}</p> : null}
        </div>
        <div className="mt-10 space-y-8 text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </main>
  );
};

export default LegalPageLayout;
