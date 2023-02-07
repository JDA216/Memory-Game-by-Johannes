const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;


function flipCard() {
  this.classList.addEventListener("flip")

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
    if (firstCard.data-set === secondCard.data-set){
        lockCards();
        return;
    }

    unflipCards();
}

function lockCards(){

}

function unflipCards(){

}



cards.forEach(card => card.addEventListener("click", flipCard));