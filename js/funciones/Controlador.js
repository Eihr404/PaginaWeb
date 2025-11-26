class ControlarProducto{
  constructor() {
    this.model = new Products();
    this.view = new ProductoView();
  }

  initCatalogo() {
    this.view.renderCatalogo(
      this.model.getProductos(),
      this.model.getCategorias()
    );
  }

  mostrarCarrito() {
    this.view.renderCarrito(
      this.model.getCarrito(),
      this.model.getProductos(),
      this.model.calcularTotal()
    );

    // eliminar del carrito
    $("#contenedor-carrito")
      .find(".btn-eliminar")
      .click((e) => {
        const index = $(e.target).data("index");
        this.model.eliminarDelCarrito(index);
        this.mostrarCarrito();
      });

    // comportamiento del botón comprar
    $("#btn-comprar").click(() => {
      const modalLoading = new bootstrap.Modal(document.getElementById('Loading'));
      const modalExito = new bootstrap.Modal(document.getElementById('Exito'));
      const modalError = new bootstrap.Modal(document.getElementById('Error'));
      const modalCarrito = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));

      if (modalCarrito) modalCarrito.hide();
      modalLoading.show();

      setTimeout(() => {
        modalLoading.hide();
        Math.random() > 0.2 ? modalExito.show() : modalError.show();
      }, 3000);
    });
  }
}

class ControladorDetalleProducto {
  constructor() {
    this.model = new Products();
    this.view = new DetalleProductoView();
  }

  init() {
    const params = new URLSearchParams(window.location.search);
    const PRD_Codigo = parseInt(params.get("PRD_Codigo"));
    const CAT_Codigo = parseInt(params.get("CAT_Codigo"));

    const producto = this.model.getProductoPorCodigo(PRD_Codigo);
    const productosCat = this.model.getProductosPorCategoria(CAT_Codigo);

    if (!producto) {
      console.error("Producto no encontrado.");
      return;
    }

    // Render detalle inicial
    this.view.renderDetalle(producto, productosCat);

    // Eventos UI
    this.configurarEventos(productosCat);
  }

  configurarEventos(productosCat) {
    // Cambiar producto desde el select
    $("#selectProducto").on("change", (e) => {
      const nuevoID = parseInt($(e.target).val());
      const nuevoProducto = this.model.getProductoPorCodigo(nuevoID);

      if (nuevoProducto) {
        this.view.actualizarDetalle(nuevoProducto);
      }
    });

    // Control de cantidad
    $("#btn-sumar").click(() => this.view.cambiarCantidad(1));
    $("#btn-restar").click(() => this.view.cambiarCantidad(-1));

    // Agregar al carrito
    $("#btn-confirmar").click((e) => {
      e.preventDefault();

      const PRD_Codigo = parseInt($("#selectProducto").val());
      const cantidad = parseInt($("#cantidad").val());

      this.model.agregarAlCarrito(PRD_Codigo, cantidad);

      const prod = this.model.getProductoPorCodigo(PRD_Codigo);

      alert(`${cantidad} unidad(es) de "${prod.PRD_Nombre}" agregada(s) al carrito.\nPrecio unitario: $${prod.PRD_Precio}`);
      $("#formCompra")[0].reset();
      $("#cantidad").val(1);
    });
  }
}