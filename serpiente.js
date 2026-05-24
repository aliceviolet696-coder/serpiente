// =========================
// CAPTURAR CANVAS
// =========================

const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// =========================
// CONSTANTES
// =========================

const TAMANIO_CELDA = 25;

// =========================
// DIBUJO INICIAL
// =========================

dibujarTodo();

// =========================
// FUNCIONES
// =========================

// Limpiar canvas
function limpiarCanvas() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

// Dibujar cuadrícula gamer
function dibujarTablero() {

    ctx.strokeStyle = "#16213e";

    // =========================
    // LINEAS VERTICALES
    // =========================

    for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    // =========================
    // LINEAS HORIZONTALES
    // =========================

    for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

// Dibujar decoración neon
function dibujarDecoracion() {

    ctx.fillStyle = "rgba(0,255,255,0.08)";

    for(let i = 0; i < 20; i++){

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        ctx.beginPath();

        ctx.arc(x, y, 2, 0, Math.PI * 2);

        ctx.fill();
    }
}

// Dibujar todo
function dibujarTodo() {

    limpiarCanvas();

    dibujarTablero();

    dibujarDecoracion();
}

// =========================
// FUNCIONES TEMPORALES
// =========================

function iniciarJuego(){

    document.getElementById("mensaje").innerText =
    "🔥 Juego iniciado";

    document.getElementById("estado").innerText =
    "PLAYING";
}

function reiniciarJuego(){

    document.getElementById("mensaje").innerText =
    "🔄 Juego reiniciado";

    document.getElementById("estado").innerText =
    "READY";

    dibujarTodo();
}

function pausarJuego(){

    document.getElementById("mensaje").innerText =
    "⏸ Juego pausado";

    document.getElementById("estado").innerText =
    "PAUSE";
}

function cambiarDireccion(direccion){

    document.getElementById("mensaje").innerText =
    "➡ Dirección: " + direccion;
}