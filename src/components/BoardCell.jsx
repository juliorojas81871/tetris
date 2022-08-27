import React from 'react'
import '../styles/BoardCell.css';

function BoardCell({cell}) {
  return (
    <div className={`BoardCell ${cell.className}`}>
        <div className='Sparkle'></div>
    </div>
  )
}

export default BoardCell