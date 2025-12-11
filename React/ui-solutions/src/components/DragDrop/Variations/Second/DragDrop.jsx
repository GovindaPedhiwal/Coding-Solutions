import React, { useRef, useState } from 'react'
import './style.css'

const DragDrop = ({list}) => {
    console.log('list', list)
    const [fullData, setFullData] = useState(list);
    const dragItemRef = useRef();
    const dragItemIdx = useRef();
    const handleDragStart = (e, value, startIdx) => {
        console.log(e, startIdx)
        e.target.style.opacity = '0.5'
        dragItemRef.current = value;
        dragItemIdx.current = startIdx;
    }
    const handleDragEnd = (e) => {
        e.target.style.opacity = '1'
    }
    const handleDropOver = (e, dropIdx) => {
        console.log(e, dropIdx);
        if(dragItemIdx.current == dropIdx) return;
        const cloneFullData = structuredClone(fullData);
        cloneFullData.splice(dragItemIdx.current, 1);
        cloneFullData.splice(dropIdx, 0, dragItemRef.current);
        console.log('updated data', cloneFullData)
        setFullData(cloneFullData);
    }
    return (
        <div>
            <h1>
                DragDrop
            </h1>
            <div className="dragdrop-wrapper">
                <div className="d-d-list">
                    {
                        fullData?.map((currValue, idx) => {
                            return <div className="d-d-item" key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, currValue, idx)}
                                onDragEnd={(e) => handleDragEnd(e, idx)}
                                onDrop={(e) => handleDropOver(e, idx) }
                                onDragOver={(e) => e.preventDefault()}
                            >
                                {currValue}
                            </div>
                        })
                    }
                </div>
            </div>


        </div>
    )
}

export default DragDrop