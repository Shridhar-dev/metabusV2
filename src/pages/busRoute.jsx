import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore";

import { MapContainer, TileLayer } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import {MemoizedRouting} from '../components/Routing';

import {
  AppShell,
  Aside,
  MediaQuery,
  Image,
  useMantineTheme,
} from '@mantine/core';

function BusRoute() {
   const [loc,setLoc] =  useState([0,0]);
   const [loading,setLoading] =  useState(false);
   const [bus,setBus] =  useState();
   const [map, setMap] = useState(null);
   const [points, setPoints] = useState([])

   const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

   let { id } = useParams();

  useEffect(() => {
    async function run(){
        const docRef = doc(db, "buses", id);
        const docSnap = await getDoc(docRef);
        setBus(docSnap.data());
        setLoc([docSnap.data().stations[0].lat,docSnap.data().stations[0].long])
        docSnap.data().stations.map((station)=>{
          setPoints(prevState => [...prevState,L.latLng(station.lat, station.long)])
          console.log(points)
        })
        setLoading(true);
    }
    run();

    
  },[])

  

  return (
    loading &&
    <div>
      <AppShell
        styles={{
          main: {
            padding:0,
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        asideOffsetBreakpoint="sm" 
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 350 }}>
              <Image
                radius="md"
                src={bus.url}
                alt={`Image of ${bus.image}`}
              />
              <h1 className='text-2xl font-semibold my-2'>{bus.name}</h1>
              <hr/>
              <h1 className='text-xl my-2'>Routes</h1>
              {
                  bus.stations.map((station,index)=>{
                      return(
                          <div key={index}> {index+1}. {station.time} {station.timeFormat} - {station.name}</div>
                      )
                  })
              }
              <hr className='my-5'/>
              <h1 className='text-sm'>Bus Number Plate: {bus.plateNo}</h1>
              <h1 className='text-sm'>Driver Phone Number: {bus.phoneNo}</h1>
              <hr className='my-5'/>
              <h1 className='text-md my-2'>Reports: {bus.reports}</h1>
            </Aside>
          </MediaQuery>
        }
    >
      <MapContainer center={loc} zoom={10} scrollWheelZoom={false} style={{height:"100vh"}} whenCreated={setMap}>
          <MemoizedRouting stations={points}/>   
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> 
      </MapContainer>
    </AppShell>
    </div>
  )
}

export default BusRoute