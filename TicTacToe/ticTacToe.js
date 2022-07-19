// Store gameboard as array in gameboard object
const gameBoard = (() =>  {
    // Get container from HTML
    const container = document.getElementById('container');
    const containBtn = document.getElementById('divBtn');
    let congrats = document.createElement('h3')

    // Create board array to store marks
    let board = [];

    for (let i = 0; i < 9; i++) {
        // Add cells to board and container
        board.push("")
        let boardCell = document.createElement('div')
        boardCell.id = i;
        container.appendChild(boardCell).className = "boardCell"
    }

    // Create and append button for reset game
    let button = document.createElement('button')
    button.id = 'resetGame'
    button.innerHTML = 'Restart game!'
    containBtn.appendChild(button).className = "button"
    button.addEventListener('click', () => {
        resetGame()
    })

    // Player factory, used to create objects of players
    const playerFactory = (name, mark, turn) => {
        return { name, mark, turn};
    };
    // Create two players
    const player1 = playerFactory('Player 1', 'X', true);
    const player2 = playerFactory('Player 2', 'O', false);
    
    //Set winner to null in beginning, and turns to zero
    let winner = null;

    let turns = 0;

    // Function with player turns
    const playerTurn = (function () {
        // Selects all cells in container
        const box = document.querySelectorAll('.boardCell')
        // For each box adding an eventListener
        box.forEach( box => {
           box.addEventListener('click', e => {
            // Setting conditions for both players, updating board array, turn, text, and calling checkWinner function
            if (player1.turn == true && e.target.textContent == '' && winner == null || undefined) {
                board[e.target.id] = player1.mark
                box.textContent = board[e.target.id]
                player1.turn = false;
                player2.turn = true;
                checkWinner(player1.name, player1.mark)
            }
            else if (player2.turn == true && e.target.textContent == '' && winner == null || undefined) {
                board[e.target.id] = player2.mark
                box.textContent = board[e.target.id];
                player1.turn = true;
                player2.turn = false;
                checkWinner(player2.name, player2.mark)
                }
                else {
                    return;
                }
              
            }) 
        })
    })();
    // Function that checkes if anybody won the game, or it is a tie
    function checkWinner(name, symbol) {
        turns++;
        if (board[0] === symbol && board[1] === symbol && board[2] === symbol
        || board[3] === symbol && board[4] === symbol && board[5] === symbol
        || board[6] === symbol && board[7] === symbol && board[8] === symbol
        || board[0] === symbol && board[3] === symbol && board[6] === symbol
        || board[1] === symbol && board[4] === symbol && board[7] === symbol
        || board[2] === symbol && board[5] === symbol && board[8] === symbol
        || board[0] === symbol && board[4] === symbol && board[8] === symbol
        || board[2] === symbol && board[4] === symbol && board[6] === symbol) {
                
            console.log(`${name} wins`)
            console.log(board)
            winner = name;
            congrats.textContent = `Congrats ${name}. You won!`
            containBtn.appendChild(congrats).className = 'congrats'
        }
            
        else if (turns == 9 && winner == null && winner == undefined) {
            console.log('It is a tie!')
        }
        else {
            return;
            
        }
            
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        turns = 0;
        player1.turn = true;
        player2.turn = false;
        winner = null;

        let elems = document.querySelectorAll('.boardCell')
        for (let i = 0; i < elems.length; i++) {
            elems[i].textContent = "";
        } 
        congrats.textContent = "";
        console.log(board)
    }

})();

