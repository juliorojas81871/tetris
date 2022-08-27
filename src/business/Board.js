import { defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";
import { movePlayer } from "../business/PlayerController";

export function buildBoard ({rows, columns}) {
    const builtRows = Array.from({length: rows}, () =>
        Array.from({length: columns}, () => ({ ...defaultCell }))
    );
    return {
        rows: builtRows,
        size: {rows, columns}
    }
};

// look ahead for the ghost
function findDropPosition({ board, position, shape }){
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }
    row = position.row + i;
  }
  // return the same column and new row
  return { ...position, row };
};

export function nextBoard({ board, player, resetPlayer, addLinesCleared }) {
  const { tetromino, position } = player;
  
  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape
  });

  // Place ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape
  });

  // Place the piece.
  // If it collided, mark the board cells as collided
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape
    });
  }

  // Check for cleared lines
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  
  // take the row, check if every row is occupied, removing row by adding 
  // new row and shifting it with the full row
  rows = rows.reduce((acc, row) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }
  
  // if piece collided, it reset the player (new piece will apear)
  if(player.collided || player.isFastDropping){
    resetPlayer();
  }
  // Return the next board
  return {
      rows,
      size: { ...board.size }
  };
};

// check for collision by checking it it going to hit a 1, occupied, section
export const hasCollision = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
      const row = y + position.row;
  
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const column = x + position.column;
  
          if (
            board.rows[row] &&
            board.rows[row][column] &&
            board.rows[row][column].occupied
          ) {
            return true;
          }
        }
      }
    }
  
    return false;
};

// will go eact of the row than column and check if a piece of tetrominoe at that position.
// If not it will return false
export const isWithinBoard = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
      const row = y + position.row;
  
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const column = x + position.column;
          const isValidPosition = board.rows[row] && board.rows[row][column];
  
          if (!isValidPosition) return false;
        }
      }
    }
  
    return true;
};