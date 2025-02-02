"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the WarpBackground component
const DynamicWarpBackground = dynamic(
  () => import('@/components/ui/warp-background').then(mod => ({ default: mod.WarpBackground })),
  {
    ssr: false,
    loading: () => (
      <div className="relative rounded border p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] bg-black/40">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-orange-500/10 to-transparent" />
      </div>
    )
  }
);

export default function ClientWarpBackground({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative rounded border p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] bg-black/40">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-orange-500/10 to-transparent" />
        <div className="relative">{children}</div>
      </div>
    );
  }

  return <DynamicWarpBackground {...props}>{children}</DynamicWarpBackground>;
} 