import { memo, useContext, useEffect, useState } from "react";
import L, { LatLngTuple, point } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "lrm-graphhopper";
import { buses } from "../../state";
import { useAtom } from "jotai";
import { LatLngExpression } from "leaflet";

let busdata = [
  {
    name: "Shrey Travels",
    coords: [15.5513277, 73.7658367],
  },
  {
    name: "Shrey Travels 2",
    coords: [15.5043329, 73.9137432],
  },
  {
    name: "Shrey Travels 3",
    coords: [15.4993329, 73.9087432],
  },
];

L.Marker.prototype.options.icon = L.icon({
  iconUrl:
    "https://img.icons8.com/?size=512&id=DZQwIozyKLY8&format=png",
  iconSize: [40, 40],
});

export const Routing = ({
  stations,
}: {
  stations: Array<LatLngTuple>;
}): any => {
  const [bus, setBuses] = useAtom(buses);
  const map = useMap();

  //@ts-ignore
  useEffect(() => {
    if (!map) return;
    if (!stations[0][0]) return;

    const routingControl = L.Routing.control({
      waypoints: stations,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "black", weight: 4 }],
      },

      router: L.Routing.graphHopper("c0e0cea8-e6ca-4893-a983-00e121b5a780"),
      show: true,
      showAlternatives: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControl.hide();

    return () => map.removeControl(routingControl);
  }, [map, stations]);

  return null;
};

export const MemoizedRouting = memo(Routing);
