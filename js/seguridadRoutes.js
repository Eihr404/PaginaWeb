$(document).on("click", "[data-requiere-sesion]", function (e) {
  if (!window.SessionModel || !SessionModel.isLoggedIn()) {
    e.preventDefault();
    window.location.href = "login.html";
  }
});

$(document).on("click", "[data-salir-sesion]", function (e) {
  e.preventDefault();
  if (window.SessionModel) {
    SessionModel.logout();
    SessionModel.actualizarHeader();
  }
  window.location.href = "index.html";
});

// Rutas que requieren un rol específico (admin, vendedor, etc.)
$(document).on("click", "[data-rol-requerido]", function (e) {
  const rolNecesario = $(this).attr("data-rol-requerido");

  if (!SessionModel.isLoggedIn()) {
    e.preventDefault();
    window.location.href = "login.html";
    return;
  }

  const rolActual = SessionModel.getRol(); // el rol que guardaste al iniciar sesión

  if (rolActual !== rolNecesario) {
    e.preventDefault();
    alert("No tienes permisos para acceder a esta sección.");
  }
});



