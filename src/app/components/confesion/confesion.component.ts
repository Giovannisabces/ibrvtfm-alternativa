import { Component } from '@angular/core';
import { confesion } from '../shared/data/confesiondefe.data';
import { IAccordion } from '../shared/interfaces/accordion';

@Component({
  selector: 'app-confesion',
  templateUrl: './confesion.component.html',
  styleUrls: ['./confesion.component.css']
})
export class ConfesionComponent {
  confesiondefe: IAccordion[] = confesion;
}
