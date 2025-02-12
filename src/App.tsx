'use client';

import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameFlow from './components/GameFlow';

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
};

export default App;