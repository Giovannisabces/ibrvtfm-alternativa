import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponentComponent } from './components/home/home-component.component';
import { FlexComponentComponent } from './components/flex-component/flex-component.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialModule } from './angular-material.module';
import { HistoriaComponent } from './components/historia/historia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationService } from './service/location.service';
import { DistintivosComponent } from './components/distintivos/distintivos.component';
import { ConfesionComponent } from './components/confesion/confesion.component';
import { IglesiasComponent } from './components/iglesias/iglesias.component';
import { LibrosComponent } from './components/libros/libros.component';
import { NavbartwoComponent } from './components/navbartwo/navbartwo.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    FlexComponentComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    HistoriaComponent,
    DistintivosComponent,
    ConfesionComponent,
    IglesiasComponent,
    LibrosComponent,
    NavbartwoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    // ReactiveFormsModule
  ],
  // providers: [LocationService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
