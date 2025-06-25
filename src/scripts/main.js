/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from "./stays.js";
/* console.log(stays); */
let contenedor=document.getElementById("cards-container");
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
/* guests */
let capturaGuest= document.getElementById("guests-input");
let capturaGuestMobile = document.getElementById("guest-panel-mobile")
let capturaPanel= document.getElementById("guest-panel");
let overlay= document.getElementById("overlay");
let cerrarGuestMobil= document.getElementById("close-mobile-panel");
let inputModal = document.getElementById("modal-location-input")
let inputModalMobil = document.getElementById("modal-mobil-input")
/* escritorio */
const countAdult = document.getElementById("count-adult");
const btnAdultMas = document.getElementById("increase-adult");
const btnAdultMenos = document.getElementById("decrease-adult");

const countChildren = document.getElementById("count-children");
const btnChildrenMas = document.getElementById("increase-children");
const btnChildrenMenos = document.getElementById("decrease-children");
// Mobile
const countAdultMobile = document.getElementById("count-adult-mobile");
const btnAdultMasMobile = document.getElementById("increase-adult-mobile");
const btnAdultMenosMobile = document.getElementById("decrease-adult-mobile");

const countChildrenMobile = document.getElementById("count-children-mobile");
const btnChildrenMasMobile = document.getElementById("increase-children-mobile");
const btnChildrenMenosMobile = document.getElementById("decrease-children-mobile");

capturaGuest.addEventListener("click",()=>{
    if(window.innerWidth<768){
        capturaGuestMobile.classList.remove("hidden");
        inputModal.value = escuchada.value
        
    }
    else{
        capturaPanel.classList.remove("hidden")
        

    }
    overlay.classList.remove("hidden");
    inputModal.value = escuchada.value;
    inputModalMobil.value= escuchada.value;
    
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

/* contadores de mas y menos */
let adults = 0;
let children = 0;

function actualizarResumen() {
  const total = adults + children;
  capturaGuest.value = total > 0 ? `${total} guests` : "Add guests";
}
/* para escritorio */
btnAdultMas.addEventListener("click", () => {
  adults++;
  countAdult.textContent = adults;
  actualizarResumen();
});

btnAdultMenos.addEventListener("click", () => {
  if (adults > 0) adults--;
  countAdult.textContent = adults;
  actualizarResumen();
});

btnChildrenMas.addEventListener("click", () => {
  children++;
  countChildren.textContent = children;
  actualizarResumen();
});

btnChildrenMenos.addEventListener("click", () => {
  if (children > 0) children--;
  countChildren.textContent = children;
  actualizarResumen();
});
// Móvil
btnAdultMasMobile?.addEventListener("click", () => {
  adults++;
  countAdultMobile.textContent=adults
  actualizarResumen();
});
btnAdultMenosMobile?.addEventListener("click", () => {
  if (adults > 0) adults--;
  countAdultMobile.textContent=adults
  actualizarResumen();
});
btnChildrenMasMobile?.addEventListener("click", () => {
  children++;
  countChildrenMobile.textContent=children
  actualizarResumen();
});
btnChildrenMenosMobile?.addEventListener("click", () => {
  if (children > 0) children--;
  countChildrenMobile.textContent=children
  actualizarResumen();
});

/* codigo para filtrar las cards */
/* agrupar los 3 botones */
let searchButtons = [
  document.getElementById("search-btn-main"),
  document.getElementById("search-btn-desktop"),
  document.getElementById("search-btn-mobile")
];
// 👉 Función para obtener la ubicación dependiendo del panel activo
function obtenerUbicacion() {
  if (!document.getElementById("guest-panel").classList.contains("hidden")) {
    return document.getElementById("modal-location-input").value.trim().toLowerCase();
  } else if (!document.getElementById("guest-panel-mobile").classList.contains("hidden")) {
    return document.getElementById("modal-mobil-input").value.trim().toLowerCase();
  } else {
    return document.getElementById("location-input").value.trim().toLowerCase();
  }
}
/* escuchar los clicks */

searchButtons.forEach(btn => {
  if (btn){
    btn.addEventListener("click",() => {
      let location = obtenerUbicacion();/* guardamos en la variable location el resultado de la funcion para obtener la ubicacion */
      const guests = parseInt(document.getElementById("guests-input").value) || 0;
      const resultados = stays.filter(estadia => {
        const ciudad = estadia.city.toLowerCase();
        return ciudad.includes(location) && estadia.maxGuests >= guests;
    })
    
    /* console.log(resultados); */
    renderizarEstancias(resultados);/* se envia a la funcion de las card previamente echa */

    document.getElementById("guest-panel")?.classList.add("hidden");
    document.getElementById("guest-panel-mobile")?.classList.add("hidden");
    document.getElementById("overlay")?.classList.add("hidden");
    });
  }
});