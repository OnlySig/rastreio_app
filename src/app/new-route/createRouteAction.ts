"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRouteAction = async (state: any, formData: FormData) => {
  const { sourceId, destinationId } = Object.fromEntries(formData);
  const directionsResponse = await fetch(
    `http://localhost:3000/directions?originId=${sourceId}&destinationId=${destinationId}`
  );
  if (!directionsResponse.ok) {
    return { error: "Failed to create route" };
  }
  const directionsData = await directionsResponse.json();
  const startAddress = directionsData.routes[0].legs[0].start_address;
  const endAddress = directionsData.routes[0].legs[0].end_address;
  const newRoute = await fetch("http://localhost:3000/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${startAddress} - ${endAddress}`,
      source_id: directionsData.request.origin.place_id.replace(
        "place_id:",
        ""
      ),
      destination_id: directionsData.request.destination.place_id.replace(
        "place_id:",
        ""
      ),
    }),
  });
  if (!newRoute.ok) {
    return { error: "Failed to create route" };
  }
  revalidateTag("routes");
  return { success: true };
};
