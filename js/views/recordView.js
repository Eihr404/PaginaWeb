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
