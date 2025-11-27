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
