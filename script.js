const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;
let lockBoard = false;

let score = 0;
let x = 2;
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
        return;
    }

    unflipCards();
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

 

 function countingScore(){
    if (firstCard.dataset.att == secondCard.dataset.att){
        score =+ x;
    }
    else {
        score =- (x/2);
        if (score<0) {
            score = 0;
        }
    }
    showScore();
 }

 function showScore(){
    let score = document.getElementById("ScorePoints");
    document.write ("Highscore" + score);   
 }

cards.forEach(card => card.addEventListener("click", flipCard));