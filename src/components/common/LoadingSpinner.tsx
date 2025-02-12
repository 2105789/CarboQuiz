import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
    <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
  </div>
);