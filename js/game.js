const words = [localStorage.getItem("addword"), "AZUL", "ROJO", "PERRO", "GATO", "TWITCH", "YOUTUBE"];
let game = null;
let finished = false;

const gameState = { 
  word: "",
  state: 7,
  guessed: [""],
  wrong: 0,
};

const $html = {
  man: document.getElementById("hombre"),
  guessed: document.querySelector(".palabra-adivinada"),
  wrong: document.querySelector(".palabra-errada")
};

function draw(game) {
  $html.man.src = `./img/0${game.state}.svg`;
  
  const word = game.word;
  const guessed = game.guessed;
  $html.guessed.innerHTML = "";

  for (const letter of word) {
    const $span = document.createElement("span");
    const $txt = document.createTextNode("");

    if (guessed.includes(letter)) {
      $txt.nodeValue = letter;
    }

    $span.setAttribute("class", "adivinada");
    $span.appendChild($txt);
    $html.guessed.appendChild($span);
  }

  const wrong = game.wrong;
  $html.wrong.innerHTML = "";

  for (const letter of wrong) {
    const $span = document.createElement("span");
    const $txt = document.createTextNode(letter);
    $span.setAttribute("class", "errada");
    $span.appendChild($txt);
    $html.wrong.appendChild($span);
  }
}

function adivinar(game, letter) {
  const state = game.state;

  if (state === 1 || state === 8) {
    return;
  }

  const guessed = game.guessed;
  const wrong = game.wrong;

  if (guessed.includes(letter) || wrong.includes(letter)) {
    return;
  }

  const word = game.word;

  if (word.includes(letter)) {
    let won = true;

    for (const lt of word) {
      if (!guessed.includes(lt) && lt !== letter) {
        won = false;
        game.previo = game.state;
        break;
      }
    }

    if (won) {
      game.state = 8;
    }

    guessed.push(letter);
  } else {
    game.state--;
    wrong.push(letter);
  }
}

window.onkeypress = function guessLetter(e) {
  let letter = e.key;
  letter = letter.toUpperCase();

  if (/[*!@#$%^&()_=+,./?<>;:"'|\~`a-zñÁÉÍÓÚáéíóú0-9]/.test(letter)) {
    return;
  }

  adivinar(game, letter);
  const state = game.state;

  if (state === 8 && !finished) {
    setTimeout(wonAlert, 250);
    finished = true;
  } else if (state === 1 && !finished) {
    const word = game.word;
    const fn = () => lostAlert(word);
    setTimeout(fn, 250);
    finished = true;
  }

  draw(game);
};

window.newGame = function newGame() {
  const word = randomWord();
  game = {};
  game.word = word;
  game.state = 7;
  game.guessed = [];
  game.wrong = [];
  finished = false;
  draw(game);
  console.log(word);
};

function randomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function wonAlert() {
  alert("¡Felicidades! ¡Ganaste!");
}

function lostAlert(word) {
  alert(`Perdiste, la palabra era: ${word}`);
}

newGame();
