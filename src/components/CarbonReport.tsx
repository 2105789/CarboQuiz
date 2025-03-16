import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, Circle, Rect, Path, G } from '@react-pdf/renderer';
import { Answer, Question } from '../types';
import { questions } from '../data/questions';

// Create styles with bold, dramatic visual elements
const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: 'white',
    position: 'relative',
  },
  content: {
    padding: 40,
    paddingTop: 120, // Room for the header
  },
  // Dramatic header with strong colors
  headerBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#047857',
    zIndex: 1,
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: '#10b981',
    zIndex: 2,
  },
  headerCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#065f46',
    top: 40,
    right: 40,
    zIndex: 0,
  },
  headerCircleTwo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#059669',
    top: 60,
    right: 80,
    zIndex: 0,
  },
  headerContent: {
    position: 'absolute',
    top: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    zIndex: 3,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  headerTextContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#e2e8f0',
    marginTop: 5,
  },
  userInfoBox: {
    backgroundColor: '#f0fdfa',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 6,
    borderLeftColor: '#0d9488',
    borderLeftStyle: 'solid',
  },
  userInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userInfoItem: {
    width: '50%',
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#10b981',
    borderBottomStyle: 'solid',
  },
  // Dramatic stats container with strong colors and contrasts
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  statItem: {
    width: '50%',
    padding: 10,
  },
  statBox: {
    backgroundColor: '#ecfdf5',
    padding: 15,
    borderRadius: 10,
    height: 120,
    borderTopWidth: 6,
    borderTopColor: '#10b981',
    borderTopStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#047857',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    padding: 10,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    height: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: 'bold',
    marginTop: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'dashed',
    marginVertical: 20,
  },
  // Dramatic recommendations
  recommendationsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#0f766e',
    borderRadius: 10,
    marginBottom: 25,
  },
  categoryBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    marginBottom: 25,
    overflow: 'hidden',
  },
  categoryHeader: {
    backgroundColor: '#0ea5e9',
    padding: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryContent: {
    padding: 15,
  },
  choiceBox: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#0ea5e9',
    borderLeftStyle: 'solid',
  },
  choiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  impactBadge: {
    backgroundColor: '#fee2e2',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  impactText: {
    fontSize: 10,
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  performanceBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  performanceText: {
    fontSize: 10,
    color: '#047857',
    fontWeight: 'bold',
  },
  recommendationBox: {
    backgroundColor: '#f0fdfa',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f766e',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 11,
    color: '#1e293b',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  footerContent: {
    backgroundColor: '#047857',
    padding: 15,
    marginHorizontal: 40,
    borderRadius: 20,
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 12,
    color: '#94a3b8',
  },
  // Progress visual
  progressContainer: {
    height: 60,
    marginVertical: 25,
    position: 'relative',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
  },
  progressFill: {
    height: 10,
    backgroundColor: '#10b981',
    borderRadius: 5,
    position: 'absolute',
    top: 25,
    left: 0,
    width: '40%', // Will be dynamic based on footprint
  },
  progressMarker: {
    position: 'absolute',
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  progressMarkerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressLabel: {
    position: 'absolute',
    top: 50,
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    width: 60,
    marginLeft: -30,
  },
  // For recommendations
  topRecommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 15,
    textAlign: 'center',
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    borderLeftStyle: 'solid',
  },
  recommendationNumber: {
    backgroundColor: '#10b981',
    color: 'white',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  recommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationCardText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 1.4,
  },
});

interface CarbonReportProps {
  name: string;
  email: string;
  totalCarbon: number;
  totalTrees: number;
  answers: Answer[];
}

export const CarbonReport: React.FC<CarbonReportProps> = ({
  name = "User",
  email = "Not provided",
  totalCarbon,
  totalTrees, // Keep parameter even though we're using our own calculation
  answers,
}) => {
  // Process answers to ensure we have all the data we need
  const processedAnswers = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) {
      console.warn(`Question not found for id: ${answer.questionId}`);
      return answer;
    }

    const processedOptions = answer.selectedOptions.map(option => {
      const fullOption = question.options.find(q => q.id === option.id);
      if (!fullOption) {
        console.warn(`Option not found for id: ${option.id} in question: ${question.id}`);
        return option;
      }
      return {
        ...option,
        improvement: fullOption.improvement,
        performance: fullOption.performance
      };
    });

    return {
      ...answer,
      selectedOptions: processedOptions,
      question
    };
  }) as (Answer & { question: Question })[];

  // Get top recommendations based on carbon impact
  const getTopRecommendations = () => {
    let allRecommendations = processedAnswers
      .flatMap(answer => answer.selectedOptions.map(option => ({
        text: option.improvement,
        impact: option.carbonFootprint,
        category: answer.question?.text?.split('?')[0] || 'General'
      })))
      .filter(rec => rec.text && rec.text.length > 10)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 5);
    
    return allRecommendations;
  };

  const topRecommendations = getTopRecommendations();
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate interesting facts about the carbon footprint
  const carKilometers = Math.round(totalCarbon / 0.12); // kg CO2 per km (matching email template)
  const smartphoneCharges = Math.round(totalCarbon * 121); // Each kg of CO2 is roughly equivalent to 121 smartphone charges
  const flightKilometers = Math.round(totalCarbon * 4.5); // kg CO2 equals approx 4.5 km of flying (matching email template)
  const flightHours = Math.round(flightKilometers / 800); // ~800 km per hour of flight

  // Calculate trees needed using the same formula as email template
  const annualEmissionTonnes = totalCarbon / 1000; // Convert kg to tonnes
  const treeSequestrationRate = 0.02; // tonnes CO2 per tree per year
  const treesToOffsetCalc = Math.floor(annualEmissionTonnes / treeSequestrationRate);

  // Calculate user's footprint compared to average (4000kg)
  const avgFootprint = 4000;
  const percentOfAvg = Math.round((totalCarbon / avgFootprint) * 100);
  const positionPercentage = Math.min(Math.max((totalCarbon / 8000) * 100, 5), 95); // Cap between 5-95%

  return (
    <Document>
      {/* First Page - Summary with dramatic visual appeal */}
      <Page size="A4" style={styles.page}>
        {/* Dramatic header with overlapping elements */}
        <View style={styles.headerBand} />
        <View style={styles.headerAccent} />
        <View style={styles.headerCircle} />
        <View style={styles.headerCircleTwo} />
        <View style={styles.headerContent}>
          <Image
            src="/images/go-green.png"
            style={styles.logo}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Carbon Footprint Report</Text>
            <Text style={styles.subtitle}>Your Path to a Greener Future</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* User Info Box */}
          <View style={styles.userInfoBox}>
            <View style={styles.userInfoGrid}>
              <View style={styles.userInfoItem}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{name || "User"}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.label}>Report Date</Text>
                <Text style={styles.value}>{formattedDate}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{email || "Not provided"}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.label}>Report ID</Text>
                <Text style={styles.value}>{Math.floor(Math.random() * 900000) + 100000}</Text>
              </View>
            </View>
          </View>

          {/* Carbon Summary Section with dramatic stats */}
          <Text style={styles.sectionTitle}>Your Carbon Impact Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalCarbon.toLocaleString()}</Text>
                <Text style={styles.statLabel}>kg CO₂ per year</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{treesToOffsetCalc.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Trees needed</Text>
              </View>
            </View>
          </View>

          {/* Equivalents section */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Your Carbon Footprint Equals:</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoText}>Driving a car for</Text>
                  <Text style={styles.infoValue}>{carKilometers.toLocaleString()} km</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoText}>Charging a smartphone</Text>
                  <Text style={styles.infoValue}>{smartphoneCharges.toLocaleString()} times</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoText}>Flying for</Text>
                  <Text style={styles.infoValue}>{flightKilometers.toLocaleString()} km</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoText}>Percentage of average</Text>
                  <Text style={styles.infoValue}>{percentOfAvg}%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Top recommendations */}
          <Text style={styles.topRecommendationTitle}>Top Recommendations</Text>
          {topRecommendations.map((rec, idx) => (
            <View key={idx} style={styles.recommendationCard}>
              <View style={styles.recommendationRow}>
                <Text style={styles.recommendationNumber}>{idx + 1}</Text>
                <Text style={styles.recommendationCardText}>{rec.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Dramatic footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              CarboQuiz • Your Partner in Building a Sustainable Future • {new Date().getFullYear()}
            </Text>
          </View>
        </View>
        
        <Text style={styles.pageNumber}>1/2</Text>
      </Page>

      {/* Second Page - Detailed Recommendations with dramatic styling */}
      <Page size={[8.5 * 72, 100 * 72]}  style={styles.page}>
        {/* Dramatic header */}
        <View style={styles.headerBand} />
        <View style={styles.headerAccent} />
        <View style={styles.headerCircle} />
        <View style={styles.headerCircleTwo} />
        <View style={styles.content}>
          <Text style={styles.recommendationsHeader}>Your Personalized Action Plan</Text>

          {processedAnswers.map((answer, index) => {
            if (!answer.selectedOptions.length) return null;

            return (
              <View key={index} style={styles.categoryBox}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>
                    {answer.question?.text?.split('?')[0] || 'Category'}
                  </Text>
                </View>
                <View style={styles.categoryContent}>
                  {answer.selectedOptions.map((option, optIndex) => (
                    <View key={optIndex} style={styles.choiceBox}>
                      <Text style={styles.choiceTitle}>
                        {option.text}
                      </Text>
                      <View style={styles.impactBadge}>
                        <Text style={styles.impactText}>
                          {option.carbonFootprint.toLocaleString()} kg CO₂/year
                        </Text>
                      </View>
                      <View style={styles.performanceBadge}>
                        <Text style={styles.performanceText}>
                          {option.performance}
                        </Text>
                      </View>
                      <View style={styles.recommendationBox}>
                        <Text style={styles.recommendationTitle}>
                          Recommendation:
                        </Text>
                        <Text style={styles.recommendationText}>
                          {option.improvement}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

          {/* Conclusion */}
          <View style={[styles.infoBox, { backgroundColor: '#f0fdfa' }]}>
            <Text style={[styles.infoTitle, { color: '#047857' }]}>Your Path to Sustainability</Text>
            <Text style={styles.recommendationText}>
              By implementing these recommendations, you can significantly reduce your carbon footprint of {totalCarbon.toLocaleString()} kg CO₂/year. 
              Each small change you make has a meaningful impact on our planet.
            </Text>
            <Text style={[styles.recommendationText, { marginTop: 10 }]}>
              Make sure to revisit CarboQuiz regularly to track your progress and discover new ways to reduce your environmental impact.
              Together, we can create a healthier planet for future generations.
            </Text>
          </View>
        </View>

        {/* Dramatic footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              Together we can make a difference #SustainableFuture
            </Text>
          </View>
        </View>
        <Text style={styles.pageNumber}>2/2</Text>
      </Page>
    </Document>
  );
};