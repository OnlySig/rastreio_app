"use client";
import { useMap } from "@/hooks/useMap";
import { useRef } from "react";

const Admin = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);
  return <div className="h-[100vh]" ref={mapContainerRef} />;
};

export default Admin;
