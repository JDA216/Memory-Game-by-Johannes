const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;
let lockBoard = false;


function flipCard() {
    if (lockBoard) return;
  this.classList.add("flip");

  if (!flippedCard){
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  flippedCard = false;

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
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
    
        lockBoard = false;
    }, 
    
    3000);
}



cards.forEach(card => card.addEventListener("click", flipCard));