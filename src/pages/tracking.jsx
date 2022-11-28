//@ts-nocheck
import { AppShell, Navbar, Header, Text, ActionIcon, Modal, TextInput, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Bus, Plus } from 'tabler-icons-react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authenticate } from '../utils/auth';
import { useBeforeunload } from 'react-beforeunload';

import { stationIcon } from '../Icons';



export default function DashboardLayout() {
  const [opened, setOpened] = useState(false);
  const [stations,setStations] = useState([]);
  const [stationName,setStationName] = useState([]);
  const [name, setName] = useState("");
  const [myBuses, setMyBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState({id:1});
  const [id, setId] = useState()
  const [track, setTrack] = useState(false)
  const [location, setLocation] = useState({})

  let gid;
  let cleanup = 0;
  


  const LocationFinder = () => {
    const map = useMapEvents({
        click(e) {
           //setStations([...stations,{ lat : e.latlng.lat,long: e.latlng.lat}])   
           fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&limit=5&appid=f31aef7d059b3e89ff8c29274d01c1b0`)
              .then((res)=>(res.json())).then((result)=>{         
                console.log(result)
                setStations([...stations,{ name:result[0].name,lat : e.latlng.lat,long: e.latlng.lng}])  
            })
        },
    });
    return null;
  };



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(id,name,stations)
    try {
      let busObj = await addDoc(collection(db, "users",id,"buses"), {
        name: name,	
        stations: stations,
        reports:0,
        user: id,
        isTracking:false
      });
      
      
      await setDoc(doc(db, "buses",busObj.id), {
        name: name,	
        stations: stations,
        reports:0,
        user: id,
        isTracking:false
      });

      await setDoc(doc(db, "routes",busObj.id), {
        start:stations[0],
        end:stations[stations.length-1],
        name: name
      });
        
    } catch (err) {
      console.log(err)
    }

    setOpened(false)
    run();
  }

  

  async function run(){
    
    const q = query(collection(db, "users",id,"buses"));
    let _myBuses = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    
      
      _myBuses.push({id:doc.id, data:doc.data()})
    })
    setMyBuses(_myBuses)
    cleanup = 1;
  }


  

  useEffect(() => {
    if(cleanup === 1) return;
    run();
  },[id])

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      //console.log(currUser.uid)
      if (currUser) {
        setId(currUser.uid)
      } else {
        let user = authenticate();
        setId(user.uid);
      }
    });

  },[])
  

  useEffect(() => {
    const unloadCallback = (event) => { 
      event.preventDefault();
      let data = {
        fields : {
          isTracking : {
            booleanValue : false
          }
        }
      }
      fetch(
        `https://firestore.googleapis.com/v1beta1/projects/metabus-101/databases/(default)/documents/buses/${selectedBus.id}?updateMask.fieldPaths=isTracking`
      ,{
        method: 'PATCH',
        body: JSON.stringify(data),
        keepalive: true,
       }
      )
      fetch(
        `https://firestore.googleapis.com/v1beta1/projects/metabus-101/databases/(default)/documents/users/${id}/buses/${selectedBus.id}?updateMask.fieldPaths=isTracking`
      ,{
        method: 'PATCH',
        body: JSON.stringify(data),
        keepalive: true,
       }
      )
     };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  
 
  async function startTracking() {
    setTrack(!track)
    let lat,lng;
    updateDoc(doc(db, "users",id,"buses",selectedBus.id), {
      isTracking:true,
    });
    updateDoc(doc(db, "buses",selectedBus.id), {
      isTracking:true,
    });
    gid = navigator.geolocation.watchPosition((pos)=>{
      lat=pos.coords.latitude;
      lng=pos.coords.longitude;
      setLocation({lat:pos.coords.latitude,long:pos.coords.longitude})
      updateDoc(doc(db, "users",id,"buses",selectedBus.id), {
        currentLocation: {
            lat: lat,
            long: lng,
        },
      
      });
      
      try {
        updateDoc(doc(db, "buses",selectedBus.id), {
          currentLocation: {
              lat: lat,
              long: lng,
          },
        
        });
      }
      catch(err){
        console.log("Yo")
      }
      
    });
 
  }

  async function stopTracking(){
    setTrack(!track)
    navigator.geolocation.clearWatch(gid);

    updateDoc(doc(db, "users",id,"buses",selectedBus.id), {
        isTracking: false,
    });
    
    updateDoc(doc(db, "buses",selectedBus.id), {
        isTracking: false,
    });
  }

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xl">
           <Text className='text-lg'>Buses</Text>
         
           {
            myBuses.map((bus,i)=>{
              return(
                <div key={i} onClick={()=>{setSelectedBus(bus)}} className='flex items-center bg-slate-200 rounded-md p-2 mt-5'>
                    <ActionIcon className='mr-4'> 
                      <Bus />
                    </ActionIcon>
                    {bus.data.name}
                </div>
              )
            })
           }
           
           <ActionIcon className='mt-4' onClick={() => setOpened(true)}> 
              <Plus />
           </ActionIcon>
           
        </Navbar>
      }
      header={
        <Header height={60} p="xl" className=' flex items-center text-xl font-semibold'>
            Dashboard
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        
      })}
    >
       <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a bus"
      >
        <TextInput label="Name of the bus" onChange={(e)=>{setName(e.target.value)}} /> 
        <div className='relative'>
          <MapContainer center={[10,10]} zoom={10} scrollWheelZoom={false} style={{height:"60vh"}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationFinder />
              {
                stations?.map((station,index)=>(
                  <Marker position={[station.lat,station.long]} icon={stationIcon} key={index}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                ))
              }
                           
              </MapContainer>
              <div>
                Stations:
                  {
                    stations?.map((station,index)=>(
                      <div key={index}>
                        {station.name}
                      </div>
                    ))
                  }
              </div>
        </div>
        <Button style={{background:'black'}} onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>   
      <div className='flex items-center justify-center flex-col text-2xl h-screen'>
        Your Bus id: {selectedBus.id}
        <button className='mt-5 bg-blue-700 text-white p-3 rounded' onClick={track ? stopTracking : startTracking}>{track?"Stop":"Start"} Tracking!</button>
      </div>
    </AppShell>
  );
}