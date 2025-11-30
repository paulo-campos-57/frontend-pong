import React from 'react';
import Footer from '../components/Footer';
import GameLobby from '../components/GameLobby';
import './style/Index.css';

export default function Index({ setPlayerRole, setGameId }) { 
    return (
        <>
            <div className="container">
                <h1>Bem vindo ao Pong!</h1>
                <GameLobby
                    setPlayerRole={setPlayerRole}
                    setGameId={setGameId} 
                />
                <Footer />
            </div>
        </>
    );
}