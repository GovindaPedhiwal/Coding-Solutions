import React from 'react'
import { createPortal } from 'react-dom'
import './style.css'

const Modal = ({label = '', isOpen, onClose, className = '', children}) => {
    if(isOpen)
        return createPortal(<>
            <div className="overlay"></div>
            <div className={`modal ${className}`}>
                <div className="container">
                    <div className="modal-header">
                        <div className="label">
                                {label}
                        </div>
                        <div className="close-btn" onClick={onClose}>
                            X
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>, document.body)
}

export default Modal

export const ModalContext = ({children}) => {
    return <div className="modal-content">
        {children}
    </div>
}

export const ModalFooter = ({children}) => {
    return <div className="modal-footer">
        {children}
    </div>
}