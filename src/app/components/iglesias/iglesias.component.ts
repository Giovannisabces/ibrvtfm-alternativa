import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocationService } from 'src/app/service/location.service';
import { Location } from 'src/app/models/location';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//  Usados para pruebas en local
// import { iglesiasAsociadas } from 'src/app/shared/data/iglesiasasociadas.data';
// import { IIglesia } from 'src/app/shared/interfaces/dataiglesias';


@Component({
  selector: 'app-iglesias',
  templateUrl: './iglesias.component.html',
  styleUrls: ['./iglesias.component.css']
})
export class IglesiasComponent {
  //Variables pruebas en local
  // iglesiasData: IIglesia[] = [];
  // iglesiasDataAux:IIglesia[] = [];
  // iglesiasPaginacion:IIglesia[] = [];
  //Variables Despliegue
  iglesiasDataAux:Location[] = []; 
  iglesiasData: Location[] = [];
  iglesiasPaginacion:Location[] = [];
  //  Variables usadas para  la paginacion
  length:number =10;
  itemInicial:number =0;
  itemFinal:number =0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5];
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent= new PageEvent();
  search:boolean = false;
  // Variables Maps
  apiLoaded: Observable<boolean> = new Observable<false>();
  center: google.maps.LatLngLiteral = {lat: 40, lng: -20};
  zoom = 2;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  input:any[] = [];
  constructor( private locationService: LocationService,
    httpClient: HttpClient) {
    //  Carga de datos desde la API 
    this.locationService.list().subscribe( data=> {
      /* if (this.iglesiasDataAux) */ this.iglesiasDataAux = JSON.parse(data.body);
      this.iglesiasData = this.iglesiasDataAux.reverse();
      this.updateLocation();
      console.info("Entrada data");
      console.log(data)
      console.log(this.iglesiasDataAux[1])
      //  Cargar la API Maps
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAxcbCBuLkG1HzNItG379nksSE1oYKDets', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );

      this.markerPositions = this.iglesiasData.map((data) =>{
        let position: google.maps.LatLngLiteral = {lat:data.lat, lng:data.lng};
        return position;
      })
    });
  }
  ngOnInit(): void {
    // this.updateLocation(); // Solo para modo DEV
  }
  addMarker(event: google.maps.MapMouseEvent ) {
    if ((event.latLng!=null) && !(event==null)){
      this.iglesiasData.forEach((data) =>{
        this.markerPositions.push(data);
      })
      this.markerPositions.push(event.latLng.toJSON());}
  }

  updateLocation(): void {
    
    // Carga de datos en local
    // this.iglesiasDataAux = iglesiasAsociadas;
    // this.iglesiasData = this.iglesiasDataAux.reverse();
    
    this.length = this.iglesiasData.length;
    this.filtroDatos();  
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filtroDatos();
  }

  filtroDatos(): void {
      this.itemInicial = this.pageSize*this.pageIndex;
      this.itemFinal = this.itemInicial+ this.pageSize; 
      this.iglesiasPaginacion = this.iglesiasData.slice(this.itemInicial,this.itemFinal);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const busqueda:string = filterValue.trim().toLowerCase();
    // this.search = (busqueda.length>0)?true:false;       //Filtro para restarurar data sin necesidad de llamar nuevamente a la API
    // console.table([filterValue, busqueda]);

    // this.iglesiasData = this.iglesiasDataAux.filter( iglesia => {
    //   iglesia.title.toLowerCase().includes(busqueda)}
    //   );
    // console.log(this.iglesiasData);
    // console.log(this.iglesiasDataAux.length);

    // this.filtroDatos();
    // this.handlePageEvent(this.pageEvent);              // Se crea un evento para generar la paginación.
  }
}
