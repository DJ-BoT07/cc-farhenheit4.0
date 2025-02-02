"use client";
import { WarpBackground } from "@/components/ui/warp-background";

export default function ClientWarpBackground({ children, ...props }) {
  return <WarpBackground {...props}>{children}</WarpBackground>;
} 