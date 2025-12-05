import React, { useEffect, useRef, useState } from 'react'
import './style.css'

const TypingEffect = ({text, delay}) => {
    const [message, setMessage] = useState();
    const velocityRef = useRef({speed: true, endIndex: 0});

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(velocityRef.current.endIndex == text?.length) {
                velocityRef.current.speed = -1;
            } else if(velocityRef.current.endIndex == 0) {
                velocityRef.current.speed = 1;
            }
            velocityRef.current.endIndex+= velocityRef.current.speed;
            setMessage(text.slice(0, velocityRef.current.endIndex));
        }, delay);

        return () => {
            clearInterval(intervalId);
        }
    }, [text, delay]);
    return (
        <div className='typing-effect'>
            {message}
        </div>
    )
}

export default TypingEffect