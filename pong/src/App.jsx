import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';

export default function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<div>Pong Game</div>} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}