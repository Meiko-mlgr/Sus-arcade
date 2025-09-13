import React from 'react';
import styles from './GameLobby.module.css';

const GameLobby = ({ onSelectGame }) => {
  return (
    <div className={styles.lobbyContainer}>
      <h1 className={styles.title}>Sus Arcade</h1>
      <p className={styles.subtitle}>Choose a task, Crewmate.</p>
      
      <div className={styles.cardGrid}>
        <div 
          className={`${styles.gameCard} ${styles.gameCardMines}`} 
          onClick={() => onSelectGame('mines')}
        >
          <h2 className={styles.cardTitle}>Mines</h2>
          <p className={styles.cardDescription}>Clear the asteroid field.</p>
        </div>
        
        <div 
          className={`${styles.gameCard} ${styles.gameCardPlinko}`}
          onClick={() => onSelectGame('plinko')}
        >
          <h2 className={styles.cardTitle}>Plinko</h2>
          <p className={styles.cardDescription}>Calibrate the fuel injector.</p>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;