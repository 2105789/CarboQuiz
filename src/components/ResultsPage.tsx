import React, { useEffect, useRef, useState } from 'react';
import { Answer, Option } from '../types';
import { Leaf, Trophy, Camera, Download } from 'lucide-react';
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <main className="px-4 py-6 md:py-12 pb-24" role="main" aria-labelledby="results-title">
        <div className="max-w-4xl mx-auto md:mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 animate-fadeIn">
            <section className="text-center mb-8" aria-labelledby="summary-title">
              {/* Header Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-300 rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto opacity-50 blur-sm"></div>
                <Leaf
                  className="w-12 h-12 md:w-14 md:h-20 text-green-600 mx-auto relative"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h1 id="results-title" className="text-xl md:text-4xl font-bold text-gray-800 mb-6">
                Your Carbon Footprint Results
              </h1>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                <div className="bg-green-50 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-lg md:text-2xl font-semibold text-gray-800 mb-1">
                    {totalCarbon.toLocaleString()} kg CO₂
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">annual carbon footprint</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-lg md:text-2xl font-semibold text-gray-800 mb-1">
                    {totalTrees.toLocaleString()} trees
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">needed for carbon absorption</p>
                </div>
              </div>

              {/* Enhanced Chart Section */}
              <div className="bg-white rounded-xl shadow-md p-3 md:p-8 mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                  Annual Carbon Impact
                </h2>
                <div className="h-[300px] md:h-[400px] w-full">
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
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="year"
                        stroke="#666"
                        fontSize={isMobile ? 10 : 12}
                        tickMargin={8}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis
                        stroke="#666"
                        fontSize={isMobile ? 10 : 12}
                        tickMargin={8}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        width={isMobile ? 35 : 45}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{ outline: 'none' }}
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
                          value: 'Ideal',
                          position: 'right',
                          fill: '#10b981',
                          fontSize: isMobile ? 10 : 12
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
                          fontSize: isMobile ? 10 : 12
                        }}
                      />
                      <Bar
                        dataKey="Your Impact"
                        fill="#f43f5e"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Average Impact"
                        fill="#eab308"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Ideal Target"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2 bg-gray-50 p-3 rounded-lg text-xs md:text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-500"/>
                      <span>Your Impact</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"/>
                      <span>Average</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-green-500"/>
                      <span>Target</span>
                    </div>
                  </div>
                </div>

                {/* References Section */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Sources & References</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="mb-2">Our carbon footprint calculations are based on data from:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <a href="https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          EPA - Greenhouse Gas Emissions Sources
                        </a>
                      </li>
                      <li>
                        <a href="https://www.ipcc.ch/report/ar6/wg3/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          IPCC Sixth Assessment Report
                        </a>
                      </li>
                      <li>
                        <a href="https://ourworldindata.org/co2-emissions" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          Our World in Data - CO₂ Emissions
                        </a>
                      </li>
                      <li>
                        <a href="https://www.iea.org/reports/global-energy-review-2021" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          IEA Global Energy Review
                        </a>
                      </li>
                    </ul>
                    <p className="mt-4 text-xs text-gray-500">
                      Note: Carbon footprint values are approximations based on average data from these sources. Individual results may vary based on specific circumstances and regional factors.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Breakdown Section */}
            <section className="space-y-4 md:space-y-6 mb-8" aria-label="Detailed breakdown">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Your Choices Breakdown
              </h2>
              {questions.map((question, questionIndex) => {
                const questionAnswers = groupedAnswers[question.id] || [];
                if (questionAnswers.length === 0) return null;

                return (
                  <div key={`question-${question.id}-${questionIndex}`} className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                      <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-4">
                        Question {questionIndex + 1}: {question.text}
                      </h3>
                      <div className="space-y-4">
                        {questionAnswers.map((option, optionIndex) => (
                          <article
                            key={`question-${question.id}-option-${option.id}-${optionIndex}`}
                            className="bg-white rounded-xl p-4 transition-all hover:shadow-md border border-gray-100"
                          >
                            <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                              Choice {optionIndex + 1}: {option.text}
                            </h4>
                            <div className="flex items-center gap-2 text-green-700 mb-2">
                              <Leaf className="w-4 h-4" aria-hidden="true" />
                              <p className="text-sm md:text-base">
                                <span className="font-medium">{option.carbonFootprint.toLocaleString()}</span>
                                {' '}kg CO₂/year
                              </p>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              {option.explanation}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
            
            {/* PDF Download Button */}
            <div className="mb-8">
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
                    className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                             bg-blue-500 text-white text-sm md:text-base font-semibold shadow-lg
                             hover:bg-blue-600 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:ring-offset-2
                             transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      'Generating PDF...'
                    ) : (
                      <>
                        <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Download PDF Report
                      </>
                    )}
                  </a>
                )}
              </BlobProvider>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4">
              <a
                href="https://footprinto.vercel.app/"
                target="_blank"
                className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                         bg-teal-500 text-white text-sm md:text-base font-semibold shadow-lg
                         hover:bg-cyan-600 focus:outline-none focus:ring-2 
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

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 md:p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onViewLeaderboard}
            className="w-full inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl
                     bg-yellow-500 text-white text-sm md:text-base font-semibold shadow-lg
                     hover:bg-yellow-600 focus:outline-none focus:ring-2 
                     focus:ring-yellow-500 focus:ring-offset-2
                     transition-all duration-200 transform hover:scale-[1.02]"
            aria-label="View leaderboard"
          >
            <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;