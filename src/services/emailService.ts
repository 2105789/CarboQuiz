import { Answer } from '../types';

export const sendCarbonReport = async (
  email: string,
  name: string,
  totalCarbon: number,
  totalTrees: number,
  answers: Answer[]
) => {
  // Validate required fields before making the request
  if (!email?.trim()) {
    throw new Error('Email address is required');
  }
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  if (totalCarbon === undefined || totalCarbon === null) {
    throw new Error('Total carbon is required');
  }
  if (totalTrees === undefined || totalTrees === null) {
    throw new Error('Total trees is required');
  }

  try {
    const response = await fetch('/api/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        name: name.trim(),
        totalCarbon,
        totalTrees,
        answers
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();
    console.log('Email sent successfully:', data.message);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 