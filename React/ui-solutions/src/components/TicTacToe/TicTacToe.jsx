import React from 'react'
import './style.css'
import { useTicTacToe } from './useTicTacToe';

const TicTacToe = ({boardSize = 3}) => {
    const {board, message, resetGame, handleClick} = useTicTacToe(boardSize);

    return (
        <div>
            <h1>
                TicTacToe
            </h1>
            {
                message && <div className="winning-message">
                {
                    message
                }
                <div className="reset-game">
                    <button onClick={resetGame()}>Reset Game!</button>
                </div>
            </div>
            }
            {
                !message && <div className="board-wrapper">
                <div className="boards">
                    {
                        board?.map((rowData, rowIdx) => {
                                const isLastRow = boardSize === rowIdx + 1;
                            return <div className="boards-row" data-lastrow={isLastRow} key={rowIdx}>
                                {
                                    rowData?.map((colData, colIdx) => {
                                        const isLastCol = boardSize === colIdx + 1;
                                        return <div className="boards-col" key={`${rowIdx}-${colIdx}`} data-lastcol={isLastCol} onClick={() => handleClick(rowIdx, colIdx)}>
                                            {
                                               board[rowIdx][colIdx]
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            }

        </div>
    )
}

export default TicTacToe