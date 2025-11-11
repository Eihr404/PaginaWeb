$(document).ready(function() {
  $("#btnContacto").on("click", function() {
    const cuadro = $("#cuadro");
    cuadro.html("<p><strong>Cargando...</strong></p>").fadeIn(300);
    setTimeout(() => {
      cuadro.fadeOut(500);
    }, 6000);
  });
  $("#btnInicio").on("click", function(e) {
    e.preventDefault();

    const cuadro2 = $("#cuadro2");
    cuadro2.html("<p><strong>Cargando...</strong></p>").fadeIn(300);
    setTimeout(() => {
      cuadro2.html("<p>Inicio Exitoso <br> Puede agregar productos al carrito</p>");
    }, 2000);
    setTimeout(() => {
      cuadro.fadeOut(500);
    }, 6000);
  });


  $("#btnInicio").on("click", function(e) {
    e.preventDefault();

    const cuadro2 = $("#cuadro2");
    cuadro2.html("<p><strong>Cargando...</strong></p>").fadeIn(300);
    setTimeout(() => {
      cuadro2.html("<p>Inicio Exitoso <br> Puede agregar productos al carrito</p>");
    }, 2000);
    setTimeout(() => {
      cuadro2.fadeOut(500);
    }, 4000);
  });
});

$(document).ready(function(a){

  /* Funcion e ID para los productos de las Grid Cards*/
  const $contenedorGrid = $("#ProductosFavoritos");

  const CadenaCategorias = Object.keys(productosCompletos);

  for(let i=0;i<4;i++){
    const categoria = productosCompletos[CadenaCategorias[i]];

    const nombre=categoria.nombre[0];
    const descripcion=categoria.descripcion[0];
    const imagen= categoria.imagen[0];
    const $card= $(`
     <div class="col-md-3 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">${descripcion}</p>       
        </div>
      </div>
    </div> 
    `);
    $contenedorGrid.append($card);
  }

});

$(document).ready(function(b){
  const $contenedorCarrusel = $("#ContenedorCarrusel");
  const cadenaCategorias = Object.keys(productosCompletos);

  for(let i=0;i<3;i++){
    let categoria;

    if(i === 0){
      categoria=productosCompletos[cadenaCategorias[11]];

    }
    else{
      categoria=productosCompletos[cadenaCategorias[i]];
    }
    const nombre=categoria.nombre[0];
    const imagen=categoria.imagen[0];

    let claseItem="carousel-item";
    if(i===0){claseItem+=" active";}
    const $item = $( `
    <div class="${claseItem}">
       <img src="${imagen}" class="d-block w-100" alt="${nombre}">
      <div class="carousel-caption d-none d-md-block">        
      </div>    
    </div>   
  `);

    $contenedorCarrusel.append($item);
  }
});



//Para salir
$(document).on("click", "[data-salir-sesion]", function(e) {
    e.preventDefault();
    IngresoSesion.CerrarSesion();
    IngresoSesion.ActualizarDatos();
    alert("Sesión cerrada correctamente");
});

//al cargar la página
$(document).ready(function() {
    IngresoSesion.ActualizarDatos();
});


$(document).ready(function () {
    $("#btnIniciar").click(function (e) {
        e.preventDefault(); // Evita que el botón recargue la página

        let usuario = $("#usuario").val().trim();
        let clave = $("#clave").val().trim();

        
        $("#error").text("");

        
        if (usuario === "" || clave === "") {
            $("#error").text("Por favor, completa todos los campos.");
            return;
        }

        if (usuario.length < 3) {
            $("#error").text("El usuario debe tener al menos 3 caracteres.");
            return;
        }

        if (clave.length < 4) {
            $("#error").text("La contraseña debe tener mínimo 4 caracteres.");
            return;
        }

        
        IngresoSesion.IniciarSesion(usuario, clave);
    });
});