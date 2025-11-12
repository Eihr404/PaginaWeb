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


//login
$(document).on("click", "[data-requiere-sesion]", function (e) {
  if (window.IngresoSesion && !IngresoSesion.SesionIniciada()) {
    e.preventDefault();
    window.location.href = "login.html";
  }
});

//cerrar sesión
$(document).on("click", "[data-salir-sesion]", function (e) {
  e.preventDefault();
  if (window.IngresoSesion) {
    IngresoSesion.CerrarSesion();
    IngresoSesion.ActualizarDatos();
  }
  alert("Has cerrado sesión correctamente 🩵");
  window.location.href = "index.html";
});



$(document).ready(function () {
  if (!$("#btnInicioS").length) return;
  $("#btnInicioS").click(function (e) {
    e.preventDefault();

    const nombre = $("#usuario").val().trim();
    const correo = $("#correo").val().trim();
    const clave = $("#clave").val().trim();
    const $msg = $("#msg");

    function mostrarMensaje(texto, tipo = "error") {
      const colores = {
        error: "background:#ffe7e7; border:1px solid #ff8a8a; color:#a30000;",
        ok: "background:#e6ffef; border:1px solid #7ddc9c; color:#075828;"
      };
      $msg.attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${colores[tipo]}`).text(texto);}

    if (!nombre || !correo || !clave) {
      mostrarMensaje("Todos los campos deben estar llenos.");
      return;
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(correo)) {
      mostrarMensaje('Escribe un correo válido "usuario@gmail.com"');
      return;
    }

    const dominio = correo.split("@")[1].toLowerCase();
    const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    if (!dominiosPermitidos.includes(dominio)) {
      mostrarMensaje(`El dominio "${dominio}" no está permitido. Usa gmail, outlook, hotmail o yahoo.`);
      return;
    }

    if (nombre.length < 3) {
      mostrarMensaje("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (clave.length < 6) {
      mostrarMensaje("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (window.IngresoSesion) {
      IngresoSesion.IniciarSesion(correo, nombre);
      IngresoSesion.ActualizarDatos();
    }

    mostrarMensaje("Se pudo iniciar sesión", "ok");

    setTimeout(function () {
      const referrer = document.referrer;
      if (referrer && referrer.includes(window.location.origin)) {
        window.location.href = referrer;
      } else {
        window.location.href = "index.html";
      }
    }, 1200);
  });
});
// Fin login

$(window).on("load", function () {
  if (window.IngresoSesion) {
    IngresoSesion.ActualizarDatos();
  }
});

