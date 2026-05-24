// ========================================
// CAPTURAR CANVAS
// ========================================

const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// ========================================
// CONSTANTES
// ========================================

const TAMANIO_CELDA = 25;

// ========================================
// ARREGLO DE LA SERPIENTE
// ========================================

// EJERCICIO 3
// serpiente de 5 cuadros subiendo
// pegada al borde izquierdo

const serpiente = [

    { x: 0, y: 15 },
    { x: 0, y: 16 },
    { x: 0, y: 17 },
    { x: 0, y: 18 },
    { x: 0, y: 19 }

];

// ========================================
// DIBUJO INICIAL
// ========================================

dibujarTodo();

// ========================================
// FUNCIONES
// ========================================

// LIMPIAR CANVAS
function limpiarCanvas() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

// ========================================
// DIBUJAR TABLERO
// ========================================

function dibujarTablero() {

    ctx.strokeStyle = "#182848";

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

// ========================================
// PINTAR UNA PARTE
// ========================================

function pintarParte(lineaX, lineaY, color = "#ff004c") {

    // =========================
    // CALCULAR POSICION REAL
    // =========================

    const posicionRealX = lineaX * TAMANIO_CELDA;

    const posicionRealY = lineaY * TAMANIO_CELDA;

    // =========================
    // COLOR DE RELLENO
    // =========================

    ctx.fillStyle = color;

    // =========================
    // PINTAR CUADRADO
    // =========================

    ctx.fillRect(
        posicionRealX,
        posicionRealY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    // =========================
    // BORDE
    // =========================

    ctx.strokeStyle = "#ffffff";

    ctx.strokeRect(
        posicionRealX,
        posicionRealY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );
}

// ========================================
// PINTAR SERPIENTE
// ========================================

function pintarSerpiente() {

    for(let i = 0; i < serpiente.length; i++){

        const parte = serpiente[i];

        // =========================
        // CABEZA
        // =========================

        if(i === 0){

            pintarParte(
                parte.x,
                parte.y,
                "#ffe600"
            );

        }

        // =========================
        // CUERPO
        // =========================

        else{

            pintarParte(
                parte.x,
                parte.y,
                "#ff004c"
            );
        }
    }
}

// ========================================
// EFECTOS GAMER
// ========================================

function dibujarDecoracion() {

    for(let i = 0; i < 40; i++){

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        ctx.beginPath();

        ctx.fillStyle = "rgba(0,255,255,0.15)";

        ctx.arc(x, y, 2, 0, Math.PI * 2);

        ctx.fill();
    }
}

// ========================================
// DIBUJAR TODO
// ========================================

function dibujarTodo() {

    limpiarCanvas();

    dibujarDecoracion();

    dibujarTablero();

    // ====================================
    // PRUEBAS OBLIGATORIAS
    // ====================================

    // PRUEBA 1
    pintarParte(5, 5, "#00ffff");

    // PRUEBA 2
    pintarParte(10, 2, "#00ff88");

    // PRUEBA 3
    // borde inferior

    pintarParte(
        8,
        (canvas.height / TAMANIO_CELDA) - 1,
        "#ff8800"
    );

    // PRUEBA 4
    // borde derecho

    pintarParte(
        (canvas.width / TAMANIO_CELDA) - 1,
        7,
        "#ff00ff"
    );

    // PRUEBA 5
    // borde izquierdo

    pintarParte(
        0,
        9,
        "#00aaff"
    );

    // PRUEBA 6
    // esquina distinta de (0,0)

    pintarParte(
        (canvas.width / TAMANIO_CELDA) - 1,
        (canvas.height / TAMANIO_CELDA) - 1,
        "#ffffff"
    );

    // ====================================
    // SERPIENTE
    // ====================================

    pintarSerpiente();
}

// ========================================
// FUNCIONES TEMPORALES
// ========================================

function iniciarJuego(){

    document.getElementById("mensaje").innerText =
    "🔥 Snake Xtreme iniciado";

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