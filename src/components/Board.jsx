import React from 'react'
import BoardCell from './BoardCell';
import './Board.css'

function Board({board}) {
  //this is for css to make evenly sized cell dynamically depending on the size of the board
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
  };
  return (
    <div className="Board" style={boardStyles}>
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  )
}

export default Board