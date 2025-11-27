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
      rol: rol || "cliente",
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

  bloquear(id) {
    return this.update(id, { activo: false });
  }
};
