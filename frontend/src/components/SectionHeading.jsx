import React from 'react';

export default function SectionHeading({ subtitle, title, description, align = 'center' }) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
      {subtitle && (
        <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-3">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
