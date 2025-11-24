import React, { useState } from 'react'
import MemoryGame from './MemoryGame'

const MemoryGameWrapper = () => {
    const [startGame, setStartGame] = useState(false);
    return (
        <div>
            {
                !startGame &&
            <button onClick={() => setStartGame(true)}>Start Game</button>
            }
            {
                startGame && 
            <MemoryGame gridSize={2} />
            }
        </div>
    )
}

export default MemoryGameWrapper