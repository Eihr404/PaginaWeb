class ProductoView{
  constructor() {
    this.catalogo = $("#Producto-Catalogo");
    this.contenedorCarrito = $("#contenedor-carrito");
    this.contenedorBotones = $("#contenedor-botones");
  }

  // ==== mostrar catálogo ====
  renderCatalogo(productos, categorias) {
    this.catalogo.html("");

    const categoriasUnicas = [...new Set(productos.map(p => p.CAT_Codigo))];

    categoriasUnicas.forEach(codCat => {
      const categoria = categorias.find(c => c.CAT_Codigo === codCat);
      const productosCat = productos.filter(p => p.CAT_Codigo === codCat);

      this.catalogo.append(
        `<h2 class="mt-5 mb-3 text-center">${categoria.CAT_Nombre}</h2>`
      );

      const fila = $('<div class="row"></div>');

      productosCat.forEach(prod => {
        fila.append(`
          <div class="col-12 col-sm-6 col-md-3 mb-4 text-center">
            <a href="detalleProducto.html?PRD_Codigo=${prod.PRD_Codigo}&CAT_Codigo=${prod.CAT_Codigo}">
              <img class="Imagen-producto" src="${prod.PRD_Imagen}">
            </a>
            <h5 class="Titulo-producto mt-2">${prod.PRD_Nombre}</h5>
            <p>$${prod.PRD_Precio}</p>
          </div>
        `);
      });

      this.catalogo.append(fila);
    });
  }

  // ==== mostrar carrito ====
  renderCarrito(carrito, productos, total) {
    this.contenedorCarrito.html("");
    this.contenedorBotones.html("");

    if (carrito.length === 0) {
      this.contenedorCarrito.html("<p>Tu carrito está vacío.</p>");
      this.contenedorBotones.html(`
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      `);
      return;
    }

    const lista = $('<ul class="list-group"></ul>');

    carrito.forEach((item, index) => {
      const prod = productos.find(p => p.PRD_Codigo === item.PRD_Codigo);

      lista.append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>${prod.PRD_Nombre} - Cant: ${item.cantidad} - $${prod.PRD_Precio}</div>
          <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">X</button>
        </li>
      `);
    });

    this.contenedorCarrito.append(lista);

    this.contenedorCarrito.append(
      `<p class="mt-3 fw-bold">Total: $${total.toFixed(2)}</p>`
    );

    const btnComprar = $(`<button class="btn btn-primary">Comprar</button>`);
    btnComprar.attr("id", "btn-comprar");
    this.contenedorBotones.append(btnComprar);

    this.contenedorBotones.append(`
      <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `);
  }
}
