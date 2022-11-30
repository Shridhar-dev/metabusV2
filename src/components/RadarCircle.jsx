// @ts-ignore
import  Radar  from 'leaflet-radar';
import { useMap } from "react-leaflet";    
    // Usethe constructor...
import { ReactNode, memo } from 'react';

export const RadarCircle = (props) => {
    const map = useMap();
/*
    let radar = new Radar({
        radius:100, //Radius of radar sector,The unit is meter
        angle:360, //Fan opening and closing angle 0-360
        direction:65, // Fan orientation angle 0-360
        location:props.coords // Longitude dimension of sector start position
    }, {
        online:{
            color: 'black',
            dashArray: [0, 0],
            weight: 0.5,
            opacity: 1,
            fillColor: "",
            fillOpacity: 0.01,
        },
        animat:{
            color: 'blue',
            weight: 0,
            opacity: 1,
            fillColor: "black",
            fillOpacity: 0.05,
            pmIgnore:false
        },
        step:1  //The refresh distance of each frame of radar scanning animation. The unit is meter.
    });
    
    radar.addTo(map);*/
        
      
    return null;
}
      

export const MemoizedRadarCircle = memo(RadarCircle);