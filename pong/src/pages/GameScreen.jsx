import React, { useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocketContext } from '../contexts/SocketContext';

import GameCanvas from '../components/GameCanvas';
import Scoreboard from '../components/Scoreboard';
import EventLog from '../components/EventLog';
import NeonButton from '../components/NeonButton';

import './style/GameStyle.css';

export default function GameScreen({ playerRole }) {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { gameState, log, isConnecting, emitEvent } = useSocketContext();

    const localPlayer = playerRole === 'player1' ? 'p1' : 'p2';

    const handleInput = useCallback(
        (event, isKeyDown) => {
            if (!gameState || !gameState.is_running) return;

            let direction = null;

            if (localPlayer === 'p1') {
                if (event.key.toLowerCase() === 'w') direction = 'up';
                if (event.key.toLowerCase() === 's') direction = 'down';
            } else {
                if (event.key === 'ArrowUp') direction = 'up';
                if (event.key === 'ArrowDown') direction = 'down';
            }

            if (direction) {
                emitEvent('move_paddle', {
                    gameId,
                    direction: isKeyDown ? direction : 'stop'
                });
            }
        },
        [gameState, localPlayer, emitEvent, gameId]
    );

    useEffect(() => {
        const down = e => handleInput(e, true);
        const up = e => handleInput(e, false);

        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);

        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, [handleInput]);

    if (isConnecting) return <div className="game-container">Conectando...</div>;
    if (!gameState) return <div className="game-container">Carregando...</div>;

    return (
        <div className="game-wrapper">
            <div className="game-card">
                <GameCanvas gameState={gameState} />

                <div className="side-panel">
                    <Scoreboard gameState={gameState} playerRole={playerRole} />
                    <EventLog log={log} />

                    <NeonButton onClick={() => navigate('/')}>
                        Voltar ao Menu
                    </NeonButton>
                </div>
            </div>
        </div>
    );
};
