import React from 'react'
import { TYPE } from '../constant'
import './style.css'
import { createPortal } from 'react-dom'

const MESSAGE_TYPE_CLASS = {
    [TYPE.SUCCESS]: 'success',
    [TYPE.WARNING]: 'warning',
    [TYPE.ERROR]: 'error',
}

const Notification = ({toasts}) => {
    
    const content =  (
        <div className='notifications'>
            <div className="notifications-container">
                {
                    toasts?.map((toast, idx) => {
                        return <div className={`n-list ${MESSAGE_TYPE_CLASS[toast?.type]}`} key={idx}>
                            {toast?.message}
                        </div>
                    })
                }
            </div>
        </div>
    )
    return createPortal(content, document.getElementsByTagName('body')[0])
}

export default Notification