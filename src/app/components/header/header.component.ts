import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  boton: HTMLElement | null = document.querySelector('#buttonnav');
  menu: HTMLElement | null  = document.querySelector('#mimenu');
  btnDropDown: HTMLElement | null  = document.querySelector('#user-menu-button');
  menuDropDown: HTMLElement | null  = document.querySelector('#menudropdown');

  expanded:string | null | undefined ;
  text:HTMLElement | null | undefined;
  constructor(){
  }
  ngOnInit(): void {
    //NavBar Options Responsive
    this.boton = document.querySelector('#buttonnav');
    this.menu  = document.querySelector('#mimenu');
    this.btnDropDown    = document.querySelector('#user-menu-button');
    this.menuDropDown   = document.querySelector('#menudropdown');
    
    this.boton?.addEventListener('click',() =>{
      this.menu?.classList.toggle("hidden");
    });

    //Dropdown Left
    this.btnDropDown?.addEventListener('click',() =>{
      // console.log("hizo click DROPDOWN");
      // this.menuDropDown?.classList.toggle("hidden");
      this.expanded = this.btnDropDown?.getAttribute("aria-expanded");
      // console.log("Expanded"+this.text?.toString);
      // console.log(this.expanded);
      // this.btnDropDown?.setAttribute("ariaExpanded","true");
      if (this.expanded === "true") {
        this.btnDropDown?.setAttribute("aria-expanded", "false");
        this.menuDropDown?.classList.remove("block");
        this.menuDropDown?.classList.add("hidden");
      } else {
        this.btnDropDown?.setAttribute("aria-expanded", "true");
        this.menuDropDown?.classList.remove("hidden");
        this.menuDropDown?.classList.add("block");
      }
      
    });
  }
}