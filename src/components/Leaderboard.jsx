import React from 'react';
import styles from './Leaderboard.module.css';

// Dummy data for the leaderboard
const dummyData = [
  { rank: 1, name: 'PlayerOne', score: 1500 },
  { rank: 2, name: 'PlayerTwo', score: 1250 },
  { rank: 3, name: 'PlayerThree', score: 1100 },
  { rank: 4, name: 'PlayerFour', score: 950 },
  { rank: 5, name: 'PlayerFive', score: 800 },
];

const Leaderboard = ({ onBack }) => {
  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.title}>Leaderboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Rank</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Score</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((player) => (
            <tr key={player.rank}>
              <td className={styles.td}>{player.rank}</td>
              <td className={styles.td}>{player.name}</td>
              <td className={styles.td}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack} className={styles.backButton}>
        Back to Lobby
      </button>
    </div>
  );
};

export default Leaderboard;