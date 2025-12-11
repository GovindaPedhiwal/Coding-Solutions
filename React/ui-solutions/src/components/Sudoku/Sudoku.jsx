import React, { useEffect, useRef, useState } from 'react'
import './style.css'


const generateGameGrid = () => {
    return Array.from({length: 9}, () => new Array(9).fill(''))
}

const generateArrOfSets = (n) => {
    return Array.from({length: n}, () => new Set())
}

const getSubGridIdx = (rowIdx, colIdx) => {
    return (Math.floor(rowIdx / 3) * 3) + Math.floor(colIdx / 3);
}

const generateRandomIdxs = () => {
    let newRow = Math.floor(Math.random() * 9);
    let newCol = Math.floor(Math.random() * 9);
    return [newRow, newCol];
}


const Sudoku = () => {
    const [gameGrid, setGameGrid] = useState(() => generateGameGrid());
    const memo = useRef();

    const placeNumber = (num, gameGrid, rowIdx, colIdx) => {
        gameGrid[rowIdx][colIdx] = num;
        memo.current.rowArrOfSets[rowIdx].add(num);
        memo.current.colArrOfSets[colIdx].add(num);
        const subGridIdx = getSubGridIdx(rowIdx, colIdx);
        memo.current.subGridArrOfSets[subGridIdx].add(num);
    }
    const removeNumber = (num, gameGrid, rowIdx, colIdx) => {
        gameGrid[rowIdx][colIdx] = '';
        memo.current.rowArrOfSets[rowIdx].delete(num);
        memo.current.colArrOfSets[colIdx].delete(num);
        const subGridIdx = getSubGridIdx(rowIdx, colIdx);
        memo.current.subGridArrOfSets[subGridIdx].delete(num);
    }

    const isSafeToPlaceValue = (num, gameGrid, rowIdx, colIdx) => {
        const subGridIdx = getSubGridIdx(rowIdx, colIdx);
        if(memo.current.rowArrOfSets[rowIdx].has(num) || memo.current.colArrOfSets[colIdx].has(num) ||
            memo.current.subGridArrOfSets[subGridIdx].has(num)    
        ) return false;

        return true;
    }

    const removeRandomNumbers = (m, gameGrid) => {
        for(let i = 0;i < m; i++) {
            let [row, col] = generateRandomIdxs();
            removeNumber(gameGrid[row][col], gameGrid, row, col);
        }
    }

    const generateSudoku = (gameGrid, rowIdx, colIdx) => {
        if(rowIdx == 9) {
            return true;
        }
        for(let i = 1;i <= 9; i++) {
            const result = isSafeToPlaceValue(i, gameGrid, rowIdx, colIdx);
            if(result) {
                placeNumber(i, gameGrid, rowIdx, colIdx);
                let newRow = rowIdx;
                let newCol = colIdx + 1;
                if(newCol == 9) {
                    newRow = rowIdx + 1;
                    newCol = 0;
                }
                const res = generateSudoku(gameGrid, newRow, newCol);
                if(res) {
                    return true;
                } else {
                    gameGrid[rowIdx][colIdx] = '';
                    removeNumber(i, gameGrid, rowIdx, colIdx);
                }
            }
        }
    }

    useEffect(() => {
        const cloneGameGrid = structuredClone(gameGrid);
        memo.current = {
            rowArrOfSets: generateArrOfSets(9),
            colArrOfSets: generateArrOfSets(9),
            subGridArrOfSets: generateArrOfSets(9)
        }
        generateSudoku(cloneGameGrid, 0, 0);
        removeRandomNumbers(3, cloneGameGrid);
        setGameGrid(cloneGameGrid)
    }, []);

    const handleInput = (e, rowIdx, colIdx) => {
        let newValue = Number(e.target.value);
        if(newValue == 0 || isNaN(newValue)) return;
        const cloneGameGrid = structuredClone(gameGrid);
        console.log(typeof newValue)
        if(!newValue) {
            removeNumber(cloneGameGrid[rowIdx][colIdx], cloneGameGrid, rowIdx, colIdx);
        } else {
            const res = isSafeToPlaceValue(newValue, cloneGameGrid, rowIdx, colIdx);
            if(res == false) {
                alert('place somewhere else');
                return;
            }
            placeNumber(newValue, cloneGameGrid, rowIdx, colIdx);
        }
        setGameGrid(cloneGameGrid)
    }

    console.log(gameGrid)
    return (
        <div>
            <h1>
                Sudoku
            </h1>

            <div className="sudoku-game">
                {
                    gameGrid?.map((row, rowIdx) => {
                        return <div className="s-g-row" key={rowIdx}>
                            {
                                row?.map((col, colIdx) => {
                                    return <div className="s-g-col" key={`${rowIdx}-${colIdx}`}>
                                        <input name="" id="" maxLength={1} value={gameGrid[rowIdx][colIdx]} onChange={(e) => handleInput(e, rowIdx, colIdx)}></input>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Sudoku