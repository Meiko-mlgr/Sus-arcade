import React, { useState, useEffect } from 'react';
import styles from './MinesGame.module.css';
import { ImpostorIcon } from './game-icons.jsx';

const createGrid = (size, mineCount) => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({ isMine: false, isRevealed: false, adjacentMines: 0 })));
    
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (!grid[row][col].isMine) {
            grid[row][col].isMine = true;
            minesPlaced++;
        }
    }
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c].isMine) continue;
            let count = 0;
            for (let i = -1; i <= 1; i++) { for (let j = -1; j <= 1; j++) { const newR = r + i; const newC = c + j; if (newR >= 0 && newR < size && newC >= 0 && newC < size && grid[newR][newC].isMine) { count++; } } }
            grid[r][c].adjacentMines = count;
        }
    }
    return grid;
};

const MinesGame = ({ onBackToLobby }) => {
    const [gameStatus, setGameStatus] = useState('settings');
    const [gridSize, setGridSize] = useState(8);
    const [mineCount, setMineCount] = useState(10);
    const [grid, setGrid] = useState(() => createGrid(gridSize, mineCount));

    useEffect(() => {
        const maxMines = gridSize * gridSize - 1;
        if (mineCount > maxMines) {
            setMineCount(maxMines);
        }
    }, [gridSize, mineCount]);

    const startGame = () => {
        if (mineCount >= gridSize * gridSize) {
            alert("Mine count must be less than the total number of cells.");
            return;
        }
        setGrid(createGrid(gridSize, mineCount));
        setGameStatus('playing');
    };

    const handleCellClick = (row, col) => {
        if (gameStatus !== 'playing' || (grid && grid[row][col].isRevealed)) { return; }
        const newGrid = grid.map(r => r.map(cell => ({ ...cell })));
        newGrid[row][col].isRevealed = true;
        if (newGrid[row][col].isMine) {
            setGameStatus('lost');
            newGrid.forEach(r => r.forEach(cell => { if (cell.isMine) cell.isRevealed = true; }));
        } else {
            const nonMineCells = (gridSize * gridSize) - mineCount;
            const revealedSafeCells = newGrid.flat().filter(cell => cell.isRevealed && !cell.isMine).length;
            if (revealedSafeCells === nonMineCells) {
                setGameStatus('won');
            }
        }
        setGrid(newGrid);
    };

    if (gameStatus === 'settings') {
        return (
            <div className={styles.gameContainer}>
                 <div className={styles.header}>
                    <h2 className={styles.title}>Game Settings</h2>
                </div>
                <div className={styles.settings}>
                    <div className={styles.settingControl}>
                        <label>Grid Size</label>
                        <div className={styles.numberInput}>
                            <button className={styles.inputButton} onClick={() => setGridSize(s => Math.max(2, s - 1))}>-</button>
                            <span className={styles.inputValue}>{gridSize}</span>
                            <button className={styles.inputButton} onClick={() => setGridSize(s => Math.min(5, s + 1))}>+</button>
                        </div>
                    </div>
                    <div className={styles.settingControl}>
                        <label>Mine Count</label>
                        <div className={styles.numberInput}>
                            <button className={styles.inputButton} onClick={() => setMineCount(c => Math.max(1, c - 1))}>-</button>
                            <span className={styles.inputValue}>{mineCount}</span>
                            <button className={styles.inputButton} onClick={() => setMineCount(c => Math.min(gridSize * gridSize - 1, c + 1))}>+</button>
                        </div>
                    </div>
                </div>
                 <div className={styles.controls}>
                    <button className={`${styles.button} ${styles.buttonBack}`} onClick={onBackToLobby}>Lobby</button>
                    <button className={styles.button} onClick={startGame}>Start Game</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.gameContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Clear Asteroids</h2>
                <p className={`${styles.statusMessage} ${ gameStatus === 'won' ? styles.statusWon : gameStatus === 'lost' ? styles.statusLost : styles.statusPlaying }`}>
                    {gameStatus === 'won' && 'Task Complete!'}
                    {gameStatus === 'lost' && 'EJECTED!'}
                    {gameStatus === 'playing' && 'Find all the impostors...'}
                </p>
            </div>
            <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {grid.map((row, rIdx) => 
                    row.map((cell, cIdx) => (
                        <div key={`${rIdx}-${cIdx}`} className={`${styles.cell} ${cell.isRevealed ? styles.cellRevealed : styles.cellHidden} ${cell.isRevealed && cell.isMine ? styles.cellMine : ''}`} onClick={() => handleCellClick(rIdx, cIdx)}>
                            {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && cell.adjacentMines}
                            {cell.isRevealed && cell.isMine && <ImpostorIcon />}
                        </div>
                    ))
                )}
            </div>
            <div className={styles.controls}>
                <button className={`${styles.button} ${styles.buttonBack}`} onClick={() => setGameStatus('settings')}>Settings</button>
                <button className={styles.button} onClick={startGame}>Restart</button>
            </div>
        </div>
    );
};

export default MinesGame;