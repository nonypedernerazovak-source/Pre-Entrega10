/* =========================================================
   LUNABELLE - PRE-ENTREGA 10
========================================================= */
/* =========================================================
   VARIABLES
========================================================= */

let libros = [];

let carrito = JSON.parse(
    localStorage.getItem("carritoLunaBelle")
) ?? [];


const listaLibros = document.getElementById("listaLibros");

const listaCarrito = document.getElementById("listaCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const totalCarrito = document.getElementById("totalCarrito");

const vaciarCarrito = document.getElementById("vaciarCarrito");

const estadoCarga = document.getElementById("estadoCarga");

const mensajeError = document.getElementById("mensajeError");

const btnReintentar = document.getElementById("btnReintentar");


/* =========================================================
   FORMATO DE LA MONEDA
========================================================= */

const formatoMoneda = (precio) => {

    return new Intl.NumberFormat(
        "es-AR",
        {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
        }
    ).format(precio);

};


/* =========================================================
   TOASTIFY
========================================================= */

const mostrarToast = (mensaje, tipo = "info") => {

    let fondo;

    if (tipo === "exito") {

        fondo = "linear-gradient(to right, #00b09b, #96c93d)";

    } else if (tipo === "error") {

        fondo = "linear-gradient(to right, #ff416c, #ff4b2b)";

    } else {

        fondo = "linear-gradient(to right, #4776E6, #8E54E9)";

    }


    Toastify({

        text: mensaje,

        duration: 3000,

        gravity: "top",

        position: "right",

        close: true,

        style: {
            background: fondo
        }

    }).showToast();

};


/* =========================================================
   FETCH - CARGAR LIBROS
========================================================= */

const cargarLibros = async () => {

    estadoCarga.classList.remove("oculto");

    mensajeError.classList.add("oculto");

    listaLibros.innerHTML = "";


    try {
        const respuesta = await fetch("./data.json");

        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }

        libros = await respuesta.json();

        renderizarLibros();
        mostrarToast(
            "✅ Libros cargados con éxito",
            "exito"
        );


    } catch (error) {
        console.error(
            "Error al cargar los libros:",
            error
        );


        mensajeError.classList.remove("oculto");


        mostrarToast(
            "❌ No se pudieron cargar los libros",
            "error"
        );


    } finally {
        estadoCarga.classList.add("oculto");

    }

};


/* =========================================================
   RENDERIZAR LIBROS 
========================================================= */

const renderizarLibros = () => {

    listaLibros.innerHTML = "";


    libros.forEach((libro) => {

        const card = document.createElement("article");

        card.classList.add("card-libro");


        const stockDisponible = libro.stock > 0;


        card.innerHTML = `

            <div class="icono-libro">
                📖
            </div>

            <h3>
                ${libro.titulo}
            </h3>

            <p>
                <strong>Autor:</strong>
                ${libro.autor}
            </p>

            <p>
                <strong>Género:</strong>
                ${libro.genero}
            </p>

            <p class="precio">
                ${formatoMoneda(libro.precio)}
            </p>

            <p class="stock ${
                stockDisponible
                    ? "disponible"
                    : "agotado"
            }">

                ${
                    stockDisponible
                        ? `Stock disponible: ${libro.stock}`
                        : "Sin stock"
                }

            </p>

            <button
                class="btn-agregar"
                data-id="${libro.id}"
                ${
                    !stockDisponible
                        ? "disabled"
                        : ""
                }
            >
                ${
                    stockDisponible
                        ? "🛒 Agregar al carrito"
                        : "Sin stock"
                }
            </button>

        `;


        listaLibros.appendChild(card);

    });

};


/* =========================================================
   AGREGAR AL CARRITO
========================================================= */

const agregarAlCarrito = (id) => {

    try {

        const libro = libros.find(
            (item) => item.id === id
        );


        if (!libro) {

            throw new Error(
                "El libro no existe."
            );

        }


        const productoCarrito = carrito.find(
            (item) => item.id === id
        );


        if (productoCarrito) {

            if (
                productoCarrito.cantidad
                >= libro.stock
            ) {

                mostrarToast(
                    "⚠️ No hay más unidades disponibles",
                    "error"
                );

                return;

            }


            productoCarrito.cantidad++;

        } else {

            carrito.push({

                ...libro,

                cantidad: 1

            });

        }


        guardarCarrito();

        renderizarCarrito();


        mostrarToast(
            `📚 "${libro.titulo}" agregado al carrito`,
            "exito"
        );


    } catch (error) {

        console.error(
            "Error al agregar el libro:",
            error
        );


        mostrarToast(
            "❌ No se pudo agregar el libro",
            "error"
        );

    }

};


