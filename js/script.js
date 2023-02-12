//returns all elements that match with this specified selection

const cards = document.querySelectorAll(".memory-card");


//Variable setup

let firstCard;                                      //Variable to store first picked card
let secondCard;                                     //Variable to store second picked card
let flippedCard = false;                            //Variable to store current game state
let lockBoard = false;                              //Variable to store if the board is locked and a input could be valid

let score = 0;                                      //Current scoreboard score
let X = 2;                                          //Scoreboard calculator
let pairCounter = 0;                                //Current ammount of right pairs

writeScore(score);                                  //Update scoreboard
cards.forEach(card => card.addEventListener("click", flipCard));


//function for flipping a card

function flipCard() {
    if (lockBoard) return;                          //If board is locked no input can be made
    if (this === firstCard) return;                 //If its the first card no calculations have to be made
    this.classList.add("flip");                     //Update flip state

    if (!flippedCard){                              //Update flipped card, (boolean)
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkMatch();                                   //Check weather the cards pair or not
}


//function to check for pairs and update the score 

function checkMatch(){
    if (firstCard.dataset.att === secondCard.dataset.att){                             //if cards are a pair                       
        clearEventCards();                                                             //reset board state
        score = score + X;                                                             //add X to score as bonus
        writeScore(score);                                                             //write the updated score
        document.getElementById("Score-Counter").innerHTML = "+2";                     //write gained score temp on the side
        pairCounter ++;                                                                //increase pair counter to know when game is finished
    }
    else {                                                                             //if cards are a NOT a pair
        if (score >= 0.5 * X){                                                         //if score is rather than the given 0.5 * scoreboard calculator          
            score = score - 0.5 * X;                                                   //decrease score
            document.getElementById("Score-Counter").innerHTML = (-0.5 * X);           //write gained score temp on the side    
        }
        if (score < 0) {                                                               //if score should get under 0 then set to 0 (only happens if X is net inccoretly)
            score = 0;
        }
        writeScore(score);                          //Update scoreboard
        unflipCards();                              //unflip cards if they are not a pair

    }
    if (finishedGame()) {                           //check if game is finished and if yes write prompt with score and congrats after 2secs
        setTimeout(writeCongrats, 2000);
        
    }
    setTimeout(removeScoreText, 2000);              //temp score writer, remove it after 2secs
}


function writeCongrats(){
    alert("Herzlichen Glückwunsch, du hast das Spiel erfolgreich beendet. \nDein Highscore ist: " + score);
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

