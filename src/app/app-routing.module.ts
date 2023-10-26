import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { FlexComponentComponent } from './components/flex-component/flex-component.component';
import { CardComponent } from './components/card/card.component';
import { HistoriaComponent } from './components/historia/historia.component';

const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'flex', component: FlexComponentComponent},
  {path: 'card', component: CardComponent},
  {path: 'historia', component: HistoriaComponent},
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
