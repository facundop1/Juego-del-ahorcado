var palabras = [localStorage.getItem("addword"),"AZUL", "ROJO", "PERRO", "GATO", "TWITCH", "YOUTUBE"];

var juego = null;
var finalizado = false;

var juego = { 
    palabra: "",
    estado:7,
    adivinado: [""],
    errado: 0,
}
var $html = {
    hombre: document.getElementById("hombre"),
    adivinado: document.querySelector(".palabra-adivinada"),
    errado: document.querySelector(".palabra-errada")
}

function dibujar(juego){
    var $elem;
    $elem = $html.hombre;
    $elem.src = "./img/0" +juego.estado +".svg";

    var palabra = juego.palabra;
    var adivinado = juego.adivinado;
    $elem = $html.adivinado;
    $elem.innerHTML = "";

    for(var letra of palabra){
        var $span = document.createElement("span");
        var $txt = document.createTextNode("");

        if(adivinado.indexOf(letra) >= 0) {
            $txt.nodeValue = letra;
        }
     
        $span.setAttribute("class","adivinada");
        $span.appendChild($txt);
        $elem.appendChild($span);
    }

    var errado = juego.errado;
    $elem = $html.errado;
    $elem.innerHTML = "";

    for(var letra of errado){
        var $span= document.createElement("span");
        var $txt= document.createTextNode(letra);
        $span.setAttribute("class","errada");
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
}

function adivinar(juego,letra){
    var estado = juego.estado;

    if(estado === 1 || estado === 8) {
        return;
    }

    var adivinado = juego.adivinado;
    var errado = juego.errado;

    if (adivinado.indexOf(letra)>=0 || errado.indexOf(letra)>=0) {
        return;
    }

    var palabra = juego.palabra;

    if(palabra.indexOf(letra)>=0) {
        ganado = true;

        for(var lt of palabra) {
            if(adivinado.indexOf(lt) < 0  && lt != letra){
                ganado = false;
                juego.previo = juego.estado;
                break;
            }
        }

        if (ganado){
            juego.estado = 8;
        }

        adivinado.push(letra);

    }else{
        juego.estado--
        errado.push(letra);
    }
}
window.onkeypress =function adivinarLetra(e) {
    var letra = e.key;
    letra = letra.toUpperCase();

    if(/[*!@#$%^&()_=+,./?<>;:"'|\~`a-zñÁÉÍÓÚáéíóú0-9]/.test(letra)) {
        return;
    }

    adivinar(juego,letra);
    var estado = juego.estado;

    if(estado === 8 && !finalizado) {
        setTimeout(alertaGanado,250);
        finalizado = true;
    }else if(estado === 1 && !finalizado) {
        var palabra = juego.palabra;
        var fn = alertaPerdido.bind(undefined,palabra);
        setTimeout(fn,250);
        finalizado = true;
    }

    dibujar(juego);
 }

window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria();
    juego = {};
    juego.palabra = palabra;
    juego.estado = 7;
    juego.adivinado = [];
    juego.errado = [];
    finalizado = false;
    dibujar(juego);
    console.log(palabra);
 }

function palabraAleatoria(){
    var index = ~~(Math.random()*palabras.length);
    return palabras[index];
}

function alertaGanado(estado) {
    alert("Felicidades has ganado!");
}

function alertaPerdido(palabra) {
    alert("Has perdido, la palabra era.. " + palabra);
}
nuevoJuego();