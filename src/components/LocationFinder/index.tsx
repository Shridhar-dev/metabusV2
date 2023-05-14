import { useMapEvents } from "react-leaflet";
import { Station } from "../types";
import { SetStateAction, Dispatch } from "react";

const LocationFinder = ({
  stations,
  setStations,
}: {
  stations: Station[];
  setStations: Dispatch<SetStateAction<Station[]>>;
}) => {
  if (typeof window === "undefined") return <></>;
  const map = useMapEvents({
    click(e) {
      //setStations([...stations,{ lat : e.latlng.lat,long: e.latlng.lat}])
      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&limit=5&appid=f31aef7d059b3e89ff8c29274d01c1b0`
      )
        .then((res) => res.json())
        .then((result) => {
          setStations([
            ...stations,
            {
              name: result[0].name,
              lat: e.latlng.lat,
              long: e.latlng.lng,
              timeFormat: "AM",
            },
          ]);
        });
    },
  });
  return <></>;
};

export { LocationFinder };
