// app.js - Proyecto de práctica de Git
// Tecnologías de Desarrollo en el Servidor

console.log("Hola, este es mi primer proyecto con Git y Node.js");

// Muestra la fecha y hora en que se ejecuta el programa
const fecha = new Date();
console.log("Ejecutado el: " + fecha.toLocaleString());

// Función de saludo desarrollada en la rama feature/saludo
function saludar(nombre) {
  return `Hola, ${nombre}. Bienvenido a la práctica de Git.`;
}
console.log(saludar("Angel"));