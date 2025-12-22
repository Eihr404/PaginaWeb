class ControlarProducto{
  constructor() {
    this.model = new Products();
    this.view = new ProductoView();
    this.configurarAccesibilidad();
  }
  configurarAccesibilidad() {
      // Cambiamos 'body' por 'documentElement' para afectar al tamaño raíz
      const root = document.documentElement;
      let fontSize = 100;
      const offcanvasElement = document.getElementById('offcanvasScrolling');
      const btnCarrito = document.getElementById('btn-mostrar-carrito');
      const btnRestablecer = document.getElementById('btn-restablecer');
      // 'shown.bs.offcanvas' se dispara cuando el menú ya es visible para el usuario
      offcanvasElement.addEventListener('shown.bs.offcanvas', () => {
          // Buscamos el primer botón dentro del offcanvas para darle el foco
          const primerBoton = offcanvasElement.querySelector('#btn-contraste');
          if (primerBoton) {
              primerBoton.focus();
          }
      });
      // 2. Redirección forzada al salir del último botón
      btnRestablecer?.addEventListener('keydown', (e) => {
          // Si presiona TAB y NO está presionando SHIFT (es decir, va hacia adelante)
          if (e.key === 'Tab' && !e.shiftKey) {
              e.preventDefault(); // Detenemos el comportamiento normal

              // Cerramos el offcanvas (opcional, tú decides si quieres que siga abierto)
              const instance = bootstrap.Offcanvas.getInstance(offcanvasElement);
              instance.hide();
          }
      });
      // 1. Lógica Alto Contraste (Este sí sigue en el body para las clases CSS)
      document.getElementById('btn-contraste')?.addEventListener('click', () => {
          document.body.classList.toggle('alto-contraste');
      });

      // 2. Lógica Aumentar Letra
      document.getElementById('btn-aumentar')?.addEventListener('click', () => {
          if (fontSize < 200){
              fontSize += 10;
              // Aplicamos el estilo a la raíz (html)
              root.style.fontSize = `${fontSize}%`;
          }
      });

      // 3. Lógica Disminuir Letra
      document.getElementById('btn-disminuir')?.addEventListener('click', () => {
          if (fontSize > 60) { // Límite para que no desaparezca el texto
              fontSize -= 10;
              root.style.fontSize = `${fontSize}%`;
          }
      });

      // 4. Lógica Restablecer
      document.getElementById('btn-restablecer')?.addEventListener('click', () => {
          fontSize = 100;
          root.style.fontSize = '100%';
          document.body.classList.remove('alto-contraste');
      });
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
    // ACCESIBILIDAD: Cuando el modal del carrito se termine de mostrar,
    // llevamos el foco al primer elemento importante (el contenedor del carrito o el botón cerrar)
    const modalCarritoElem = document.getElementById('modalCarrito');
    modalCarritoElem.addEventListener('shown.bs.modal', () => {
    // Intentamos enfocar el primer botón de eliminar, si no hay, el botón de cerrar
    const primerBoton = modalCarritoElem.querySelector('.btn-eliminar, .btn-secondary');
    primerBoton?.focus();
    }, { once: true }); // {once: true} evita que se acumulen eventos cada vez que abres el carrito

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

class IndexController {
  constructor(){
    this.model=new Products();
    this.view=new IndexView();
  }

  init(){
      const categorias=this.model.getCategoriasAgrupadas();
      console.log("CATEGORIAS → ", categorias);
      this.view.renderCarrusel(categorias);
      this.view.renderGridChard(categorias);
  }
}