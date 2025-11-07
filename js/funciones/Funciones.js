

/* Poner imagenes en el grid*/
document.addEventListener("DOMContentLoaded", ()=>{

  /* Funcion e ID para los productos de las Grid Cards*/
  const contenedorGrid = document.getElementById("ProductosFavoritos")

  const CadenaCategorias = Object.keys(productosCompletos);

  for(let i=0;i<4;i++){
    const categoria = productosCompletos[CadenaCategorias[i]];

    const nombre=categoria.nombre[0];
    const descripcion=categoria.descripcion[0];
    const imagen= categoria.imagen[0];
    const precio= categoria.precios[0];

    const card= document.createElement("div");
    card.classList.add("col-md-3","mb-4");

    card.innerHTML =`
      <div class="card h-100 shadow-sm">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">${descripcion}</p>
          <p class="card-text">${precio}</p>
        </div>
      </div>
    `;
    contenedorGrid.appendChild(card);
  }
  /*Funcion e ID para el carrusel*/

  const contenedorCarrusel = document.getElementById("ContenedorCarrusel");

  for(let i=0; i<3; i++){
    let categoriaC;
    if(i === 0){
      categoriaC = productosCompletos[CadenaCategorias[11]]; // AQUÍ EL CAMBIO IMPORTANTE
    } else {
      categoriaC = productosCompletos[CadenaCategorias[i]];
    }
    const nombreC = categoriaC.nombres[0];
    const imagenC = categoriaC.imagenes[0];

    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if(i === 0) item.classList.add("active"); // Para que el carrusel inicie bien

    item.innerHTML = `
    <img src="${imagenC}" class="d-block w-100" alt="${nombreC}">
    <div class="carousel-caption d-none d-md-block">        
    </div>
  `;

    contenedorCarrusel.appendChild(item);
  }

});
