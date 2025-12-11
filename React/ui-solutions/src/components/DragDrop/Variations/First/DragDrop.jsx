import React, { useRef, useState } from 'react'
import './style.css'

const DragDrop = ({data}) => {
    const [fullData, setFullData] = useState(data);
    const dragItemRef = useRef();
    const dragItemContainerRef = useRef();
    const dragItemIdx = useRef();
    const handleDragStart = (e, container, item, idx) => {
        console.log('start', e)
        e.target.style.opacity = '0.5'
        dragItemRef.current = item;
        dragItemContainerRef.current = container;
        dragItemIdx.current = idx;
    }
    const handleDragEnd = (e) => {
        console.log('end', e)
        e.target.style.opacity = '1'
    }

    const handleDragOver = (e, container) => {
        console.log(e, container)
        let cloneFullData = structuredClone(fullData);
        
        cloneFullData[dragItemContainerRef.current] = cloneFullData[dragItemContainerRef.current]?.filter((currItem) => currItem !== dragItemRef.current)
        cloneFullData[container] = [...cloneFullData[container], dragItemRef.current]
        setFullData(cloneFullData);
    }

    console.log(fullData)
    return (    
        <div>
            <h1>
                DragDrop
            </h1>
            <div className="dragdrop">
                    {
                        Object.keys(fullData)?.map((items, idx) => {
                            return <div className="d-d-container" key={idx} onDrop={(e) => handleDragOver(e, items)}
                            onDragOver={(e) => e.preventDefault()}
                            >
                                <h2>
                                    {items}
                                </h2>
                                <div className="d-d-list">
                                    {
                                        fullData[items]?.map((item, id) => {
                                            return <div className="d-d-item" key={`${idx}-${id}`}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, items, item, id)}
                                                onDragEnd={handleDragEnd}
                                           >
                                                {item}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
            </div>
            
        </div>
    )
}

export default DragDrop