import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketContext } from '../contexts/SocketContext';
import './style/GameLobby.css';

export default function GameLobby({ setPlayerRole, setGameId }) {
    const [openSection, setOpenSection] = useState(null);
    const [roomCode, setRoomCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [maxScore] = useState(5);

    const navigate = useNavigate();
    const { createGame, joinGame, isConnecting, connectionError, socket } = useSocketContext(); // USE createGame e joinGame!

    useEffect(() => {
        if (!socket) return;

        const handleGameCreated = (data) => {
            console.log('Sala criada:', data);
            setSuccess(`Sala ${data.gameId} criada! Aguardando jogador...`);
            setPlayerRole(data.playerRole);
            setGameId(data.gameId);

            setTimeout(() => {
                navigate(`/game/${data.gameId}`);
            }, 1000);
        };

        const handleGameJoined = (data) => {
            console.log('Entrou na sala:', data);
            setSuccess('Entrando no jogo...');
            setPlayerRole(data.playerRole);
            setGameId(data.gameId);

            setTimeout(() => {
                navigate(`/game/${data.gameId}`);
            }, 500);
        };

        const handleGameError = (message) => {
            setError(message);
            setSuccess('');
        };

        socket.on('game_created', handleGameCreated);
        socket.on('game_joined', handleGameJoined);
        socket.on('game_error', handleGameError);

        return () => {
            socket.off('game_created', handleGameCreated);
            socket.off('game_joined', handleGameJoined);
            socket.off('game_error', handleGameError);
        };
    }, [socket, setPlayerRole, setGameId, navigate]);

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
        setError('');
        setSuccess('');
    };

    const handleCreateRoom = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!playerName.trim()) {
            setError('Por favor, insira seu nome.');
            return;
        }

        createGame(playerName, maxScore);
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!playerName.trim()) {
            setError('Por favor, insira seu nome.');
            return;
        }

        if (!roomCode.trim()) {
            setError('Por favor, insira o código da sala.');
            return;
        }

        joinGame(playerName, roomCode.toUpperCase());
    };

    return (
        <div className="game-lobby-container">
            <h1 className="title">Lobby do Pong</h1>

            {isConnecting && (
                <div className="status-message connecting">
                    Conectando ao servidor...
                </div>
            )}

            {connectionError && (
                <div className="status-message error">
                    ❌ {connectionError}
                </div>
            )}

            {error && (
                <div className="status-message error">
                    ❌ {error}
                </div>
            )}

            {success && (
                <div className="status-message success">
                    ✅ {success}
                </div>
            )}

            {/* Criar sala */}
            <div className="accordion">
                <button
                    className={`accordion-header ${openSection === "create" ? "open" : ""}`}
                    onClick={() => toggleSection("create")}
                >
                    Criar Nova Sala
                    <span className={`arrow ${openSection === "create" ? "rotated" : ""}`}>▼</span>
                </button>

                <div className={`accordion-panel ${openSection === "create" ? "open" : ""}`}>
                    <form onSubmit={handleCreateRoom}>
                        <h3 className="section-title">Crie uma nova arena!</h3>

                        <input
                            type="text"
                            placeholder="Seu Nome"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="input-field"
                            required
                            disabled={isConnecting}
                        />

                        <button
                            type="submit"
                            className="action-button"
                            disabled={isConnecting}
                        >
                            {isConnecting ? 'Conectando...' : 'Iniciar Novo Jogo'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Entrar em sala */}
            <div className="accordion">
                <button
                    className={`accordion-header ${openSection === "join" ? "open" : ""}`}
                    onClick={() => toggleSection("join")}
                >
                    Entrar em Jogo Existente
                    <span className={`arrow ${openSection === "join" ? "rotated" : ""}`}>▼</span>
                </button>

                <div className={`accordion-panel ${openSection === "join" ? "open" : ""}`}>
                    <form onSubmit={handleJoinRoom}>
                        <h3 className="section-title-magenta">Entre em uma sala existente.</h3>

                        <input
                            type="text"
                            placeholder="Seu Nome"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="input-field"
                            required
                            disabled={isConnecting}
                        />

                        <input
                            type="text"
                            placeholder="Código da Sala (ex: G1)"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            className="input-field"
                            required
                            disabled={isConnecting}
                        />

                        <button
                            type="submit"
                            className="action-button"
                            disabled={isConnecting}
                        >
                            {isConnecting ? 'Conectando...' : 'Entrar na Sala'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}