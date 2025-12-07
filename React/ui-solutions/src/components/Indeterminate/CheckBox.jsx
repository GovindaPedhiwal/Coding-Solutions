import React, { useEffect, useRef } from 'react'
import { STATUS } from './data'

const CheckBox = ({label, status, id, onChange = () => {}}) => {
    const checkboxRef = useRef();
    useEffect(() => {
        if(status === STATUS.INDETERMINATE) {
            checkboxRef.current.indeterminate = true;
        } else {
            checkboxRef.current.indeterminate = false;
        }
    }, [status]);

    return (
        <div className='checkbox'>
            <input type="checkbox" ref={checkboxRef} onChange={() => onChange(id)} checked={status == STATUS.CHECKED} name="" id="" />
            {label}
        </div>
    )
}

export default CheckBox