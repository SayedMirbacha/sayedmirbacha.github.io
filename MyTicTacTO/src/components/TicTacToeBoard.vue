<template>
  <div class="game-container">
    <h1>Tic Tac Toe</h1>
    <!-- Message area -->
    <div class="message">{{ message }}</div>
    <!-- Game grid -->
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="cell"
        :class="{ taken: cell }"
        @click="makeMove(index)"
      >
        {{ cell }} <!-- Show X or O -->
      </div>
    </div>
    <!-- Reset button to restart the game -->
    <button class="reset-button" @click="resetGame">Reset Game</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: Array(9).fill(null), // 3x3 Tic Tac Toe grid, all empty at the start
      currentPlayer: 'X', // The player that is making a move
      winner: null, // Track winner state
      message: "Player X's Turn", // Message to track game state
    };
  },
  methods: {
    // Handle a user clicking on a cell
    makeMove(index) {
      // Prevent clicking on already taken cells or after a winner has been declared
      if (this.board[index] || this.winner) return;

      // Assign current player to clicked cell
      this.board[index] = this.currentPlayer;

      // Check for winning conditions
      if (this.checkWinner()) {
        this.message = `Player ${this.currentPlayer} Wins! 🎉`;
        this.winner = this.currentPlayer;
      } 
      // Check for tie conditions
      else if (this.board.every(cell => cell)) {
        this.message = "It's a Tie! 🤝";
      } 
      // Switch to the other player if no win or tie
      else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.message = `Player ${this.currentPlayer}'s Turn`;
      }
    },
    // Function to check if the current board has a winner
    checkWinner() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return true;
        }
      }
      return false;
    },
    // Reset the game to its initial state
    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.message = "Player X's Turn";
      this.winner = null;
    },
  },
};
</script>

<style scoped>
.game-container {
  text-align: center;
  font-family: Arial, sans-serif;
  background:url(https://wallpaperaccess.com/full/2078964.jpg);
  min-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.message {
  margin: 10px 0;
  font-size: 20px;
  color: #555;
  font-weight: bold;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 80px);
  gap: 8px;
  margin: 20px auto;
  width: 260px;
  background-color: #ffffff;
  border: 4px solid #555;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}


.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
  height: 80px;
  font-size: 28px;
  cursor: pointer;
  
  /* Perspective and 3D transformation */
  transform: perspective(5px) translateZ(0);

  /* Simulate raised 3D effect using shadow */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
}

.cell:hover {
  /* Simulate a "pressed-in" effect when hovered */
  transform: perspective(5px) translateZ(-5px);
  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.4); /* Shadow for inset effect */
}


.cell.taken {
  pointer-events: none;
  color: #555;
}

.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #b9390b;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.reset-button:hover {
  background-color: #74c715;
  transform: scale(1.05);
}

.reset-button:active {
  transform: scale(0.95);
}

</style>
