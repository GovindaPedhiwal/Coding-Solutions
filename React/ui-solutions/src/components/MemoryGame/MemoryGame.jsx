import React, { useState } from 'react'
import './style.css'

const createMemoryGameGrid = (gridSize) => {
    const grid = []
    const pools = [];
    for(let i = 1;i <= (gridSize * gridSize) / 2; i++) {
        pools.push(i);
        pools.push(i);
    }
    // Step 2: shuffle (Fisher-Yates)
    for (let i = pools.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pools[i], pools[j]] = [pools[j], pools[i]];
    }
    let poolIdx = 0;
    for(let i = 0;i < gridSize; i++) {
        let rows = []
        for(let j = 0;j < gridSize; j++) {
            rows.push(pools[poolIdx++])
        }
        grid.push(rows)
    }
    return grid;
}

const MemoryGame = ({gridSize = 4}) => {
    const [grid, setGrid] = useState(() => createMemoryGameGrid(gridSize));
    const [firstItemIdx, setFirstItemIdx] = useState(null);
    const [secondItemIdx, setSecondItemIdx] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [correctValue, setCorrectValue] = useState([]);
    const totalItems = gridSize * gridSize;
    const handleClick = (rowIdx, colIdx) => {
        if(timerRunning) return;
        if(!firstItemIdx) {
            setFirstItemIdx([rowIdx, colIdx])
            return;
        }
        if(firstItemIdx[0] == rowIdx && firstItemIdx[1] == colIdx) return;
        if(!secondItemIdx) {
            setSecondItemIdx([rowIdx, colIdx]);
            const firstValue = grid[firstItemIdx[0]][firstItemIdx[1]]
            const secondValue = grid[rowIdx][colIdx]
            setTimerRunning(true);
            setTimeout(() => {
                if(firstValue === secondValue) {
                    setCorrectValue((prevValue) => [...prevValue, firstValue])
                }
                setFirstItemIdx(null);
                setSecondItemIdx(null);
                setTimerRunning(false);
            }, 1000);
        }
    }
    const resetGame = () => {
        setCorrectValue([]);
        setGrid(createMemoryGameGrid(gridSize));
    }
    console.log(grid)
    return (
        <div>
            <h1>
                MemoryGame
            </h1>

            {
              totalItems / 2 !== correctValue?.length &&  <div className="board">
                {
                    grid?.map((rows, rowIdx) => {
                        return <div className="board-row" key={rowIdx}>
                            {
                                rows?.map((col, colIdx) => {
                                    const classnames = ['board-col'];
                                    if(correctValue.includes(grid[rowIdx][colIdx])) {
                                        classnames.push('valid')
                                    }
                                    if((firstItemIdx && rowIdx == firstItemIdx[0] && colIdx == firstItemIdx[1]) || (secondItemIdx && rowIdx == secondItemIdx[0] && colIdx == secondItemIdx[1])) {
                                        classnames.push('enable')
                                    }
                                    return <div className={classnames?.join(' ')} key={`${rowIdx}-${colIdx}`} onClick={() => handleClick(rowIdx, colIdx)}>
                                        <div className="data">
                                            {
                                                grid[rowIdx][colIdx]
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>}
            {
                totalItems / 2 === correctValue?.length && <div>
                    <div className="message">
                        You have completed the game!
                    </div>
                    <div className="reset">
                        <button onClick={() => resetGame()}>Reset Again!</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default MemoryGame