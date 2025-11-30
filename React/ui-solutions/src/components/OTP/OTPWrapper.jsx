import React from 'react'
import OTP from './OTP'

const OTPWrapper = () => {
    const onInputChange = (value) => {
        console.log(value)
    }
    return (
        <div>
            <OTP size={6} onChange={onInputChange} />
        </div>
    )
}

export default OTPWrapper