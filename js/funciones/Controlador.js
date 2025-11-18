class ControlarProducto{
  constructor() {
    this.model = new Producto();
    this.view = ProductoView()
    this.init();
  }
  init(){
    const producto = this.model.getProducto();
    const cart = this.model.getCarrito();

    this.view.mostrarProducto(producto);
  }
}