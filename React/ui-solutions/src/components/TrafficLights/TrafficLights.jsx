import React from 'react'
import './style.css'
import { useState } from 'react'
import { useEffect } from 'react'

const getLightDisplayOrder = (list) => {
    return list?.toSorted((a, b) => a?.displayOrder - b?.displayOrder)
}
const getLightActiveOrder = (list) => {
    return list?.toSorted((a ,b) => a?.activeOrder - b?.activeOrder)
}

const TrafficLights = ({list}) => {
    const displayOrder = getLightDisplayOrder(list);
    const lightActiveOrder = getLightActiveOrder(list);
    const [currentActiveLight, setCurrentActiveLight] = useState(-1);
    useEffect(() => {
        setTimeout(() => {
            let curr = currentActiveLight == list?.length - 1 ? 0 : currentActiveLight + 1;
            setCurrentActiveLight(curr)
        }, 1000);
    }, [currentActiveLight]);
    return (
        <div>
            <h1>
            TrafficLights
            </h1>
            <div className="traffic_lights">
                {
                     displayOrder?.map((light, idx) => {
                        return <Light key={idx} lightDetails={light} activeLight={lightActiveOrder[currentActiveLight]}/>
                    })
                }
            </div>

        </div>
    )
}

const Light = ({lightDetails, activeLight}) => {
    const {color} = lightDetails;
    return <div className={'light ' + `${lightDetails?.activeOrder === activeLight?.activeOrder ? 'active' : ''}`} style={{backgroundColor: color}}>

    </div>
}

export default TrafficLights