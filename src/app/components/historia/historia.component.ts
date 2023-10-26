import { Component } from '@angular/core';
import { historia } from '../shared/data/historia.data';
import { IAccordion } from '../shared/interfaces/accordion';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent {
  historiaData: IAccordion[] = historia
  constructor(){
    // console.log(historia);  
  }
  onScroll(event: Event) {
    const scrollPosition = (event.target as Element).scrollTop;
    console.log(scrollPosition);
  }
}
