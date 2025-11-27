window.SessionModel = {
  keySesion: "sesion_activa",
  keyNombre: "nombre_usuario",
  keyCorreo: "correo_usuario",
  keyRol: "rol_usuario",

  isLoggedIn() {
    return localStorage.getItem(this.keySesion) === "true";
  },

  login(correo, nombreMostrado, rol = "cliente") {
    localStorage.setItem(this.keySesion, "true");
    localStorage.setItem(this.keyCorreo, correo);
    localStorage.setItem(this.keyNombre, nombreMostrado);
    localStorage.setItem(this.keyRol, rol);
  },

  logout() {
    localStorage.removeItem(this.keySesion);
    localStorage.removeItem(this.keyCorreo);
    localStorage.removeItem(this.keyNombre);
    localStorage.removeItem(this.keyRol);
  },

  getNombre() {
    return localStorage.getItem(this.keyNombre) || "";
  },

  getRol() {
    return localStorage.getItem(this.keyRol) || "invitado";
  },

  actualizarHeader() {
    const cuenta = document.querySelector("[data-cuenta]");
    const btnLogin = document.querySelectorAll("[data-inicio-sesion]");
    const btnLogout = document.querySelector("[data-salir-sesion]");

    const nombre = this.getNombre();

    if (cuenta) {
      cuenta.textContent = this.isLoggedIn() ? `Hola, ${nombre}` : "Invitado";
    }

    btnLogin.forEach(b => {
      b.style.display = this.isLoggedIn() ? "none" : "flex";
    });

    if (btnLogout) {
      btnLogout.style.display = this.isLoggedIn() ? "flex" : "none";
    }
  }
};
