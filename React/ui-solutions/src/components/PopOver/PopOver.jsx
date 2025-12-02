import React, { createContext, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './style.css'

const PopOverContext = createContext();

const usePopOverContext = () => {
    const {isOpen, handleToggle, triggerRef, contentRef} = useContext(PopOverContext);
    return {
        isOpen,handleToggle, triggerRef, contentRef
    }
}

const PopOver = ({triggerRef, contentRef, className = '', children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const checkOutsideClick = (e) => {
        const refs = [triggerRef, contentRef];
        for(let ref of refs) {
            if(ref.current == e.target) return;
        }
        setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', checkOutsideClick);
        return () => {
            document.removeEventListener('mousedown', checkOutsideClick);
        }
    }, [triggerRef, contentRef]);

    const handleToggle = () => {
        setIsOpen(!isOpen)
        setTimeout(() => {
            if(!triggerRef.current || !contentRef.current) return;
            const rect = triggerRef.current.getBoundingClientRect();
            contentRef.current.style.top = `${rect.bottom + 8}px`
            contentRef.current.style.left = `${rect.left}px`
        }, 0);
    }

    return (
        <PopOverContext.Provider value={{isOpen, handleToggle, triggerRef, contentRef}}>
            <div className={`popover ${className}`}>
                {children}
            </div>
        </PopOverContext.Provider>
    )
}

export const PopOverAction = ({children}) => {
    const {handleToggle} = usePopOverContext();
    return <div className="action" onClick={handleToggle}>
                {children}
            </div>
}

export const PopOverContent = ({children}) => {
    const {isOpen, contentRef} = usePopOverContext();
    if(isOpen)
        return createPortal(<div className="popover-content" ref={contentRef}>
            {children}
        </div>, document.body)
}

export default PopOver