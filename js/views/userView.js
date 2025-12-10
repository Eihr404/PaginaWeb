window.UserView = {
  /*LOGIN*/
  getLoginData() {
    return {
      nombre: $("#usuario").val().trim(),
      correo: $("#correo").val().trim(),
      clave: $("#clave").val().trim()
    };
  },

  showMessage(texto, tipo = "error") {
    const $msg = $("#msg");
    const colores = {
      error: "background:#ffe7e7; border:1px solid #ff8a8a; color:#a30000;",
      ok: "background:#e6ffef; border:1px solid #7ddc9c; color:#075828;"
    };

    if (!$msg.length) return;

    $msg
      .attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${colores[tipo]}`)
      .text(texto);
  },

  showOverlay() {
    const $overlay = $("#login-overlay");
    if ($overlay.length) {
      $overlay.css("display", "flex").attr("aria-hidden", "false");
    }
  },

  hideOverlay() {
    const $overlay = $("#login-overlay");
    if ($overlay.length) {
      $overlay.css("display", "none").attr("aria-hidden", "true");
    }
  },

  redirectAfterLogin() {
    const referrer = document.referrer;
    if (
      !referrer ||
      referrer.includes("login.html") ||
      referrer.includes("registro.html")
    ) {
      window.location.href = "index.html";
      return;
    }

    if (referrer.includes(window.location.origin)) {
      window.location.href = referrer;
    } else {
      window.location.href = "index.html";
    }
  },


  /*REGISTROO*/
  getRegistroData() {
    return {
      nombre: $("#reg-nombre").val().trim(),
      correo: $("#reg-correo").val().trim(),
      clave: $("#reg-clave").val().trim(),
      clave2: $("#reg-clave2").val().trim()
    };
  },

  showRegistroMessage(texto, tipo = "error") {
    const $msg = $("#msg-registro");
    const colores = {
      error: "background:#ffe7e7; border:1px solid #ff8a8a; color:#a30000;",
      ok: "background:#e6ffef; border:1px solid #7ddc9c; color:#075828;"
    };

    if (!$msg.length) return;

    $msg
      .attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${colores[tipo]}`)
      .text(texto);
  }
};

/*Pagina que muestra la lista de usuarios al administrador*/
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


/*Para mensajes por contactos*/
window.RecoverView = {
  showMessage(texto, tipo = "error") {
    const $msg = $("#msg-recuperar");
    const estilos = {
      error: "background:#ffd7d7; border:1px solid #e74c3c; color:#7a0b0f;",
      ok: "background:#e2ffe8; border:1px solid #27ae60; color:#064d26;"
    };
    $msg
      .attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${estilos[tipo]}`)
      .text(texto);
  }
};

/*Para página de contactos*/
window.ContactView = {
  getFormData() {
    return {
      nombre: $("#contacto-nombre").val().trim(),
      correo: $("#contacto-correo").val().trim(),
      telefono: $("#contacto-telefono").val().trim(),
      tipoEvento: $("#contacto-tipo").val(),
      invitados: $("#contacto-invitados").val().trim(),
      fechaEvento: $("#contacto-fecha").val(),
      asunto: $("#contacto-asunto").val().trim(),
      mensaje: $("#contacto-mensaje").val().trim()
    };
  },

  showMessage(texto, tipo = "error") {
    const $msg = $("#msg-contacto");
    const colores = {
      error: "background:#ffe7e7; border:1px solid #ff8a8a; color:#a30000;",
      ok: "background:#e6ffef; border:1px solid #7ddc9c; color:#075828;"
    };
    $msg
      .attr("style", `display:block; padding:8px 12px; border-radius:6px; font-size:0.9rem; ${colores[tipo]}`)
      .text(texto);
  },

  limpiarFormulario() {
    $("#form-contacto")[0].reset();
  }
};


