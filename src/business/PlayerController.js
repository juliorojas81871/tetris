import { Action } from "./Input";
import { rotate } from "./Tetrominoes";
import { hasCollision, isWithinBoard  } from "./Board";

export const movePlayer = ({ delta, position, shape, board }) => {
    const desiredNextPosition = {
      row: position.row + delta.row,
      column: position.column + delta.column
    };
  
    const collided = hasCollision({
      board,
      position: desiredNextPosition,
      shape
    });
  
    const isOnBoard = isWithinBoard({
      board,
      position: desiredNextPosition,
      shape
    });

    // This will prevent piece to get out from the board
    // if you not allow to move the piece will return to the old position
    const preventMove = !isOnBoard || (isOnBoard && collided);
    const nextPosition = preventMove ? position : desiredNextPosition;

    // check if it about to hit buttom or other pieces
    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnBoard);
  
    return { collided: isHit, nextPosition };
  };

// tranpose the row and columns
const attemptRotation = ({ board, player, setPlayer }) => {
    const shape = rotate({
      piece: player.tetromino.shape,
      direction: 1
    });
    const position = player.position;
    // a boolean that check that you are withing the board and make sure
    // that the peice doesn't collide to anything
    const isValidRotation =
        isWithinBoard({ board, position, shape }) &&
        !hasCollision({ board, position, shape });

    if (isValidRotation) {
        setPlayer({
            ...player,
            tetromino: {
            ...player.tetromino,
            shape
            }
        });
    } else {
        return false;
    }
};

const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
    const delta = { row: 0, column: 0 };
    let isFastDropping = false;
  
    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        // when the piece going down, you are technically going up since row start at 0
        delta.row += 1;
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }
  
    const { collided, nextPosition } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board
    });  
     // Check if the piece collide immediately, if so it game over
    const isGameOver = collided && player.position.row === 0;
    if (isGameOver) {
        setGameOver(isGameOver);
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition
  });
};  

export function playerController({ action, board, player, setPlayer, setGameOver }){
    if(!action) return;

    if(action === Action.Rotate){
        attemptRotation({ board, player, setPlayer });
    } else {
        attemptMovement({board, player, setPlayer, action, setGameOver})
    }
};
  