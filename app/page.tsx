'use client';

import { useState } from 'react';
import Doll from '@/components/Doll';
import CustomizationPanel from '@/components/CustomizationPanel';
import BackgroundSelector from '@/components/BackgroundSelector';
import SavedDolls from '@/components/SavedDolls';
import { DollCustomization, DEFAULT_CUSTOMIZATION } from '@/types/doll';
import { captureScreenshot, downloadImage, saveDollToLocalStorage } from '@/utils/screenshot';

export default function Home() {
  const [customization, setCustomization] = useState<DollCustomization>(DEFAULT_CUSTOMIZATION);
  const [showSaveOptions, setShowSaveOptions] = useState(false);

  const handleUpdate = (updates: Partial<DollCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...updates }));
  };

  const getBackgroundStyle = (bg: string): React.CSSProperties => {
    switch (bg) {
      case 'solid-pink':
        return { backgroundColor: '#FFB6C1' };
      case 'solid-blue':
        return { backgroundColor: '#87CEEB' };
      case 'solid-purple':
        return { backgroundColor: '#DDA0DD' };
      case 'gradient-sunset':
        return {
          background: 'linear-gradient(to bottom, #FF6B6B, #FFD93D, #FCA5F1)',
        };
      case 'gradient-ocean':
        return {
          background: 'linear-gradient(to bottom, #4FACFE, #00F2FE)',
        };
      case 'gradient-forest':
        return {
          background: 'linear-gradient(to bottom, #134E5E, #71B280)',
        };
      case 'pattern-stars':
        return {
          backgroundColor: '#1a1a2e',
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        };
      case 'pattern-hearts':
        return {
          backgroundColor: '#FFE4E1',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30c-5-5-10-10-10-15 0-4 3-7 6-7 2 0 4 1 4 3 0-2 2-3 4-3 3 0 6 3 6 7 0 5-5 10-10 15z' fill='%23FF69B4' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        };
      case 'pattern-dots':
        return {
          backgroundColor: '#FFE5B4',
          backgroundImage: `radial-gradient(circle, #FF69B4 2px, transparent 2px)`,
          backgroundSize: '25px 25px',
        };
      default:
        return { backgroundColor: '#FFB6C1' };
    }
  };

  const handleTakeScreenshot = async () => {
    try {
      const imageData = await captureScreenshot('doll-display');
      setShowSaveOptions(true);
      
      // Automatically save to gallery
      const id = `doll-${Date.now()}`;
      saveDollToLocalStorage(id, { customization, imageData });
      
      // Download the image
      downloadImage(imageData);
      
      setTimeout(() => {
        setShowSaveOptions(false);
      }, 2000);
    } catch (error) {
      console.error('Error taking screenshot:', error);
      alert('Failed to capture screenshot. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
            Creative Dolls
          </h1>
          <p className="text-gray-600 text-lg">
            Design your perfect doll and bring it to life! ✨
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Panel - Customization */}
          <div className="lg:col-span-1 h-[600px] lg:h-auto">
            <CustomizationPanel
              customization={customization}
              onUpdate={handleUpdate}
            />
          </div>

          {/* Center - Doll Display */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div
              id="doll-display"
              className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center aspect-square"
              style={getBackgroundStyle(customization.background)}
            >
              <div className="w-full max-w-md">
                <Doll customization={customization} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleTakeScreenshot}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                📸 Save Doll
              </button>
              <button
                onClick={() => setCustomization(DEFAULT_CUSTOMIZATION)}
                className="bg-gray-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-600 transition-all"
              >
                🔄 Reset
              </button>
            </div>

            {showSaveOptions && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl text-center font-semibold animate-bounce">
                ✅ Doll saved successfully!
              </div>
            )}
          </div>

          {/* Right Panel - Background Selector */}
          <div className="lg:col-span-1">
            <BackgroundSelector
              selected={customization.background}
              onSelect={(bg) => handleUpdate({ background: bg })}
            />
          </div>
        </div>

        {/* Saved Dolls Modal Trigger */}
        <SavedDolls onLoad={setCustomization} />
      </div>
    </main>
  );
}
