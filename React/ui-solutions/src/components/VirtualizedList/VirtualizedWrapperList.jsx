import React from 'react'
import VirtualizedList from './VirtualizedList'

const VirtualizedListWrapper = () => {
    const list = Array.from({length: 10000}, (_, idx) => idx + 1);
    return (
        <div>
            <VirtualizedList list={list} height={400} width={300} rowHeight={35} />
        </div>
    )
}

export default VirtualizedListWrapper