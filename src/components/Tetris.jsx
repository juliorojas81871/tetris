import './Tetris.css'
import Board from './Board'
import {useBoard} from '../hooks/useBoard'
import {useGameStats} from '../hooks/useGameStats'
import GameStats from './GameStats'
import Previews from './Previews'
import {usePlayer} from '../hooks/usePlayer'
import GameController from './GameController'

function Tetris({rows, columns, setGameOver }) {
  const[gameStats,addLinesCleared] = useGameStats()
  const [player, setPlayer, resetPlayer] = usePlayer();

  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });
  return (
    <div className='Tetris'>
      <Previews tetrominoes={player.tetrominoes} />
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  )
}

export default Tetris