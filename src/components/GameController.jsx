import '../styles/GameController.css';
import { Action, actionForKey, actionIsDrop } from '../utilities/Input'
import { playerController } from '../utilities/PlayerController'
import { useInterval } from "../hooks/useInterval";
import { useDropTime } from "../hooks/useDropTime";



function GameController({ board, gameStats, player, setGameOver, setPlayer}) {
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats
    });
    
    // cause the piece to slowly go down
    useInterval(() => {
        handleInput({ action: Action.SlowDrop });
    }, dropTime);
    
    const onKeyUp = ({ code }) => {
        const action = actionForKey(code);
        if (actionIsDrop(action)) resumeDropTime();
    };
    
    const onKeyDown = ({ code }) => {
        const action = actionForKey(code);
    
        if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
            } else {
                resumeDropTime();
            }
        } else if (action === Action.Quit) {
        setGameOver(true);
        } else {
        if (actionIsDrop(action)) pauseDropTime();
        if (!dropTime) {
            return;
        }
        handleInput({ action });
        }
    };
    
const handleInput = ({ action }) => { 
    playerController({ action, board, player, setPlayer, setGameOver });
    };
    
    return (
        <input
        className="GameController"
        type="text"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        autoFocus
        />
    );
};

export default GameController