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

interface ResultsPageProps {
  answers: Answer[];
  onRestart: () => void;
  onViewLeaderboard: () => void;
  userName: string;
  userEmail: string;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  answers,
  onRestart,
  onViewLeaderboard,
  userName,
  userEmail
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isReferencesExpanded, setIsReferencesExpanded] = useState(false);

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

  console.log('ResultsPage - Enriched Answers:', enrichedAnswers);

  useEffect(() => {
    // Validate required fields before sending
    if (!userEmail || !userName) {
      console.error('Missing required fields:', { userEmail, userName });
      return;
    }

    // Create a unique key for this quiz result
    const emailKey = `quiz_${userEmail}_${totalCarbon}`;
    
    // Check if this exact quiz result has already been emailed
    if (localStorage.getItem(emailKey)) {
      console.log('Email already sent for this quiz result');
      return;
    }

    // Set the flag immediately to prevent any possibility of duplicate sends
    localStorage.setItem(emailKey, 'true');

    // Send the email with validated parameters
    sendCarbonReport(
      userEmail.trim(),
      userName.trim(),
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
  }, [userEmail, userName, totalCarbon, totalTrees, enrichedAnswers]); // Add dependencies

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
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <main className="px-4 py-6 md:py-12 pb-24" role="main" aria-labelledby="results-title">
        <div className="max-w-4xl mx-auto">
          <div id="results-container" className="bg-white rounded-2xl shadow-xl p-4 md:p-8 animate-fadeIn md:mb-16">
            <section className="text-center mb-8" aria-labelledby="summary-title">
              {/* Header Icon with Gradient Background */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-100 rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto opacity-70 blur-lg"></div>
                <Leaf
                  className="w-16 h-16 md:w-20 md:h-20 text-green-600 mx-auto relative transform hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
              </div>

              {/* Title with Gradient Text */}
              <h1 
                id="results-title" 
                className="text-2xl md:text-4xl font-bold mb-8 text-gray-800"
              >
                Your Carbon Footprint Results
              </h1>

              {/* Summary Stats with Enhanced Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                  <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                      {totalCarbon.toLocaleString()} kg CO₂
                    </p>
                    <p className="text-sm md:text-base text-gray-600">annual carbon footprint</p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                  <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                      {totalTrees.toLocaleString()} trees
                    </p>
                    <p className="text-sm md:text-base text-gray-600">needed for carbon absorption</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Container */}
              <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-12">
                {/* Social Share Buttons */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-4" id="social-share-section">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Share Your Results
                  </h3>
                  
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="group relative inline-flex items-center justify-center px-4 md:px-6 py-3 rounded-xl
                               bg-blue-600 text-white text-sm md:text-base font-semibold 
                               shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 
                               focus:ring-offset-2
                               transition-all duration-200 transform hover:scale-[1.05]"
                      aria-label="Share on LinkedIn"
                    >
                      <div className="relative z-10 flex items-center">
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        LinkedIn
                      </div>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="group relative inline-flex items-center justify-center px-4 md:px-6 py-3 rounded-xl
                               bg-blue-700 text-white text-sm md:text-base font-semibold 
                               shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700 
                               focus:ring-offset-2
                               transition-all duration-200 transform hover:scale-[1.05]"
                      aria-label="Share on Facebook"
                    >
                      <div className="relative z-10 flex items-center">
                        <Facebook className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Facebook
                      </div>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="group relative inline-flex items-center justify-center px-4 md:px-6 py-3 rounded-xl
                               bg-sky-500 text-white text-sm md:text-base font-semibold 
                               shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 
                               focus:ring-offset-2
                               transition-all duration-200 transform hover:scale-[1.05]"
                      aria-label="Share on Twitter"
                    >
                      <div className="relative z-10 flex items-center">
                        <Twitter className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Twitter
                      </div>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="group relative inline-flex items-center justify-center px-4 md:px-6 py-3 rounded-xl
                               bg-gray-700 text-white text-sm md:text-base font-semibold 
                               shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-700 
                               focus:ring-offset-2
                               transition-all duration-200 transform hover:scale-[1.05]"
                      aria-label="Copy text to clipboard"
                    >
                      <div className="relative z-10 flex items-center">
                        <Share2 className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Copy Text
                      </div>
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Your shareable result:</strong>
                    </p>
                    <p className="text-sm text-gray-700 font-medium p-2 bg-white rounded border border-gray-200">
                      I just completed the CarboQuiz! My annual carbon footprint is {totalCarbon.toLocaleString()} kg CO₂, which would require {totalTrees.toLocaleString()} trees to absorb. Check your own footprint at CarboQuiz!
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: Due to platform restrictions, LinkedIn and Facebook may only show the link without the text above. 
                      Use the "Copy Text" button to copy both the text and link for manual pasting.
                    </p>
                  </div>
                </div>

                {/* Download PDF Button */}
                <BlobProvider document={
                  <CarbonReport
                    name={userName}
                    email={userEmail}
                    totalCarbon={totalCarbon}
                    totalTrees={totalTrees}
                    answers={enrichedAnswers}
                  />
                }>
                  {({ url, loading }) => (
                    <a 
                      href={url || '#'}
                      download={`carbon-report-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                      className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl
                               bg-blue-500 text-white text-base font-semibold 
                               shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                               focus:ring-offset-2
                               transition-all duration-200 transform hover:scale-[1.02] text-center"
                    >
                      <div className="relative z-10 flex items-center">
                        {loading ? (
                          <span className="flex items-center">
                            <span className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                            Generating PDF...
                          </span>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                            Download PDF Report
                          </>
                        )}
                      </div>
                    </a>
                  )}
                </BlobProvider>

                {/* Footprint Calculator Link */}
                <a
                  href="https://footprinto.vercel.app/"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl
                           bg-teal-500 text-white text-base font-semibold 
                           shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 
                           focus:ring-offset-2
                           transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="relative z-10 flex items-center">
                    <Camera className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Calculate Object Carbon Footprint
                  </div>
                </a>

                {/* Restart Game Button */}
                <button
                  onClick={handleRestart}
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl
                           bg-yellow-500 text-white text-base font-semibold 
                           shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 
                           focus:ring-offset-2
                           transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="relative z-10 flex items-center">
                    <Trophy className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Play Again
                  </div>
                </button>
              </div>

              {/* Enhanced Chart Section */}
              <div className="bg-white rounded-xl shadow-lg p-3 md:p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                  Annual Carbon Impact
                </h2>
                <div className="h-[300px] md:h-[400px] w-full bg-white rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={impactData}
                      margin={{
                        top: 20,
                        right: isMobile ? 30 : 50,
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
                        stroke="#eab308"
                        strokeDasharray="3 3"
                        label={{
                          value: 'Average Zone',
                          position: 'right',
                          fill: '#eab308',
                          fontSize: isMobile ? 10 : 12,
                          fontWeight: 600
                        }}
                      />
                      <Bar
                        dataKey="Your Impact"
                        fill="#f43f5e"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="Average Impact"
                        fill="#eab308"
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
                
                <div className="mt-6 space-y-2 bg-white p-4 rounded-xl border border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 group">
                      <span className="w-3 h-3 rounded-full bg-red-500 group-hover:scale-110 transition-transform"/>
                      <span className="text-gray-700 group-hover:text-red-600 transition-colors">Your Impact</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 group-hover:scale-110 transition-transform"/>
                      <span className="text-gray-700 group-hover:text-yellow-600 transition-colors">Average</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <span className="w-3 h-3 rounded-full bg-green-500 group-hover:scale-110 transition-transform"/>
                      <span className="text-gray-700 group-hover:text-green-600 transition-colors">Target</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Section */}
              <section className="space-y-4 md:space-y-6 mb-8" aria-label="Detailed breakdown">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                  Your Choices Breakdown
                </h2>
                <div className="grid gap-6">
                  {questions.map((question, questionIndex) => {
                    const questionAnswers = groupedAnswers[question.id] || [];
                    if (questionAnswers.length === 0) return null;

                    return (
                      <div 
                        key={question.id}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">{questionIndex + 1}</span>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-base md:text-lg font-medium text-gray-800 mb-3">
                              {question.text}
                            </h3>
                            <div className="space-y-3">
                              {questionAnswers.map((option, optionIndex) => (
                                <div 
                                  key={option.id}
                                  className="bg-white p-4 rounded-lg border border-gray-100"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-700">{option.text}</span>
                                    <span className="text-sm font-semibold text-green-600">
                                      {option.carbonFootprint.toLocaleString()} kg CO₂
                                    </span>
                                  </div>
                                  {option.improvement && (
                                    <p className="text-sm text-gray-600 mt-2 border-l-2 border-green-500 pl-3">
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
              </section>
            </section>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4">
              <a
                href="https://footprinto.vercel.app/"
                target="_blank"
                className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                         bg-teal-500 text-white text-sm md:text-base font-semibold shadow-lg
                         hover:bg-teal-600 focus:outline-none focus:ring-2 
                         focus:ring-teal-500 focus:ring-offset-2
                         transition-all duration-200 transform hover:scale-[1.02] text-center"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                Know any objects carbon footprint
              </a>

              <button
                onClick={handleRestart}
                className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                         bg-yellow-500 text-white text-sm md:text-base font-semibold shadow-lg
                         hover:bg-yellow-600 focus:outline-none focus:ring-2 
                         focus:ring-yellow-500 focus:ring-offset-2
                         transition-all duration-200 transform hover:scale-[1.02]"
                aria-label="Restart the game"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                Restart Game
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar with Enhanced Design */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onViewLeaderboard}
            className="group relative w-full inline-flex items-center justify-center px-8 py-4 rounded-xl
                     bg-yellow-500 text-white text-base font-semibold 
                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 
                     focus:ring-offset-2 transform hover:-translate-y-1 transition-all duration-200
                     hover:bg-yellow-600"
          >
            <div className="relative z-10 flex items-center">
              <Trophy className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              View Global Leaderboard
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;