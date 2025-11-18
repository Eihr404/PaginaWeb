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