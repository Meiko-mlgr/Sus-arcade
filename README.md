[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-netlify-app-name.netlify.app)
# Sus Arcade 
A mini-game arcade inspired by Indie game "Among Us," built with a modern React frontend. This project is a portfolio piece showcasing component-based architecture and clean, scalable code.

<a href="https://freeimage.host/i/KuWhMdu"><img src="https://iili.io/KuWhMdu.md.png" alt="KuWhMdu.md.png" border="0"></a>
<a href="https://freeimage.host/i/KuWlb72"><img src="https://iili.io/KuWlb72.md.png" alt="KuWlb72.md.png" border="0"></a>


## About The Project
"Sus Arcade" is a web application that hosts a collection of simple, fun mini-games with an "Among Us" theme elements. The project's clean and minimalist UI is inspired by modern puzzle games and interactive web applications, focusing on a clear and intuitive user experience.

The primary goal is to build a scalable frontend that can easily accommodate new games in the future, while demonstrating best practices in React development.

## Tech Stack
- **Framework:** [ReactJS](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Physics:** [Matter.js](https://brm.io/matter-js/) for 2D physics simulation.
- **Styling:** [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) with [CSS Modules](https://github.com/css-modules/css-modules)

- **Version Control:** [Git](https://git-scm.com/) & [GitHub](https://github.com/)

## Current Features
As of the latest commit, the following features are implemented:

**Responsive App Layout:** A clean, dark-themed layout that works on desktop and mobile.

**Game Lobby:** A functional main menu where users can see and select from the available games.

**Component-Based Structure:** The application is broken down into reusable components (App, GameLobby, MineGames).

**Minesweeper Game (Clear Asteroids):** 
- A fully playable client-side Minesweeper game with win/loss conditions and a restart feature.
- A polished settings screen with custom UI controls.
- Adjustable grid size and mine count.

**Pachinko (Calibrate Injector):**
- A fully playable Pachinko game with an interactive pyramid layout.
- Real-time physics for ball drops and bouncing, powered by Matter.js.
- A dynamic scoring system based on where the ball lands.
- Adjustable peg rows and ball count.

User Interface:
  - A UI flow for a user login screen.
  - A leaderboard display screen with placeholder data.

# Future Features (Roadmap)
The following features are planned for development:

**Backend Integration:** Connect the frontend to a Node.js backend to manage game state and leaderboards.
- **User Authentication:** Allow users to create accounts and log in.
- **Leaderboards:** Save and retrieve high scores for each game.
# Getting Started
To Locally host the app.

**Prerequisites**
Node.js (v18 or higher recommended)
npm (comes with Node.js)

1. Clone the repository
```
git clone https://github.com/Meiko-mlgr/Sus-arcade
```
2. Navigate to the project directory
```
cd sus-arcade
```
3. Install NPM packages
```
npm install
```
4. Run the development server
```
npm run dev
```
