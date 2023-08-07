'use-client'

import React,{Suspense} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import { MemoizedRouting } from '..';
import { LatLngTuple } from 'leaflet';

function StaticMapContainer({loc,points}:{loc:LatLngTuple, points:[]}) {
  return (
    <MapContainer
            center={loc}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: "100vh" }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <MemoizedRouting stations={points} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Suspense>
    </MapContainer>
  )
}

export default MapContainer