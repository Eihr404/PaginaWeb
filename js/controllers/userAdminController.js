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
