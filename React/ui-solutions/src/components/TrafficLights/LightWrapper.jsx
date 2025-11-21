import React from 'react'
import TrafficLights from './TrafficLights';

const list = [
    {   
        color: 'red',
        displayOrder: 4,
        activeOrder: 2
    },
    {
        color: 'purple',
        displayOrder: 3,
        activeOrder: 3
    },
    {
        color: 'yellow',
        displayOrder: 1,
        activeOrder: 1
    },
    {
        color: 'green',
        displayOrder: 2,
        activeOrder: 4        
    }

]

const LightWrapper = () => {
  return (
    <>
        <TrafficLights list={list}/>
    </>
  )
}

export default LightWrapper;