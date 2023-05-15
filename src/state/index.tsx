import { Station, bus } from "@/components/types";
import { atom } from "jotai";
//import L from "leaflet";
import { SetStateAction } from "react";

export const coords = atom<Array<Array<number>>>([[], []]);
export const buses = atom([{ name: "", coords: [0, 0] }]);

export const openedAtom = atom<boolean>(false);
export const openedMenuAtom = atom<boolean>(false);
export const stationsAtom = atom<Station[]>([]);
export const myBusesAtom = atom([]);
export const selectedBusAtom = atom<bus>({
  name: "",
  coords: [0, 0],
  id: "",
});
export const idAtom = atom<string>("0");
export const trackAtom = atom(false);
export const locationAtom = atom({});

const writeCoords = atom(null, (get, set, update: SetStateAction<number[][]>) =>
  set(coords, update)
);

const writeBus = atom(
  null,
  (get, set, update: SetStateAction<{ name: string; coords: number[] }[]>) => {
    set(buses, update);
  }
);

const setOpenedAtom = atom(
  null,
  (get, set, update: SetStateAction<boolean>) => {
    set(openedAtom, update);
  }
);

const setOpenedMenuAtom = atom(
  null,
  (get, set, update: SetStateAction<boolean>) => {
    set(openedMenuAtom, update);
  }
);

const setStationsAtom = atom(
  null,
  (get, set, update: SetStateAction<Station[]>) => {
    set(stationsAtom, update);
  }
);

const setMyBusesAtom = atom(
  null,
  (get, set, update: SetStateAction<never[]>) => {
    set(myBusesAtom, update);
  }
);

const setSelectedBusAtom = atom(
  null,
  (get, set, update: SetStateAction<bus>) => {
    set(selectedBusAtom, update);
  }
);

const setIdAtom = atom(null, (get, set, update: SetStateAction<string>) => {
  set(idAtom, update);
});

const setTrackAtom = atom(null, (get, set, update: SetStateAction<boolean>) => {
  set(trackAtom, update);
});

const setLocationAtom = atom(null, (get, set, update: SetStateAction<{}>) => {
  set(locationAtom, update);
});
