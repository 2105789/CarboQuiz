import React, { useEffect, useRef, useState } from 'react';
import { Answer, Option } from '../types';
import { Leaf, Trophy, Camera, Download, Share2, Linkedin, Facebook, Twitter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { questions } from '../data/questions';
import { BlobProvider } from '@react-pdf/renderer';
import { CarbonReport } from './CarbonReport';
import { ImpactAnimation } from './ImpactAnimation';
import { getRandomGifForRank } from '../data/gifs';
import { getPreloadedGif } from '../utils/preloader';
import { sendCarbonReport } from '../services/emailService';
import { useGameState } from '../contexts/GameContext';

interface ResultsPageProps {
  answers: Answer[];
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  answers,
  onRestart,
  onViewLeaderboard,
}) => {
  const { playerName, playerEmail } = useGameState(); // Get user info from GameContext
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isReferencesExpanded, setIsReferencesExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'breakdown'>('summary');

  // Add emailSentRef at the top of the component
  const emailSentRef = useRef(false);

  // Helper function to get options array from an answer
  const getOptionsFromAnswer = (answer: Answer): Option[] => {
    // @ts-ignore - Handle legacy data structure
    if (answer.selectedOption) {
      // @ts-ignore - Handle legacy data structure
      return [answer.selectedOption];
    }
    return answer.selectedOptions || [];
  };

  // Group answers by question
  const groupedAnswers = answers.reduce((acc: { [key: number]: Option[] }, answer) => {
    const options = getOptionsFromAnswer(answer);
    if (!acc[answer.questionId]) {
      acc[answer.questionId] = [];
    }
    acc[answer.questionId] = [...acc[answer.questionId], ...options];
    return acc;
  }, {});

  const totalCarbon = answers.reduce(
    (sum, answer) => sum + getOptionsFromAnswer(answer).reduce(
      (optionSum: number, option: Option) => optionSum + option.carbonFootprint,
      0
    ),
    0
  );

  const totalTrees = answers.reduce(
    (sum, answer) => sum + getOptionsFromAnswer(answer).reduce(
      (optionSum: number, option: Option) => optionSum + option.treeEquivalent,
      0
    ),
    0
  );

  const idealCarbonPerYear = 116;
  const averageCarbonPerYear = 2168;
  // Generate impact data for single year
  const impactData = [{
    year: 'Annual',
    'Your Impact': totalCarbon,
    'Average Impact': averageCarbonPerYear,
    'Ideal Target': idealCarbonPerYear,
  }];

  // Enhanced tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="font-semibold text-gray-800 text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs md:text-sm flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{entry.name}:</span>
              <span>{(entry.value / 1000).toFixed(1)}K kg CO₂</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleRestart = () => {
    window.scrollTo(0, 0);
    onRestart();
  };

  const isMobile = window.innerWidth <= 768;

  const enrichedAnswers = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    const selectedOptions = getOptionsFromAnswer(answer);
    
    // Ensure we have the full option data from questions
    const fullOptions = selectedOptions.map(option => {
      const questionOption = question?.options.find(opt => opt.id === option.id);
      return {
        ...option,
        improvement: questionOption?.improvement || option.improvement || '',
        performance: questionOption?.performance || option.performance || 'Needs improvement'
      };
    });

    return {
      questionId: answer.questionId,
      questionText: question?.text || '',
      selectedOptions: fullOptions,
      distance: answer.distance
    };
  });

  useEffect(() => {
    // Validate required fields before sending
    if (!playerEmail || !playerName) {
      console.error('Missing required fields:', { playerEmail, playerName });
      return;
    }

    // Create a unique key for this quiz result
    const emailKey = `quiz_${playerEmail}_${totalCarbon}`;
    
    // Check if this exact quiz result has already been emailed
    if (localStorage.getItem(emailKey)) {
      console.log('Email already sent for this quiz result');
      return;
    }

    // Set the flag immediately to prevent any possibility of duplicate sends
    localStorage.setItem(emailKey, 'true');

    // Send the email with validated parameters
    sendCarbonReport(
      playerEmail.trim(),
      playerName.trim(),
      totalCarbon,
      totalTrees,
      enrichedAnswers
    ).then(sent => {
      if (sent) {
        console.log('Carbon footprint report email sent successfully');
        setIsEmailSent(true);
      } else {
        console.error('Failed to send carbon footprint report email');
        // If email fails, remove the flag so it can be tried again
        localStorage.removeItem(emailKey);
      }
    }).catch(error => {
      console.error('Error sending email report:', error);
      // If email errors, remove the flag so it can be tried again
      localStorage.removeItem(emailKey);
    });
  }, [playerEmail, playerName, totalCarbon, totalTrees, enrichedAnswers]); // Update dependencies

  // Function to handle social sharing
  const handleShare = (platform: 'linkedin' | 'facebook' | 'twitter' | 'copy') => {
    // Create a clear, concise summary text for sharing
    const shareText = `I just completed the CarboQuiz! My annual carbon footprint is ${totalCarbon.toLocaleString()} kg CO₂, which would require ${totalTrees.toLocaleString()} trees to absorb. Check your own footprint at CarboQuiz!`;
    
    // Use the site's actual URL or a specific sharing URL if deployed
    // For now we'll use the current URL, but ideally this would be the production URL
    const shareUrl = window.location.origin || "https://carboquiz.com";
    
    if (platform === 'copy') {
      // Copy the text to clipboard - this is the most reliable approach
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        .then(() => {
          alert("Text copied to clipboard! You can now paste it into your social media post.");
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert("Could not copy text. Please select and copy manually: " + shareText);
        });
      return;
    }
    
    // For social platforms, we'll focus on ensuring the link is properly included
    let platformShareUrl = '';
    
    if (platform === 'linkedin') {
      // LinkedIn sharing - focus on the URL parameter which is most reliable
      platformShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'facebook') {
      // Facebook sharing - prioritize the URL parameter
      platformShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      // Twitter/X sharing with both text and URL
      platformShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    }
    
    // Open the sharing dialog
    if (platformShareUrl) {
      window.open(platformShareUrl, '_blank', 'width=600,height=600');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {/* Subtle background decorations - consistent with other pages */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-72 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-72 sm:h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700" />
        <div className="absolute -bottom-10 left-1/2 w-32 h-32 sm:w-72 sm:h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 py-6 md:py-8 pb-24" role="main" aria-labelledby="results-title" style={{ paddingBottom: 'env(safe-area-inset-bottom, 6rem)' }}>
        <div className="max-w-4xl mx-auto">
          <div id="results-container" className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-fadeIn mb-8 md:mb-12">
            <section className="text-center mb-8" aria-labelledby="summary-title">
              {/* Header Icon with Gradient Background */}
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-200 rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto opacity-70 blur-lg"></div>
                <Leaf
                  className="w-16 h-16 md:w-20 md:h-20 text-emerald-600 mx-auto relative transform hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
              </div>

              {/* Title with Gradient Text */}
              <h1 
                id="results-title" 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
                aria-label="Your Carbon Footprint Results"
              >
                Your Carbon Footprint Results
              </h1>

              {/* Summary Stats with Enhanced Design - UPDATED for mobile 2-column, 3-row grid */}
              <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 gap-2 sm:gap-4 max-w-2xl mx-auto mb-6 md:mb-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-white">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/10 z-0"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-white/20 z-0"></div>
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-wider font-bold text-emerald-100 mb-1">Your Footprint</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-0">
                      {totalCarbon.toLocaleString()} kg
                    </p>
                    <p className="text-xs text-emerald-100">annual CO₂</p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/90 to-cyan-600/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-white">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/10 z-0"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-white/20 z-0"></div>
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-wider font-bold text-cyan-100 mb-1">Trees Needed</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-0">
                      {totalTrees.toLocaleString()}
                    </p>
                    <p className="text-xs text-cyan-100">for carbon absorption</p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-white">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/10 z-0"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-white/20 z-0"></div>
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-wider font-bold text-amber-100 mb-1">Avg. Impact</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-0">
                      {averageCarbonPerYear.toLocaleString()} kg
                    </p>
                    <p className="text-xs text-amber-100">annual CO₂ average</p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-500/90 to-green-600/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-white">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/10 z-0"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-white/20 z-0"></div>
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-wider font-bold text-green-100 mb-1">Ideal Target</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-0">
                      {idealCarbonPerYear.toLocaleString()} kg
                    </p>
                    <p className="text-xs text-green-100">annual CO₂ goal</p>
                  </div>
                </div>

                <div className="col-span-2 bg-gradient-to-r from-indigo-500/90 to-purple-600/90 relative overflow-hidden backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-white">
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/10 z-0"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-white/20 z-0"></div>
                  <button
                    onClick={onViewLeaderboard}
                    className="relative z-10 w-full text-left flex justify-between items-center"
                    aria-label="View global leaderboard"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-purple-100 mb-1">Global Ranking</p>
                      <p className="text-base sm:text-lg font-bold text-white mb-0">
                        View Leaderboard
                      </p>
                    </div>
                    <Trophy className="h-8 w-8 text-white/70 group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Tab navigation for easier mobile navigation */}
              <div className="mb-6 flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === 'summary'
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                    aria-pressed={activeTab === 'summary'}
                    aria-label="View summary tab"
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('breakdown')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === 'breakdown'
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                    aria-pressed={activeTab === 'breakdown'}
                    aria-label="View detailed breakdown tab"
                  >
                    Detailed Breakdown
                  </button>
                </div>
              </div>

              {/* Main content - conditional display based on active tab */}
              {activeTab === 'summary' && (
                <>
                  {/* Social Share Buttons - improved for mobile and accessibility */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6 mb-6" id="social-share-section">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                      Share Your Results
                    </h3>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg
                                bg-[#0077B5] text-white text-xs sm:text-sm font-medium
                                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
                                focus:ring-offset-2
                                transition-all duration-200 transform hover:scale-105"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg
                                bg-[#1877F2] text-white text-xs sm:text-sm font-medium
                                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 
                                focus:ring-offset-2
                                transition-all duration-200 transform hover:scale-105"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg
                                bg-[#1DA1F2] text-white text-xs sm:text-sm font-medium
                                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 
                                focus:ring-offset-2
                                transition-all duration-200 transform hover:scale-105"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg
                                bg-gray-700 text-white text-xs sm:text-sm font-medium
                                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-700 
                                focus:ring-offset-2
                                transition-all duration-200 transform hover:scale-105"
                        aria-label="Copy text to clipboard"
                      >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Copy Text</span>
                      </button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50/80 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Your shareable result:</strong>
                      </p>
                      <p className="text-sm text-gray-700 font-medium p-2 bg-white/90 rounded border border-gray-200">
                        I just completed the CarboQuiz! My annual carbon footprint is {totalCarbon.toLocaleString()} kg CO₂, which would require {totalTrees.toLocaleString()} trees to absorb. Check your own footprint at CarboQuiz!
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Due to platform restrictions, LinkedIn and Facebook may only show the link. Use the "Copy Text" button for sharing manually.
                      </p>
                    </div>
                  </div>

                  {/* PDF Download Button - improved aesthetics and accessibility */}
                  <BlobProvider document={
                    <CarbonReport
                      name={playerName}
                      email={playerEmail}
                      totalCarbon={totalCarbon}
                      totalTrees={totalTrees}
                      answers={enrichedAnswers}
                    />
                  }>
                    {({ url, loading }) => (
                      <a 
                        href={url || '#'}
                        download={`carbon-report-${playerName.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                        className={`group relative inline-flex items-center justify-center w-full px-6 py-3 sm:py-4 rounded-xl
                                bg-emerald-600 text-white text-sm sm:text-base font-medium 
                                shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                focus:ring-offset-2 mb-6
                                transition-all duration-200 transform hover:bg-emerald-700 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                        aria-disabled={loading}
                        tabIndex={loading ? -1 : 0}
                      >
                        <div className="relative z-10 flex items-center justify-center">
                          {loading ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                              Generating PDF...
                            </span>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-3 group-hover:translate-y-[2px] transition-transform" />
                              Download Your Carbon Report
                            </>
                          )}
                        </div>
                      </a>
                    )}
                  </BlobProvider>

                  {/* Play Again Button - improved styling for consistency */}
                  <button
                    onClick={onRestart}
                    className="group relative inline-flex items-center justify-center w-full px-6 py-3 sm:py-4 rounded-xl
                             bg-gray-800 text-white text-sm sm:text-base font-medium 
                             shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-700 
                             focus:ring-offset-2 mb-6
                             transition-all duration-200 transform hover:bg-gray-900"
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                      Play Again
                    </div>
                  </button>

                  {/* Enhanced Chart Section - improved for mobile and accessibility */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-3 sm:p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Annual Carbon Impact
                    </h2>
                    <div className="h-[280px] sm:h-[350px] w-full bg-white/70 rounded-lg p-2 sm:p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={impactData}
                          margin={{
                            top: 20,
                            right: isMobile ? 20 : 40,
                            left: isMobile ? 0 : 10,
                            bottom: 20,
                          }}
                          barGap={isMobile ? 4 : 8}
                          barSize={isMobile ? 30 : 60}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="year"
                            stroke="#4b5563"
                            fontSize={isMobile ? 10 : 12}
                            tickMargin={8}
                            axisLine={{ stroke: '#e5e7eb' }}
                          />
                          <YAxis
                            stroke="#4b5563"
                            fontSize={isMobile ? 10 : 12}
                            tickMargin={8}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                            width={isMobile ? 35 : 45}
                          />
                          <Tooltip
                            content={<CustomTooltip />}
                            wrapperStyle={{ outline: 'none' }}
                            cursor={{ fill: 'rgba(229, 231, 235, 0.2)' }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            iconSize={isMobile ? 6 : 8}
                            wrapperStyle={{
                              fontSize: isMobile ? '10px' : '12px',
                              paddingTop: '8px'
                            }}
                          />
                          <ReferenceLine
                            y={idealCarbonPerYear}
                            stroke="#10b981"
                            strokeDasharray="3 3"
                            label={{
                              value: 'Ideal Target',
                              position: 'right',
                              fill: '#10b981',
                              fontSize: isMobile ? 10 : 12,
                              fontWeight: 600
                            }}
                          />
                          <ReferenceLine
                            y={averageCarbonPerYear}
                            stroke="#f59e0b"
                            strokeDasharray="3 3"
                            label={{
                              value: 'Average Zone',
                              position: 'right',
                              fill: '#f59e0b',
                              fontSize: isMobile ? 10 : 12,
                              fontWeight: 600
                            }}
                          />
                          <Bar
                            dataKey="Your Impact"
                            fill="#ef4444"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="Average Impact"
                            fill="#f59e0b"
                            radius={[6, 6, 0, 0]}
                          />
                          <Bar
                            dataKey="Ideal Target"
                            fill="#10b981"
                            radius={[6, 6, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 space-y-2 bg-white/70 p-3 rounded-lg border border-gray-100">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 group">
                          <span className="w-3 h-3 rounded-full bg-red-500 group-hover:scale-110 transition-transform"/>
                          <span className="text-xs sm:text-sm text-gray-700 group-hover:text-red-600 transition-colors">Your Impact</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                          <span className="w-3 h-3 rounded-full bg-amber-500 group-hover:scale-110 transition-transform"/>
                          <span className="text-xs sm:text-sm text-gray-700 group-hover:text-amber-600 transition-colors">Average</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                          <span className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-110 transition-transform"/>
                          <span className="text-xs sm:text-sm text-gray-700 group-hover:text-emerald-600 transition-colors">Target</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'breakdown' && (
                <section className="space-y-4 mb-8" aria-label="Detailed breakdown">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                    Your Choices Breakdown
                  </h2>
                  <div className="grid gap-4 sm:gap-6">
                    {questions.map((question, questionIndex) => {
                      const questionAnswers = groupedAnswers[question.id] || [];
                      if (questionAnswers.length === 0) return null;

                      return (
                        <div 
                          key={question.id}
                          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="text-emerald-600 font-semibold text-sm sm:text-base">{questionIndex + 1}</span>
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3">
                                {question.text}
                              </h3>
                              <div className="space-y-3">
                                {questionAnswers.map((option, optionIndex) => (
                                  <div 
                                    key={option.id}
                                    className="bg-white/80 p-3 sm:p-4 rounded-lg border border-gray-100 hover:border-emerald-200 transition-colors"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:mb-2">
                                      <span className="font-medium text-gray-700 mb-1 sm:mb-0">{option.text}</span>
                                      <span className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                        {option.carbonFootprint.toLocaleString()} kg CO₂
                                      </span>
                                    </div>
                                    {option.improvement && (
                                      <p className="text-xs sm:text-sm text-gray-600 mt-2 border-l-2 border-emerald-400 pl-3 py-1">
                                        <span className="font-medium text-emerald-600">Eco Tip: </span>
                                        {option.improvement}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons shown at the bottom of the breakdown tab */}
                  <div className="mt-8 space-y-4">
                    <BlobProvider document={
                      <CarbonReport
                        name={playerName}
                        email={playerEmail}
                        totalCarbon={totalCarbon}
                        totalTrees={totalTrees}
                        answers={enrichedAnswers}
                      />
                    }>
                      {({ url, loading }) => (
                        <a 
                          href={url || '#'}
                          download={`carbon-report-${playerName.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                          className={`group relative inline-flex items-center justify-center w-full px-6 py-3 sm:py-4 rounded-xl
                                  bg-emerald-600 text-white text-sm sm:text-base font-medium 
                                  shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                  focus:ring-offset-2 mb-4
                                  transition-all duration-200 transform hover:bg-emerald-700 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                          aria-disabled={loading}
                          tabIndex={loading ? -1 : 0}
                        >
                          <div className="relative z-10 flex items-center justify-center">
                            {loading ? (
                              <span className="flex items-center">
                                <span className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                                Generating PDF...
                              </span>
                            ) : (
                              <>
                                <Download className="w-5 h-5 mr-3 group-hover:translate-y-[2px] transition-transform" />
                                Download Full Report
                              </>
                            )}
                          </div>
                        </a>
                      )}
                    </BlobProvider>

                    <button
                      onClick={onRestart}
                      className="group relative inline-flex items-center justify-center w-full px-6 py-3 sm:py-4 rounded-xl
                              bg-gray-800 text-white text-sm sm:text-base font-medium 
                              shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-700 
                              focus:ring-offset-2
                              transition-all duration-200 transform hover:bg-gray-900"
                    >
                      <div className="relative z-10 flex items-center justify-center">
                        <Trophy className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                        Play Again
                      </div>
                    </button>
                  </div>
                </section>
              )}
            </section>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4">
              <a
                href="https://footprinto.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                        bg-cyan-600 text-white text-sm md:text-base font-medium shadow-md
                        hover:bg-cyan-700 focus:outline-none focus:ring-2 
                        focus:ring-cyan-500 focus:ring-offset-2
                        transition-all duration-200 transform hover:scale-[1.02] text-center"
                aria-label="Calculate carbon footprint of any object"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                Know any object's carbon footprint
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom action button for mobile - Making sure leaderboard is always accessible */}
      <div className="fixed bottom-4 right-4 sm:hidden z-40">
        <button
          onClick={onViewLeaderboard}
          aria-label="View global leaderboard"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Trophy className="h-6 w-6" />
        </button>
      </div>

      {/* Feedback message for email sent */}
      {isEmailSent && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-max z-50">
          <div className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Your carbon report has been emailed to you!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;