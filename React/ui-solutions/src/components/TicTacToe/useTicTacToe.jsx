import { useState } from "react";

const createBoard = (boardSize) => {
    const board = Array.from({length: boardSize}, () => [...new Array(boardSize).fill('')])
    return board;
}
const PLAYER = {
    ONE: '1',
    TWO: '2'
}
const PLAYER_ICONS = {
    [PLAYER.ONE]: 'X',
    [PLAYER.TWO]: 'O'
}
const getWinningPossibilities = (boardSize) => {
    let winningPossiblities = [];
    let diagonalData = [[], []]
    for(let i = 0;i < boardSize; i++) {
        const possibility = [[],[]]
        for(let j = 0;j < boardSize; j++) {
            possibility[0].push({rowIdx: i,colIdx: j})
            possibility[1].push({rowIdx: j,colIdx: i})
            if(i == j) {
                diagonalData[0].push({rowIdx: i, colIdx: j});
            }
            if(i == ((boardSize - j) - 1)) {
                diagonalData[1].push({rowIdx: i, colIdx: j});
            }
        }
        winningPossiblities.push(...possibility)
    }
    winningPossiblities.push(...diagonalData)
    return winningPossiblities;
}

export const useTicTacToe = (boardSize) => {
    const [board, setBoard] = useState(() => createBoard(boardSize));
        const [currentPlayer, setCurrentPlayer] = useState(PLAYER.ONE);
        const [message, setMessage] = useState('');
        const winningPossibilities = getWinningPossibilities(boardSize);
        const handleClick = (rowIdx, colIdx) => {
            if(board[rowIdx][colIdx]) return;
            const value = PLAYER_ICONS[currentPlayer];
            const updatedBoard = structuredClone(board);
            updatedBoard[rowIdx][colIdx] = value;
            if(checkResult(updatedBoard, currentPlayer)) {
                setMessage(`Player ${currentPlayer} Won!`)
                return;
            }
            setBoard(updatedBoard);
            setCurrentPlayer(prevPlayer => prevPlayer === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE)
        }
        const checkResult = (board, currentPlayer) => {
            let result = winningPossibilities?.some((possibility) => {
                return possibility?.every((cellInfo) => {
                    let {rowIdx, colIdx} = cellInfo;
                    if(board[rowIdx][colIdx] === PLAYER_ICONS[currentPlayer]) return true;
                    return false;
                })
            })
            return result;
        }
        const resetGame = () => {
            return () => {
                setBoard(createBoard(boardSize));
                setMessage('');
            }
        }
        return {
            board,
            resetGame,
            handleClick,
            message
        }
}