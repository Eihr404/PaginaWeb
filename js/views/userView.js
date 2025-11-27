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
