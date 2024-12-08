// Display or UI
import { createBoard } from "./minesweeper.js"

const BOARD_SIZE = 2
const NUMBER_OF_MINES = 2

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
  })
})
// 1. Populate a board with tiles/mines

// 2. Left click on tile
// a. Reveal tile

// 3. Right click on tile
// a. Flag tile

// 4. Check if game is won or lost
