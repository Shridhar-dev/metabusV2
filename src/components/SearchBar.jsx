import React, { useContext, useEffect, useState } from 'react'
import { Input,createStyles } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useInputState } from '@mantine/hooks';
import { Config, coords } from '../pages';
import { useAtom } from 'jotai';
import { Accordion } from '@mantine/core';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';


const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:"white"
  },
}));


function SearchBar() {

  const [routes, setRoutes] = useInputState([]);
  
  
  const [, setCoords] =  useAtom(coords)


  async function run(){
    const q = query(collection(db, "routes"));
    let _myRoutes = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      _myRoutes.push(doc.data())
    })
    setRoutes(_myRoutes)
  }

  useEffect(() => {
    run();
  },[])
  

  return (
    <div className='md:w-1/3 md:px-0 h-screen' style={{zIndex:"10000"}}>
      <Accordion style={{pointerEvents:"all",background:'white'}}>
        <Accordion.Item label="Routes">
          {
            routes.map((route,i)=>{
              return(
                <li key={i} onClick={()=>{setCoords([[route.start.lat,route.start.long],[route.end.lat,route.end.long]])}}>{route.start.name} - {route.end.name}</li>
              )
            })
          }
        </Accordion.Item>
      </Accordion>

    </div>
  )
}

export default SearchBar