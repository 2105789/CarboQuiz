import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon, X, Instagram, Download } from 'lucide-react';

const climateQuotes = [
  "Every action counts in the fight against climate change. I reduced my carbon footprint!",
  "Small changes lead to big impacts. Join me in reducing carbon emissions!",
  "Together we can make a difference. Check out my carbon footprint score!",
  "Climate action starts with awareness. Take the carbon footprint quiz now!",
  "Proud to be part of the solution! Check out my carbon footprint progress!",
];

type SharePlatform = 'twitter' | 'facebook' | 'linkedin' | 'instagram';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerRank?: number;
  totalParticipants?: number;
  carbonScore?: number;
}

interface ShareData {
  title: string;
  text: string;
  url: string;
  files?: File[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  playerRank,
  totalParticipants,
  carbonScore = 0
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareError, setShareError] = useState<string>('');

  useEffect(() => {
    if (isOpen && playerRank && totalParticipants) {
      generateShareImage();
    }
  }, [isOpen, playerRank, totalParticipants]);

  const generateShareImage = async () => {
    setIsGeneratingImage(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Canvas context not supported');

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#f0fdf4');
      gradient.addColorStop(1, '#dcfce7');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Title
      ctx.fillStyle = '#166534';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Carbon Footprint Challenge', canvas.width / 2, 100);

      // Rank
      ctx.fillStyle = '#15803d';
      ctx.font = 'bold 120px Arial';
      ctx.fillText(`Rank #${playerRank}`, canvas.width / 2, canvas.height / 2 - 50);

      // Participants
      ctx.fillStyle = '#374151';
      ctx.font = '36px Arial';
      ctx.fillText(`Out of ${totalParticipants} participants`, canvas.width / 2, canvas.height / 2 + 50);

      // Carbon Score
      ctx.fillStyle = '#374151';
      ctx.font = '32px Arial';
      ctx.fillText(`Carbon Score: ${carbonScore.toFixed(2)} kg CO2e`, canvas.width / 2, canvas.height / 2 + 120);

      // Decorative elements
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(100, 580);
      ctx.lineTo(1100, 580);
      ctx.stroke();

      setShareImageUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error generating image:', error);
      setShareError('Failed to generate share image');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const randomQuote = climateQuotes[Math.floor(Math.random() * climateQuotes.length)];
  const shareText = playerRank 
    ? `${randomQuote} I ranked #${playerRank} out of ${totalParticipants} participants in the Carbon Footprint Challenge!` 
    : randomQuote;
  const shareUrl = window.location.href;

  const handleShare = async (platform: SharePlatform) => {
    try {
      if (navigator.share && platform !== 'linkedin') {
        const shareData: ShareData = {
          title: 'Carbon Footprint Challenge',
          text: shareText,
          url: shareUrl,
        };

        if (shareImageUrl) {
          const response = await fetch(shareImageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'share.png', { type: 'image/png' });
          shareData.files = [file];
        }

        await navigator.share(shareData);
        return;
      }

      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Carbon Footprint Challenge')}&summary=${encodeURIComponent(shareText)}`,
        instagram: `instagram://library?AssetPath=${encodeURIComponent(shareImageUrl)}`,
      } as const;

      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error sharing:', error);
      setShareError('Failed to share. Please try again.');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setShareError('Failed to copy to clipboard');
    }
  };

  const downloadImage = async () => {
    if (!shareImageUrl) return;
    
    const link = document.createElement('a');
    link.href = shareImageUrl;
    link.download = 'carbon-footprint-challenge.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Share Your Impact</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {shareError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {shareError}
          </div>
        )}

        {isGeneratingImage ? (
          <div className="h-48 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : shareImageUrl && (
          <div className="mb-6 relative group">
            <img
              src={shareImageUrl}
              alt="Your Carbon Footprint Achievement"
              className="w-full rounded-lg shadow-md"
            />
            <button
              onClick={downloadImage}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              title="Download Image"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg">
          {shareText}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </button>

          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center gap-2 bg-[#4267B2] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center justify-center gap-2 bg-[#0077B5] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </button>

          <button
            onClick={() => handleShare('instagram')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#405DE6] to-[#E1306C] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className={`w-full flex items-center justify-center gap-2 ${
            copySuccess ? 'bg-green-500' : 'bg-gray-800'
          } text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all`}
        >
          <LinkIcon className="w-5 h-5" />
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};
