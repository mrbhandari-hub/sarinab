'use client';

import { BackgroundType, BACKGROUNDS } from '@/types/doll';

interface BackgroundSelectorProps {
  selected: BackgroundType;
  onSelect: (background: BackgroundType) => void;
}

export default function BackgroundSelector({
  selected,
  onSelect,
}: BackgroundSelectorProps) {
  const getBackgroundStyle = (bg: BackgroundType): React.CSSProperties => {
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Background</h3>
      <div className="grid grid-cols-3 gap-3">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.value}
            onClick={() => onSelect(bg.value)}
            className={`relative h-20 rounded-lg border-4 transition-all overflow-hidden ${
              selected === bg.value
                ? 'border-pink-500 scale-105 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={getBackgroundStyle(bg.value)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-800 bg-white bg-opacity-75 px-2 py-1 rounded">
                {bg.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

