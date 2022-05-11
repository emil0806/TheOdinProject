let playerScore = 0;
let computerScore = 0

function computerPlay() {
    let number = Math.floor(Math.random() * 3) + 1;
    
    if (number === 1) {
        return "rock";
    }
    else if (number === 2) {
        return "paper"
    }
    else {
        return "scissors"
    }
}
let computerSelection = computerPlay()
let playerSelection;

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It is a tie!"
    }
    if (playerSelection === "rock") {
        if (computerSelection === "paper") {
            computerScore += 1;
            return "You Lose! Paper beats Rock!";
        }
        else {
            playerScore += 1;
            return "You Win! Rock beats Scissors";
        }
    }
    else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            playerScore += 1;
            return "You Win! Paper beats Rock!";
        }
        else {
            computerScore += 1;
            return "You Lose! Scissors beats paper";
        }
    }
    else if (playerSelection === "scissors") {
        if (computerSelection === "paper") {
            playerScore += 1;
            return "You Win! Scissors beats paper!";
        }
        else {
            computerScore += 1;
            return "You Lose! Rock beats scissors";
        }
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("What do you choose?").toLowerCase()
        computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection))
        console.log("Computer: " + computerScore + " - " + "Player: " + playerScore);
    }
    if (playerScore > computerScore) {
        console.log("YOU WIN!")
    }
    else if (computerScore > playerScore) {
        console.log("YOU LOSE")
    }
    else {
        console.log("TIE!")
    }
}
console.log(game())
