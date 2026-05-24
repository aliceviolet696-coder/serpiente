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
// VARIABLES GLOBALES
// ========================================

let intervaloSerpiente = null;

let direccionActual = "derecha";

let puntaje = 0;

let velocidad = 180;

let gameOver = false;

// ========================================
// COMIDA
// ========================================

let comida = {
    x: 15,
    y: 10
};

// ========================================
// SERPIENTE
// ========================================

const serpiente = [

    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
    { x: 2, y: 10 }

];

// ========================================
// DIBUJO INICIAL
// ========================================

dibujarTodo();

// ========================================
// LIMPIAR CANVAS
// ========================================

function limpiarCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// ========================================
// DIBUJAR TABLERO
// ========================================

function dibujarTablero() {

    ctx.strokeStyle = "#1f4068";

    // LINEAS VERTICALES

    for(
        let x = 0;
        x <= canvas.width;
        x += TAMANIO_CELDA
    ){

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    // LINEAS HORIZONTALES

    for(
        let y = 0;
        y <= canvas.height;
        y += TAMANIO_CELDA
    ){

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

// ========================================
// PINTAR PARTE
// ========================================

function pintarParte(
    lineaX,
    lineaY,
    color = "#ff0055"
){

    const posicionRealX =
    lineaX * TAMANIO_CELDA;

    const posicionRealY =
    lineaY * TAMANIO_CELDA;

    // RELLENO

    ctx.fillStyle = color;

    ctx.fillRect(
        posicionRealX,
        posicionRealY,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    // BORDE

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

    for(
        let i = 0;
        i < serpiente.length;
        i++
    ){

        const parte = serpiente[i];

        // CABEZA

        if(i === 0){

            pintarParte(
                parte.x,
                parte.y,
                "#ffe600"
            );
        }

        // CUERPO

        else{

            pintarParte(
                parte.x,
                parte.y,
                "#ff0055"
            );
        }
    }
}

// ========================================
// PINTAR COMIDA
// ========================================

function pintarComida() {

    pintarParte(
        comida.x,
        comida.y,
        "#00ffff"
    );
}

// ========================================
// GENERAR COMIDA
// ========================================

function generarComida() {

    const totalColumnas =
    canvas.width / TAMANIO_CELDA;

    const totalFilas =
    canvas.height / TAMANIO_CELDA;

    comida.x =
    Math.floor(
        Math.random() * totalColumnas
    );

    comida.y =
    Math.floor(
        Math.random() * totalFilas
    );
}

// ========================================
// ATRAPAR COMIDA
// ========================================

function atrapaComida() {

    const cabeza = serpiente[0];

    if(
        cabeza.x === comida.x &&
        cabeza.y === comida.y
    ){

        return true;
    }

    return false;
}

// ========================================
// GAME OVER BORDES
// ========================================

function verificarGameOver() {

    const cabeza = serpiente[0];

    const totalColumnas =
    canvas.width / TAMANIO_CELDA;

    const totalFilas =
    canvas.height / TAMANIO_CELDA;

    // IZQUIERDA

    if(cabeza.x < 0){

        finalizarJuego();
    }

    // DERECHA

    if(cabeza.x >= totalColumnas){

        finalizarJuego();
    }

    // ARRIBA

    if(cabeza.y < 0){

        finalizarJuego();
    }

    // ABAJO

    if(cabeza.y >= totalFilas){

        finalizarJuego();
    }
}

// ========================================
// FINALIZAR JUEGO
// ========================================

function finalizarJuego() {

    gameOver = true;

    clearInterval(intervaloSerpiente);

    document.getElementById("estado")
    .innerText = "GAME OVER";

    document.getElementById("mensaje")
    .innerText =
    "💀 GAME OVER";
}

// ========================================
// MOVER DERECHA
// ========================================

function moverDerecha() {

    const cabeza = serpiente[0];

    const nuevaCabeza = {

        x: cabeza.x + 1,
        y: cabeza.y

    };

    serpiente.unshift(nuevaCabeza);

    serpiente.pop();
}

// ========================================
// MOVER IZQUIERDA
// ========================================

function moverIzquierda() {

    const cabeza = serpiente[0];

    const nuevaCabeza = {

        x: cabeza.x - 1,
        y: cabeza.y

    };

    serpiente.unshift(nuevaCabeza);

    serpiente.pop();
}

// ========================================
// MOVER ARRIBA
// ========================================

function moverArriba() {

    const cabeza = serpiente[0];

    const nuevaCabeza = {

        x: cabeza.x,
        y: cabeza.y - 1

    };

    serpiente.unshift(nuevaCabeza);

    serpiente.pop();
}

// ========================================
// MOVER ABAJO
// ========================================

function moverAbajo() {

    const cabeza = serpiente[0];

    const nuevaCabeza = {

        x: cabeza.x,
        y: cabeza.y + 1

    };

    serpiente.unshift(nuevaCabeza);

    serpiente.pop();
}

// ========================================
// CRECER SERPIENTE
// ========================================

function crecerSerpiente() {

    const cola =
    serpiente[serpiente.length - 1];

    let nuevaParte = {};

    if(direccionActual === "derecha"){

        nuevaParte = {

            x: cola.x - 1,
            y: cola.y

        };
    }

    else if(direccionActual === "izquierda"){

        nuevaParte = {

            x: cola.x + 1,
            y: cola.y

        };
    }

    else if(direccionActual === "arriba"){

        nuevaParte = {

            x: cola.x,
            y: cola.y + 1

        };
    }

    else if(direccionActual === "abajo"){

        nuevaParte = {

            x: cola.x,
            y: cola.y - 1

        };
    }

    serpiente.push(nuevaParte);
}

// ========================================
// MOVER SERPIENTE
// ========================================

function moverSerpiente() {

    if(gameOver){

        return;
    }

    // MOVIMIENTO

    if(direccionActual === "derecha"){

        moverDerecha();
    }

    else if(direccionActual === "izquierda"){

        moverIzquierda();
    }

    else if(direccionActual === "arriba"){

        moverArriba();
    }

    else if(direccionActual === "abajo"){

        moverAbajo();
    }

    // GAME OVER

    verificarGameOver();

    // COMIDA

    if(atrapaComida()){

        puntaje++;

        document.getElementById("puntaje")
        .innerText = puntaje;

        crecerSerpiente();

        generarComida();

        // AUMENTAR VELOCIDAD

        if(velocidad > 60){

            velocidad -= 10;

            clearInterval(intervaloSerpiente);

            intervaloSerpiente =
            setInterval(
                moverSerpiente,
                velocidad
            );
        }
    }

    dibujarTodo();
}

// ========================================
// CAMBIAR DIRECCION
// VALIDACION ANTI-RETROCESO
// ========================================

function cambiarDireccion(direccion) {

    // DERECHA -> IZQUIERDA

    if(
        direccionActual === "derecha" &&
        direccion === "izquierda"
    ){
        return;
    }

    // IZQUIERDA -> DERECHA

    if(
        direccionActual === "izquierda" &&
        direccion === "derecha"
    ){
        return;
    }

    // ARRIBA -> ABAJO

    if(
        direccionActual === "arriba" &&
        direccion === "abajo"
    ){
        return;
    }

    // ABAJO -> ARRIBA

    if(
        direccionActual === "abajo" &&
        direccion === "arriba"
    ){
        return;
    }

    direccionActual = direccion;

    document.getElementById("mensaje")
    .innerText =
    "➡ Dirección: " + direccion;
}

// ========================================
// INICIAR JUEGO
// ========================================

function iniciarJuego() {

    if(gameOver){

        return;
    }

    document.getElementById("estado")
    .innerText = "PLAYING";

    document.getElementById("mensaje")
    .innerText =
    "🔥 Juego iniciado";

    clearInterval(intervaloSerpiente);

    intervaloSerpiente =
    setInterval(
        moverSerpiente,
        velocidad
    );
}

// ========================================
// PAUSAR JUEGO
// ========================================

function pausarJuego() {

    clearInterval(intervaloSerpiente);

    document.getElementById("estado")
    .innerText = "PAUSE";

    document.getElementById("mensaje")
    .innerText =
    "⏸ Juego pausado";
}

// ========================================
// REINICIAR JUEGO
// ========================================

function reiniciarJuego() {

    clearInterval(intervaloSerpiente);

    // LIMPIAR SERPIENTE

    serpiente.length = 0;

    serpiente.push(
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 },
        { x: 2, y: 10 }
    );

    // VARIABLES

    direccionActual = "derecha";

    puntaje = 0;

    velocidad = 180;

    gameOver = false;

    // INTERFAZ

    document.getElementById("puntaje")
    .innerText = puntaje;

    document.getElementById("estado")
    .innerText = "READY";

    document.getElementById("mensaje")
    .innerText =
    "🔄 Juego reiniciado";

    generarComida();

    dibujarTodo();
}

// ========================================
// EFECTOS GAMER
// ========================================

function dibujarDecoracion() {

    for(let i = 0; i < 35; i++){

        const x =
        Math.random() * canvas.width;

        const y =
        Math.random() * canvas.height;

        ctx.beginPath();

        ctx.fillStyle =
        "rgba(0,255,255,0.10)";

        ctx.arc(
            x,
            y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

// ========================================
// MENSAJE INICIAL
// ========================================

function dibujarMensajeInicio() {

    ctx.fillStyle =
    "rgba(0,0,0,0.45)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#00ffff";

    ctx.font = "bold 40px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "SNAKE XTREME",
        canvas.width / 2,
        canvas.height / 2 - 20
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "20px Arial";

    ctx.fillText(
        "Presiona INICIAR",
        canvas.width / 2,
        canvas.height / 2 + 30
    );
}

// ========================================
// DIBUJAR TODO
// ========================================

function dibujarTodo() {

    limpiarCanvas();

    dibujarDecoracion();

    dibujarTablero();

    pintarComida();

    pintarSerpiente();

    // MENSAJE INICIAL

    if(
        document.getElementById("estado")
        .innerText === "READY"
    ){

        dibujarMensajeInicio();
    }
}