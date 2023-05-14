//@ts-nocheck
import { useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { authenticate } from "../utils/auth";

import { useAtom } from "jotai";

import {
  idAtom,
  locationAtom,
  myBusesAtom,
  openedMenuAtom,
  selectedBusAtom,
  trackAtom,
} from "../state";
import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  const [openedMenu, setOpenedMenu] = useAtom(openedMenuAtom);
  const [myBuses, setMyBuses] = useAtom(myBusesAtom);
  const [selectedBus, setSelectedBus] = useAtom(selectedBusAtom);
  const [id, setId] = useAtom(idAtom);
  const [track, setTrack] = useAtom(trackAtom);
  const [location, setLocation] = useAtom(locationAtom);

  let gid;
  let cleanup = 0;

  const unloadCallback = (event) => {
    event.preventDefault();
    let data = {
      fields: {
        isTracking: {
          booleanValue: false,
        },
      },
    };
    fetch(
      `https://firestore.googleapis.com/v1beta1/projects/metabus-101/databases/(default)/documents/buses/${selectedBus.id}?updateMask.fieldPaths=isTracking`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        keepalive: true,
      }
    );
    fetch(
      `https://firestore.googleapis.com/v1beta1/projects/metabus-101/databases/(default)/documents/users/${id}/buses/${selectedBus.id}?updateMask.fieldPaths=isTracking`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        keepalive: true,
      }
    );
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      //console.log(currUser.uid)
      if (currUser) {
        setId(currUser.uid);
      } else {
        let user = authenticate();
        setId(user.uid);
      }
    });
  }, []);

  async function run() {
    const q = query(collection(db, "users", id, "buses"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let _myBuses = [];
      querySnapshot.forEach((doc) => {
        _myBuses.push({ id: doc.id, data: doc.data() });
      });
      setMyBuses(_myBuses);
      cleanup = 1;
    });
  }

  useEffect(() => {
    if (cleanup === 1 || id === 0) return;
    run();
  }, [id]);

  useEffect(() => {
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  async function startTracking() {
    setTrack(!track);
    let lat, lng;
    updateDoc(doc(db, "users", id, "buses", selectedBus.id), {
      isTracking: true,
    });
    updateDoc(doc(db, "buses", selectedBus.id), {
      isTracking: true,
    });
    gid = navigator.geolocation.watchPosition((pos) => {
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude });
      updateDoc(doc(db, "users", id, "buses", selectedBus.id), {
        currentLocation: {
          lat: lat,
          long: lng,
        },
      });

      try {
        updateDoc(doc(db, "buses", selectedBus.id), {
          currentLocation: {
            lat: lat,
            long: lng,
          },
        });
      } catch (err) {
        console.log("Yo");
      }
    });
  }

  async function stopTracking() {
    setTrack(!track);
    navigator.geolocation.clearWatch(gid);

    updateDoc(doc(db, "users", id, "buses", selectedBus.id), {
      isTracking: false,
    });

    updateDoc(doc(db, "buses", selectedBus.id), {
      isTracking: false,
    });
  }

  return (
    <DashboardLayout>
      {selectedBus.id !== 1 && (
        <div className="flex items-center justify-center flex-col text-2xl h-screen">
          Your Bus id: {selectedBus.id}
          <button
            className="mt-5 bg-blue-700 text-white p-3 rounded"
            onClick={track ? stopTracking : startTracking}
          >
            {track ? "Stop" : "Start"} Tracking!
          </button>
        </div>
      )}
      {selectedBus.id === 1 && (
        <div className="flex items-center justify-center flex-col text-2xl h-screen">
          Choose one of your buses ✨
        </div>
      )}
    </DashboardLayout>
  );
}
