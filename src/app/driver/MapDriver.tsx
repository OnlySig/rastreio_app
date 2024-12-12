"use client";

import { useMap } from "@/hooks/useMap";
import { useRef } from "react";

const MapDriver = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);
  return <div className="w-2/3 h-[100vh]" ref={mapContainerRef} />;
};

export default MapDriver;
