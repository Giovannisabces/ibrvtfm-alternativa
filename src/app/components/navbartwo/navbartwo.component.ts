import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbartwo',
  templateUrl: './navbartwo.component.html',
  styleUrls: ['./navbartwo.component.css']
})
export class NavbartwoComponent implements OnInit {
  boton: HTMLElement | null = document.querySelector('#buttonnav');
  botonOpen: HTMLElement | null = document.querySelector('#buttonnavopen');
  menu: HTMLElement | null  = document.querySelector('#menu');
  ngOnInit(): void {
    this.boton = document.querySelector('#buttonnav');
    this.botonOpen = document.querySelector('#buttonnavopen');
    this.menu  = document.querySelector('#menu');
    
    this.boton?.addEventListener('click',() =>{
      this.menu?.classList.toggle("hidden");
      console.log("Hizo Click;");
    });
    
    this.botonOpen?.addEventListener('click',() =>{
      this.menu?.classList.toggle("hidden");
      console.log("Hizo Click-2");
    });
  }
  funcionTest(){
    console.log("Test");
    this.menu?.classList.toggle("hidden");
  };

}
