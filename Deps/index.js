document.addEventListener('DOMContentLoaded', () => {
    var states = Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null));
    let turn = document.getElementById('turn');
    turn.style.color = '#E43C33';

    const board = document.getElementById('game-board');
    const numRows = 7;
    const numCols = 7;
    const columns = Array.from({ length: numCols }, () => []);
    let color = '#E43C33'; 

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const div = document.createElement('div');
            div.classList.add('small-div');
            //div.innerHTML = `(${i},${j})`;
            states[i][j] = null; 
            div.style.border = '1px solid black';
            div.style.padding = '10%';
            div.dataset.row = i;
            div.dataset.col = j;
            div.addEventListener('click', handleColumnClick);  
            board.appendChild(div);
            columns[j].push(div);  
        }
    }

    console.log("Initial states:", states);

    function handleColumnClick(event) {
        const colIndex = event.target.dataset.col;
        let placed = false;

        for (let i = numRows - 1; i >= 0; i--) {
            const cell = columns[colIndex][i];
            if (!cell.querySelector('.circle')) {
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.backgroundColor = color;
                cell.innerHTML = '';  
                cell.appendChild(circle);

                states[i][colIndex] = color === '#E43C33' ? 'r' : 'y';
                color = color === '#E43C33' ? '#F8D51D' : '#E43C33';
                placed = true;
                break;
            }
        }

        if (placed) {
            console.log("Updated states:", states);
            let turn = document.getElementById('turn');
            turn.textContent = color === '#E43C33' ? 'Red\'s Turn' : 'Yellow\'s Turn';
            turn.style.color = color === '#E43C33' ? '#E43C33' : '#F8D51D';
            if (checkForWin()) {
                showModal(color === '#E43C33' ? 'y' : 'r');
            }
        }
    }

    function checkForWin() {
        const checkDirection = (startRow, startCol, deltaRow, deltaCol) => {
            let count = 0;
            let row = startRow;
            let col = startCol;
            const playerColor = states[startRow][startCol];

            while (row >= 0 && row < numRows && col >= 0 && col < numCols) {
                if (states[row][col] === playerColor) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
                row += deltaRow;
                col += deltaCol;
            }
            return false;
        };

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (states[row][col]) {
                    if (checkDirection(row, col, 0, 1)) return true;
                    if (checkDirection(row, col, 1, 0)) return true;
                    if (checkDirection(row, col, 1, 1)) return true;
                    if (checkDirection(row, col, 1, -1)) return true;
                }
            }
        }
        return false;
    }

    function showModal(winner) {
        const modal = document.getElementById('win-modal');
        const winMessage = document.getElementById('win-message');
        winMessage.textContent = winner === 'r' ? 'Red wins!' : 'Yellow wins!';
        winMessage.style.color = winner === 'r' ? '#E43C33' : '#F8D51D';
        modal.style.display = 'block';

        const restartButton = document.getElementById('restart-btn');

        restartButton.onclick = function() {
            resetGame();
            modal.style.display = 'none';
        }
    }

    function resetGame() {
        states = Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null));
        color = '#E43C33'; 

        columns.forEach(column => {
            column.forEach(cell => {
                cell.innerHTML = ''; 
            });
        });

        console.log("Game reset. States:", states);
    }
});
