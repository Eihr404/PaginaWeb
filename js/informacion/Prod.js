// =========================
//  LISTA DE PRODUCTOS
// =========================
const productos = [
  // --- Ramos ---
  { PRD_Codigo: 1, CAT_Codigo: 1, PRD_Nombre: "Ramo Love", PRD_Precio: 32.00, PRD_Imagen: "assets/img/ramo-love.jpg", PRD_Descripcion: "Ramo de fresas decoradas estilo Love." },
  { PRD_Codigo: 2, CAT_Codigo: 1, PRD_Nombre: "Ramo Colette", PRD_Precio: 28.00, PRD_Imagen: "assets/img/ramo-colette.jpg", PRD_Descripcion: "Ramo delicado con fresas decoradas." },
  { PRD_Codigo: 3, CAT_Codigo: 1, PRD_Nombre: "Ramo Camille", PRD_Precio: 25.00, PRD_Imagen: "assets/img/ramo-camille.jpg", PRD_Descripcion: "Ramo dulce con acabado elegante." },
  { PRD_Codigo: 4, CAT_Codigo: 1, PRD_Nombre: "Ramo Cloé", PRD_Precio: 15.00, PRD_Imagen: "assets/img/ramo-cloe.jpg", PRD_Descripcion: "Versión compacta y coqueta." },

  // --- Cajas de fresas ---
  { PRD_Codigo: 5, CAT_Codigo: 2, PRD_Nombre: "Caja 12 fresas", PRD_Precio: 10.00, PRD_Imagen: "assets/img/caja-12-fresas.jpg", PRD_Descripcion: "Docena de fresas decoradas." },
  { PRD_Codigo: 6, CAT_Codigo: 2, PRD_Nombre: "Caja de 9 fresas", PRD_Precio: 8.00, PRD_Imagen: "assets/img/caja-de-9-fresas.jpg", PRD_Descripcion: "Nueve fresas finamente decoradas." },

  // --- Rosas y fresas ---
  { PRD_Codigo: 7, CAT_Codigo: 3, PRD_Nombre: "Amelie", PRD_Precio: 30.00, PRD_Imagen: "assets/img/amelie.jpg", PRD_Descripcion: "Caja con rosas y fresas." },
  { PRD_Codigo: 8, CAT_Codigo: 3, PRD_Nombre: "Julieta", PRD_Precio: 35.00, PRD_Imagen: "assets/img/julieta.jpg", PRD_Descripcion: "Combinación romántica de rosas y fresas." },
  { PRD_Codigo: 9, CAT_Codigo: 3, PRD_Nombre: "Jolie", PRD_Precio: 38.00, PRD_Imagen: "assets/img/jolie.jpg", PRD_Descripcion: "Presentación premium." },
  { PRD_Codigo: 10, CAT_Codigo: 3, PRD_Nombre: "Giselle", PRD_Precio: 28.00, PRD_Imagen: "assets/img/giselle.jpg", PRD_Descripcion: "Delicada y elegante." },

  // --- Fresas con licor ---
  { PRD_Codigo: 11, CAT_Codigo: 4, PRD_Nombre: "Damien", PRD_Precio: 60.00, PRD_Imagen: "assets/img/damien.jpg", PRD_Descripcion: "Fresas con licor selecto." },
  { PRD_Codigo: 12, CAT_Codigo: 4, PRD_Nombre: "Sofía", PRD_Precio: 35.00, PRD_Imagen: "assets/img/sofia.jpg", PRD_Descripcion: "Caja con fresas y toque de licor." },
  { PRD_Codigo: 13, CAT_Codigo: 4, PRD_Nombre: "Box Corona", PRD_Precio: 35.00, PRD_Imagen: "assets/img/box-corona.jpg", PRD_Descripcion: "Fresas + cerveza Corona." },
  { PRD_Codigo: 14, CAT_Codigo: 4, PRD_Nombre: "Elliot", PRD_Precio: 28.00, PRD_Imagen: "assets/img/elliot.jpg", PRD_Descripcion: "Combo fresco con licor." },
  { PRD_Codigo: 15, CAT_Codigo: 4, PRD_Nombre: "Box Johnny Rojo", PRD_Precio: 50.00, PRD_Imagen: "assets/img/box-johnny-rojo.jpg", PRD_Descripcion: "Fresas con whisky etiqueta roja." },

  // --- Pasteles ---
  { PRD_Codigo: 16, CAT_Codigo: 5, PRD_Nombre: "Pastel Kit Kat", PRD_Precio: 18.00, PRD_Imagen: "assets/img/pastel-kit-kat.jpg", PRD_Descripcion: "Pastel decorado con barras Kit Kat." },
  { PRD_Codigo: 17, CAT_Codigo: 5, PRD_Nombre: "Pastel Love", PRD_Precio: 25.00, PRD_Imagen: "assets/img/pastel-love.jpg", PRD_Descripcion: "Pastel temático amor." },

  // --- Cupcakes ---
  { PRD_Codigo: 18, CAT_Codigo: 6, PRD_Nombre: "Cupcakes caja de 4", PRD_Precio: 15.00, PRD_Imagen: "assets/img/cupcakes-4.jpg", PRD_Descripcion: "Caja de 4 cupcakes decorados." },
  { PRD_Codigo: 19, CAT_Codigo: 6, PRD_Nombre: "Cupcakes caja de 6", PRD_Precio: 20.00, PRD_Imagen: "assets/img/cupcakes-6.jpg", PRD_Descripcion: "Caja de 6 cupcakes variados." },

  // --- Corazón Sorpresa ---
  { PRD_Codigo: 20, CAT_Codigo: 7, PRD_Nombre: "Corazón sorpresa", PRD_Precio: 35.00, PRD_Imagen: "assets/img/corazon-sorpresa.jpg", PRD_Descripcion: "Caja corazón con sorpresa." },
  { PRD_Codigo: 21, CAT_Codigo: 7, PRD_Nombre: "Corazones", PRD_Precio: 3.50, PRD_Imagen: "assets/img/corazones.jpg", PRD_Descripcion: "Unidades en forma de corazón." },

  // --- Manzanas ---
  { PRD_Codigo: 22, CAT_Codigo: 8, PRD_Nombre: "Manzanas personalizadas", PRD_Precio: 3.50, PRD_Imagen: "assets/img/manzanas-personalizadas.jpg", PRD_Descripcion: "Manzanas cubiertas y decoradas." },

  // --- Fresas Individuales ---
  { PRD_Codigo: 23, CAT_Codigo: 9, PRD_Nombre: "Fresa clásica chocolate", PRD_Precio: 0.45, PRD_Imagen: "assets/img/manzanas-personalizadas.jpg", PRD_Descripcion: "Bañada en chocolate clásico." },
  { PRD_Codigo: 24, CAT_Codigo: 9, PRD_Nombre: "Fresa con toppings", PRD_Precio: 0.65, PRD_Imagen: "assets/img/manzanas-personalizadas.jpg", PRD_Descripcion: "Decoraciones variadas." },

  // --- Dulces ---
  { PRD_Codigo: 25, CAT_Codigo: 10, PRD_Nombre: "Alfajor", PRD_Precio: 0.80, PRD_Imagen: "assets/img/alfajor.jpg", PRD_Descripcion: "Clásico alfajor relleno de dulce de leche." },

  // --- Tartaletas ---
  { PRD_Codigo: 26, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta de frutas", PRD_Precio: 0.85, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Base crocante y frutas." },
  { PRD_Codigo: 27, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta Cheesecake NY", PRD_Precio: 1.20, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Estilo New York." },
  { PRD_Codigo: 28, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta Pie de limón", PRD_Precio: 1.00, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Toque cítrico." },
  { PRD_Codigo: 29, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta Cheesecake oreo", PRD_Precio: 1.20, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Con galleta oreo." },
  { PRD_Codigo: 30, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta Frutos del bosque", PRD_Precio: 1.00, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Frutos diversos." },
  { PRD_Codigo: 31, CAT_Codigo: 11, PRD_Nombre: "Mini tartaleta de maracuyá", PRD_Precio: 0.85, PRD_Imagen: "assets/img/mini-tartaleta-de-frutas.jpg", PRD_Descripcion: "Aromática y fresca." },

  // --- Macarrones ---
  { PRD_Codigo: 32, CAT_Codigo: 12, PRD_Nombre: "Macarrón de fresa", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Delicado macarrón relleno de crema de fresa natural, con un toque de vainilla." },
  { PRD_Codigo: 33, CAT_Codigo: 12, PRD_Nombre: "Macarrón de chocolate", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Macarrón con intenso sabor a cacao y relleno cremoso de ganache de chocolate." },
  { PRD_Codigo: 34, CAT_Codigo: 12, PRD_Nombre: "Macarrón de maracuyá", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Macarrón de sabor tropical con relleno ácido y dulce de maracuyá." },
  { PRD_Codigo: 35, CAT_Codigo: 12, PRD_Nombre: "Macarrón de lavanda", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Sutil macarrón aromatizado con lavanda y relleno de crema ligera." },
  { PRD_Codigo: 36, CAT_Codigo: 12, PRD_Nombre: "Macarrón de vainilla", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Clásico macarrón de vainilla con relleno de buttercream suave." },
  { PRD_Codigo: 37, CAT_Codigo: 12, PRD_Nombre: "Macarrón de expreso", PRD_Precio: 1.50, PRD_Imagen: "assets/img/macarron-de-fresa.jpg", PRD_Descripcion: "Macarrón con un toque de café expreso y relleno cremoso de moka." },

  // --- Bombones ---
  { PRD_Codigo: 38, CAT_Codigo: 13, PRD_Nombre: "Bombones rellenos", PRD_Precio: 0.60, PRD_Imagen: "assets/img/bombones-surtidos.jpg", PRD_Descripcion: "Chocolate relleno de crema o licor." },
  { PRD_Codigo: 39, CAT_Codigo: 13, PRD_Nombre: "Trufas rellenas", PRD_Precio: 0.60, PRD_Imagen: "assets/img/bombones-surtidos.jpg", PRD_Descripcion: "Trufas con centro cremoso." },

  // --- Brigadeiro ---
  { PRD_Codigo: 40, CAT_Codigo: 14, PRD_Nombre: "Brigadeiro", PRD_Precio: 0.70, PRD_Imagen: "assets/img/brigadeiro.jpg", PRD_Descripcion: "Dulce típico brasileño de chocolate y leche condensada." },

  // --- Pinchos de Frutas ---
  { PRD_Codigo: 41, CAT_Codigo: 15, PRD_Nombre: "Pincho de fresas 15cm", PRD_Precio: 0.60, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho de frutas variadas." },
  { PRD_Codigo: 42, CAT_Codigo: 15, PRD_Nombre: "Pincho de fresas cubiertas de chocolate 15cm", PRD_Precio: 1.00, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho de fresas cubiertas de chocolate." },
  { PRD_Codigo: 43, CAT_Codigo: 15, PRD_Nombre: "Pincho de frutas medianos 20cm", PRD_Precio: 1.60, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho de frutas mixtas de tamaño mediano." },
  { PRD_Codigo: 44, CAT_Codigo: 15, PRD_Nombre: "Pinchos de frutas cubiertos de chocolate medianos 20cm", PRD_Precio: 2.50, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho mediano con frutas cubiertas de chocolate." },
  { PRD_Codigo: 45, CAT_Codigo: 15, PRD_Nombre: "Pinchos de frutas grande 30cm", PRD_Precio: 2.50, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho grande de frutas variadas." },
  { PRD_Codigo: 46, CAT_Codigo: 15, PRD_Nombre: "Pinchos de frutas cubiertos de chocolate grande 30cm", PRD_Precio: 3.00, PRD_Imagen: "assets/img/pinchos-de-frutas.jpeg", PRD_Descripcion: "Pincho grande cubierto con chocolate." },

  // --- Shots ---
  { PRD_Codigo: 47, CAT_Codigo: 16, PRD_Nombre: "Mousse de maracuyá", PRD_Precio: 2.30, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot con mousse cremoso y base de galletas." },
  { PRD_Codigo: 48, CAT_Codigo: 16, PRD_Nombre: "Mousse de chocolate blanco o negro", PRD_Precio: 2.30, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot con mousse de chocolate blanco o negro." },
  { PRD_Codigo: 49, CAT_Codigo: 16, PRD_Nombre: "Mousse de oreo", PRD_Precio: 2.50, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot de mousse de oreo con crema." },
  { PRD_Codigo: 50, CAT_Codigo: 16, PRD_Nombre: "Mousse de frutos del bosque", PRD_Precio: 2.50, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot con mousse de frutos del bosque." },
  { PRD_Codigo: 51, CAT_Codigo: 16, PRD_Nombre: "Mousse de Nutella", PRD_Precio: 2.80, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot de mousse con sabor a Nutella." },
  { PRD_Codigo: 52, CAT_Codigo: 16, PRD_Nombre: "Pie de limón", PRD_Precio: 2.30, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot con crema de limón y base de galleta." },
  { PRD_Codigo: 53, CAT_Codigo: 16, PRD_Nombre: "Tres leches", PRD_Precio: 2.30, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot del clásico postre tres leches." },
  { PRD_Codigo: 54, CAT_Codigo: 16, PRD_Nombre: "Tiramisú", PRD_Precio: 2.30, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot con crema mascarpone y café." },
  { PRD_Codigo: 55, CAT_Codigo: 16, PRD_Nombre: "Cheesecake de maracuyá", PRD_Precio: 2.80, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot de cheesecake con sabor a maracuyá." },
  { PRD_Codigo: 56, CAT_Codigo: 16, PRD_Nombre: "Cheesecake Ferrero", PRD_Precio: 3.00, PRD_Imagen: "assets/img/shot-mousse-de-maracuya.jpg", PRD_Descripcion: "Shot de cheesecake con topping de Ferrero." },
  // --- Gatos Gordos ---
  { PRD_Codigo: 57, CAT_Codigo: 17, PRD_Nombre: "Gato Gordo", PRD_Precio: "Incalculable", PRD_Imagen: "assets/img/gatoGordo.jpg", PRD_Descripcion: "Gato gordo naranja." }
];

// =========================
//  LISTA DE CATEGORÍAS
// =========================
const categorias = [
  { CAT_Codigo: 1, CAT_Nombre: "Ramos", CAT_Descripcion: "Ramos de fresas decoradas para toda ocasión.", CAT_Imagen_Dest: "assets/img/ramo-love.jpg" },
  { CAT_Codigo: 2, CAT_Nombre: "Cajas de Fresas", CAT_Descripcion: "Cajas con fresas decoradas de distintos tamaños.", CAT_Imagen_Dest: "assets/img/caja-12-fresas.jpg" },
  { CAT_Codigo: 3, CAT_Nombre: "Rosas y Fresas", CAT_Descripcion: "Combinaciones románticas de fresas y rosas.", CAT_Imagen_Dest: "assets/img/julieta.jpg" },
  { CAT_Codigo: 4, CAT_Nombre: "Fresas con Licor", CAT_Descripcion: "Fresas bañadas en chocolate con un toque de licor.", CAT_Imagen_Dest: "assets/img/sofia.jpg" },
  { CAT_Codigo: 5, CAT_Nombre: "Pasteles", CAT_Descripcion: "Pasteles decorativos y temáticos.", CAT_Imagen_Dest: "assets/img/pastel-love.jpg" },
  { CAT_Codigo: 6, CAT_Nombre: "Cupcakes", CAT_Descripcion: "Cupcakes variados y personalizados.", CAT_Imagen_Dest: "assets/img/cupcakes-6.jpg" },
  { CAT_Codigo: 7, CAT_Nombre: "Corazón Sorpresa", CAT_Descripcion: "Cajas con forma de corazón ideales para regalo.", CAT_Imagen_Dest: "assets/img/corazon-sorpresa.jpg" },
  { CAT_Codigo: 8, CAT_Nombre: "Manzanas", CAT_Descripcion: "Manzanas decoradas o bañadas en chocolate.", CAT_Imagen_Dest: "assets/img/manzanas-personalizadas.jpg" },
  { CAT_Codigo: 9, CAT_Nombre: "Fresas Individuales", CAT_Descripcion: "Fresas bañadas individualmente y decoradas.", CAT_Imagen_Dest: "assets/img/fresa-con-toppings.jpg" },
  { CAT_Codigo: 10, CAT_Nombre: "Dulces", CAT_Descripcion: "Dulces tradicionales de elaboración artesanal.", CAT_Imagen_Dest: "assets/img/alfajor.jpg" },
  { CAT_Codigo: 11, CAT_Nombre: "Tartaletas Dulce", CAT_Descripcion: "Mini tartaletas de diversos sabores.", CAT_Imagen_Dest: "assets/img/mini-tartaleta-de-frutas.jpg" },
  { CAT_Codigo: 12, CAT_Nombre: "Macarrones", CAT_Descripcion: "Galletas francesas con diferentes rellenos.", CAT_Imagen_Dest: "assets/img/macarron-de-fresa.jpg" },
  { CAT_Codigo: 13, CAT_Nombre: "Bombones", CAT_Descripcion: "Pequeños chocolates rellenos de crema o licor.", CAT_Imagen_Dest: "assets/img/bombones-surtidos.jpg" },
  { CAT_Codigo: 14, CAT_Nombre: "Brigadeiro", CAT_Descripcion: "Dulce brasileño hecho con cacao y leche condensada.", CAT_Imagen_Dest: "assets/img/brigadeiro.jpg" },
  { CAT_Codigo: 15, CAT_Nombre: "Pinchos de Frutas", CAT_Descripcion: "Pinchos de frutas naturales con o sin cobertura.", CAT_Imagen_Dest: "assets/img/pinchos-de-frutas.jpeg" },
  { CAT_Codigo: 16, CAT_Nombre: "Shots", CAT_Descripcion: "Vasos con postres en capas y cremas variadas.", CAT_Imagen_Dest: "assets/img/shot-mousse-de-maracuya.jpg" },
  { CAT_Codigo: 17, CAT_Nombre: "Gatos Gordos", CAT_Descripcion: "Categoría especial y adorable.", CAT_Imagen_Dest: "assets/img/gatoGordo.jpg" }
];

class Products {
  constructor() {
    this.productos = productos;
    this.categorias = categorias;

    // Recuperar carrito del localStorage si existe
    this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  getProductos() {
    return this.productos;
  }

  getCategorias() {
    return this.categorias;
  }

  getCarrito() {
    return this.carrito;
  }

  eliminarDelCarrito(index) {
    this.carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  calcularTotal() {
    return this.carrito.reduce((total, item) => {
      const prod = this.productos.find(p => p.PRD_Codigo === item.PRD_Codigo);
      return total + prod.PRD_Precio * item.cantidad;
    }, 0);
  }
  getProductoPorCodigo(codigo) {
    return this.productos.find(p => p.PRD_Codigo === codigo);
  }

  getProductosPorCategoria(catCodigo) {
    return this.productos.filter(p => p.CAT_Codigo === catCodigo);
  }

  agregarAlCarrito(PRD_Codigo, cantidad) {
    const itemExistente = this.carrito.find(i => i.PRD_Codigo === PRD_Codigo);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.carrito.push({ PRD_Codigo, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
}