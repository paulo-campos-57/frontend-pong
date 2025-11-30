const Scoreboard = ({ gameState, playerRole }) => {
    const { players, is_running, maxScore } = gameState;

    return (
        <div className="scoreboard neon-border">
            <div className={`score-item ${playerRole === 'player1' ? 'local-player' : ''}`}>
                <span>{players.p1.name} (W/S)</span>
                <span>{players.p1.score}</span>
            </div>

            <div className={`score-item ${playerRole === 'player2' ? 'local-player' : ''}`}>
                <span>{players.p2.name}</span>
                <span>{players.p2.score}</span>
            </div>

            <p className="status-text">
                {is_running ? 'Em Jogo' : 'Finalizado'} • Max: {maxScore}
            </p>
        </div>
    );
};

export default Scoreboard;
