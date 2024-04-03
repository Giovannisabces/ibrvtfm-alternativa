import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponentComponent } from './components/home/home-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialModule } from './angular-material.module';
import { HistoriaComponent } from './components/historia/historia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LocationService } from './service/location.service';
import { DistintivosComponent } from './components/distintivos/distintivos.component';
import { ConfesionComponent } from './components/confesion/confesion.component';
import { IglesiasComponent } from './components/iglesias/iglesias.component';
import { LibrosComponent } from './components/libros/libros.component';
import { NavbartwoComponent } from './components/navbartwo/navbartwo.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpClient, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { VideosComponent } from './components/videos/videos.component';
// import { ReactiveFormsModule } from '@angular/forms';
// Import Google Maps
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    FooterComponent,
    HistoriaComponent,
    DistintivosComponent,
    ConfesionComponent,
    IglesiasComponent,
    LibrosComponent,
    NavbartwoComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
    // ReactiveFormsModule
  ],
  exports: [
    IglesiasComponent
  ],
  // providers: [LocationService],
  providers: [provideHttpClient(withJsonpSupport())],
  bootstrap: [AppComponent]
})
export class AppModule { }
