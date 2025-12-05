import React, { useEffect, useMemo, useRef, useState } from 'react'
import './style.css'

const generateGrid = (size) => {
    return Array.from({length: size}, () => Array(size).fill(''));
}

const getFoodPosition = (size) => {
    let rowIdx = Math.floor(Math.random() * size);
    let colIdx = Math.floor(Math.random() * size);
    return [rowIdx, colIdx]
}

const INITIAL_SNAKE_BODY = [
    [5,5]
]

const SnakeGame = ({size}) => {
    const grid = useMemo(() => generateGrid(size), []);
    const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE_BODY)
    const directionRef = useRef([0, 1]);
    const gridRef = useRef();
    const foodRef = useRef(getFoodPosition(size));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSnakeBody(prevSnakeBody => {
                let snakeHeadIdx = prevSnakeBody.length - 1;
                let snakeHeadData = prevSnakeBody[snakeHeadIdx];
                let direction = directionRef.current;
                const newSnakeCell = [snakeHeadData[0] + direction[0], snakeHeadData[1] + direction[1]]
                const isNewCellAlreadyExisits = prevSnakeBody?.some(([row, col]) => newSnakeCell[0] == row && newSnakeCell[1] == col)
                if(newSnakeCell[0] < 0 || newSnakeCell[0] >= size || newSnakeCell[1] < 0 || newSnakeCell[1] >= size || isNewCellAlreadyExisits) {
                    directionRef.current = [0, 1];
                    return INITIAL_SNAKE_BODY;
                }
                const newSnakeBody = structuredClone(prevSnakeBody);
                const food = foodRef.current;
                if(newSnakeCell[0] == food[0] && newSnakeCell[1] == food[1]) {
                    foodRef.current = getFoodPosition(size);
                } else {
                    newSnakeBody.shift();
                }
                newSnakeBody.push(newSnakeCell);
                return newSnakeBody;
            }); 
            
        }, 100);

        document.addEventListener('keydown', handleSnakeMovement);
        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleSnakeMovement);
        }
    }, []);

    const handleSnakeMovement = (e) => {
        const key = e.key;
        let newFoodDirection = directionRef.current;
        if(key == 'ArrowRight' && newFoodDirection[1] !== -1) {
            newFoodDirection = [0, 1];
        } else if(key == 'ArrowLeft' && newFoodDirection[1] != 1) {
            newFoodDirection = [0, -1]
        } else if(key == 'ArrowUp' && newFoodDirection[0] !== 1) {
            newFoodDirection = [-1, 0]
        } else if(key == 'ArrowDown' && newFoodDirection[0] !== -1) {
            newFoodDirection = [1, 0]
        }
        directionRef.current = newFoodDirection;
    }

    const isSnakeBodyExists = (rowIdx, colIdx) => {
        return snakeBody?.some(([row, col]) => row === rowIdx && col === colIdx);
    }

    const isFoodAvailable = (rowIdx, colIdx) => {
        const foodDirection = foodRef.current;
        return foodDirection[0] == rowIdx && foodDirection[1] == colIdx;
    }

    return (
        <div>
            <h1>
                SnakeGame
            </h1>
            <div className="snake-wrapper" ref={gridRef}>
                {
                    grid?.map((rowValue, rowIdx) => {
                        return <div className="snake-row" key={rowIdx}>
                            {
                                rowValue?.map((colValue, colIdx) => {
                                    const isSnakeBodyExists_ = isSnakeBodyExists(rowIdx, colIdx)
                                    const isFoodAvailable_ = isFoodAvailable(rowIdx, colIdx);
                                    return <div className={`snake-col ${isSnakeBodyExists_ ? 'active': ''} ${isFoodAvailable_ ? 'food': ''}`} key={`${rowIdx}-${colIdx}`}>
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

export default SnakeGame