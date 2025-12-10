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


/*Para mensajes de contactos*/
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

/*Adminsitrador usuarios manejo*/
$(document).ready(function () {
  if (!SessionModel.isLoggedIn || !SessionModel.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  if (SessionModel.getRol && SessionModel.getRol() !== "admin") {
    alert("No tienes permisos para acceder a esta sección.");
    window.location.href = "index.html";
    return;
  }

  function cargarUsuarios() {
    const lista = UserModel.getAll ? UserModel.getAll() : [];
    UserAdminView.renderTabla(lista);
  }

  cargarUsuarios();
  UserAdminView.setModoEdicion(false);

  $("#btnAdminGuardar").on("click", function (e) {
    e.preventDefault();

    const { id, nombre, correo, clave, rol } = UserAdminView.getFormData();

    if (!nombre || !correo || !clave || !rol) {
      UserAdminView.showMessage("Todos los campos son obligatorios.");
      return;
    }

    if (nombre.length < 3) {
      UserAdminView.showMessage("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(correo)) {
      UserAdminView.showMessage('Escribe un correo válido "usuario@gmail.com".');
      return;
    }

    const dominio = correo.split("@")[1].toLowerCase();
    const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    if (!dominiosPermitidos.includes(dominio)) {
      UserAdminView.showMessage(`El dominio "${dominio}" no está permitido.`);
      return;
    }

    if (clave.length < 6) {
      UserAdminView.showMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (!["admin", "vendedor", "cliente"].includes(rol)) {
      UserAdminView.showMessage("Selecciona un rol válido.");
      return;
    }

    if (!id) {
      const resultado = UserModel.create({
        nombre,
        correo,
        clave,
        rol
      });

      if (!resultado.ok) {
        UserAdminView.showMessage(resultado.mensaje || "No se pudo crear el usuario.");
        return;
      }

      UserAdminView.showMessage("Usuario creado correctamente.", "ok");
    } else {
      const idNum = Number(id);
      const res = UserModel.update(idNum, { nombre, correo, clave, rol });

      if (!res.ok) {
        UserAdminView.showMessage(res.mensaje || "No se pudo actualizar el usuario.");
        return;
      }

      UserAdminView.showMessage("Usuario actualizado correctamente.", "ok");
    }

    UserAdminView.setModoEdicion(false);
    cargarUsuarios();
  });

  $("#btnAdminCancelarEdicion").on("click", function () {
    UserAdminView.setModoEdicion(false);
  });

  $("#tabla-usuarios-body").on("click", "button", function () {
    const $btn = $(this);
    const accion = $btn.data("accion");
    const $fila = $btn.closest("tr");
    const id = Number($fila.data("id"));

    const lista = UserModel.getAll ? UserModel.getAll() : [];
    const usuario = lista.find(u => u.id === id);
    if (!usuario) return;

    if (accion === "editar") {
      UserAdminView.setFormData(usuario);
      UserAdminView.setModoEdicion(true);
    }

    if (accion === "toggle-estado") {
      const nuevoEstado = !usuario.activo;
      const res = UserModel.update(id, { activo: nuevoEstado });
      if (!res.ok) {
        UserAdminView.showMessage("No se pudo cambiar el estado del usuario.");
        return;
      }
      cargarUsuarios();
    }
  });
});

/*Para contactos*/

$(document).ready(function () {
  if (!$("#btnEnviarContacto").length) return;

  $("#contacto-telefono, #contacto-invitados")
    .on("keydown", function (e) {
      if ([8, 9, 37, 39].includes(e.keyCode)) return;

      if (e.key < "0" || e.key > "9") {
        e.preventDefault();
      }
    })
    .on("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });


  $("#btnEnviarContacto").on("click", function (e) {
    e.preventDefault();

    const datos = ContactView.getFormData();

    const {
      nombre,
      correo,
      telefono,
      tipoEvento,
      invitados,
      fechaEvento,
      asunto,
      mensaje
    } = datos;

    if (
      !nombre || !correo || !telefono || !tipoEvento ||
      !invitados || !fechaEvento || !asunto || !mensaje
    ) {
      ContactView.showMessage("Por favor completa todos los campos marcados con *.");
      return;
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(correo)) {
      ContactView.showMessage('Escribe un correo válido "usuario@gmail.com".');
      return;
    }

    const dominio = correo.split("@")[1].toLowerCase();
    const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    if (!dominiosPermitidos.includes(dominio)) {
      ContactView.showMessage(
        `El dominio "${dominio}" no está permitido. Usa gmail, outlook, hotmail o yahoo.`
      );
      return;
    }

    if (telefono.length !== 10) {
      ContactView.showMessage("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    const invitadosNum = parseInt(invitados, 10);
    if (isNaN(invitadosNum) || invitadosNum <= 0) {
      ContactView.showMessage("El número de invitados debe ser mayor a 0.");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(fechaEvento);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      ContactView.showMessage("La fecha del evento no puede ser anterior a hoy.");
      return;
    }

    ContactModel.guardarMensaje(datos);

    ContactView.showMessage(
      "Tu mensaje se ha enviado correctamente. Te contactaremos pronto.",
      "ok"
    );
    ContactView.limpiarFormulario();
  });
});

