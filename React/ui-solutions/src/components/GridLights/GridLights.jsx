import React, { useEffect, useState } from 'react'
import './style.css'

const totalOnLights = (grid) => {
    return grid
    ?.flatMap((value) => value)
    ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}

const GridLights = ({grid}) => {
    const [selectedLights, setSelectedLights] = useState({});
    const [totalOnLightsCnt] = useState(() => totalOnLights(grid))
    const [selectedLightsOrder, setSelectedLightsOrder] = useState([]);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        if(selectedLightsOrder?.length === totalOnLightsCnt) {
            setTimerStarted(true);
            runTimer();
        }
    }, [selectedLightsOrder]);

    const handleSelectLight = (rowIdx, colIdx) => {
        return () => {
            if(timerStarted || grid[rowIdx][colIdx] == 0) return;
            let data;
            let temp;
            if(selectedLights[rowIdx]) {
                let currRowDetails = selectedLights[rowIdx];
                if(currRowDetails.has(colIdx)) {
                    currRowDetails.delete(colIdx)
                    temp = selectedLightsOrder?.filter((selectedLight) => {
                        let [rIdx, cIdx] = selectedLight;
                        if(rowIdx == rIdx && colIdx == cIdx) return false;
                        return true;
                    })
                } else {
                    temp = [...selectedLightsOrder, [rowIdx, colIdx]]
                    currRowDetails.add(colIdx);
                }
                data = {...selectedLights, [rowIdx]: currRowDetails }
            } else {
                data = {...selectedLights, [rowIdx]: new Set([colIdx])}
                temp = [...selectedLightsOrder, [rowIdx, colIdx]]
            }
            setSelectedLightsOrder(temp)
            setSelectedLights(data);
        }
    }
    const runTimer = () => {
        let intervalId = setInterval(() => {
            setSelectedLightsOrder((previousOrder) => {
                if(previousOrder?.length === 0) {
                    clearInterval(intervalId);
                    setTimerStarted(false);
                    return previousOrder;
                }
                let newOrder = [...previousOrder]
                const lastSelectedLight = newOrder.pop();
                const [rowIdx, colIdx] = lastSelectedLight;
                setSelectedLights((prevSelectedLights) => {
                    let updatedLights = {...prevSelectedLights};
                    updatedLights[rowIdx] = new Set([...updatedLights[rowIdx]])
                    updatedLights[rowIdx].delete(colIdx);
                    return updatedLights;
                });
                
                return newOrder;
            })
        }, 2000);
    }
    return (
        <div>
            <h1>
                GridLights
            </h1>
            <div className="grid-lights">
                {
                    grid?.map((rows,rowIdx) => {
                        return <div className="grid-row" key={rowIdx}>
                            {
                                rows?.map((col, colIdx) => {
                                    let className = ['grid-col']
                                    if(selectedLights[rowIdx]?.has(colIdx)) {
                                        className.push('selected')
                                    }
                                    if(grid[rowIdx][colIdx]) {
                                        className.push('on')
                                    } else {
                                        className.push('off')
                                    }
                                    return <div className={className.join(' ')} key={`${rowIdx}-${colIdx}`} onClick={handleSelectLight(rowIdx, colIdx)}>
                                        {rowIdx}{colIdx}
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

export default GridLights