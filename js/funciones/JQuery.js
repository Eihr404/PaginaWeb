/*Contactos e Informacion*/

/**
 * prerequisitos
 * boton de mostrar contactos
 * procesos
 * se preciona el boton contactos
 * aparece un cuadro con un mensaje de loading
 * despues de 2 segundos aparece un mensaje de los comentarios
 */



$(document).ready(function(){
  $("#btnContacto").on("click", function(){
    const cuadro = $("#cuadro");
    cuadro.html("<p><strong>Cargando...</strong></p>").fadeIn(300);

    // Simulamos carga de información
    setTimeout(() => {
      cuadro.html("<p>Información de contacto: <br> Tel: 0999999999</p>");
    }, 2000);
  });
});

$(document).ready(function(){
  $("#form-datos".on("submit", function(e){
    e.preventDefault();
  }))
})
