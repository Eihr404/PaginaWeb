// IngresoSesion.js
window.IngresoSesion = {
  keySesion: "sesion_activa",
  keyNombre: "nombre_usuario",
  keyCorreo: "correo_usuario",

  SesionIniciada() {
    return localStorage.getItem(this.keySesion) === "true";
  },

  IniciarSesion(usuario, nombreMostrado) {
    localStorage.setItem(this.keySesion, "true");
    localStorage.setItem(this.keyCorreo, usuario);
    localStorage.setItem(this.keyNombre, nombreMostrado);
  },

  CerrarSesion() {
    localStorage.removeItem(this.keySesion);
    localStorage.removeItem(this.keyCorreo);
    localStorage.removeItem(this.keyNombre);
  },

  NombreUsuario() {
    return localStorage.getItem(this.keyNombre) || "";
  },

  ActualizarDatos() {
    const cuenta = document.querySelector("[data-cuenta]");
    const btnLogin = document.querySelectorAll("[data-inicio-sesion]");
    const btnLogout = document.querySelector("[data-salir-sesion]");

    const nombre = this.NombreUsuario();

    if (cuenta) {
      if (this.SesionIniciada()) {
        cuenta.textContent = `Hola, ${nombre}`;
      } else {
        cuenta.textContent = "Invitado";
      }
    }

    btnLogin.forEach(b => {
      if (this.SesionIniciada()) {
        b.style.display = "none";
      } else {
        b.style.display = "flex";
      }
    });

    if (btnLogout) {
      if (this.SesionIniciada()) {
        btnLogout.style.display = "flex";
      } else {
        btnLogout.style.display = "none";
      }
    }
  }
};
