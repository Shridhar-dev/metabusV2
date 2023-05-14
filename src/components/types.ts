import { LatLngExpression } from "leaflet"

export type bus = {
    name:string,
    coords:LatLngExpression,
    id?:string,
    data?:{name:string}
}

export type Station = {
    lat: number,
    long: number,
    name?:string,
    time?:number | string,
    timeFormat?:string
}


export type Route = {
    name: string,
    phoneNo: string,
    plateNo: string,
    url:string,
    end:Station,
    start:Station
}

