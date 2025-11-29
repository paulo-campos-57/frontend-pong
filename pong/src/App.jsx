import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Index from './pages/Index';

export default function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}