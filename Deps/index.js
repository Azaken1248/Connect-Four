document.addEventListener('DOMContentLoaded', () => {
  let turn = document.getElementById('turn');
  turn.style.color = '#E43C33';

  const board = document.getElementById('game-board');
  const numRows = 7;
  const numCols = 7;
  let pieces = Array.from({ length: numRows }, () => Array(numCols));
  let color = '#E43C33';

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const div = document.createElement('div');
      div.classList.add('small-div');
      div.dataset.col = col;
      div.addEventListener('click', handleColumnClick);
      board.appendChild(div);
      pieces[row][col] = div;
    }
  }

  function handleColumnClick(event) {
    const col = event.target.dataset.col;
    let placed = false;

    for (let row = numRows - 1; row >= 0; row--) {
      const cell = pieces[row][col];
      const cellIsCircle = cell.querySelector('.circle');

      if (!cellIsCircle) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.backgroundColor = color;
        cell.innerHTML = '';
        circle.dataset.col = col;
        cell.dataset.col = col;
        cell.appendChild(circle);

        if (color === '#E43C33') {
          cell.dataset.piece = 'r';
          color = '#F8D51D';
        } else {
          cell.dataset.piece = 'y';
          color = '#E43C33';
        }

        placed = true;
        break;
      }
    }

    if (placed) {
      let turn = document.getElementById('turn');

      if (color === '#E43C33') {
        turn.textContent = "Red's Turn";
        turn.style.color = '#E43C33';
      } else {
        turn.textContent = "Yellow's Turn";
        turn.style.color = '#F8D51D';
      }

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
      const playerColor = pieces[startRow][startCol].dataset.piece;

      while (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        if (pieces[row][col].dataset.piece === playerColor) {
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
        if (pieces[row][col].dataset.piece) {
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

    if (winner === 'r') {
      winMessage.textContent = 'Red wins!';
      winMessage.style.color = '#E43C33';
    } else {
      winMessage.textContent = 'Yellow wins!';
      winMessage.style.color = '#F8D51D';
    }

    modal.style.display = 'block';

    const restartButton = document.getElementById('restart-btn');

    restartButton.onclick = function () {
      resetGame();
      modal.style.display = 'none';
    };
  }

  function resetGame() {
    color = '#E43C33';
    board.innerHTML = '';
    pieces = Array.from({ length: numRows }, () => Array(numCols));

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const div = document.createElement('div');
        div.classList.add('small-div');
        div.dataset.col = col;
        div.addEventListener('click', handleColumnClick);
        board.appendChild(div);
        pieces[row][col] = div;
      }
    }

    turn.textContent = "Red's Turn";
    turn.style.color = '#E43C33';
  }
});
