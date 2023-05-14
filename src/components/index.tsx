import { lazy } from "react";

export { Dock } from "./Dock";
export { Header } from "./Header";
export { Map } from "./Map";
export { SearchBar } from "./SearchBar";
export { SocialButton } from "./SocialButton";

const MapContainer = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.MapContainer }))
);
const TileLayer = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.TileLayer }))
);
const Marker = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Marker }))
);
const Popup = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Popup }))
);

const MemoizedRouting = lazy(() =>
  import("./Routing").then((module) => ({ default: module.MemoizedRouting }))
);

const MemoizedRadarCircle = lazy(() =>
  import("./RadarCircle").then((module) => ({ default: module.RadarCircle }))
);

const LocationFinder = lazy(() =>
  import("./LocationFinder").then((module) => ({
    default: module.LocationFinder,
  }))
);

export {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LocationFinder,
  MemoizedRouting,
  MemoizedRadarCircle,
};
