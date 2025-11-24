import React, { useState } from 'react'
import './style.css'

const Accordion = ({accordions}) => {
    const [selectedAccordions, setSelectedAccordions] = useState(null);

    const handleClick = (actionName, idx) => {
        return () => {
            if(actionName === 'OPEN')
                setSelectedAccordions(idx);
            else
                setSelectedAccordions(null);
        }
    }

    return (
        <div>
            <h1>
            Accordion
            </h1>
            <div className="wrapper">
                <div className="accordion-lists">
                    {
                        accordions?.map((accordion, idx) => {
                            let Component = accordion?.component;
                            return <div className="lists-item" key={idx}>
                                <div className="header">
                                    <div className="label">{accordion?.label}</div>
                                    {
                                        selectedAccordions !== idx && <button className="open-icon" onClick={handleClick('OPEN', idx)}>+</button>
                                    }
                                    {
                                        selectedAccordions === idx && <button className="close-icon" onClick={handleClick('CLOSE', idx)}>-</button>
                                    }
                                </div>
                                {
                                    <div className={`content ${selectedAccordions === idx ? 'open' : ''}`}>
                                    {<Component />}
                                </div>
                                }
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Accordion