//returns all elements that match with this specified section

const cards = document.querySelectorAll(".memory-card");


//Variable setup

let firstCard;                              //Variable to store first picked card
let secondCard;                             //Variable to store second picked card
let flippedCard = false;                    //Variable to store current game state
let lockBoard = false;                      //Variable to store if the board is locked and a input could be valid

let score = 0;                              //Current scoreboard score
let X = 2;                                  //Scoreboard calculator
let pairCounter = 0;                        //Current ammount of right pairs

writeScore(score);                          //Update scoreboard
cards.forEach(card => card.addEventListener("click", flipCard));


//function for flipping a card

function flipCard() {
    if (lockBoard) return;                  //If board is locked no input can be made
    if (this === firstCard) return;         //If its the first card no calculations have to be made
    this.classList.add("flip");             //Update flip state

    if (!flippedCard){                      //Update flipped card
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkMatch();                           //Check weather the cards pair or not
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

