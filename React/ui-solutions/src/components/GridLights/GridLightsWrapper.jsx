import React from 'react'
import GridLights from './GridLights'

const GridLightsWrapper = () => {
    const grid = [
        [1,1,0],
        [1,0,0],
        [0,1,0]
    ]
    return (
        <div>
            <GridLights grid={grid}/>
        </div>
    )
}

export default GridLightsWrapper