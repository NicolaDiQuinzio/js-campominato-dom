/* <div class="square"></div> */

const levelform = document.getElementById("levelform");
levelform.addEventListener("submit", play);

//Seleziona il livello
function drawsquare(content, sidenumsquare) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = ` 
  calc(100% / ${sidenumsquare})`;
  square.style.height = square.style.width;
  square.innerHTML = content;
  return square;
}

//funzione per generare l'array delle bombe
function generatebombs(bombsnum, numsquare) {
  const bombs = [];
  while (bombs.length <= bombsnum) {
    const bomb = getrndNumber(1, numsquare);
    if (bombs.indexOf(bomb) === -1) {
      bombs.push(bomb);
    }
    return bombs;
  }
}

function setMessage(message) {
  const score = document.getElementById("score");
  score.innerHTML = message;
}
function showbombs(bombs) {
  const squares = document.querySelectorAll("square");
  for (let square of squares) {
    if (bombs.includes(parseInt(square.innerText))) {
      square.classListadd("unsafe");
    }
  }
}
function play(e) {
  e.preventDefault();
  const playground = document.getElementById("playground");
  playground.innerHTML = "";
  let message = "Seleziona la difficoltà e premi play";
  setMessage(message);

  let score = 0;
  let gameOver = false;
  const NUM_BOMBS = 16;

  //prendo il livello
  const level = document.getElementById("level").value;
  console.log(level);

  //imposto il numero di celle a seconda del livello
  //nuovo
  let squarenumbers = level === "Easy" ? 100 : level === "Medium" ? 81 : 49;

  switch (level) {
    case "Easy":
      squarenumbers = 100;
      break;
    case "Medium":
      squarenumbers = 81;
      break;
    case "Hard":
      squarenumbers = 49;
      break;
  }
  console.log(squarenumbers);

  //determino il numero di celle per lato
  let squarerow = Math.sqrt(squarenumbers);
  console.log(squarerow);
  //genero array di bombe
  const bombs = generatebombs(NUM_BOMBS, squarenumbers);

  let maxscore = squarenumbers - NUM_BOMBS;
  //per il numero di celle genero la cella
  for (let i = 1; i <= squarenumbers; i++) {
    const square = drawsquare(i, squarerow);
    square.addEventListener("click", function () {
      if (!gameOver && !this.classList.contains("safe")) {
        if (bombs.includes(parseInt(this.innerText))) {
          this.classList.add("unsafe");
          message = `Hai perso: il tuo punteggio è: ${score}`;
          gameOver = true;
        } else {
          this.classList.add("safe");
          score++;
          message =
            score === maxscore
              ? `Hai vinto! il tuo punteggio è: ${score}`
              : ` il tuo punteggio è: ${score}`;
        }
        setMessage(message);
      }
    });
    playground.appendChild(square);
  }
}
