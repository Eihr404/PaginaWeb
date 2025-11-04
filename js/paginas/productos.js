// detalleProducto.html?categoria=macarrones&imagen=assets/img/macarron-de-fresa.jpg

const producto_cat = document.getElementById("Producto-Catalogo"); // Se obtiene el objeto de div por medio del id Producto-Catalogo para agregar los productos

function agregarProductos(){
    for (const producto in productos) {
        const data = productos[producto];
        const titulo = data.titulo;
        const imagen = data.imagen[0]; // Usamos el primer elemento del array de imagen

        const elemento = document.createElement("div");
        elemento.className = "col-12 col-sm-6 col-md-3 mb-4";
        elemento.innerHTML = `
      <a href="detalleProducto.html?categoria=${titulo}&imagen=${imagen}">
        <img class="Imagen-producto" src="${imagen}" alt="${titulo}">
      </a>
      <h2 class="Titulo-producto">${titulo}</h2>
    `;
        producto_cat.appendChild(elemento);
    }

}
agregarProductos();
