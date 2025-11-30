import React, { useRef, useState } from 'react'
import './style.css'

const OTP = ({size = 6, onChange = () => {}}) => {
    const [otps, setOtps] = useState(Array.from({length: size}, () => ''))
    const otpsRef = useRef([]);

    const handleKey = (idx) => {
        return (event) => {
             let value = event.key;
             const updatedOtps = [...otps];
             if(event.key === 'ArrowRight') {
                 if(otpsRef.current[idx + 1]) {
                     let emptyFieldIdx = [...otps].findIndex((element, index) => idx < index &&  element == '');
                     if(emptyFieldIdx !== -1) {
                         otpsRef.current[emptyFieldIdx].focus();
                     } else {
                         otpsRef.current[idx + 1].focus();
                     }
                }
                return;
            }
            if(event.key === 'ArrowLeft') {
                if(otpsRef.current[idx - 1]) {
                    let emptyFieldIdx = [...otps].findIndex((element, index) => idx > index && element == '');
                    if(emptyFieldIdx !== -1) {
                        otpsRef.current[emptyFieldIdx].focus();
                    } else {
                        otpsRef.current[idx - 1].focus();
                    }
                }
                return;
            }
            if(event.key === 'Backspace') {
                const updatedOtps = [...otps];
                updatedOtps[idx] = '';
                if(otpsRef.current[idx - 1]) {
                    otpsRef.current[idx - 1].focus();
                }
                 setOtps(updatedOtps);
                 onChange(updatedOtps);
                 return;
            }
            if(isNaN(value)) {
                return;
            }
            updatedOtps[idx] = value;
            if(otpsRef.current[idx + 1]) {
                otpsRef.current[idx + 1].focus();
            }
            setOtps(updatedOtps);
            onChange(updatedOtps)
        }
    }

    const caretPositionHandler = () => {
        return (event) => {
            event.target.setSelectionRange(1,1);
        }
    }

    const handlePaste = (idx) => {
        return (event) => {
            let pastedValue = event.clipboardData.getData('text');
            if(isNaN(pastedValue)) return;
            const updatedOtps = [...otps];
            let lastIndex;
            for(let i = 0;i < pastedValue?.length; i++) {
                if(idx + i < size) {
                    updatedOtps[idx + i] = pastedValue[i];
                    lastIndex = idx + i;
                } else {
                    break;
                }
            }
            setOtps(updatedOtps);
            onChange(updatedOtps);
            if(otpsRef.current[lastIndex + 1]) {
                otpsRef.current[lastIndex + 1].focus();
            } else {
                otpsRef.current[lastIndex].focus();
            }
        }
    }

    return (
        <div>
            <h1>
                OTP
            </h1>
            <div className="otps-wrapper">
                <div className="otps">
                    {
                        [...new Array(size)]?.map((_, index) => {
                            return <div className="otp-field" key={index}>
                                <input ref={(el) => otpsRef.current[index] = el} type="text" name="" id="" onClick={caretPositionHandler()} onKeyUp={handleKey(index)} onPaste={handlePaste(index)} value={otps[index] ?? ''} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OTP