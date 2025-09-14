import React, { useState, useEffect, useRef, useMemo } from 'react'; // Add useMemo here
import Matter from 'matter-js';
import styles from './PachinkoGame.module.css';

const layoutConfigs = {
    6: { verticalGap: 60, horizontalGap: 72 },
    7: { verticalGap: 60, horizontalGap: 63 },
    8: { verticalGap: 60, horizontalGap: 56 },
};

const PachinkoGame = ({ onBackToLobby, setScore }) => { 
    const [gameStatus, setGameStatus] = useState('settings');
    const [pegRows, setPegRows] = useState(8);
    const [ballCount, setBallCount] = useState(10);
    const [lastHit, setLastHit] = useState(null);
    
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const runnerRef = useRef(Matter.Runner.create());

    const { verticalGap, horizontalGap } = layoutConfigs[pegRows];
    const pyramidTopOffset = 60;
    const boardBottomPadding = 50;
    const boardHeight = pyramidTopOffset + ((pegRows - 1) * verticalGap) + boardBottomPadding;

    const multipliers = useMemo(() => Array.from({ length: pegRows + 1 }).map((_, i) => {
        const middle = Math.floor((pegRows + 1) / 2);
        return Math.max(1, Math.abs(i - middle)) * 2;
    }), [pegRows]); 

    useEffect(() => {
        if (gameStatus !== 'playing' || !sceneRef.current || sceneRef.current.clientWidth === 0) return;

        const engine = engineRef.current;
        const world = engine.world;
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: { width: sceneRef.current.clientWidth, height: boardHeight, wireframes: false, background: 'transparent' },
        });

        Matter.World.clear(world);
        Matter.Engine.clear(engine);

        const boardWidth = sceneRef.current.clientWidth;

        const pegs = [];
        for (let i = 0; i < pegRows; i++) {
            const numPegs = i + 1;
            const rowWidth = (numPegs - 1) * horizontalGap;
            const startX = (boardWidth / 2) - (rowWidth / 2);
            for (let j = 0; j < numPegs; j++) {
                const x = startX + j * horizontalGap;
                const y = pyramidTopOffset + i * verticalGap;
                pegs.push(Matter.Bodies.circle(x, y, 6, { isStatic: true, restitution: 0.5, friction: 0.1, render: { fillStyle: '#9CA3AF' } }));
            }
        }
        Matter.World.add(world, pegs);
        
        const binWidth = boardWidth / multipliers.length;
        const multiplierBodies = multipliers.map((value, i) => {
            const x = binWidth * i + binWidth / 2;
            const y = boardHeight - 20;
            return Matter.Bodies.rectangle(x, y, binWidth, 40, {
                isStatic: true,
                isSensor: true,
                render: { visible: false },
                label: `multiplier-${i}-${value}`,
            });
        });
        Matter.World.add(world, multiplierBodies);

        const dividerWalls = [];
        for (let i = 0; i < multipliers.length - 1; i++) {
            const x = binWidth * (i + 1); // Positioned at the edge of each bin
            const y = boardHeight - 20;
            const wall = Matter.Bodies.rectangle(x, y, 2, 40, { // 2px wide walls
                isStatic: true,
                render: { visible: false }, // Invisible
            });
            dividerWalls.push(wall);
        }
        Matter.World.add(world, dividerWalls);

        const collisionCallback = (event) => {
            event.pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;
                let ball, multiplier;
                if (bodyA.label === 'ball' && bodyB.label.startsWith('multiplier')) {
                    ball = bodyA; multiplier = bodyB;
                } else if (bodyB.label === 'ball' && bodyA.label.startsWith('multiplier')) {
                    ball = bodyB; multiplier = bodyA;
                }

                if (ball && multiplier && !ball.isRemoving) {
 
                    ball.isRemoving = true;

                    const [, index, value] = multiplier.label.split('-');
                    setScore(currentScore => currentScore + parseInt(value, 10));
                    setLastHit(parseInt(index, 10));
                    setTimeout(() => setLastHit(null), 200);

                    setTimeout(() => {
                        Matter.World.remove(world, ball);
                    }, 300); // 300ms delay
                }
            });
        };
        Matter.Events.on(engine, 'collisionStart', collisionCallback);

        const wallOptions = { isStatic: true, render: { visible: false } };
        Matter.World.add(world, [
            Matter.Bodies.rectangle(boardWidth / 2, -10, boardWidth, 20, wallOptions),
            Matter.Bodies.rectangle(-10, boardHeight / 2, 20, boardHeight, wallOptions),
            Matter.Bodies.rectangle(boardWidth + 10, boardHeight / 2, 20, boardHeight, wallOptions),
        ]);
        
        Matter.Render.run(render);
        Matter.Runner.run(runnerRef.current, engine);

        return () => {
            Matter.Events.off(engine, 'collisionStart', collisionCallback);
            Matter.Render.stop(render);
            Matter.Runner.stop(runnerRef.current);
            if (render.canvas) render.canvas.remove();
            render.textures = {};
        };
    }, [gameStatus, pegRows, horizontalGap, verticalGap, boardHeight, multipliers, setScore]);


    const handleDropBall = () => {
        if (ballCount <= 0 || !sceneRef.current) return;
        const engine = engineRef.current;
        const boardWidth = sceneRef.current.clientWidth;
        const randomOffset = (Math.random() - 0.5) * 10;
        const ball = Matter.Bodies.circle(boardWidth / 2 + randomOffset, 20, 12.5, {
            restitution: 0.8,
            friction: 0.05,
            label: 'ball',
            render: { fillStyle: '#F87171' },
        });
        Matter.World.add(engine.world, ball);
        setBallCount(count => count - 1);
    };

    if (gameStatus === 'settings') {
        return (
            <div className={styles.pachinkoContainer}>
                <div className={styles.header}><h2 className={styles.title}>Game Settings</h2></div>
                <div className={styles.settings}>
                    <div className={styles.settingControl}>
                        <label>Peg Rows (6-10)</label>
                        <div className={styles.numberInput}>
                            <button className={styles.inputButton} onClick={() => setPegRows(r => Math.max(6, r - 1))}>-</button>
                            <span className={styles.inputValue}>{pegRows}</span>
                            <button className={styles.inputButton} onClick={() => setPegRows(r => Math.min(8, r + 1))}>+</button>
                        </div>
                    </div>
                    <div className={styles.settingControl}>
                        <label>Ball Count</label>
                        <div className={styles.numberInput}>
                            <button className={styles.inputButton} onClick={() => setBallCount(c => Math.max(1, c - 1))}>-</button>
                            <span className={styles.inputValue}>{ballCount}</span>
                            <button className={styles.inputButton} onClick={() => setBallCount(c => Math.min(50, c + 1))}>+</button>
                        </div>
                    </div>
                </div>
                <div className={styles.controls}>
                    <button className={`${styles.button} ${styles.buttonBack}`} onClick={onBackToLobby}>Lobby</button>
                    <button className={styles.button} onClick={() => { setScore(0); setGameStatus('playing'); }}>Start Game</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pachinkoContainer}>
            <div className={styles.header}><h2 className={styles.title}>Calibrate Injector</h2></div>
            <div className={styles.board} style={{ height: `${boardHeight}px` }}>
                <div ref={sceneRef} className={styles.renderCanvas} />
            </div>
            <div className={styles.multiplierRow}>
                {multipliers.map((value, i) => (
                    <div 
                      key={`mul-${i}`} 
                      className={`${styles.multiplierBin} ${lastHit === i ? styles.multiplierBinHit : ''}`}
                    >
                      x{value}
                    </div>
                ))}
            </div>
            <div className={styles.controls}>
                <button className={`${styles.button} ${styles.buttonBack}`} onClick={() => setGameStatus('settings')}>Settings</button>
                <button className={styles.button} onClick={handleDropBall}>Drop Ball ({ballCount})</button>
            </div>
        </div>
    );
};

export default PachinkoGame;