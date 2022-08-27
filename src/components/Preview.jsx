import React from 'react'
import '../styles/Preview.css';
import {buildBoard } from '../utilities/Board'
import {transferToBoard} from '../utilities/Tetrominoes'
import BoardCell from './BoardCell';

function Preview({ tetromino, index }) {
    const { shape, className } = tetromino;

    const board = buildBoard({ rows: 4, columns: 4 });
    
    //  dynamic style so the tetrominos doesn't overlap each other
    const style = { 
      top: `${index * 10}vw` 
    };
    
    // transfer the tetromino to the board when it being used
    board.rows = transferToBoard({
      className,
      isOccupied: false,
      position: { row: 0, column: 0 },
      rows: board.rows,
      shape
    });
    
    // return the 3 tetrominos that is show ahead of time on the top rigth corner of the board 
    return (
      <div className="Preview" style={style}>
        <div className="Preview-board">
          {board.rows.map((row, y) =>
            row.map((cell, x) => (
              <BoardCell key={x * board.size.columns + x} cell={cell} />
            ))
          )}
        </div>
      </div>
  )
}

export default Preview