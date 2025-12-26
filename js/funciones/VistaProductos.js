class ProductoView {
    constructor() {
        this.catalogo = $('#Producto-Catalogo');
        this.contenedorCarrito = $('#contenedor-carrito');
        this.contenedorBotones = $('#contenedor-botones');
    }

    // ==== mostrar catálogo ====
    renderCatalogo(productos, categorias) {
        this.catalogo.html('');
        const categoriasUnicas = [...new Set(productos.map(p => p.CAT_Codigo))];

        categoriasUnicas.forEach(codCat => {
            const categoria = categorias.find(c => c.CAT_Codigo === codCat);
            const productosCat = productos.filter(p => p.CAT_Codigo === codCat);

            this.catalogo.append(`<h2 class="Pagina mt-5 mb-3 text-center p-2">${categoria.CAT_Nombre}</h2>`);

            const fila = $('<div class="row"></div>');

            productosCat.forEach(prod => {
                fila.append(`          
            <div class="col-12 col-sm-6 col-md-3 mb-4 text-center">
              <a href="detalleProducto.html?PRD_Codigo=${prod.PRD_Codigo}&CAT_Codigo=${prod.CAT_Codigo}" class="text-decoration-none text-reset">
                <div class="card shadow-sm h-100">
                  <img class="Imagen-producto img-fluid card-img-top" style="max-height: 350px;" src="${prod.PRD_Imagen}" alt="${prod.PRD_Nombre}">
                  <div class="card-body">
                    <h5 class="Titulo-producto mt-2">${prod.PRD_Nombre}</h5>
                    <p>$${prod.PRD_Precio}</p>     
                  </div>
                </div>
              </a> 
            </div>
          `);
            });
            this.catalogo.append(fila);
        });
    }

    // ==== mostrar carrito ====
    renderCarrito(carrito, productos, total) {
        this.contenedorCarrito.html('');
        this.contenedorBotones.html('');

        if (carrito.length === 0) {
            this.contenedorCarrito.html('<p>Tu carrito está vacío.</p>');
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

        this.contenedorBotones.append(`
        <button className="btn" id="btn-borrar-carrito">Vaciar Carrito</button>
    `);

        this.contenedorCarrito.append(`<p class="mt-3 fw-bold">Total: $${total.toFixed(2)}</p>`);
        const btnComprar = $(`<button class="btn btn-primary">Comprar</button>`);
        btnComprar.attr('id', 'btn-comprar');
        this.contenedorBotones.append(btnComprar);
    }


}

class IndexView {
    constructor() {
        this.contenedorCarrusel = document.getElementById("ContenedorCarrusel");
        this.contenedorGrid = document.getElementById("ProductosFavoritos");
    }


    renderCarrusel(categorias) {
        this.contenedorCarrusel.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            let categoria;
            if (i === 2) {
                categoria = categorias[16];
            } else {
                categoria = categorias[i];
            }
            const nombre = categoria.nombre;
            const imagen = categoria.imagen;

            const slide = document.createElement('div');
            if (i === 0) {
                slide.className = "carousel-item active";
            } else {
                slide.className = "carousel-item";
            }

            slide.innerHTML = `
            <img src="${imagen}" class="d-block w-100" alt="${nombre}">
            <div class="carousel-caption d-none d-md-block">        
            </div>    
      `;
            this.contenedorCarrusel.append(slide);
        }
    }

  renderGridChard(categorias) {
    this.contenedorGrid.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      let categoria;
      let prod_id;
      if(i===0){
        prod_id=1;
      }
      else if (i===1){
        prod_id=5;
      }
      else if (i===2){
        prod_id=7;
      }
      else{
        prod_id=11;
      }
      categoria = categorias[i];



      const nombre = categoria.nombre;
      const imagen = categoria.imagen;
      const descripcion = categoria.descripcion;

      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";

      col.innerHTML = `
      <a href="detalleProducto.html?PRD_Codigo=${prod_id}&CAT_Codigo=${i+1}"
         class="card h-100 shadow-sm text-decoration-none"
         aria-label="Ver productos de la categoría ${nombre}">
        
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        
        <div class="card-body">
          <h2 class="card-title">${nombre}</h2>
          <p class="card-text">${descripcion}</p>
        </div>
      </a>
    `;

      this.contenedorGrid.appendChild(col);
    }
  }



}

class DetalleProductoView {
    constructor() {
        this.img = $("#Imagen-detalle");
        this.titulo = $("#titulo-producto");
        this.descripcion = $("#Texto-detalle-producto");
        this.precio = $("#Precio-producto");
        this.select = $("#selectProducto");
        this.inputCantidad = $("#cantidad");
    }

    renderDetalle(producto, productosCat) {
        this.actualizarDetalle(producto);

        // Llenar select
        this.select.html("");
        productosCat.forEach(p => {
            this.select.append(`
        <option value="${p.PRD_Codigo}" ${p.PRD_Codigo === producto.PRD_Codigo ? "selected" : ""}>
          ${p.PRD_Nombre}
        </option>
      `);
        });
    }

    actualizarDetalle(producto) {
        this.img.attr("src", producto.PRD_Imagen);
        this.titulo.text(producto.PRD_Nombre);
        this.descripcion.text(producto.PRD_Descripcion);
        this.precio.text(`$${producto.PRD_Precio}`);
    }

    cambiarCantidad(valor) {
        let actual = parseInt(this.inputCantidad.val());
        actual = Math.max(1, actual + valor);
        this.inputCantidad.val(actual);
    }
}