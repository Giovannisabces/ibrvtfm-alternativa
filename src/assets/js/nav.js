const { delay } = require("rxjs");

const boton = document.querySelector('#buttonnav');
const menu  = document.querySelector('#mimenu');
const menuTwo  = document.querySelector('#mobile-menu');
const testhiden  = document.querySelector('#testboton');

alert(typeof(boton));


if (boton) 
    boton.addEventListener('click',() =>{
        console.log("hizo click");
})

console.log("Hoola");

if (testhiden) 
    testhiden.addEventListener('click',() =>{
        console.log("hizo click");
})
