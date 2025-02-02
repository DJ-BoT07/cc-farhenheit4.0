"use client";
import dynamic from 'next/dynamic';

const PointsTable = dynamic(() => import('./PointsTable'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <PointsTable />;
} 