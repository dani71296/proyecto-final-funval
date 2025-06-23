/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from "./stays.js";
console.log(stays);
let contenedor=document.getElementById("cards-container");
stays.forEach((dani)=>{
    
contenedor.innerHTML+=`
<div class="max-w-sm rounded-lg  ">
    <a href="#">
        <img class="w-full h-48 object-cover rounded-3xl" src="${dani.photo}" alt="" />
    </a>
    <div class="p-5">
        <div class="flex items-center justify-between mb-3">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${dani.type}${dani.beds ? ` • ${dani.beds} beds` : ""}</p>
            <p class="text-sm text-yellow-600 font-medium">⭐ ${dani.rating}</p>
        </div>
        <a href="#">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-black">${dani.title}</h5>
        </a>
        
    </div>
</div>`;

})