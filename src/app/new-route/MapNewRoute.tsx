"use client";

import { useMap } from "@/hooks/useMap";
import { DirectionsData } from "@/utils/models";
import { useEffect, useRef } from "react";

export type MapNewRouteProps = {
  directionsData: DirectionsData;
};

const MapNewRoute = (props: MapNewRouteProps) => {
  const { directionsData } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);
  useEffect(() => {
    if (!map || !directionsData) {
      return;
    }
    map.removeAllRoutes();
    map.addRouteWithIcons({
      routeId: "1",
      startMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directionsData.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
    });
  }, [map, directionsData]);
  return <div className="w-2/3 h-[100vh]" ref={mapContainerRef} />;
};

export default MapNewRoute;
