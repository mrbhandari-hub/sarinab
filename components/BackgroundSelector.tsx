'use client';

import { BackgroundType, BACKGROUNDS } from '@/types/doll';
import { getBackgroundStyle } from '@/utils/backgroundStyles';

interface BackgroundSelectorProps {
  selected: BackgroundType;
  onSelect: (background: BackgroundType) => void;
}

export default function BackgroundSelector({
  selected,
  onSelect,
}: BackgroundSelectorProps) {
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

