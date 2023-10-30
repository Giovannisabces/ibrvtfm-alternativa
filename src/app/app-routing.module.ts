import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { DistintivosComponent } from './components/distintivos/distintivos.component';
import { ConfesionComponent } from './components/confesion/confesion.component';
import { IglesiasComponent } from './components/iglesias/iglesias.component';
import { LibrosComponent } from './components/libros/libros.component';

const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'historia', component: HistoriaComponent},
  {path: 'distintivos', component: DistintivosComponent},
  {path: 'confesion', component: ConfesionComponent},
  {path: 'iglesias', component: IglesiasComponent},
  {path: 'libros', component: LibrosComponent},
  {
    path: '**',
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
