import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { generateEmailTemplate } from './email-template'

// Configure environment variables in your .env.local file
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

// Rate limiting map to store last email sent time for each email address
const emailRateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds in milliseconds

interface Option {
  id: number;
  text: string;
  carbonFootprint: number;
  treeEquivalent: number;
  improvement?: string;
}

interface Answer {
  questionId: number;
  questionText?: string;
  selectedOptions?: Option[];
  selectedOption?: Option; // For legacy support
}

// Helper function to get top carbon-emitting choices
const getTopCarbonEmittingChoices = (answers: Answer[]) => {
  // Flatten all options from all answers and add their carbon footprint
  const allChoices = answers.flatMap(answer => {
    // Handle both legacy and current data structures
    const options = answer.selectedOptions || [];
    return options.map(option => ({
      questionId: answer.questionId,
      questionText: answer.questionText || '',
      ...option,
    }));
  });

  // Sort by carbon footprint in descending order and take top 5
  return allChoices
    .sort((a, b) => b.carbonFootprint - a.carbonFootprint)
    .slice(0, 5);
};

// Helper function to get recommendations based on emission level and top emitting choices
const getRecommendations = (annualEmissionTonnes: number, topChoices: any[]) => {
  const recommendations: string[] = [];
  
  // Add specific recommendations for top 5 carbon-emitting choices
  topChoices.forEach((choice) => {
    recommendations.push(`${choice.questionText}\n${choice.text}\n${choice.improvement || 'Consider more eco-friendly alternatives for this activity.'}`);
  });

  return recommendations;
};

// Helper function to get effort rating with 5-star system
const getEffortRating = (percentageOffset: number) => {
  let effortRating: string;
  let ratingMessage: string;
  let starRating: string;

  if (percentageOffset >= 50) {
    effortRating = "Excellent";
    ratingMessage = "You are making a significant effort to offset your emissions!";
    starRating = "5/5";
  } else if (percentageOffset >= 20) {
    effortRating = "Good";
    ratingMessage = "Your effort to offset emissions is commendable.";
    starRating = "4/5";
  } else if (percentageOffset >= 10) {
    effortRating = "Fair";
    ratingMessage = "You've started offsetting, which is a good step.";
    starRating = "3/5";
  } else if (percentageOffset >= 5) {
    effortRating = "Needs Work";
    ratingMessage = "Consider increasing your offset efforts.";
    starRating = "2/5";
  } else {
    effortRating = "Beginning";
    ratingMessage = "Start your journey to carbon neutrality.";
    starRating = "1/5";
  }
  return { effortRating, ratingMessage, starRating };
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate other required fields
    if (!data.name || !data.totalCarbon || data.totalTrees === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, totalCarbon, or totalTrees' },
        { status: 400 }
      )
    }
    
    // Check rate limiting
    const lastEmailTime = emailRateLimit.get(data.email);
    const currentTime = Date.now();
    
    if (lastEmailTime && currentTime - lastEmailTime < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { 
          error: 'Please wait before requesting another email',
          remainingTime: Math.ceil((RATE_LIMIT_WINDOW - (currentTime - lastEmailTime)) / 1000)
        },
        { status: 429 }
      )
    }
    
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error('Missing email configuration:', { EMAIL_USER, EMAIL_PASS })
      throw new Error('Email configuration is missing')
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    })

    // Verify transporter
    await transporter.verify()

    // Get top carbon-emitting choices and recommendations
    const topChoices = getTopCarbonEmittingChoices(data.answers || []);
    const recommendationsList = getRecommendations(data.totalCarbon / 1000, topChoices);

    const mailOptions = {
      from: `"Carbon Footprint Report" <${EMAIL_USER}>`,
      to: data.email.trim(),
      subject: 'Your Carbon Emission & Tree Offset Report',
      html: generateEmailTemplate(
        data.name,
        data.totalCarbon,
        data.totalTrees,
        recommendationsList
      )
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      
      // Update rate limit map after successful email send
      emailRateLimit.set(data.email, currentTime);
      
      // Clean up old entries from the rate limit map
      const cleanupTime = currentTime - RATE_LIMIT_WINDOW;
      Array.from(emailRateLimit.keys()).forEach(email => {
        if (emailRateLimit.get(email)! < cleanupTime) {
          emailRateLimit.delete(email);
        }
      });

      console.log('Message sent: %s', info.messageId)

      return NextResponse.json({ 
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId
      })
    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: emailError.message || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
} 