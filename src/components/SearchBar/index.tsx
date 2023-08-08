import React, { useContext, useEffect, useState } from "react";
import { Input, createStyles } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useInputState } from "@mantine/hooks";
import { coords } from "../../state";
import { useAtom } from "jotai";
import { Accordion } from "@mantine/core";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Route } from "../types";
import { FaRoute } from "react-icons/fa"
import { MdGpsFixed } from "react-icons/md"

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}));

function SearchBar() {
  const [routes, setRoutes] = useInputState<any[]>([]);

  const [, setCoords] = useAtom(coords);

  async function run() {
    const q = query(collection(db, "routes"));
    let _myRoutes: DocumentData[] = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      _myRoutes.push(doc.data());
    });
    setRoutes(_myRoutes);
  }

  useEffect(() => {
    run();
  }, []);

  return (
    <div
      className="w-1/2 md:w-1/3 md:px-0 h-screen pt-5"
      style={{ zIndex: "10000" }}
    >
      <Accordion icon={<FaRoute className="text-xl"/>} className="rounded-lg overflow-hidden pl-5" style={{ pointerEvents: "all", background: "white" }}>
        
        <Accordion.Item 
          label={
            <p className="flex items-center  text-xl font-semibold">Routes</p>
          }>
          {routes.map((route: Route, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setCoords([
                    [route.start.lat, route.start.long],
                    [route.end.lat, route.end.long],
                  ]);
                }}
                className="flex items-center gap-2 py-2 hover:bg-gray-100 hover:bg-opacity-20 cursor-pointer"
              >
                <MdGpsFixed /> {route.start.name} - {route.end.name}
              </div>
            );
          })}
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export { SearchBar };
