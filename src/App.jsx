import React, { useState } from 'react';
import styles from './App.module.css';
import GameLobby from './components/GameLobby';
import MinesGame from './components/MinesGame'; 
import PachinkoGame from './components/PachinkoGame';

const CrewmateIcon = () => (
    <svg className={styles.crewmateIcon} viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M105 210C162.99 210 210 162.99 210 105C210 47.01 162.99 0 105 0C47.01 0 0 47.01 0 105C0 162.99 47.01 210 105 210Z" fill="#F56565" />
        <path d="M60 75H150C161.046 75 170 83.9543 170 95V135C170 146.046 161.046 155 150 155H60C48.9543 155 40 146.046 40 135V95C40 83.9543 48.9543 75 60 75Z" fill="#2D3748" />
    </svg>
);

// Score display component
const ScoreDisplay = ({ score }) => (
  <div className={styles.scoreContainer}>
    <h3 className={styles.scoreTitle}>Total Score</h3>
    <p className={styles.scoreValue}>{score}</p>
  </div>
);

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0); // This state was missing

  const renderContent = () => {
    if (activeGame === 'mines') {
      return <MinesGame onBackToLobby={() => setActiveGame(null)} />;
    }
    if (activeGame === 'pachinko') {
      // Pass the setScore function to the Pachinko game
      return <PachinkoGame onBackToLobby={() => setActiveGame(null)} setScore={setScore} />;
    }
    return <GameLobby onSelectGame={setActiveGame} />;
  };
  
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <CrewmateIcon />
          <span className={styles.logoText}>Sus Arcade</span>
        </div>
        <div>
          <button className={styles.loginButton}>Login</button>
        </div>
      </header>
      <main className={styles.mainContent}>
        {/* Conditionally render the score display only for Pachinko */}
        {activeGame === 'pachinko' && <ScoreDisplay score={score} />}
        {renderContent()}
      </main>
    </div>
  );
}