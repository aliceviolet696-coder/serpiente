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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

// ========================================
// TABLERO
// ========================================

function dibujarTablero() {

    ctx.strokeStyle = "#182848";

    // LINEAS VERTICALES

    for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    // LINEAS HORIZONTALES

    for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

// ========================================
// PINTAR CUADRADO
// ========================================

function pintarParte(lineaX, lineaY, color = "#ff0055") {

    const posicionRealX = lineaX * TAMANIO_CELDA;

    const posicionRealY = lineaY * TAMANIO_CELDA;

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

    for(let i = 0; i < serpiente.length; i++){

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
// GENERAR NUEVA COMIDA
// ========================================

function generarComida() {

    const totalColumnas =
        canvas.width / TAMANIO_CELDA;

    const totalFilas =
        canvas.height / TAMANIO_CELDA;

    comida.x =
        Math.floor(Math.random() * totalColumnas);

    comida.y =
        Math.floor(Math.random() * totalFilas);
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

    console.log("moviendo");

    // DIRECCIONES

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

    // ATRAPAR COMIDA

    if(atrapaComida()){

        puntaje++;

        document.getElementById("puntaje")
        .innerText = puntaje;

        crecerSerpiente();

        generarComida();
    }

    dibujarTodo();
}

// ========================================
// CAMBIAR DIRECCION
// ========================================

function cambiarDireccion(direccion) {

    direccionActual = direccion;

    document.getElementById("mensaje")
    .innerText =
    "➡ Dirección actual: " + direccion;
}

// ========================================
// INICIAR JUEGO
// ========================================

function iniciarJuego() {

    document.getElementById("estado")
    .innerText = "PLAYING";

    document.getElementById("mensaje")
    .innerText = "🔥 Juego iniciado";

    // EVITAR MULTIPLES INTERVALOS

    clearInterval(intervaloSerpiente);

    intervaloSerpiente =
    setInterval(moverSerpiente, 200);
}

// ========================================
// PAUSAR JUEGO
// ========================================

function pausarJuego() {

    clearInterval(intervaloSerpiente);

    document.getElementById("estado")
    .innerText = "PAUSE";

    document.getElementById("mensaje")
    .innerText = "⏸ Juego pausado";
}

// ========================================
// REINICIAR JUEGO
// ========================================

function reiniciarJuego() {

    clearInterval(intervaloSerpiente);

    serpiente.length = 0;

    serpiente.push(
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 },
        { x: 2, y: 10 }
    );

    direccionActual = "derecha";

    puntaje = 0;

    document.getElementById("puntaje")
    .innerText = puntaje;

    document.getElementById("estado")
    .innerText = "READY";

    document.getElementById("mensaje")
    .innerText = "🔄 Juego reiniciado";

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
        "rgba(0,255,255,0.12)";

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

    pintarComida();

    pintarSerpiente();
}