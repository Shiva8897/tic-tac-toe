document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const status = document.getElementById('status');

    let currentPlayer = 'X';
    let gameStatus = ['','','','','','','','',''];
    let moves = 0;

    const checkWin = () => {
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8], //rows
            [0,3,6],[1,4,7],[2,5,8], //columns
            [0,4,8],[2,4,6] //diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
                return gameStatus[a];
            }
        }

        if (moves === 9) return 'draw';

        return null;
    };

    const handleCellClick = (e) => {
        const cellIndex = e.target.getAttribute('data-index');
        if (gameStatus[cellIndex] === '' && !checkWin()) {
            gameStatus[cellIndex] = currentPlayer;
            e.target.textContent = currentPlayer;
            moves++;

            const winner = checkWin();
            if (winner) {
                if (winner === 'draw') {
                    status.textContent = "It's a draw!";
                } else {
                    status.textContent = `${winner} wins!`;
                }
                board.removeEventListener('click', handleCellClick);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `${currentPlayer}'s turn`;
            }
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameStatus = ['','','','','','','','',''];
        moves = 0;
        cells.forEach(cell => {
            cell.textContent = '';
        });
        status.textContent = `${currentPlayer}'s turn`;
        board.addEventListener('click', handleCellClick);
    };

    board.addEventListener('click', handleCellClick);
    resetButton.addEventListener('click', resetGame);
    status.textContent = `${currentPlayer}'s turn`;
});
