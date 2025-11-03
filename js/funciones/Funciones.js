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


    //
    const productos = {
        macarrones: {
            titulo: "Macarrones",
            nombres: [
                "Macarrón de fresa",
                "Macarrón de chocolate",
                "Macarrón de maracuyá",
                "Macarrón de lavanda",
                "Macarrón de vainilla",
                "Macarrón de expreso"
            ],
            precios: ["1.50", "1.50", "1.50", "1.50", "1.50", "1.50"],
            descripcion:["Galleta tradicional de la gastronomía francesa hecha con clara de huevo, harina de almendra, azúcar y azúcar glas; con un relleno de crema de matequilla, jalea o ganache."]
        },
        shots: {
            titulo: "Shots",
            nombres: [
                "Mousse de maracuyá",
                "Mousse de chocolate blanco o negro",
                "Mousse de oreo",
                "Mousse de frutos del bosque",
                "Mousse de Nutella",
                "Pie de limón",
                "Tres leches",
                "Tiramisú",
                "Cheesecake de maracuyá",
                "Cheesecake Ferrero"
            ],
            precios: ["2.30", "2.30", "2.50", "2.50", "2.80", "2.30", "2.30", "2.30", "2.80", "3.00"],
            descripcion:["Vaso relleno de una crema a elección, con una base de galletas trituradas y decarado con crema en la parte superior"]
        },
        bombones: {
            titulo: "Bombones",
            nombres: [
                "Bombones (rellenos de crema de maracuyá, fresa, café, licor, menta)",
                "Trufas (relleno de crema de maracuyá, fresa, café, licor, menta)"
            ],
            precios: ["0.60", "0.60"],
            descripcion:["Pequeña porción de chocolate que puede ser rellena con una cierta cantidad de crema con licor, o algún otro tipo de relleno dulce"]
        },
        alfajores: {
            titulo: "Alfajores",
            nombres: ["Alfajor relleno de dulce de leche"],
            precios: ["0.80"],
            descripcion:["Dos galletas redondas unidas en el centro por un dulce de leche, llevando azúcar en polvo en la parte superior"]
        },
        tartaletas: {
            titulo: "Tartaletas",
            nombres: [
                "Mini tartaleta Cheesecake NY",
                "Mini tartaleta Pie de limón",
                "Mini tartaleta Cheesecake oreo",
                "Mini tartaleta Frutos del bosque",
                "Mini tartaleta de maracuyá",
                "Mini tartaleta de frutas (crema pastelera, fresas, duraznos, kiwi)"
            ],
            precios: ["1.20", "1.00", "1.20", "1.00", "0.85", "0.85"],
            descripcion:["Pequeña tarta con una base de ojaldre la cual puede ser rellena con diversos sabores"]
        },
        brigadeiro:{
            titulo: "Brigadeiro",
            nombres: ["Brigadeiro"],
            precios: ["0.70"],
            descripcion: ["Dulce de chocolate típico brasileño parecido a una trufa de chocolate, hecho de leche condensada cacao y amntequilla"],
        },
        pinchosFrutas:{
            titulo: "Pinchos",
            nombres: [
                "Pincho de fresas 15cm",
                "Pincho de fresas cubiertas de chocolate 15cm",
                "Pinchos de frutas (manzana, fresa, uvilla y uva) medianos 20cm",
                "Pinchos de frutas cubiertos de chocolate (manzana fresa, uvilla y uva) medianos 20cm",
                "Pinchos de frutas (manzana, fresa, uvilla y uva) grande 30cm",
                "Pinchos de frutas cubiertos de chocolate (manzana, fresa, uvilla y uva) grande 30cm"
            ],
            precios: ["0.60", "1.00", "1.60", "2.50", "2.50", "3.00"],
            descripcion: ["Pincho que puede venir en diferentes tamaños y con una variedad de frutas"]
        },

    };

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
window.addEventListener('DOMContentLoaded', cambiarImagenDesdeURL);