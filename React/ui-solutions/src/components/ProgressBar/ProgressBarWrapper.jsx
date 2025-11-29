import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'

const ProgressBarWrapper = () => {
    const [value, setValue] = useState(0);
    const MAX = 100;
    useEffect(() => {
        let intervalId;
        if(value >= MAX) return;
        intervalId = setInterval(() => {
            setValue(prev => {
                if(prev > MAX) {
                    clearInterval(intervalId);
                    return prev;
                }
                return prev + 25
            });
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    return (
        <div>
            <ProgressBar value={value} max={MAX}/>
        </div>
    )
}

export default ProgressBarWrapper
