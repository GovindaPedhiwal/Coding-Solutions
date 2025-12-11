import React from 'react'
import DragDrop from './DragDrop'

const DragDropWrapper = () => {
    const data = {
        'TODO': [
            'this is the',
            'first of the'
        ],
        'PENDING': [
            'llll',
            'bbbbb'
        ],
        'DONE': [
            'world to the'
        ]
    }
    return (
        <div>
            <DragDrop data={data} />
        </div>
    )
}

export default DragDropWrapper