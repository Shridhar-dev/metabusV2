import { Station, bus } from "@/components/types";
import { atom } from "jotai";
//import L from "leaflet";

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

const writeCoords = atom(null, (get, set, update) => set(coords, update));

const writeBus = atom(null, (get, set, update) => {
  set(buses, update);
});

const setOpenedAtom = atom(null, (get, set, update) => {
  set(openedAtom, update);
});

const setOpenedMenuAtom = atom(null, (get, set, update) => {
  set(openedMenuAtom, update);
});

const setStationsAtom = atom(null, (get, set, update) => {
  set(stationsAtom, update);
});

const setMyBusesAtom = atom(null, (get, set, update) => {
  set(myBusesAtom, update);
});

const setSelectedBusAtom = atom(null, (get, set, update) => {
  set(selectedBusAtom, update);
});

const setIdAtom = atom(null, (get, set, update) => {
  set(idAtom, update);
});

const setTrackAtom = atom(null, (get, set, update) => {
  set(trackAtom, update);
});

const setLocationAtom = atom(null, (get, set, update) => {
  set(locationAtom, update);
});
