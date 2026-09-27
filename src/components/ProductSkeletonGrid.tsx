import React from 'react';

interface ProductSkeletonGridProps {
  count?: number;
}

export const ProductSkeletonGrid: React.FC<ProductSkeletonGridProps> = ({ count = 8 }) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      aria-label="Memuat daftar unit..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-card-${index}`}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-2xs animate-pulse"
        >
          <div>
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] bg-slate-200">
              <div className="absolute top-2.5 left-2.5 h-6 w-16 bg-slate-300 rounded-lg" />
              <div className="absolute top-2.5 right-2.5 h-5 w-14 bg-slate-300 rounded-md" />
              <div className="absolute bottom-2 left-2 h-4 w-24 bg-slate-300 rounded" />
            </div>

            {/* Content Placeholder */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-24 bg-slate-200 rounded" />
                <div className="h-4 w-12 bg-slate-200 rounded-full" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
              </div>
              <div className="h-3 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>

          {/* Action Buttons Placeholder */}
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 bg-slate-100 rounded-xl" />
              <div className="h-8 bg-emerald-100 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
