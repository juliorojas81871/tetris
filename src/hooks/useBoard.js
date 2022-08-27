import {useState, useEffect} from 'react'
import {buildBoard, nextBoard} from "../business/Board"

export function useBoard({rows, columns, player, resetPlayer, addLinesCleared}) {
    const [board, setBoard] = useState(buildBoard({ rows, columns }));

    // anytime player changes it will call setboard where it going to update the previous board and player
    useEffect(() => {
      setBoard((previousBoard) =>
        nextBoard({
          board: previousBoard,
          player,
          resetPlayer,
          addLinesCleared
        })
      );
    }, [player, resetPlayer, addLinesCleared]);
  
    return [board];
};
   