// detalleProducto.html?categoria=macarrones&imagen=assets/img/macarron-de-fresa.jpg

const producto_cat = document.getElementById("Producto-Catalogo"); // Se obtiene el objeto de div por medio del id Producto-Catalogo para agregar los productos

function agregarProducto(){
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
agregarProducto();

function removerProducto(){

}

function mostrarProductos(){
  //carrito
  let carrito = [];
  const carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  let total = 0;
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  contenedorCarrito.innerHTML = "";

  const lista = document.createElement("ul");
  lista.classList.add("list-group");

  const botonExistente = document.getElementById("btn-comprar");
  if (botonExistente) {
    botonExistente.remove();
  }

  if (carrito.length > 0) {
    const contenedorBotones = document.getElementById("contenedor-botones");
    for (let i = 0; i < carrito.length; i++) {
      const item = carrito[i];
      const [categoria, numero] = item.productoId.split(" ");
      const index = parseInt(numero) - 1;
      const data = productos[categoria];
      const nombre = data.nombres[index];
      const precioUnitario = parseFloat(data.precios[index]);
      const cantidad = item.cantidad;
      const precioTotal = precioUnitario * cantidad;
      total += precioTotal;

      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `${nombre} - cantidad: ${item.cantidad} - precio unitario: $${precioUnitario.toFixed(2)}`;
      lista.appendChild(li);
    }

    contenedorCarrito.appendChild(lista);

    const totalTexto = document.createElement("p");
    totalTexto.classList.add("mt-3", "fw-bold");
    totalTexto.textContent = `Precio total: $${total.toFixed(2)}`;
    contenedorCarrito.appendChild(totalTexto);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary";
    btn.id = "btn-comprar";
    btn.textContent = "Comprar";

    contenedorBotones.appendChild(btn);
  }
  else{

    contenedorCarrito.innerHTML = `<p>Tu carrito está vacío.</p>`;
  }
  // Cerrar modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));
  if (modal) modal.hide();
}

