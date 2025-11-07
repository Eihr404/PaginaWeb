/*Contactos e Informacion*/

/**
 * prerequisitos
 * boton de mostrar contactos
 * procesos
 * se preciona el boton contactos
 * aparece un cuadro con un mensaje de loading
 * despues de 2 segundos aparece un mensaje de los comentarios
 */



$(document).ready(function() {
  $("#btnContacto").on("click", function() {
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
