// =============================
// DETALLE DE PRODUCTO + CARRITO
// =============================

$(document).ready(function () {

  // Cargar info del producto según la URL
  function cambiarImagenDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const PRD_Codigo = parseInt(params.get('PRD_Codigo'));
    const CAT_Codigo = parseInt(params.get('CAT_Codigo'));

    const producto = productos.find(p => p.PRD_Codigo === PRD_Codigo);
    const productosCat = productos.filter(p => p.CAT_Codigo === CAT_Codigo);

    if (!producto) {
      console.error("Producto no encontrado en la lista.");
      return;
    }

    // ==========================
    // MOSTRAR INFORMACIÓN DEL PRODUCTO
    // ==========================
    $("#Imagen-detalle").attr("src", producto.PRD_Imagen);
    $("#titulo-producto").text(producto.PRD_Nombre);
    $("#Texto-detalle-producto").text(producto.PRD_Descripcion);

    // Mostrar precio
    $("#Precio-producto").text(`$${producto.PRD_Precio}`);

    // ==========================
    // LLENAR SELECT DE PRODUCTOS DE LA CATEGORÍA
    // ==========================
    const $select = $("#selectProducto");
    $select.empty();

    productosCat.forEach(p => {
      const selected = p.PRD_Codigo === producto.PRD_Codigo ? "selected" : "";
      $select.append(`<option value="${p.PRD_Codigo}" ${selected}>${p.PRD_Nombre}</option>`);
    });

    // Cuando cambien el select → actualizar el detalle
    $select.on("change", function () {
      const nuevoID = parseInt($(this).val());
      const nuevoProducto = productos.find(p => p.PRD_Codigo === nuevoID);

      if (!nuevoProducto) return;

      $("#Imagen-detalle").attr("src", nuevoProducto.PRD_Imagen);
      $("#titulo-producto").text(nuevoProducto.PRD_Nombre);
      $("#Texto-detalle-producto").text(nuevoProducto.PRD_Descripcion);
      $("#Precio-producto").text(`$${nuevoProducto.PRD_Precio}`);
    });
  }

  // Control de carrito
  function Carrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const $inputCantidad = $("#cantidad");

    $("#btn-sumar").click(() => {
      $inputCantidad.val(parseInt($inputCantidad.val()) + 1);
    });

    $("#btn-restar").click(() => {
      if (parseInt($inputCantidad.val()) > 1)
        $inputCantidad.val(parseInt($inputCantidad.val()) - 1);
    });

    $("#btn-confirmar").click(function (e) {
      e.preventDefault();

      const PRD_Codigo = parseInt($("#selectProducto").val());
      const cantidad = parseInt($inputCantidad.val());
      const producto = productos.find(p => p.PRD_Codigo === PRD_Codigo);

      if (!producto) {
        alert("Por favor selecciona un producto válido.");
        return;
      }

      carrito.push({ PRD_Codigo, cantidad });
      localStorage.setItem("carrito", JSON.stringify(carrito));

      // Modal de carga y resultado
      const modalCompra = bootstrap.Modal.getInstance(document.getElementById('modalCompra'));
      const modalLoading = new bootstrap.Modal(document.getElementById('Loading'));
      const modalExito = new bootstrap.Modal(document.getElementById('Exito'));
      const modalError = new bootstrap.Modal(document.getElementById('Error'));

      if (modalCompra) modalCompra.hide();
      modalLoading.show();

      setTimeout(() => {
        modalLoading.hide();
        const operacionExitosa = Math.random() > 0.2; // 80% éxito simulado
        if (operacionExitosa) {
          modalExito.show();
        } else {
          modalError.show();
        }
      }, 2000);

      console.log("Carrito:", carrito);

      alert(`${cantidad} unidad(es) de "${producto.PRD_Nombre}" agregado(s) al carrito. 
Precio unitario: $${producto.PRD_Precio} — Total: $${(producto.PRD_Precio * cantidad).toFixed(2)}`);

      $("#formCompra")[0].reset();
      $inputCantidad.val(1);
    });
  }

  cambiarImagenDesdeURL();
  Carrito();
});