/* =========================================================
   GUARDAR EL CARRITO 
========================================================= */

const guardarCarrito = () => {

    localStorage.setItem(
        "carritoLunaBelle",
        JSON.stringify(carrito)
    );

};


/* =========================================================
   RENDERIZAR EL CARRITO
========================================================= */

const renderizarCarrito = () => {

    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>

        `;

        actualizarResumenCarrito();

        return;

    }


    carrito.forEach((producto) => {

        const item = document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <div class="info-carrito">

                <h4>
                    ${producto.titulo}
                </h4>

                <p>
                    ${formatoMoneda(producto.precio)}
                </p>

            </div>


            <div class="controles-carrito">

                <button
                    class="btn-restar"
                    data-id="${producto.id}"
                >
                    −
                </button>


                <span class="cantidad">
                    ${producto.cantidad}
                </span>


                <button
                    class="btn-sumar"
                    data-id="${producto.id}"
                >
                    +
                </button>

            </div>

        `;


        listaCarrito.appendChild(item);

    });


    actualizarResumenCarrito();

};


/* =========================================================
   ACTUALIZAR EL RESUMEN
========================================================= */

const actualizarResumenCarrito = () => {

    const cantidadTotal = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.cantidad,
        0
    );


    const precioTotal = carrito.reduce(
        (acumulador, producto) =>
            acumulador +
            producto.precio *
            producto.cantidad,
        0
    );


    contadorCarrito.textContent =
        cantidadTotal;


    totalCarrito.textContent =
        formatoMoneda(precioTotal);

};


/* =========================================================
   SUMAR EL PRODUCTO
========================================================= */

const sumarProducto = (id) => {

    const producto = carrito.find(
        (item) => item.id === id
    );


    const libro = libros.find(
        (item) => item.id === id
    );


    if (!producto || !libro) {
        return;
    }


    if (
        producto.cantidad >= libro.stock
    ) {

        mostrarToast(
            "⚠️ Alcanzaste el stock disponible",
            "error"
        );

        return;

    }


    producto.cantidad++;


    guardarCarrito();

    renderizarCarrito();

};


/* =========================================================
   RESTAR EL PRODUCTO
========================================================= */

const restarProducto = (id) => {

    const producto = carrito.find(
        (item) => item.id === id
    );


    if (!producto) {
        return;
    }


    producto.cantidad--;


    if (producto.cantidad <= 0) {

        carrito = carrito.filter(
            (item) => item.id !== id
        );


        mostrarToast(
            "🗑️ Libro eliminado del carrito",
            "info"
        );

    }


    guardarCarrito();

    renderizarCarrito();

};


/* =========================================================
   AGREGAR AL CARRITO
========================================================= */

listaLibros.addEventListener(
    "click",
    (event) => {

        if (
            event.target.classList.contains(
                "btn-agregar"
            )
        ) {

            const id = Number(
                event.target.dataset.id
            );


            agregarAlCarrito(id);

        }

    }
);


/* =========================================================
 CONTROL DEL CARRITO
========================================================= */

listaCarrito.addEventListener(
    "click",
    (event) => {

        const id = Number(
            event.target.dataset.id
        );


        if (
            event.target.classList.contains(
                "btn-sumar"
            )
        ) {

            sumarProducto(id);

        }


        if (
            event.target.classList.contains(
                "btn-restar"
            )
        ) {

            restarProducto(id);

        }

    }
);


/* =========================================================
   VACIAR EL CARRITO
========================================================= */

vaciarCarrito.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {

            mostrarToast(
                "ℹ️ El carrito ya está vacío",
                "info"
            );

            return;

        }


        carrito = [];


        guardarCarrito();

        renderizarCarrito();


        mostrarToast(
            "🗑️ Carrito vaciado correctamente",
            "exito"
        );

    }
);


/* =========================================================
   REINTENTAR LA CARGA
========================================================= */

btnReintentar.addEventListener(
    "click",
    () => {

        cargarLibros();

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

cargarLibros();

renderizarCarrito();
