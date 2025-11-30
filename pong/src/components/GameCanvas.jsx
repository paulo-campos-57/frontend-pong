import React, { useRef, useEffect } from 'react';

const drawGame = (ctx, state) => {
    if (!state || !state.canvas) return;

    const { canvas, ball, paddle1, paddle2 } = state;
    const { width, height } = canvas;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#222';
    ctx.fillRect(width / 2 - 2, 0, 4, height);

    ctx.fillStyle = '#00eaff';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = '#ff006e';
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
};

const GameCanvas = ({ gameState }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !gameState) return;

        const ctx = canvasRef.current.getContext('2d');
        drawGame(ctx, gameState);
    }, [gameState]);

    return (
        <canvas
            ref={canvasRef}
            width={gameState.canvas.width}
            height={gameState.canvas.height}
            className="game-canvas neon-border"
        />
    );
};

export default GameCanvas;
