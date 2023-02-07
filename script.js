const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;


function flipCard() {
  this.classList.addEventListener("flip")

  if (flippedCard){
    flippedCard = true;
    firstCard = this;
    return;
  }
}

cards.forEach(card => card.addEventListener("click", flipCard));