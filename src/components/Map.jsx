import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {MemoizedRadarCircle} from './RadarCircle.jsx'
import { Loader } from '@mantine/core';
// @ts-ignore
import {MemoizedRouting} from './Routing';
import { buses, coords } from '../pages/index.jsx';
import L from "leaflet";
import { useAtom } from 'jotai';

import { collection,query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { busIcon } from '../Icons.js';
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';


function Map() {
  const [userCoords, setUserCoords] = useState([0,0])
  const [loading,setLoading] =  useState(false);
  const [busArray, setBusArray] =  useAtom(buses);
  const [coordsArray, setCoordsArray] =  useAtom(coords); 
  const [buses_on_route,setBuses] =  useState([]);

  let stateCopy ={};
  let gid;
  
  useEffect(() => {
    if (navigator.geolocation) {
        gid = navigator.geolocation.watchPosition((pos)=>{
          setUserCoords([pos.coords.latitude,pos.coords.longitude])
            setLoading(true)
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    return () => navigator.geolocation.clearWatch(gid);;
  },[])
    
  async function run(){
    
    const q = query(collection(db, "buses"), where("isTracking", "==", true));
    const querySnapshot = await getDocs(q);
    setBuses([])
    querySnapshot.forEach((doc) => {
   
    if(doc.data().currentLocation !== undefined){
      
      let bus = {
        id:doc.id,
        coords:[doc.data().currentLocation.lat,doc.data().currentLocation.long],
        name:doc.data().name,
      }
      setBuses(current => [...current,bus]);
    }
    });
  }

  useEffect(() => {
    run();
    const unsubscribe = onSnapshot(query(collection(db, "buses")), (querySnapshot) => {
      run();
    });
  },[])

  
  

  return (
    loading ? 
    <MapContainer zoomControl={false} center={userCoords} zoom={18} style={{height:"100vh",zIndex:"100"}} >
   
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={userCoords}>
            <Popup>
                Your location
            </Popup>
        </Marker>
       
        <FlipMove enterAnimation="fade">
          {
           (buses_on_route)?.map((bus, i)=>{
              
              return(
                <div key={i}>
                  <Marker position={bus.coords} icon={busIcon} key={i}>
                    <Popup>
                      <Link to={`/bus/${bus.id}`}>{bus.name}</Link>
                      <br/>
                    </Popup>
                  </Marker>
                </div>
              )
            })

          }
          
        </FlipMove>
        
        {/* 
         // @ts-ignore */}
        <MemoizedRadarCircle coords={`${userCoords[0]} ${userCoords[1]}`}/>
         
        <MemoizedRouting stations={[L.latLng(coordsArray[0][0], coordsArray[0][1]),L.latLng(coordsArray[1][0],coordsArray[1][1])]} />
      
    </MapContainer> 
    :
    <><Loader /></>
  )
}

export default Map