// =============================
// CATALOGO DE PRODUCTOS
// =============================

$(document).ready(function () {
  const $productoCat = $("#Producto-Catalogo");

  function agregarProductos() {
    // Agrupamos productos por categoría
    const categoriasUnicas = [...new Set(productos.map(p => p.CAT_Codigo))];

    categoriasUnicas.forEach(codigoCat => {
      const categoria = categorias.find(c => c.CAT_Codigo === codigoCat);
      const productosCat = productos.filter(p => p.CAT_Codigo === codigoCat);

      // Título de categoría
      const $titulo = $(`<h2 class="mt-5 mb-3 text-center">${categoria.CAT_Nombre}</h2>`);
      $productoCat.append($titulo);

      const $fila = $('<div class="row"></div>');

      productosCat.forEach(prod => {
        const $col = $(`
                    <div class="col-12 col-sm-6 col-md-3 mb-4 text-center">
                        <a href="detalleProducto.html?PRD_Codigo=${prod.PRD_Codigo}&CAT_Codigo=${prod.CAT_Codigo}">
                            <img class="Imagen-producto" src="${prod.PRD_Imagen}" alt="${prod.PRD_Nombre}">
                        </a>
                        <h5 class="Titulo-producto mt-2">${prod.PRD_Nombre}</h5>
                        <p>$${prod.PRD_Precio}</p>
                    </div>
                `);
        $fila.append($col);
      });

      $productoCat.append($fila);
    });
  }

  agregarProductos();
});
// =============================
// MOSTRAR CARRITO EN EL MODAL
// =============================
window.mostrarProductos = function () {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const contenedorBotones = document.getElementById("contenedor-botones");

  contenedorCarrito.innerHTML = "";
  contenedorBotones.innerHTML = "";

  let total = 0;

  // =============================
  // SI EL CARRITO ESTÁ VACÍO
  // =============================
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = `<p>Tu carrito está vacío.</p>`;
    contenedorBotones.innerHTML = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
    `;
    return;
  }

  // =============================
  // MOSTRAR PRODUCTOS DEL CARRITO
  // =============================
  const lista = document.createElement("ul");
  lista.classList.add("list-group");

  carrito.forEach((item, index) => {
    const prod = productos.find(p => p.PRD_Codigo === item.PRD_Codigo);

    const nombre = prod?.PRD_Nombre ?? "Producto";
    const precioUnitario = parseFloat(prod?.PRD_Precio ?? 0);
    const cantidad = item.cantidad;
    const precioTotal = precioUnitario * cantidad;

    total += precioTotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    li.innerHTML = `
      <div>
        ${nombre} - Cantidad: ${cantidad} - Precio unitario: $${precioUnitario.toFixed(2)}
      </div>
      <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">
        <i class="bi bi-trash"></i>
      </button>
    `;

    lista.appendChild(li);
  });

  contenedorCarrito.appendChild(lista);

  // =============================
  // EVENTO PARA ELIMINAR PRODUCTO
  // =============================
  contenedorCarrito.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", function () {
      const i = this.dataset.index;
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarProductos(); // refrescar modal
    });
  });

  // =============================
  // MOSTRAR TOTAL
  // =============================
  const totalTexto = document.createElement("p");
  totalTexto.classList.add("mt-3", "fw-bold");
  totalTexto.textContent = `Precio total: $${total.toFixed(2)}`;
  contenedorCarrito.appendChild(totalTexto);

  // =============================
  // BOTÓN COMPRAR
  // =============================
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-primary";
  btn.id = "btn-comprar";
  btn.textContent = "Comprar";

  contenedorBotones.appendChild(btn);

  // =============================
  // EVENTO DEL BOTÓN COMPRAR
  // =============================
  btn.addEventListener("click", function () {
    const modalLoading = new bootstrap.Modal(document.getElementById('Loading'));
    const modalExito = new bootstrap.Modal(document.getElementById('Exito'));
    const modalError = new bootstrap.Modal(document.getElementById('Error'));
    const modalCarrito = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));

    if (modalCarrito) modalCarrito.hide();

    modalLoading.show();

    setTimeout(() => {
      modalLoading.hide();

      const Operacion = Math.random() > 0.2; // 80% éxito

      if (Operacion) {
        modalExito.show();
      } else {
        modalError.show();
      }
    }, 3000);
  });

  // =============================
  // BOTÓN CERRAR
  // =============================
  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.className = "btn btn-secondary";
  btnCerrar.textContent = "Cerrar";
  btnCerrar.dataset.bsDismiss = "modal";

  contenedorBotones.appendChild(btnCerrar);
};