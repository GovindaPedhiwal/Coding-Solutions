import React from 'react'
import './style.css'

const ProgressBar = ({value, max}) => {
    const percent = Math.min(100,(value / max) * 100);
    return (
        <div>
            <h1>
            ProgressBar
            </h1>
            <div className="progress-container">
                <div className="progress-bar">
                    <div className="progress-value">
                        {`${percent?.toFixed(2)}%`}
                    </div>
                    <div className="progress-fill" style={{
                        transform: `translateX(-${100 - percent}%)`
                    }}>
                    </div>
                    {/* <div className="progress-fill" style={{
                        width: `${percent}%`
                    }}>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default ProgressBar