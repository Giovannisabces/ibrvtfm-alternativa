import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


const materialModules = [
  MatExpansionModule,
  MatButtonModule,
  // MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule
];
@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    CommonModule,
    ...materialModules
  ]
})
export class AngularMaterialModule { }
