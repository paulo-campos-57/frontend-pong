import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Index from './pages/Index';
import GameScreen from './pages/GameScreen';

export default function App() {
  const [playerRole, setPlayerRole] = useState(null);
  const [gameId, setGameId] = useState(null);

  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Index
                setPlayerRole={setPlayerRole}
                setGameId={setGameId}
              />
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <GameScreen
                playerRole={playerRole}
              />
            }
          />
        </Routes>
      </Router>
    </SocketProvider>
  );
}