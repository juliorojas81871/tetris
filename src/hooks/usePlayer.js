import { useState, useCallback } from "react";
import { randomTetromino } from "../business/Tetrominoes";

function buildPlayer(previous) {
    let tetrominoes;

    if (previous) { // update returning player with changes
        tetrominoes = [...previous.tetrominoes];
        tetrominoes.unshift(randomTetromino());
      } else {  //if it doesn't have a prev it make a new randomTetromino 
        tetrominoes = Array(5)
          .fill(0)
          .map((_) => randomTetromino());
    }

    return {
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetrominoes,
        tetromino: tetrominoes.pop()
    };
}

export function usePlayer (){
    // return the state to see if a player is playing or not using buildPlayer
    const [player, setPlayer] = useState(buildPlayer());
    // when call it keep the value from the previous player
    // and update things things that we want
    const resetPlayer = useCallback(() => {
      setPlayer((prev) => buildPlayer(prev));
    }, []);
  
    return [player, setPlayer, resetPlayer];
};
  