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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    FlexComponentComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    HistoriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
