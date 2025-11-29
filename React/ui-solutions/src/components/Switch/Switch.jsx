import React from 'react'
import './style.css'

const Switch = ({isOpen, onToggle}) => {
    return (
        <div>
            <h1>
                Switch
            </h1>
            <div className="switch">
                <label>
                    <input type="checkbox" checked={isOpen} onChange={onToggle}/>
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    )
}

export default Switch