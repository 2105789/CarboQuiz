import React, { useEffect, useState, useCallback } from 'react';
import { Question, Option } from '../types';
import { questions } from '../data/questions';
import DistancePopup from './DistancePopup';

interface QuestionPageProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (options: Option[], distance?: number) => void;
}

export const QuestionPage: React.FC<QuestionPageProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showDistancePopup, setShowDistancePopup] = useState(false);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = '/images/default/default.jpg';
      setLoadedImages(prev => ({ ...prev, [target.alt]: true }));
    }
  }, []);

  const handleImageLoad = useCallback((optionText: string) => {
    setLoadedImages(prev => ({ ...prev, [optionText]: true }));
  }, []);

  const handleOptionClick = useCallback((option: Option) => {
    setSelectedOptions(prev => {
      const isSelected = prev.some(o => o.id === option.id);
      if (isSelected) {
        const newOptions = prev.filter(o => o.id !== option.id);
        if (newOptions.length === 0) {
          setShowContinueButton(false);
        }
        return newOptions;
      } else {
        // Limit to maximum 2 selections
        if (prev.length >= 2) {
          return prev;
        }
        
        if (prev.length === 0) {
          setShowContinueButton(true);
        }
        return [...prev, option];
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    if (selectedOptions.length === 0) return;
    
    // Show distance popup only for travel/commute related questions
    const isTravelQuestion = question.text.toLowerCase().includes('transport') || 
                           question.text.toLowerCase().includes('commut') ||
                           question.text.toLowerCase().includes('travel');
    
    if (isTravelQuestion) {
      setShowDistancePopup(true);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      onAnswer(selectedOptions);
    }, 1000);
  }, [onAnswer, selectedOptions, question.text]);

  const handleDistanceSubmit = useCallback((distance: number) => {
    setShowDistancePopup(false);
    setIsTransitioning(true);
    
    // Calculate adjusted carbon footprint based on distance
    const adjustedOptions = selectedOptions.map(option => ({
      ...option,
      carbonFootprint: Math.round(option.carbonFootprint * (distance / 10)), // Assuming base values are for 10km
      treeEquivalent: Math.round(option.treeEquivalent * (distance / 10)),
    }));

    setTimeout(() => {
      onAnswer(adjustedOptions, distance);
    }, 1000);
  }, [onAnswer, selectedOptions]);

  const handleDistanceCancel = useCallback(() => {
    setShowDistancePopup(false);
    setSelectedOptions([]);
    setShowContinueButton(false);
  }, []);

  useEffect(() => {
    setIsTransitioning(false);
    setShowContinueButton(false);
    const preloadImages = () => {
      const imagePromises = question.options.map((option) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/images/options/${option.text.toLowerCase()}.jpg`;
          img.onload = () => {
            handleImageLoad(option.text);
            resolve();
          };
          img.onerror = () => {
            img.src = '/images/default/default.jpg';
            handleImageLoad(option.text);
            resolve();
          };
        });
      });

      const nextQuestionIndex = questions.findIndex(q => q.id === question.id) + 1;
      if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].options.forEach((option) => {
          const img = new Image();
          img.src = `/images/options/${option.text.toLowerCase()}.jpg`;
        });
      }

      const defaultImg = new Image();
      defaultImg.src = '/images/default/default.jpg';

      Promise.all(imagePromises).catch(() => {});
    };

    preloadImages();
  }, [question, handleImageLoad]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {showDistancePopup && (
        <DistancePopup
          onSubmit={handleDistanceSubmit}
          onCancel={handleDistanceCancel}
        />
      )}

      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-green-200 animate-ping" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-green-300 animate-pulse" />
            </div>
            <img className="w-14 h-14 text-green-500 relative" src='/images/go-green.png' alt="Leaf icon" />
          </div>
          <p className="mt-4 text-2xl font-bold text-green-600 animate-pulse">Calculating your impact...</p>
          <p className="mt-2 text-xl text-gray-500">Every choice makes a difference! 🌱</p>
        </div>
      )}

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700" />
        <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className={`relative z-10 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Question {currentQuestion} of {totalQuestions}</span>
              <span className="text-sm font-bold text-emerald-600">{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="w-full mx-auto px-4 py-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{question.text}</h2>
          <p className="text-sm text-gray-600 text-center font-medium mb-3">Choose up to 2 options that apply to your situation</p>
          <div className="flex justify-center">
            <div className="grid grid-rows-2 grid-cols-3 gap-3 md:gap-4 mb-16 w-full max-w-5xl">
              {question.options.map((option) => {
                const isSelected = selectedOptions.some(o => o.id === option.id);
                return (
                  <button key={option.id} onClick={() => handleOptionClick(option)} disabled={isTransitioning}
                    className={`group relative flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl
                             transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0
                             active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                             ${isSelected ? 'ring-4 ring-emerald-500' : ''}`}>
                    <div className="relative w-full pb-[100%]">
                      {!loadedImages[option.text] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse">
                          <div className="h-full w-full flex items-center justify-center">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <img src={`/images/options/${option.text.toLowerCase()}.jpg`} alt={option.text} onError={handleImageError}
                        onLoad={() => handleImageLoad(option.text)}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300
                                 group-hover:scale-105 ${!loadedImages[option.text] ? 'opacity-0' : 'opacity-100'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
                      <span className="block text-sm sm:text-base text-white font-semibold text-center leading-snug">
                        {option.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        <div className={`fixed bottom-0 inset-x-0 backdrop-blur-md bg-green-100/30 border-t border-gray-200 shadow-lg 
                      transition-all duration-500 ease-in-out transform
                      ${showContinueButton ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col items-center space-y-3">
              <button onClick={handleNext} disabled={selectedOptions.length === 0}
                className="w-full max-w-md bg-emerald-500 text-white px-8 py-3 rounded-xl
                         font-semibold hover:bg-emerald-600 transition-all duration-200
                         transform hover:scale-[1.02] active:scale-[0.98]
                         flex items-center justify-center space-x-2
                         shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Continue</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;