import "";

declare module "leaflet" {
    export class Routing {
        static control({}): any ;
        static graphHopper(secret:string): any ;
    }
}