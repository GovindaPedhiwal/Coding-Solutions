import React, { useEffect, useState } from 'react'
import './style.css'

const OverlappingCircle = () => {
    const [circlesList, setCirclesList] = useState([]);
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, []);

    const getRandomHexColor = () => {
        const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
        return color;
    }

    const handleDocumentClick = () => {
        let xCoordinate = event.clientX;
        let yCoordinate = event.clientY;
        let newCircle = {x: xCoordinate, y: yCoordinate};

        setCirclesList((prevCirclesList) => {
            const updatedCirclesList = [...prevCirclesList];
            const newColor = getRandomHexColor();
            updatedCirclesList?.forEach((c) => {
                const x1 = c.x;
                const y1 = c.y;

                const x2 = newCircle.x;
                const y2 = newCircle.y;
                const xDiff = x2 - x1;
                const yDiff = y2 - y1;

                const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
                const RADIUS_SUM = 200;
                console.log(distance)
                if(distance < RADIUS_SUM) {
                    c.color = newColor,
                    newCircle.color = newColor
                }
            })
            updatedCirclesList.push(newCircle)
            return updatedCirclesList;
        });
    }
    return (
        <div>
            <h1>
                OverlappingCircle
            </h1>
            <div className="circles-list">
                {
                    circlesList?.map((circle, idx) => {
                        return <Circle x={circle.x} y={circle.y} key={idx} color={circle.color}/>
                    })
                }
            </div>
        </div>
    )
}

const Circle = ({x, y, color}) => {
    return <div className="circle" style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color ?? 'red'
    }}>
    </div>
}

export default OverlappingCircle