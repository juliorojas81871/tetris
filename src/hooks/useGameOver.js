import {useCallback, useState} from 'react'

export default function useGameOver() {
    const [gameOver, setGameOver] = useState(true);
    const resetGameOver = useCallback(() => {
      setGameOver(false);
        //without [] it will constantly callback      
    },[]);
    return [gameOver, setGameOver, resetGameOver];
}