import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { db } from "../../firebase";
import {
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";

import L, { LatLngExpression, LatLngTuple, Map } from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  AppShell,
  Aside,
  MediaQuery,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { MemoizedRouting, MapContainer, TileLayer } from "@/components";
import { Station } from "@/components/types";

export async function getStaticPaths() {
  const paths: any = [];
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return { props: { id: params.id } };
}

function BusRoute({ id }: { id: string }) {
  const [loc, setLoc] = useState<LatLngExpression>([0, 0]);
  const [loading, setLoading] = useState(false);
  const [bus, setBus] = useState<DocumentData>();

  const [points, setPoints] = useState<LatLngTuple[]>([]);

  const theme = useMantineTheme();

  useEffect(() => {
    async function run() {
      const docRef = doc(db, "buses", id);

      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
      setBus(docSnap.data());
      setLoc([
        docSnap.data()?.stations[0].lat,
        docSnap.data()?.stations[0].long,
      ]);
      docSnap.data()?.stations.map((station: Station) => {
        setPoints((prevState) => [...prevState, [station.lat, station.long]]);
      });
      setLoading(true);
    }
    run();
  }, []);

  return (
    loading && (
      <div>
        <AppShell
          styles={{
            main: {
              padding: 0,
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          asideOffsetBreakpoint="sm"
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 350 }}>
                <Image
                  radius="md"
                  src={bus?.url}
                  alt={`Image of ${bus?.image}`}
                />
                <h1 className="text-2xl font-semibold my-2">{bus?.name}</h1>
                <hr />
                <h1 className="text-xl my-2">Routes</h1>
                {bus?.stations.map((station: Station, index: number) => {
                  return (
                    <div key={index}>
                      {" "}
                      {index + 1}. {station.time} {station.timeFormat} -{" "}
                      {station.name}
                    </div>
                  );
                })}
                <hr className="my-5" />
                <h1 className="text-sm">Bus Number Plate: {bus?.plateNo}</h1>
                <h1 className="text-sm">Driver Phone Number: {bus?.phoneNo}</h1>
                <hr className="my-5" />
                <h1 className="text-md my-2">Reports: {bus?.reports}</h1>
              </Aside>
            </MediaQuery>
          }
        >
          <MapContainer
            center={loc}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: "100vh" }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <MemoizedRouting stations={points} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Suspense>
          </MapContainer>
        </AppShell>
      </div>
    )
  );
}

export default BusRoute;
