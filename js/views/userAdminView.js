window.UserAdminView = {
  renderTabla(usuarios) {
    const $tbody = $("#tabla-usuarios-body");
    $tbody.empty();

    if (!usuarios || usuarios.length === 0) {
      $tbody.append(`
        <tr>
          <td colspan="5" class="text-center text-muted small">
            No hay usuarios registrados.
          </td>
        </tr>
      `);
      return;
    }

    usuarios.forEach(u => {
      const estadoTexto = u.activo ? "Activo" : "Bloqueado";
      const estadoClase = u.activo ? "bg-success" : "bg-danger";
      const textoBoton = u.activo ? "Bloquear" : "Activar";

      const fila = `
        <tr data-id="${u.id}">
          <td>${u.nombre}</td>
          <td>${u.correo}</td>
          <td class="text-capitalize">${u.rol}</td>
          <td>
            <span class="badge ${estadoClase}">${estadoTexto}</span>
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary me-1" data-accion="editar">
              Editar
            </button>
            <button class="btn btn-sm btn-outline-warning" data-accion="toggle-estado">
              ${textoBoton}
            </button>
          </td>
        </tr>
      `;
      $tbody.append(fila);
    });
  },

  getFormData() {
    return {
      id: $("#admin-usuario-id").val(),
      nombre: $("#admin-usuario-nombre").val().trim(),
      correo: $("#admin-usuario-correo").val().trim(),
      clave: $("#admin-usuario-clave").val().trim(),
      rol: $("#admin-usuario-rol").val()
    };
  },

  setFormData(usuario) {
    $("#admin-usuario-id").val(usuario.id || "");
    $("#admin-usuario-nombre").val(usuario.nombre || "");
    $("#admin-usuario-correo").val(usuario.correo || "");
    $("#admin-usuario-clave").val(usuario.clave || "");
    $("#admin-usuario-rol").val(usuario.rol || "");
  },

  resetForm() {
    $("#form-admin-usuario")[0].reset();
    $("#admin-usuario-id").val("");
  },

  setModoEdicion(activo) {
    if (activo) {
      $("#titulo-form-usuario").text("Editar usuario");
      $("#btnAdminGuardar").text("Guardar cambios");
      $("#btnAdminCancelarEdicion").show();
    } else {
      $("#titulo-form-usuario").text("Crear usuario");
      $("#btnAdminGuardar").text("Crear usuario");
      $("#btnAdminCancelarEdicion").hide();
      this.resetForm();
    }
  },

  showMessage(texto, tipo = "error") {
    const $msg = $("#msg-admin-usuario");
    const colores = {
      error: "background:#ffd6d8; border:1px solid #e9474d; color:#7a0b0f;",
      ok: "background:#e1ffe8; border:1px solid #2ecc71; color:#11693c;"
    };

    $msg
      .attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${colores[tipo]}`)
      .text(texto);
  }
};