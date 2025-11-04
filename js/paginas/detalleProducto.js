//funcion que se utiliza para agregar productos al carrito
function Carrito() {
//carrito
    let carrito = [];

    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }


    // Controles de cantidad
    const inputCantidad = document.getElementById("cantidad");
    document.getElementById("btn-sumar").addEventListener("click", () => {
        inputCantidad.value = parseInt(inputCantidad.value) + 1;
    });
    document.getElementById("btn-restar").addEventListener("click", () => {
        if (parseInt(inputCantidad.value) > 1) inputCantidad.value = parseInt(inputCantidad.value) - 1;
    });

    // Formulario
    setTimeout(() => {

        document.getElementById("btn-confirmar").addEventListener("click", e => {
            e.preventDefault();

            const productoId = document.getElementById("selectProducto").value;
            const cantidad = parseInt(inputCantidad.value);

            if (!productoId) {
                alert("Por favor selecciona un producto.");
                return;
            }

            const [categoria, numero] = productoId.split(" ");
            const index = parseInt(numero) - 1;
            const data = productos[categoria];
            const nombre = data.nombres[index];
            const precioUnitario = parseFloat(data.precios[index]);
            const precioTotal = (precioUnitario * cantidad).toFixed(2);

            // Guardar en carrito
            carrito.push({productoId, cantidad});

            localStorage.setItem("carrito", JSON.stringify(carrito));

            console.log("Carrito:", carrito);

            // Mostrar resumen en consola
            let total = 0;
            console.log("Productos:");
            carrito.forEach(item => {
                const [categoria, numero] = item.productoId.split(" ");
                const index = parseInt(numero) - 1;
                const data = productos[categoria];
                const nombre = data.nombres[index];
                const precioUnitario = parseFloat(data.precios[index]);

                total += precioUnitario * item.cantidad;
                console.log(`${nombre} - cantidad ${item.cantidad} - precio unitario $${precioUnitario.toFixed(2)}`);
            });
            console.log(`Precio total: $${total.toFixed(2)} `);


            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalCompra"));
            modal.hide();

            // Notificar
            alert(`${cantidad} unidad(es) de "${nombre}" agregado(s) al carrito. Por un total de ${precioTotal} a cada uno por ${precioUnitario}`);
            document.getElementById("formCompra").reset();
            inputCantidad.value = 1;
        });

    }, 3000);
}
//funcion para cambiar la informacion que aparezca en la pagina de detalle, esta informacion proviene de dar clic
//a la imagen en la pagina de producto
function cambiarImagenDesdeURL() {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const imagen = params.get('imagen');

    // Referencias a los elementos del DOM
    const img = document.getElementById('Imagen-detalle');
    const titulo = document.getElementById('titulo-producto');
    const listaNombres = document.getElementById('lista-nombres');
    const listaPrecios = document.getElementById('lista-precios');
    const TextoCabecera = document.getElementById('Texto-detalle');
    const TextoDescripcion = document.getElementById('Texto-detalle-producto');

    const selectProducto = document.getElementById('selectProducto');

    // Actualizar imagen si existe el parámetro
    if (imagen && img) {
        img.src = imagen;
    }

    // Mostrar información según categoría
    const data = productos[categoria];
    if (data) {
        titulo.textContent = data.titulo;
        TextoCabecera.textContent = data.titulo;
        // Crear listas vacías
        let nombresHTML = "";
        let preciosHTML = "";

        // Recorrer el array de nombres
        for (let i = 0; i < data.nombres.length; i++) {
            nombresHTML += `<li>${data.nombres[i]}</li>`;
        }

        // Recorrer el array de precios
        for (let i = 0; i < data.precios.length; i++) {
            preciosHTML += `<li>${data.precios[i]}</li>`;
        }
        TextoDescripcion.textContent = data.descripcion;
        // Insertar el HTML en las listas
        listaNombres.innerHTML = nombresHTML;
        listaPrecios.innerHTML = preciosHTML;
        // Actualizar el formulario de compra
        const selectProducto = document.getElementById("selectProducto");
        selectProducto.innerHTML = ""; // Limpiar opciones anteriores

        for (let i = 0; i < data.nombres.length; i++) {
            const option = document.createElement("option");
            option.value = `${categoria} ${i + 1}`; // Ej: "macarrones 1"
            option.textContent = data.nombres[i];
            selectProducto.appendChild(option);
        }

    }
}

// Ejecutar automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    cambiarImagenDesdeURL();
    Carrito(); // ← Esta línea es necesaria
});
