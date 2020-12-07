var nivel = window.location.hash.substring(1)
document.cookie = "nivel=" + nivel + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";

//console.log(verbos[verboElegido][tiempoAAdivinar])
var verboElegido = 0;
var tiempoAAdivinar = 0;
var jugando = 0;//si estoy jugando o comprobando
var marcador = 0;
var maxiEstrella = 0;
var preguntasContestadas = 1;

function comeBack() {
    window.location.href = 'index.html'
}

function comprueba() {
   const verboDoble = verbos[verboElegido][tiempoAAdivinar];
    //intento de que pille
    if (verboDoble.includes("/")) {
        var verbo1 = verboDoble.substr(0, verboDoble.indexOf('/'));
        var verbo2 = verboDoble.split('/')[1];;
    }
    if (jugando == 0) {
        //para indicar que estoy chequeando y no sigue jugando 
        jugando = 1;
        //este metodo tiene como objetivo la comprobacion del verbo

        var verboLeido = document.getElementById('caja').value;
        document.getElementById('botonResultado').classList.remove('btn-dark');
        document.getElementById('botonResultado').classList.remove('btn-success');
        document.getElementById('botonResultado').classList.remove('btn-danger');
        //como en el 2ºtiempo verbal el verbo to be puede ser was o were ponemos que aunque escribas were se te de la respuesta como valida
        if (verboDoble == verboLeido||verboDoble.includes("/") && verboDoble == verbo1 || verboDoble == verbo2) {
            marcador++;
            document.cookie = "marcador=" + marcador + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
            //dependiendo del nivel salen unos iconos u otros
            if(nivel <=30){
                $("#marcador").append('<i class="fas fa-star"></i>');        
            } else if(nivel <=60){
                $("#marcador").append('<i class="fa fa-flash"></i>');
            } else if(nivel <= 80){
                $("#marcador").append('<i class="fa fa-mortar-board"</i>');
            } else if(nivel <= 140){
                $("#marcador").append('<i class="fas fa-ghost"></i>');
            } 
            document.getElementById('botonResultado').classList.add('btn-success');
            document.getElementById('botonResultado').innerText = 'correct'
        } else {
            marcador = 0;
            document.cookie = "marcador=" + marcador + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
            document.getElementById('botonResultado').classList.add('btn-danger');
            document.getElementById('botonResultado').innerText = verbos[verboElegido][tiempoAAdivinar];
        }
    }
    else {
        jugando = 0;
        eligeVerbo();
        preguntasContestadas++;
        document.cookie = "preguntasContestadas=" + preguntasContestadas + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.getElementById('botonResultado').classList.add('btn-dark');
        document.getElementById('botonResultado').innerText = 'COMPROBAR';
    }
}
function eligeVerbo() {
    //randomizo el array de los verbos para que salga un verbo random
    if (nivel > preguntasContestadas) {
        verboElegido = parseInt(getCookieValue("verboElegido"));
        verboElegido = Math.floor(Math.random() * nivel);
        document.cookie = "verboElegido=" + verboElegido + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        tiempoAAdivinar = parseInt(getCookieValue("tiempoAAdivinar"));
        tiempoAAdivinar = Math.floor(Math.random() * 3);
        document.cookie = "tiempoAAdivinar=" + tiempoAAdivinar + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.getElementById("castellano").innerHTML = verbos[verboElegido][3];
        console.log(verbos[verboElegido][tiempoAAdivinar]);
    } else {
        document.getElementById('botonResultado').disabled = true;
    }

    //dependiendo del valor entre el 0 y el 2 uno de los botones saldra vacio y 
    //sera el que debamos completar
    if (tiempoAAdivinar == 0) {
        document.getElementById("boton1").innerHTML = '<input id="caja" class="form-control  " >';
    } else {
        document.getElementById("boton1").innerHTML = '<button id="boton1" class="btn btn-block btn-secondary">' + verbos[verboElegido][0] + '</button>'
    }
    if (tiempoAAdivinar == 1) {
        document.getElementById("boton2").innerHTML = '<input id="caja" class="form-control ">';
    } else {
        document.getElementById("boton2").innerHTML = '<button id="boton2" class="btn btn-block btn-secondary">' + verbos[verboElegido][1] + '</button>'
    }
    if (tiempoAAdivinar == 2) {
        document.getElementById("boton3").innerHTML = '<input id="caja" class="form-control ">';
    } else {
        document.getElementById("boton3").innerHTML = '<button id="boton3" class="btn btn-block btn-secondary">' + verbos[verboElegido][2] + '</button>'
    }   
}
function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.pop().split(';').shift();
}
function gestionarCookies() {
    //Si ya hay cookies guardadas
    if (document.cookie) {
        //Obtenemos las superestrellas guardadas en las cookies
        marcador = parseInt(getCookieValue("marcador"));
        preguntasContestadas = parseInt(getCookieValue("preguntasContestadas"));
        nivel = parseInt(getCookieValue("nivel"));

    } else {//Si no hay cookies guardadas las creamos
        document.cookie = "marcador=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.cookie = "preguntasContestadas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.cookie = "nivel=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        marcador = 0;
        preguntasContestadas = 0
        nivel = 0;
    }


}

//Al cambiar el nive se reinician los valores, menos las superestrellas
function reiniciarValores() {
    document.cookie = "marcador=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    document.cookie = "preguntasContestadas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    document.cookie = "nivel=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
}
eligeVerbo();
reiniciarValores();
