'use-client'

import React, { useEffect, useState, Suspense, lazy } from "react";

import "leaflet/dist/leaflet.css";

import { Loader } from "@mantine/core";

import { coords } from "../../state";
import { LatLngTuple } from "leaflet";
import { useAtom } from "jotai";

import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

import FlipMove from "react-flip-move";
import Link from "next/link";
import { bus } from "../types.js";



import dynamic from "next/dynamic";



const MapContainer = dynamic(() => import("react-leaflet").then((module) => ({ default: module.MapContainer })), { ssr:false })
const MemoizedRouting = dynamic(() => import("../Routing").then((module) => ({ default: module.MemoizedRouting })), { ssr:false })
const TileLayer = dynamic(() => import("react-leaflet").then((module) => ({ default: module.TileLayer })), { ssr:false })
const Marker = dynamic(() => import("react-leaflet").then((module) => ({ default: module.Marker })), { ssr:false })
const Popup = dynamic(() => import("react-leaflet").then((module) => ({ default: module.Popup })), { ssr:false })
const MemoizedRadarCircle = dynamic(() => import("../RadarCircle").then((module) => ({ default: module.RadarCircle })), { ssr:false })
const LocationFinder = dynamic(() => import("../LocationFinder").then((module) => ({ default: module.LocationFinder })), { ssr:false })



function Map() {
  const [userCoords, setUserCoords] = useState<LatLngTuple>([0, 0]);
  const [loading, setLoading] = useState(true);
  const [busIcon, setBusIcon] = useState<any>(null);
  const [coordsArray, setCoordsArray] = useAtom<number[][]>(coords);
  const [buses_on_route, setBuses] = useState<bus[]>([]);

  let gid: number;

  useEffect(() => {
    /*if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
        setLoading(true);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    return () => navigator.geolocation.clearWatch(gid);*/
  }, []);

  async function run() {
    const busIconModule = (await import('../../Icons')).busIcon;
    setBusIcon(busIconModule)
    const q = query(collection(db, "buses"), where("isTracking", "==", true));
    const querySnapshot = await getDocs(q);
    setBuses([]);
    querySnapshot.forEach((doc) => {
      if (doc.data().currentLocation !== undefined) {
        let bus: bus = {
          id: doc.id,
          coords: [
            doc.data().currentLocation.lat,
            doc.data().currentLocation.long,
          ],
          name: doc.data().name,
        };
        setBuses((current: bus[]) => [...current, bus]);
      }
    });
  }

  useEffect(() => {
    run();
    const unsubscribe = onSnapshot(
      query(collection(db, "buses")),
      (querySnapshot) => {
        run();
      }
    );
  }, []);

  return loading ? (
    <MapContainer
      zoomControl={false}
      center={userCoords}
      zoom={18}
      style={{ height: "100vh", zIndex: "100" }}
    >
      <Suspense fallback={<div>Loading ... </div>}>
        <MemoizedRadarCircle coords={userCoords} />
        <MemoizedRouting
          stations={[
            [coordsArray[0][0], coordsArray[0][1]],
            [coordsArray[1][0], coordsArray[1][1]],
          ]}
        />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userCoords}>
          <Popup>Your location</Popup>
        </Marker>

        
          {buses_on_route?.map((bus, i) => {
            return (
              <div key={i}>
                <Marker position={bus.coords} icon={busIcon}  key={i}>
                  <Popup>
                    <Link href={`/bus/${bus.id}`}>{bus.name}</Link>
                    <br />
                  </Popup>
                </Marker>
              </div>
            );
          })}
      
      </Suspense>
    </MapContainer>
  ) : (
    <>
      <Loader />
    </>
  );
}

export { Map };
