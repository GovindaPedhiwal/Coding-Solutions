import React, { useState } from 'react'
import Switch from './Switch'

const SwitchWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <Switch isOpen={isOpen} onToggle={onToggle} />    
        </div>
    )
}

export default SwitchWrapper