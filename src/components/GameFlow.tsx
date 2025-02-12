'use client'

import React, { memo, Suspense, useState } from 'react';
import { useGameState, useGameActions } from '../contexts/GameContext';
import { questions } from '../data/questions';
import { WelcomePage } from './WelcomePage';
import { QuestionPage } from './QuestionPage';
import { ImpactPage } from './ImpactPage';
import { ResultsPage } from './ResultsPage';
import { LeaderboardPage } from '../pages/LeaderboardPage';

const GameFlow: React.FC = () => {
  const {
    gameState,
    currentQuestionIndex,
    answers,
    currentAnswers,
    playerEntry,
  } = useGameState();

  const {
    handleStart,
    handleAnswer,
    handleNextQuestion,
    handleViewLeaderboard,
    handleRestart
  } = useGameActions();

  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  // Function to render the current page with transition
  const renderPage = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomePage onStart={(name: string, email: string) => {
          setUserInfo({ name, email });
          handleStart(name);
        }} />;
      case 'question':
        return (
          <QuestionPage
            question={questions[currentQuestionIndex]}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        );
      case 'impact':
        return currentAnswers && (
          <ImpactPage options={currentAnswers} onNext={handleNextQuestion} />
        );
      case 'results':
        return (
          <ResultsPage 
            answers={answers} 
            onRestart={handleRestart}
            onViewLeaderboard={handleViewLeaderboard}
            userName={userInfo.name}
            userEmail={userInfo.email}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardPage
            playerEntry={playerEntry}
            standalone={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      }>
        <div className="animate-fadeIn">
          {renderPage()}
        </div>
      </Suspense>
    </div>
  );
};

export default memo(GameFlow);