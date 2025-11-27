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
