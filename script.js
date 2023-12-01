// JavaScript code for the game logic
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
let gameActive = true;

function handleClick(cellIndex) {
  if (!gameActive || cells[cellIndex].textContent !== '') return;

  cells[cellIndex].textContent = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      highlightWin(combination);
      setTimeout(() => {
        alert(`Player ${cells[a].textContent} wins!`);
        resetGame();
      }, 100);
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent !== '')) {
    gameActive = false;
    setTimeout(() => {
      alert('It\'s a draw!');
      resetGame();
    }, 100);
  }
}

function highlightWin(combination) {
  combination.forEach(index => {
    cells[index].style.backgroundColor = 'lightgreen';
  });
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#eee';
  });
  currentPlayer = 'X';
  gameActive = true;
}
