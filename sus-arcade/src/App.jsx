import React, { useState } from 'react';
import styles from './App.module.css';
import GameLobby from './components/GameLobby';

const CrewmateIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M105 210C162.99 210 210 162.99 210 105C210 47.01 162.99 0 105 0C47.01 0 0 47.01 0 105C0 162.99 47.01 210 105 210Z" fill="#F56565" />
        <path d="M60 75H150C161.046 75 170 83.9543 170 95V135C170 146.046 161.046 155 150 155H60C48.9543 155 40 146.046 40 135V95C40 83.9543 48.9543 75 60 75Z" fill="#2D3748" />
    </svg>
);

export default function App() {
  const [activeGame, setActiveGame] = useState(null);

  const renderContent = () => {
    if (activeGame === 'mines') {
      return <div>Mines Game Loaded!</div>;
    }
    if (activeGame === 'plinko') {
      return <div>Plinko Game Loaded!</div>;
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
        {renderContent()}
      </main>
    </div>
  );
}