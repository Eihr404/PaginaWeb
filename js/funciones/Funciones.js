

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
    const card= document.createElement("div");
    card.classList.add("col-md-3","mb-4");

    card.innerHTML =`
      <div class="card h-100 shadow-sm">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">${descripcion}</p>       
        </div>
      </div>
    `;
    contenedorGrid.appendChild(card);
  }

});

document.addEventListener("DOMContentLoaded", ()=>{
  const contenedorCarrusel = document.getElementById("ContenedorCarrusel");
  const cadenaCategorias = Object.keys(productosCompletos);

  for(let i=0;i<3;i++){
    let categoria;
    if(i === 0){
      categoria=productosCompletos[cadenaCategorias[11]];
    }
    else{
      categoria=productosCompletos[cadenaCategorias[i]];
    }
    const nombre=categoria.nombre[0];
    const imagen=categoria.imagen[0];

    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if(i === 0) item.classList.add("active"); // Para que el carrusel inicie bien

    item.innerHTML = `
    <img src="${imagen}" class="d-block w-100" alt="${nombre}">
    <div class="carousel-caption d-none d-md-block">        
    </div>
  `;

    contenedorCarrusel.appendChild(item);



  }

})
