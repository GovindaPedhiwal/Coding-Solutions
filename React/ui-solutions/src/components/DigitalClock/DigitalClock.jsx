import React, { useEffect, useState } from 'react'
import './style.css'

const DigitalClock = () => {
    let date = new Date();
    const [_, setCount] = useState(0);

    useEffect(() => {
        let timeoutId;
        
        const tick = () => {
            setCount((prev) => prev + 1);
            const date = new Date();

            const delay = 1000 - (date % 1000);
            timeoutId = requestAnimationFrame(tick, delay);
        }

        timeoutId = requestAnimationFrame(tick, 1000 - (new Date() % 1000));

        return () => {
            clearInterval(timeoutId);
        }
    }, []);
    // useEffect(() => {
    //     let intervalId;
    //     intervalId = setInterval(() => {
    //         setCount((prev) => prev + 1);
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalId);
    //     }
    // }, []);

    const getFormattedTime = () => {
        let formattedDate = '';
        const date = new Date();
        const hh = date.getHours();
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        const value = String(hh <= 12 ? hh : hh - 12).padStart(2, '0');
        const type = hh <= 12 ? 'AM' : 'PM';
        formattedDate = `${value}:${mm}:${ss} ${type}`;

        return formattedDate;
    }

    return (
        <div>
            <h1>
                Digital Clock
            </h1>
            <div className="time">
                <div>
                    {date.toLocaleTimeString()}
                </div>
                <div>
                    {
                        getFormattedTime()
                    }
                </div>
            </div>
        </div>
    )
}

export default DigitalClock;