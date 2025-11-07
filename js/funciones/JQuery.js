$(document).ready(function() {
  $("#btnContacto").on("click", function() {
    const cuadro = $("#cuadro");
    cuadro.html("<p><strong>Cargando...</strong></p>").fadeIn(300);
    setTimeout(() => {
      cuadro.html("<p>Información de contacto: <br> Tel: 0999999999</p>");
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
