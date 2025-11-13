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