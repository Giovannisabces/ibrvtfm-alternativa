import { Component } from '@angular/core';
import { libros } from '../shared/data/libros.data';
import { IRecursos } from '../shared/interfaces/recursos';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {
  books: IRecursos[] = libros;
}
