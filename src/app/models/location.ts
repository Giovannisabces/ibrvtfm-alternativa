export class Location{
    id: number;
    lat: number;
    lng: number;
    title: string;
    direccion: string;
    liderazgo: string;
    movil: string;
    email: string;
    webpage: string;

    constructor(id: number, lat: number, lng: number, title: string, direccion: string, liderazgo: string, movil: string, email: string, webpage: string) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.direccion = direccion;
        this.liderazgo = liderazgo;
        this.movil = movil;
        this.email = email;
        this.webpage = webpage;
    }
}