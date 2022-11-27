import { memo, useContext, useEffect, useState } from "react";
import L, { point } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "lrm-graphhopper"
import { buses, Config } from "../pages";
import { useAtom } from 'jotai'
import { LatLngExpression } from 'leaflet';

let busdata = [
  {
      name:"Shrey Travels",
      coords:[15.5513277, 73.7658367]
  },
  {
      name:"Shrey Travels 2",
      coords:[15.5043329, 73.9137432]
  },
  {
      name:"Shrey Travels 3",
      coords:[15.4993329, 73.9087432]
  }
]

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://cdn2.iconfinder.com/data/icons/game-center-mixed-icons/512/pin.png",
  iconSize: [40,45],  
});

export const Routing = ({ stations }) => {
  if(!stations[1]) return;
  const [bus, setBuses] =  useAtom(buses)
  const map = useMap();

 
  

  function getBusesonRoute(){
    let result = [];
    busdata.map((bus) => { 
   
      if(
        (bus.coords[0] >= (stations[1].lat - 0.005) && bus.coords[0] <= (stations[1].lat + 0.005))
        &&
        (bus.coords[1] >= (stations[1].lng - 0.005) && bus.coords[1] <= (stations[1].lng + 0.005))
      ){
          result.push(bus)
      }
  
    })
    return (result);
  }
 
    //@ts-ignore
    useEffect(() => {
      if (!map) return;

          
          let buses = getBusesonRoute();
        
          let oldBuses = JSON.stringify(bus);
          let newBuses = JSON.stringify(buses);
          
          if(oldBuses !== newBuses){
            setBuses(buses)
          }
          

          const routingControl = L.Routing.control({
          waypoints: 
            stations
          ,
          routeWhileDragging: false,
          lineOptions: {
            styles: [{ color: "#1d4ed8", weight: 4 }]
          },
          
          router: L.Routing.graphHopper("c0e0cea8-e6ca-4893-a983-00e121b5a780"),
          show: true,
          showAlternatives: true,
          addWaypoints: true, 
          fitSelectedRoutes: true,
        }).addTo(map);
        
        routingControl.hide();
        
        return () => map.removeControl(routingControl);
      
      


    }, [map, stations]);   

  return null;
}

export const MemoizedRouting = memo(Routing);
