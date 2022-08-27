import React from 'react'
import '../styles/GameStats.css';

function GameStats({ gameStats }) {
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;
  
    return (
      <ul className="GameStats GameStats__right">
        <li>Level</li>
        <li className="value">{level}</li>
        <li>Lines to level</li>
        <li className="value">{linesToLevel}</li>
        <li>Points</li>
        <li className="value">{points}</li>
      </ul>
    )
}

// React.memo make it where GameStats only updates when 
// the stats change
export default React.memo(GameStats)