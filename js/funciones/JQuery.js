/*Contactos e Informacion*/

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
  $("#form-datos".on("submit", function(){
    this.preventDefault();
  }))
})
