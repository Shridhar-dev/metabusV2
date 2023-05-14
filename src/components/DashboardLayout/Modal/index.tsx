import {
  LocationFinder,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "@/components";
import { Station } from "@/components/types";
import { db } from "@/firebase";
import { idAtom, openedAtom, stationsAtom } from "@/state";
import { Button, Modal, TextInput } from "@mantine/core";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAtom } from "jotai";
import React, { Suspense, ChangeEvent } from "react";
import { useMapEvents } from "react-leaflet";

let bus: {
  name: string;
  image: Blob | null;
  plateNo: string;
  phoneNo: string;
} = {
  name: "",
  image: null,
  plateNo: "",
  phoneNo: "",
};

function ModalComponent() {
  const [opened, setOpened] = useAtom(openedAtom);
  const [stations, setStations] = useAtom(stationsAtom);
  const [id, setId] = useAtom(idAtom);

  const storage = getStorage();

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    const storageRef = ref(storage, "images/" + bus.image?.name);

    if (bus.image) {
      const uploadTask = uploadBytesResumable(storageRef, bus.image, {
        contentType: "image/jpeg",
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              let busObj = await addDoc(collection(db, "users", id, "buses"), {
                name: bus.name,
                stations: stations,
                reports: 0,
                user: id,
                isTracking: false,
                url: downloadURL,
                plateNo: bus.plateNo,
                phoneNo: bus.phoneNo,
              });

              await setDoc(doc(db, "buses", busObj.id), {
                name: bus.name,
                stations: stations,
                reports: 0,
                user: id,
                isTracking: false,
                url: downloadURL,
                plateNo: bus.plateNo,
                phoneNo: bus.phoneNo,
              });

              await setDoc(doc(db, "routes", busObj.id), {
                start: stations[0],
                end: stations[stations.length - 1],
                name: bus.name,
                url: downloadURL,
                plateNo: bus.plateNo,
                phoneNo: bus.phoneNo,
              });
            } catch (err) {
              console.log(err);
            }

            setOpened(false);
            setStations([]);
          });
        }
      );
    }
  };

  function handleContent(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      bus.image = e.target.files[0];
    }
  }

  function handleTime(e: ChangeEvent<HTMLInputElement>, index: number) {
    let tempStations: Station[] = stations;
    if (e.target.value !== "AM" && e.target.value !== "PM") {
      tempStations[index].time = e.target.value;
      setStations(tempStations);
    } else {
      tempStations[index].timeFormat = e.target.value;
      setStations(tempStations);
    }
  }

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add a bus">
      <TextInput
        label="Name of the bus"
        onChange={(e) => {
          bus.name = e.target.value;
        }}
      />
      <TextInput
        label="Driving plate no."
        onChange={(e) => {
          bus.plateNo = e.target.value;
        }}
      />
      <TextInput
        label="Your phone number"
        onChange={(e) => {
          bus.phoneNo = e.target.value;
        }}
      />
      <div className="relative mt-5">
        <MapContainer
          center={[10, 10]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "60vh" }}
        >
          <Suspense>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationFinder stations={stations} setStations={setStations} />
            {stations?.map((station: Station, index) => (
              <Marker position={[station.lat, station.long]} key={index}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
          </Suspense>
        </MapContainer>

        <input type="file" onChange={handleContent} />
        <ol>
          Stations:
          {stations?.map((station: Station, index) => (
            <li key={index} className="my-2">
              {index + 1}. {station.name}
              <input
                type="time"
                className="p-0 ml-5"
                id="stationTiming"
                name="stationTiming"
                onChange={(e) => handleTime(e, index)}
                required
              />
              <input
                type="radio"
                className="ml-2"
                id="AM"
                name={"time_format_" + index}
                onChange={(e) => handleTime(e, index)}
                value="AM"
              />
                <label htmlFor="AM">AM</label> {" "}
              <input
                type="radio"
                id="PM"
                name={"time_format_" + index}
                onChange={(e) => handleTime(e, index)}
                value="PM"
              />
                <label htmlFor="css">PM</label>
            </li>
          ))}
        </ol>
      </div>
      <Button
        style={{ background: "black" }}
        onClick={(e: any) => {
          handleSubmit(e);
        }}
      >
        Submit
      </Button>
    </Modal>
  );
}

export default ModalComponent;
