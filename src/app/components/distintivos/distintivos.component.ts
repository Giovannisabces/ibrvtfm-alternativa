import { Component } from '@angular/core';
import { distintivos } from '../shared/data/distintivos.data';
import { IAccordion } from '../shared/interfaces/accordion';

@Component({
  selector: 'app-distintivos',
  templateUrl: './distintivos.component.html',
  styleUrls: ['./distintivos.component.css']
})
export class DistintivosComponent {
  distintivosData: IAccordion[] = distintivos;
  constructor(){}
}
