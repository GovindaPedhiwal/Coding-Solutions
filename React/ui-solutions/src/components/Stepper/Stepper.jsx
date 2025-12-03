import React from 'react'
import './style.css'

const Stepper = ({list, selectedItemIdx}) => {
    return (
        <div className='stepper'>
            <div className="stepper-list">
                {
                    list?.map(({label}, idx) => {
                        return <div className="stepper-item" key={idx}>
                            <div className={`stepper-number ${idx <= selectedItemIdx ? 'active' : ''}`}>
                                {idx + 1}
                                {
                                    idx < list?.length - 1 && <div className={`stepper-line ${selectedItemIdx > idx ? 'active': ''}`}></div>
                                }
                            </div>
                            <div className="stepper-label">
                                {label}
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Stepper