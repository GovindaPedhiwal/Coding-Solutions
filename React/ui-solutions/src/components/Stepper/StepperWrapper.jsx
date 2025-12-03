import React, { useState } from 'react'
import Stepper from './Stepper'
import './style.css'

const STEPPER_IDS = {
    1: 1,
    2: 2,
    3: 3,
    4: 4
}

const STEPPER_LIST = [
    {
        id: STEPPER_IDS[1],
        label: 'First'
    },
    {
        id: STEPPER_IDS[2],
        label: 'Second'
    },
    {
        id: STEPPER_IDS[3],
        label: 'Third'
    },
    {
        id: STEPPER_IDS[4],
        label: 'Fourth'
    }
]

const STEPPER_LIST_CONTENT = {
    [STEPPER_IDS[1]]: 'First',
    [STEPPER_IDS[2]]: 'Second',
    [STEPPER_IDS[3]]: 'Third',
    [STEPPER_IDS[4]]: 'Fourth'
}

const StepperWrapper = () => {
    const [selectedItemIdx, setSelectedItemIdx] = useState(0)

    const handleNextStepper = () => {
        setSelectedItemIdx(prev => prev + 1);
    }
    const handlePrevStepper = () => {
        setSelectedItemIdx(prev => prev - 1);

    }
    console.log(selectedItemIdx)

    return (
        <div>
            <h1>Stepper</h1>
            <Stepper list={STEPPER_LIST} selectedItemIdx={selectedItemIdx} />
            <div className="stepper-btns">
                <button className={`${selectedItemIdx !== 0 ? '': 'disabled'}`} onClick={handlePrevStepper}>Prev Stepper</button>
                <button className={`${selectedItemIdx !== STEPPER_LIST?.length - 1 ? '': 'disabled'}`} onClick={handleNextStepper}>Next Stepper</button>
            </div>
            <div className="stepper-content">
                {STEPPER_LIST_CONTENT[STEPPER_LIST[selectedItemIdx]?.id]}
            </div>
        </div>
    )
}

export default StepperWrapper