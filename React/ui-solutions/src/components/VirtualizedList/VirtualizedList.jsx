import React, { useState } from 'react'
import './style.css'

const VirtualizedList = ({list, height, width, rowHeight}) => {
    const [positionsIdx, setPositionsIdx] = useState([0, Math.floor(height / rowHeight)]);
    const items = list?.slice(positionsIdx[0], positionsIdx[1] + 1);
    const handleScroll = (e) => {
      const {scrollTop} = e.target;
      const startIdx = Math.floor(scrollTop / rowHeight);
      const endIdx = startIdx + Math.floor(height / rowHeight);
      setPositionsIdx([startIdx, endIdx]);
    }
    return (
      <div>
          <h1>
            VirtualizedList
          </h1>
          <div className="virtualized-container" onScroll={handleScroll} style={{
            height: height,
            width: width
          }}>
            <div className="v-list" style={{
              height: list?.length * rowHeight,
              transform: `translateY(${positionsIdx[0] * rowHeight}px)`
              // top: positionsIdx[0] * rowHeight
            }}>
              {
                items?.map((value, idx) => {
                  return <div className="v-item" key={idx} style={{
                    height: rowHeight,
                  }}>
                    {value}
                  </div>
                })
              }
            </div>
          </div>
          
      </div>
    )
}

export default VirtualizedList