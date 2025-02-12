import React, { useRef, useEffect } from 'react';

interface ShareImageProps {
  playerRank: number;
  totalParticipants: number;
  carbonScore: number;
  onImageGenerated: (imageUrl: string) => void;
}

export const ShareImage: React.FC<ShareImageProps> = ({
  playerRank,
  totalParticipants,
  carbonScore,
  onImageGenerated
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 630;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f0fdf4');
    gradient.addColorStop(1, '#dcfce7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add logo or brand name
    ctx.fillStyle = '#166534';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Carbon Footprint Challenge', canvas.width / 2, 100);

    // Add rank information
    ctx.fillStyle = '#15803d';
    ctx.font = 'bold 120px Arial';
    ctx.fillText(`Rank #${playerRank}`, canvas.width / 2, canvas.height / 2 - 50);

    // Add total participants
    ctx.fillStyle = '#374151';
    ctx.font = '36px Arial';
    ctx.fillText(`Out of ${totalParticipants} participants`, canvas.width / 2, canvas.height / 2 + 50);

    // Add carbon score
    ctx.fillStyle = '#374151';
    ctx.font = '32px Arial';
    ctx.fillText(`Carbon Score: ${carbonScore.toFixed(2)} kg CO2e`, canvas.width / 2, canvas.height / 2 + 120);

    // Add decorative elements
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 580);
    ctx.lineTo(1100, 580);
    ctx.stroke();

    // Convert canvas to image URL
    const imageUrl = canvas.toDataURL('image/png');
    onImageGenerated(imageUrl);
  }, [playerRank, totalParticipants, carbonScore]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'none' }}
    />
  );
};
