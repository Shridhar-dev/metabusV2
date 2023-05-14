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
      <Accordion style={{ pointerEvents: "all", background: "white" }}>
        <Accordion.Item label="Routes">
          {routes.map((route: Route, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  setCoords([
                    [route.start.lat, route.start.long],
                    [route.end.lat, route.end.long],
                  ]);
                }}
              >
                {route.start.name} - {route.end.name}
              </li>
            );
          })}
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export { SearchBar };
