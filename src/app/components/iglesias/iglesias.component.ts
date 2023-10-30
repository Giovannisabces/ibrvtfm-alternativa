import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocationService } from 'src/app/service/location.service';

import { Location } from 'src/app/models/location';

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
  constructor( private locationService: LocationService) {
    //  Carga de datos desde la API 
    this.locationService.list().subscribe( data=> {
      this.iglesiasDataAux = data;
      this.iglesiasData = this.iglesiasDataAux.reverse();
      this.updateLocation(); 
    });
    console.log(this.iglesiasData )
  }
  ngOnInit(): void {
    // this.updateLocation(); // Solo para modo DEV
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
