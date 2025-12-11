import React from 'react'
import DragDrop from './DragDrop'

const DragDropWrapper = () => {
    const data = Array.from({length: 30}, (_, idx) => idx + 1);
    return (
        <div>
            <DragDrop list={data} />
        </div>
    )
}

export default DragDropWrapper