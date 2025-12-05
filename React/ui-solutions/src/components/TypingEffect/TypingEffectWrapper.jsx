import React from 'react'
import TypingEffect from './TypingEffect'

const TypingEffectWrapper = () => {
    return (
        <div>
             <h1>
                TypingEffect
            </h1>
            <TypingEffect text={'This is the first'} delay={100} />
        </div>
    )
}

export default TypingEffectWrapper