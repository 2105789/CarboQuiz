'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Answer, Option, LeaderboardEntry } from '../types';
import { questions } from '../data/questions';
import { addLeaderboardEntry, updateRankEntry } from '../services/firebase';

interface GameState {
  gameState: 'welcome' | 'question' | 'impact' | 'results' | 'leaderboard';
  currentQuestionIndex: number;
  answers: Answer[];
  currentAnswers: Option[] | null;
  playerName: string;
  playerEntry?: LeaderboardEntry;
}

interface GameActions {
  handleStart: (name: string) => void;
  handleAnswer: (options: Option[]) => void;
  handleNextQuestion: () => void;
  handleViewLeaderboard: () => void;
  handleRestart: () => void;
}

const GameStateContext = createContext<GameState | null>(null);
const GameActionsContext = createContext<GameActions | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>({
    gameState: 'welcome',
    currentQuestionIndex: 0,
    answers: [],
    currentAnswers: null,
    playerName: '',
  });

  const handleStart = useCallback((name: string) => {
    setState(prev => ({
      ...prev,
      playerName: name,
      gameState: 'question'
    }));
  }, []);

  const handleAnswer = useCallback(async (options: Option[]) => {
    const currentQuestion = questions[state.currentQuestionIndex];
    
    // Update realtime rank data for each option
    await Promise.all(options.map(option => {
      if (option.rank) {
        return updateRankEntry(option.rank, {
          questionId: currentQuestion.id,
          questionText: currentQuestion.text,
          selectedOption: option,
          playerName: state.playerName,
          timestamp: Date.now()
        });
      }
      return Promise.resolve();
    }));

    setState(prev => ({
      ...prev,
      currentAnswers: options,
      gameState: 'impact'
    }));
  }, [state.currentQuestionIndex, state.playerName]);

  const handleNextQuestion = useCallback(() => {
    setState(prev => {
      if (!prev.currentAnswers) return prev;

      // Create an answer entry for each selected option
      const newAnswers = [
        ...prev.answers,
        ...prev.currentAnswers.map(option => ({
          questionId: questions[prev.currentQuestionIndex].id,
          selectedOptions: [option]
        }))
      ];

      if (prev.currentQuestionIndex < questions.length - 1) {
        return {
          ...prev,
          answers: newAnswers,
          currentAnswers: null,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          gameState: 'question'
        };
      }

      // Calculate total carbon footprint from all answers
      const totalCarbon = newAnswers.reduce((sum, answer) => 
        sum + (answer.selectedOptions[0].carbonFootprint ?? 0), 0);

      // Find the best choice (lowest carbon footprint)
      const bestChoice = newAnswers.reduce((best, answer) => 
        (answer.selectedOptions[0].carbonFootprint ?? Infinity) < (best.carbonFootprint ?? Infinity)
          ? answer.selectedOptions[0] 
          : best
      , prev.currentAnswers[0]).text;

      const entry: Omit<LeaderboardEntry, 'id'> = {
        playerName: prev.playerName,
        totalCarbon,
        bestChoice,
        date: new Date().toLocaleDateString()
      };

      addLeaderboardEntry(entry).then(id => {
        setState(prev => ({
          ...prev,
          playerEntry: { ...entry, id }
        }));
      });

      return {
        ...prev,
        answers: newAnswers,
        currentAnswers: null,
        gameState: 'results'
      };
    });
  }, []);

  const handleViewLeaderboard = useCallback(() => {
    setState(prev => ({ ...prev, gameState: 'leaderboard' }));
  }, []);

  const handleRestart = useCallback(() => {
    setState({
      gameState: 'welcome',
      currentQuestionIndex: 0,
      answers: [],
      currentAnswers: null,
      playerName: '',
    });
  }, []);

  const actions = useMemo(() => ({
    handleStart,
    handleAnswer,
    handleNextQuestion,
    handleViewLeaderboard,
    handleRestart
  }), [handleStart, handleAnswer, handleNextQuestion, handleViewLeaderboard, handleRestart]);

  return (
    <GameStateContext.Provider value={state}>
      <GameActionsContext.Provider value={actions}>
        {children}
      </GameActionsContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) throw new Error('useGameState must be used within GameProvider');
  return context;
};

export const useGameActions = () => {
  const context = useContext(GameActionsContext);
  if (!context) throw new Error('useGameActions must be used within GameProvider');
  return context;
};