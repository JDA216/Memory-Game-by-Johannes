const cards = document.querySelectorAll(".memory-card");

let firstCard;
let secondCard;
let flippedCard = false;
let lockBoard = false;

let score = 0;
let X = 2;
let pairCounter = 0;

writeScore(score);
cards.forEach(card => card.addEventListener("click", flipCard));

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
        document.getElementById("Score-Counter").innerHTML = "+2";
        pairCounter ++;
    }
    else {
        if (score >= 0.5 * X){
            score = score - 0.5 * X;
            document.getElementById("Score-Counter").innerHTML = (-0.5 * X);
        }
        if (score < 0) {
            score = 0;
        }
        writeScore(score);
        unflipCards();

    }
    if (finishedGame()) {
        setTimeout(writeCongrats, 2000);
        
    }
    setTimeout(removeScoreText, 2000); 
}


function writeCongrats(){
    alert("Herzlichen Glückwunsch, du hast das Spiel erfolgreich beendet. \n Dein Highscore ist:" + score);
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
    document.getElementById("Score-Points").innerHTML = "Current Score: " + scoreText;
}


function finishedGame(){
    if (pairCounter == 8){
        return true;
    }
    else{
        return false;
    }

}


function removeScoreText(){
    document.getElementById("Score-Counter").innerHTML = "";
}

