import React, { useState, useEffect } from 'react'; 
import styles from './App.module.css';
import GameLobby from './components/GameLobby';
import MinesGame from './components/MinesGame';
import PachinkoGame from './components/PachinkoGame';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';

const CrewmateIcon = () => (
    <svg className={styles.crewmateIcon} viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M105 210C162.99 210 210 162.99 210 105C210 47.01 162.99 0 105 0C47.01 0 0 47.01 0 105C0 162.99 47.01 210 105 210Z" fill="#F56565" />
        <path d="M60 75H150C161.046 75 170 83.9543 170 95V135C170 146.046 161.046 155 150 155H60C48.9543 155 40 146.046 40 135V95C40 83.9543 48.9543 75 60 75Z" fill="#2D3748" />
    </svg>
);


const ScoreDisplay = ({ score, isAnimated }) => (
  <div className={styles.scoreContainer}>
    <h3 className={styles.scoreTitle}>Total Score</h3>
    {/* Add the animation class when isAnimated is true */}
    <p className={`${styles.scoreValue} ${isAnimated ? styles.scoreAnimate : ''}`}>{score}</p>
  </div>
);


export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreIsAnimated, setScoreIsAnimated] = useState(false); // State for animation


  useEffect(() => {
    if (score > 0) {
      setScoreIsAnimated(true);
      const timer = setTimeout(() => setScoreIsAnimated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [score]);


  const handleLogin = (username) => {
    setCurrentUser(username);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderContent = () => {
    if (showLogin) {
      return <Login onLogin={handleLogin} onBack={() => setShowLogin(false)} />;
    }
    if (showLeaderboard) {
      return <Leaderboard onBack={() => setShowLeaderboard(false)} />;
    }
    if (activeGame === 'mines') {
      return <MinesGame onBackToLobby={() => setActiveGame(null)} />;
    }
    if (activeGame === 'pachinko') {
      return <PachinkoGame onBackToLobby={() => setActiveGame(null)} setScore={setScore} />;
    }
    return <GameLobby onSelectGame={setActiveGame} onShowLeaderboard={() => setShowLeaderboard(true)} />;
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <CrewmateIcon />
          <span className={styles.logoText}>Sus Arcade</span>
        </div>
        <div>
          {currentUser ? (
            <div className={styles.userInfo}>
              <span>{currentUser}</span>
              <button onClick={handleLogout} className={styles.loginButton}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className={styles.loginButton}>Login</button>
          )}
        </div>
      </header>
      <main className={styles.mainContent}>
        {activeGame === 'pachinko' && !showLogin && !showLeaderboard && (
          <ScoreDisplay score={score} isAnimated={scoreIsAnimated} />
        )}
        {renderContent()}
      </main>
    </div>
  );
}