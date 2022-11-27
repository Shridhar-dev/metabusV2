import React, { createContext, useState } from 'react'
import Dock from '../components/Dock';
import Map from '../components/Map';
import Header from '../components/Header';
import { atom } from 'jotai'


export const coords = atom([[],[]])
export const buses = atom([{name:"",coords:[0,0]}])

const writeCoords = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(coords, update)
  }
)

const writeBus = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(buses, update)
  }
)

let Config = createContext({});

function Home() {
  //const [coords, setCoords] = useState([])
  //const [buses, setBuses] = useState([]) 
  return (
    <>
      
        <Header />
        <Map />
        <Dock />

    </>
  )
}

export default Home
export {Config};