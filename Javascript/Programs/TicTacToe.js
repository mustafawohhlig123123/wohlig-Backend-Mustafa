//using the node module readLine for user input 
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//will start by creating a 3x3 array full of 0's initially
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let currentPlayer = 'X';
//this will display the board initialy and also after each move
function displayBoard() {
    console.clear();
    board.forEach(row => console.log(row.join(' | ')));
}
//this function is to check if a player has won on the rules for tictactoe
//using a for loop for checking all rows and colums and simple if for diagonals
function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true; // Row
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true; // Column
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true; // Diagonal
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true; // Diagonal
    return false;
}
//function to check if this game is draw whch is when the board has no more zeroes
function isDraw() {
    return board.flat().every(cell => cell !== 0);
}
//function to check if a position is already filled //edge case
function makeMove(row, col) {
    if (board[row][col] !== 0) {
        console.log("Cell is already occupied! Choose another.");
        return false;
    }
    board[row][col] = currentPlayer;
    return true;
}
//main function which callss all the other functions to play the game
function playGame() {
    displayBoard();
    rl.question(`Player ${currentPlayer}, enter row (0, 1, or 2): `, row => {
        rl.question(`Player ${currentPlayer}, enter column (0, 1, or 2): `, col => {
            row = parseInt(row);
            col = parseInt(col);

            if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
                console.log("Invalid input. Please enter a number between 0 and 2.");
                setTimeout(playGame, 1000); // 1-second delay before restarting the game
                return;
            }

            if (!makeMove(row, col)) {
                setTimeout(playGame, 1000); // 1-second delay to show the error message
                return;
            }

            if (checkWin(currentPlayer)) {
                displayBoard();
                console.log(`Player ${currentPlayer} wins!`);
                rl.close();
                return;
            }

            if (isgtgDraw()) {
                displayBoard();
                console.log("It's a draw!");
                rl.close();
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playGame();
        });
    });
}
// Startig the game here
playGame();
