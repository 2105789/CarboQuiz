import React, { useEffect, useState, useCallback } from 'react';
import { Question, Option } from '../types';
import { questions } from '../data/questions';
import DistancePopup from './DistancePopup';
import ExplanationCard from './ExplanationCard';

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
  const [showExplanationCard, setShowExplanationCard] = useState(false);

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
      window.scrollTo(0, 0); // Reset scroll position before navigating
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
      window.scrollTo(0, 0); // Reset scroll position before navigating
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
    window.scrollTo(0, 0); // Reset scroll position when a new question is loaded
    
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
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-100 via-cyan-50 to-teal-100">
      {showDistancePopup && (
        <DistancePopup
          onSubmit={handleDistanceSubmit}
          onCancel={handleDistanceCancel}
        />
      )}

      {showExplanationCard && question.explanation && (
        <ExplanationCard
          explanation={question.explanation}
          onClose={() => setShowExplanationCard(false)}
        />
      )}

      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-300 animate-ping" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full  border-emerald-400 animate-pulse" />
            </div>
            <img className="w-16 h-16 text-emerald-500 relative animate-pulse" src='/images/go-green.png' alt="Leaf icon" />
          </div>
          <p className="mt-6 text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent animate-pulse">Calculating your impact...</p>
          <p className="mt-2 text-lg text-gray-700">Every choice makes a difference! 🌱</p>
        </div>
      )}

      {/* Enhanced background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-10 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className={`relative z-10 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Modernized progress header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Question {currentQuestion} of {totalQuestions}</span>
              <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }} 
                role="progressbar"
                aria-valuenow={Math.round((currentQuestion / totalQuestions) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>

        {/* Question content with enhanced design */}
        <div className="w-full mx-auto px-4 py-6 max-w-5xl">
          <div className="relative mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 text-center leading-tight">
              <span dangerouslySetInnerHTML={{__html: question.text}} />
              {question.explanation && (
                <button
                  onClick={() => setShowExplanationCard(true)}
                  className="inline-flex align-middle ml-1 text-cyan-700 hover:bg-cyan-50 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-200"
                  disabled={isTransitioning}
                  aria-label="Learn more"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              )}
            </h2>
            <div className="absolute -z-10 -inset-1 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-lg blur"></div>
          </div>
          
          <div className="hidden bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm text-center max-w-md mx-auto mb-8">
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              Choose up to <span className="text-emerald-600 font-bold">2 options</span> that apply to your situation
            </p>
          </div>
          
          {/* Options grid - improved for mobile with better visuals */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20 w-full">
              {question.options.map((option) => {
                const isSelected = selectedOptions.some(o => o.id === option.id);
                return (
                  <button key={option.id} 
                    onClick={() => handleOptionClick(option)} 
                    disabled={isTransitioning}
                    aria-pressed={isSelected}
                    className={`group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden
                             transition-all duration-300 ease-in-out transform
                             ${isSelected 
                               ? 'ring-4 ring-emerald-500 shadow-lg shadow-emerald-100/50' 
                               : 'shadow-md hover:shadow-xl hover:-translate-y-1'
                             }
                             active:translate-y-0 active:scale-[0.98] 
                             disabled:opacity-50 disabled:cursor-not-allowed 
                             focus:outline-none focus:ring-2 focus:ring-emerald-400`}>
                    <div className="relative w-full pb-[75%]">
                      {!loadedImages[option.text] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <img 
                        src={`/images/options/${option.text.toLowerCase()}.jpg`}
                        alt={option.text}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSelected ? 'scale-105' : ''}`}
                        onError={handleImageError}
                        onLoad={() => handleImageLoad(option.text)}
                      />
                      {/* Text overlay with dark gradient background */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-3 px-3">
                        <p className="font-bold text-white text-center">{option.text}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
                          <div className="rounded-full bg-emerald-500 p-2 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fixed bottom button area */}
          <div className="fixed bottom-0 left-0 right-0 z-20">
            <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg p-4">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                
                <button
                  onClick={handleNext}
                  disabled={!showContinueButton || isTransitioning}
                  className={`px-4 py-3 text-sm md:text-base font-medium text-white
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2
                           transition-all duration-200 w-full h-12
                           ${showContinueButton 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-500' 
                              : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  {showContinueButton ? 'Continue' : 'Select at least one option'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;