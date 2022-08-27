import React from 'react'
import "./Menu.css"

function Menu({onClick}) {
  return (
    <div className='Menu'>
        <button className='Button' onClick={onClick}> 
            Play Tetris
        </button>
    </div>
  )
}

export default Menu