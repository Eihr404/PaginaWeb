$(document).ready(function () {

  $("#btnRecuperarClave").on("click", function (e) {
    e.preventDefault();

    const correo = $("#recuperar-correo").val().trim();
    const clave = $("#recuperar-clave").val().trim();

    if (!correo || !clave) {
      RecoverView.showMessage("Todos los campos son obligatorios.");
      return;
    }

    if (clave.length < 6) {
      RecoverView.showMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    UserModel.cambiarClavePorCorreo(correo, clave);

    RecoverView.showMessage(
      "Si el correo existe en nuestro sistema, hemos enviado instrucciones a su buzón.",
      "ok"
    );

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

});
