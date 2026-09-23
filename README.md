# 📚 LunaBelle - Librería
## Pre-Entrega 10  
Objetivo de la entrega es integrar el consumo de datos mediante `fetch`, trabajar con programación asíncrona utilizando `async/await`, implementar manejo de errores con `try/catch/finally` e incorporar una librería externa para mejorar la comunicación con el usuario.

## Objetivo del proyecto

LunaBelle es una librería virtual que permite visualizar un catálogo de libros y gestionar un carrito de compras.

En esta entrega se incorpora:

* Consumo de datos mediante `fetch()`.
* Lectura de información desde un archivo JSON local.
* Uso de `async/await`.
* Manejo de errores mediante `try/catch`.
* Uso de `finally` para finalizar el estado de carga.
* Integración de la librería **Toastify**.
* Renderizado dinámico de los libros en el DOM.
* Mensajes visuales de carga, éxito y error.
* Persistencia del carrito mediante `localStorage`.
* Control de stock disponible.

---

## El archivo contiene información de cada libro:

* ID
* Título
* Autor
* Género
* Precio
* Stock

## La librería se utiliza para mostrar notificaciones de:

* ✅ Libros cargados correctamente.
* 🛒 Producto agregado al carrito.
* 🗑️ Producto eliminado.
* 🛒 Carrito vaciado.

## 🛒 Funcionalidades del carrito

El proyecto permite:

* Agregar libros al carrito.
* Aumentar la cantidad de unidades.
* Disminuir la cantidad.
* Eliminar productos.
* Vaciar el carrito.
* Calcular automáticamente el total.
* Mostrar la cantidad total de productos.
* Controlar el stock disponible.
## ▶️ Cómo ejecutar el proyecto

### Opción recomendada: Visual Studio Code + Live Server

1. Descargar o clonar el repositorio.
2. Abrir la carpeta Pre-Entrega 10 en Visual Studio Code.
3. Utilizar la extensión Live Server.
4. El proyecto se abrirá en el navegador.

### ⚠️ Importante
El proyecto utiliza:
javascript
fetch("./data.json")
Por esto, se recomienda ejecutar el proyecto mediante Live Server.
Abrir directamente "index.html" haciendo doble clic puede va a salir un cartel el cual dice :
❌ Ocurrió un error
No pudimos cargar los libros. Por favor, intentá nuevamente.

## 🎓 Requisitos de la Pre-Entrega 10

### Consumo de API 

✅ Implementado mediante:

 javascript
fetch("./data.json")

### Async/Await

✅ Implementado en la función:

  javascript
cargarLibros()

### Try/Catch/Finally

✅ Implementado para manejar:

* Éxito.
* Errores.
* Finalización de la carga.

### Librería externa

✅ Implementada:

**Toastify**

### Manipulación del DOM

### Comunicación con el usuario

✅ Se muestran estados de:

* Carga.
* Éxito.
* Error.
* Reintento.
