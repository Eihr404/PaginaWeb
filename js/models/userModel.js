window.UserModel = {
  keyUsuarios: "usuarios_app",

  _leerLista() {
    const datos = localStorage.getItem(this.keyUsuarios);
    return datos ? JSON.parse(datos) : [];
  },

  _guardarLista(lista) {
    localStorage.setItem(this.keyUsuarios, JSON.stringify(lista));
  },

  getAll() {
    return this._leerLista();
  },

  findByCorreo(correo) {
    const lista = this._leerLista();
    return lista.find(u => u.correo.toLowerCase() === correo.toLowerCase()) || null;
  },

  create({ nombre, correo, clave, rol = "cliente" }) {
    const lista = this._leerLista();

    // Si no hay usuarios, el primero es admin
    if (lista.length === 0) {
      rol = "admin";
    }

    const yaExiste = lista.some(u => u.correo.toLowerCase() === correo.toLowerCase());
    if (yaExiste) {
      return { ok: false, mensaje: "Ya existe una cuenta con ese correo." };
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      correo,
      clave,
      rol,
      activo: true
    };

    lista.push(nuevo);
    this._guardarLista(lista);

    return { ok: true, usuario: nuevo };
  },

  update(id, cambios) {
    const lista = this._leerLista();
    const idx = lista.findIndex(u => u.id === id);
    if (idx === -1) return { ok: false, mensaje: "Usuario no encontrado." };

    lista[idx] = { ...lista[idx], ...cambios };
    this._guardarLista(lista);
    return { ok: true, usuario: lista[idx] };
  },

  cambiarClavePorCorreo(correo, nuevaClave) {
    const lista = this._leerLista();
    const idx = lista.findIndex(u => u.correo.toLowerCase() === correo.toLowerCase());
    if (idx === -1) {
      return { ok: false, mensaje: "No existe un usuario con ese correo." };
    }
    lista[idx].clave = nuevaClave;
    this._guardarLista(lista);
    return { ok: true };
  },
  bloquear(id) {
      return this.update(id, { activo: false });
  }
};

/*Para la sesión guardada*/
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

/*Para contactos*/
window.ContactModel = {
  keyMensajes: "contacto_mensajes",

  _leerLista() {
    const data = localStorage.getItem(this.keyMensajes);
    return data ? JSON.parse(data) : [];
  },

  _guardarLista(lista) {
    localStorage.setItem(this.keyMensajes, JSON.stringify(lista));
  },

  getAll() {
    return this._leerLista();
  },

  guardarMensaje(mensaje) {
    const lista = this._leerLista();
    lista.push({
      ...mensaje,
      fechaEnvio: new Date().toISOString()
    });
    this._guardarLista(lista);
    return { ok: true };
  }
};



