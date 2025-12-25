document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let fontSize = 100;

  const btnContraste = document.getElementById("btn-contraste");
  const btnAumentar = document.getElementById("btn-aumentar");
  const btnDisminuir = document.getElementById("btn-disminuir");
  const btnRestablecer = document.getElementById("btn-restablecer");
  const offcanvasElement = document.getElementById("offcanvasScrolling");

  if (!btnContraste || !btnAumentar || !btnDisminuir || !btnRestablecer) return;

  offcanvasElement?.addEventListener("shown.bs.offcanvas", () => {
    btnContraste.focus();
  });

  btnContraste.addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
  });

  btnAumentar.addEventListener("click", () => {
    if (fontSize < 200) fontSize += 10;
    root.style.setProperty("font-size", `${fontSize}%`, "important");
  });

  btnDisminuir.addEventListener("click", () => {
    if (fontSize > 50) fontSize -= 10;
    root.style.setProperty("font-size", `${fontSize}%`, "important");
  });

  btnRestablecer.addEventListener("click", () => {
    fontSize = 100;
    root.style.fontSize = "100%";
    document.body.classList.remove("alto-contraste");
  });
});
