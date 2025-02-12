import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import GameFlow from './components/GameFlow';
import StandaloneLeaderboard from './pages/StandaloneLeaderboard';
import { RealtimeDashboard } from './pages/RealtimeDashboard';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<GameFlow />} />
          <Route path="/leaderboard/:id" element={<StandaloneLeaderboard />} />
          <Route path="/realtime" element={<RealtimeDashboard />} />
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;