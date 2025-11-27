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
