import React, { useEffect, useState } from 'react'
import './style.css'
import { getRandomCell } from './utils';

const WhaleAMock = ({size}) => {
    const grid = Array.from({length: size}, () => new Array(size).fill(''));
    const [randomCellValue, setRandomCellValue] = useState(() => getRandomCell(size, size));
    const [enableHammer, setEnableHammer] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    useEffect(() => {
        let intervalId = setInterval(() => {
            setRandomCellValue(() => getRandomCell(size, size));
        }, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const handleClick = (rowIdx, colIdx) => {
        setEnableHammer(prev => {
            return {
                ...prev,
                [`${rowIdx}-${colIdx}`]: true
            }
        });
        if(randomCellValue.row == rowIdx && randomCellValue.col == colIdx) {
            setTotalScore((prev) => prev + 10);
            setRandomCellValue(getRandomCell());
        }
        
        setTimeout(() => {
            setEnableHammer(prev => {
                return {
                    ...prev,
                    [`${rowIdx}-${colIdx}`]: false
                }
            });
        }, 300);
    }

    return (
        <div>
            <h1>
                WhaleAMock
            </h1>
            <h1>
                Score: {totalScore}
            </h1>
            
            <div className="whaleAMock">
                <div className="w-a-m" style={{
                    width: size * 40
                }}>
                    {
                        grid?.map((value, rowIdx) => {
                            return <div className="w-a-m-row" key={rowIdx} data-lastrow={rowIdx == size - 1}>
                                {
                                    value?.map((_, colIdx) => {
                                        const {row, col} = randomCellValue;
                                        const enableWhale = rowIdx == row && colIdx == col;
                                        const enableHammer_ = enableHammer[`${rowIdx}-${colIdx}`];
                                        return <div className="w-a-m-col" onClick={() => handleClick(rowIdx, colIdx)} key={`${rowIdx}-${colIdx}`} data-lastcol={colIdx == size - 1}>
                                           {enableWhale && <div>🐳</div>}  
                                           {enableHammer_ && 
                                           <div className="hammer">
                                               🔨
                                           </div>
                                           }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default WhaleAMock