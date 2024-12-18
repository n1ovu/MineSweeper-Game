// Display or UI
import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

// 1. Populate a board with tiles/mines
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)

    // 2. Left click on tile
    tile.element.addEventListener("click", () => {
      // a. Reveal tile
      revealTile(board, tile)
      checkGameEnd()
    })

    // 3. Right click on tile
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      // a. Flag tile
      markTile(tile)
      listMinesLeft()
    })
  })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

// 4. Check if game is won or lost
function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    )
  }, 0)

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, {
      capture: true,
    })
  }
  if (win) {
    messageText.textContent = "You Win!"
  }
  if (lose) {
    messageText.textContent = "You Lose!"
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
