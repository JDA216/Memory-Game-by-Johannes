const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;
let lockBoard = false;

let score = 0;
let X = 2;
let pairCounter = 0;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  this.classList.add("flip");

  if (!flippedCard){
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;


  checkMatch();
}

function checkMatch(){
    if (firstCard.dataset.att === secondCard.dataset.att){
        clearEventCards();
        score = score + X;
        writeScore(score);
        pairCounter ++;
    }
    else{
        if (score >= 0.5 * X){
            score = score - 0.5 * X;
        }
        if (score < 0) {
            score = 0;
        }
        writeScore(score);
        unflipCards();

    }
    if (finishedGame()) {
        alert("Herzlichen Glückwunsch, du hast das Spiel erfolgreich beendet. Dein Highscore ist:" + score);
    }
    return;
   
}

function clearEventCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
    
    
        resetBoard();
    }, 
    
    3000);
}
function resetBoard(){
[flippedCard, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
}

(function shuffleMemory() {
   cards.forEach(card => {
     let Position = Math.floor(Math.random() * 16);
     card.style.order = Position;
   });
 })();

 function writeScore(scoreText){
    document.getElementById("ScorePoints").innerHTML = scoreText;

 }

 function finishedGame(){
    if (pairCounter == 8){
        return true;
    }
    else{
        return false;
    }

 }

cards.forEach(card => card.addEventListener("click", flipCard));