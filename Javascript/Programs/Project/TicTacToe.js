const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let currentPlayer = 'X';

function displayBoard() {
    console.clear();
    board.forEach(row => console.log(row.join(' | ')));
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true; // Row
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true; // Column
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true; // Diagonal
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true; // Diagonal
    return false;
}

function isDraw() {
    return board.flat().every(cell => cell !== 0);
}

function makeMove(row, col) {
    if (board[row][col] !== 0) {
        console.log("Cell is already occupied! Choose another.");
        return false;
    }
    board[row][col] = currentPlayer;
    return true;
}

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

            if (isDraw()) {
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

// Start the game
playGame();
