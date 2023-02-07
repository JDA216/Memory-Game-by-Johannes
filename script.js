const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;


function flipCard() {
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
    if (firstCard.data-set === secondCard.data-set){
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
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
    }, 
    1000);
}



cards.forEach(card => card.addEventListener("click", flipCard));