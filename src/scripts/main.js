/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from "./stays.js";
/* console.log(stays); */
let contenedor=document.getElementById("cards-container");
let ciudad=document.getElementById("location-input");
let camas= document.getElementById("guests-input");
let buscar= document.getElementById("search-btn");

function renderizarEstancias(israel){
    contenedor.innerHTML="";
    israel.forEach((dani)=> {
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
    });
}
renderizarEstancias(stays);
/* buscador de ciudades */
/* filtrar ciudades y no duplicarlas */
let ciudades= stays.map(estadia=>estadia.city);
let eliminarDuplicados= new Set(ciudades);
let arrayDuplicados= Array.from(eliminarDuplicados); 
/* console.log(arrayDuplicados); */
/* escuchar evento de input add location */
let escuchada = document.getElementById("location-input");
escuchada.addEventListener("input",function(){
    let textoUsuario = escuchada.value.toLowerCase();/* obtener lo que el usuario escribe */
    let coincidencias = arrayDuplicados.filter(ciudad =>
    ciudad.toLowerCase().includes(textoUsuario)  /* filtrar las ciudades y lo guardamos en ciudad */
    );
    /* mostrar sugerencias */
    let contenedorSugerencias = document.getElementById("sugerencias");/* variable donde extraemos el contendor */
    contenedorSugerencias.innerHTML = ""; // limpiamos

    coincidencias.forEach((ciudad) => {
    contenedorSugerencias.innerHTML += `<p class="p-2 cursor-pointer hover:bg-gray-100">${ciudad}</p>`;

    /* autocompletar con la lista */
            let opciones = contenedorSugerencias.querySelectorAll("p");
            opciones.forEach((opcion) => {
            opcion.addEventListener("click", () => {
            escuchada.value = opcion.textContent; // autocompletar
            contenedorSugerencias.classList.add("hidden"); // ocultar sugerencias
        });
        });
    });
    contenedorSugerencias.classList.remove("hidden");/* remover hidden si estaba hiden */
})
// Verifica si el clic fue fuera del input y del contenedor de sugerencias
document.addEventListener("click", function (e) {
  if (
    !escuchada.contains(e.target) &&  // escuchada = input de ciudad
    !document.getElementById("sugerencias").contains(e.target)
  ) {
    document.getElementById("sugerencias").classList.add("hidden");
  }
});

let capturaGuest= document.getElementById("guests-input");
let capturaGuestMobile = document.getElementById("guest-panel-mobile")
let capturaPanel= document.getElementById("guest-panel");
let overlay= document.getElementById("overlay");
let cerrarGuestMobil= document.getElementById("close-mobile-panel");


capturaGuest.addEventListener("click",()=>{
    if(window.innerWidth<768){
        capturaGuestMobile.classList.remove("hidden");
    }
    else{
        capturaPanel.classList.remove("hidden")

    }
    overlay.classList.remove("hidden");
    
});
cerrarGuestMobil.addEventListener("click",()=>{
    capturaGuestMobile.classList.add("hidden");
    overlay.classList.add("hidden")
});
overlay.addEventListener("click", () => {
  capturaPanel.classList.add("hidden");
  capturaGuestMobile.classList.add("hidden");
  overlay.classList.add("hidden");
});

