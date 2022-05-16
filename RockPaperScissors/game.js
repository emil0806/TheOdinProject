let playerScore = 0;
let computerScore = 0

function computerPlay() {
    let number = Math.floor(Math.random() * 3) + 1;
    
    if (number === 1) {
        return "Rock";
    }
    else if (number === 2) {
        return "Paper"
    }
    else {
        return "Scissors"
    }
}

function playRound(playerSelection) {
    let computerSelection = computerPlay()
    let result = "";
    if ((playerSelection == 'Rock' && computerSelection == 'Scissors') ||
    (playerSelection == 'Scissors' && computerSelection == 'Paper') ||
    (playerSelection == 'Paper' && computerSelection == 'Rock')) {
    
    playerScore += 1
    result = ('You win! ' + playerSelection + ' beats ' + computerSelection
        + "<br><br>Player score: " + playerScore + "<br>Computer score: " + computerScore)
    }
    else if (playerSelection == computerSelection) {
        result = ('It\'s a tie. You both chose ' + playerSelection
        + "<br><br>Player score: " + playerScore + "<br>Computer score: " + computerScore)
        }
    else {
        computerScore += 1
        result = ('You lose! ' + computerSelection + ' beats ' + playerSelection
        + "<br><br>Player score: " + playerScore + "<br>Computer score: " + computerScore)
    }
    document.getElementById('result').innerHTML = result
    return
}

const buttons = document.querySelectorAll('input')
buttons.forEach(button => {
    button.addEventListener('click', function() {
        playRound(button.value)
    })
});