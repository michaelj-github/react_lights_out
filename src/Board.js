import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let r = 0; r < nrows; r++) {
      let thisRow = [];
      for (let c = 0; c < ncols; c++) {
        let thisLightIsOn = (Math.random() < chanceLightStartsOn);
        thisRow.push(thisLightIsOn);
      }
      initialBoard.push(thisRow);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let hasWon = true;
    for (let r = 0; r < board.length; r++){
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c]) {
          hasWon = false;
          break;
        }
      }
      if (!hasWon) break;
    }
    // solution looks a lot cleaner // return board.every(row => row.every(cell => !cell));
    return hasWon;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>
      <h1>Congratulations! You Won!</h1>
      </div>;
  }


  // TODO

  // make table board

  // TODO

  let theBoard = [];
  for (let r = 0; r < nrows; r++) {
    let theRow = [];
    for (let c = 0; c < ncols; c++) {
      let rowCol = `${r}-${c}`;
      theRow.push(
        <Cell
          key={rowCol}
          isLit={board[r][c]}
          flipCellsAroundMe={() => flipCellsAround(rowCol)}
        />
      );
    }
    theBoard.push(<tr key={r}>{theRow}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{theBoard}</tbody>
    </table>
  );  

}

export default Board;
