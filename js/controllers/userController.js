$(document).ready(function () {
  if ($("#btnInicioS").length) {
    $("#btnInicioS").on("click", function (e) {
      e.preventDefault();

      const { nombre, correo, clave } = UserView.getLoginData();
      if (!nombre || !correo || !clave) {
        UserView.showMessage("Todos los campos deben estar llenos.");
        return;
      }

      const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patronEmail.test(correo)) {
        UserView.showMessage('Escribe un correo válido "usuario@gmail.com"');
        return;
      }

      const dominio = correo.split("@")[1].toLowerCase();
      const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
      if (!dominiosPermitidos.includes(dominio)) {
        UserView.showMessage(
          `El dominio "${dominio}" no está permitido. Usa gmail, outlook, hotmail o yahoo.`
        );
        return;
      }

      if (nombre.length < 3) {
        UserView.showMessage("El nombre debe tener al menos 3 caracteres.");
        return;
      }

      if (clave.length < 6) {
        UserView.showMessage("La contraseña debe tener mínimo 6 caracteres.");
        return;
      }

      //Buscar usuario
      const usuario = UserModel.findByCorreo(correo);

      if (!usuario) {
        UserView.showMessage("No existe una cuenta con ese correo. Regístrate primero.");
        return;
      }

      if (!usuario.activo) {
        UserView.showMessage("Tu cuenta está bloqueada. Contacta con el administrador.");
        return;
      }

      if (usuario.clave !== clave) {
        UserView.showMessage("Contraseña incorrecta.");
        return;
      }

      //Iniciar sesión
      SessionModel.login(usuario.correo, usuario.nombre, usuario.rol);
      SessionModel.actualizarHeader();

      UserView.showMessage("Se pudo iniciar sesión", "ok");

      UserView.showOverlay();
      setTimeout(function () {
        UserView.redirectAfterLogin();
      }, 1000);
    });
  }

  if ($("#btnRegistro").length) {
    $("#btnRegistro").on("click", function (e) {
      e.preventDefault();

      const { nombre, correo, clave, clave2 } = UserView.getRegistroData();

      if (!nombre || !correo || !clave || !clave2) {
        UserView.showRegistroMessage("Todos los campos deben estar llenos.");
        return;
      }

      const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patronEmail.test(correo)) {
        UserView.showRegistroMessage('Escribe un correo válido "usuario@gmail.com"');
        return;
      }

      const dominio = correo.split("@")[1].toLowerCase();
      const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
      if (!dominiosPermitidos.includes(dominio)) {
        UserView.showRegistroMessage(
          `El dominio "${dominio}" no está permitido. Usa gmail, outlook, hotmail o yahoo.`
        );
        return;
      }

      if (nombre.length < 3) {
        UserView.showRegistroMessage("El nombre debe tener al menos 3 caracteres.");
        return;
      }

      if (clave.length < 6) {
        UserView.showRegistroMessage("La contraseña debe tener mínimo 6 caracteres.");
        return;
      }

      if (clave !== clave2) {
        UserView.showRegistroMessage("Las contraseñas no coinciden.");
        return;
      }

      //usuario en "BD"
      const resultado = UserModel.create({ nombre, correo, clave });

      if (!resultado.ok) {
        UserView.showRegistroMessage(resultado.mensaje || "No se pudo registrar el usuario.");
        return;
      }

      UserView.showRegistroMessage("Registro exitoso. Ahora puedes iniciar sesión.", "ok");
      setTimeout(function () {
        window.location.href = "login.html";
      }, 1200);
    });
  }

});
