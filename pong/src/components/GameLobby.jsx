import React, { useState } from 'react';
import { io } from 'socket.io-client';
import './style/GameLobby.css';

export default function GameLobby() {
    const [openSection, setOpenSection] = useState(null);
    const [roomCode, setRoomCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    const SOCKET_SERVER_URL = "https://backend-pong.onrender.com";

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
    };

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if (!playerName) return;

        const socket = io(SOCKET_SERVER_URL);
        socket.emit('createRoom', playerName, (newRoomCode) => {
            console.log(`Sala criada: ${newRoomCode}`);
            socket.disconnect();
        });
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (!roomCode || !playerName) return;

        const socket = io(SOCKET_SERVER_URL);
        socket.emit('joinRoom', { roomCode, playerName }, (success) => {
            console.log(success ? "Entrou!" : "Falhou ao entrar.");
            socket.disconnect();
        });
    };

    return (
        <div className="game-lobby-container">
            <h1 className="title">Lobby do Pong</h1>

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
                        />

                        <button type="submit" className="action-button">
                            Iniciar Novo Jogo
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
                        />

                        <input
                            type="text"
                            placeholder="Código da Sala"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="input-field"
                            required
                        />

                        <button type="submit" className="action-button">
                            Entrar na Sala
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
