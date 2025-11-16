'use client';

import { DollCustomization } from '@/types/doll';
import {
  EYE_COLORS,
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  OUTFIT_STYLES,
  ACCESSORIES,
  SHOE_STYLES,
  SOCK_STYLES,
  PURSE_STYLES,
} from '@/types/doll';
import { useState } from 'react';

interface CustomizationPanelProps {
  customization: DollCustomization;
  onUpdate: (updates: Partial<DollCustomization>) => void;
}

type Category = 'face' | 'hair' | 'outfit' | 'accessories' | 'shoes' | 'purse';

export default function CustomizationPanel({
  customization,
  onUpdate,
}: CustomizationPanelProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('face');

  const categories: { value: Category; label: string; icon: string }[] = [
    { value: 'face', label: 'Face', icon: '👤' },
    { value: 'hair', label: 'Hair', icon: '💇' },
    { value: 'outfit', label: 'Outfit', icon: '👗' },
    { value: 'accessories', label: 'Accessories', icon: '💎' },
    { value: 'shoes', label: 'Shoes', icon: '👠' },
    { value: 'purse', label: 'Purse', icon: '👜' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Your Doll</h2>
      
      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.value
                ? 'bg-pink-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Customization Options */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {activeCategory === 'face' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Eye Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {EYE_COLORS.map((eye) => (
                  <button
                    key={eye.value}
                    onClick={() => onUpdate({ eyeColor: eye.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.eyeColor === eye.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-300"
                      style={{ backgroundColor: eye.color }}
                    />
                    <div className="text-xs text-gray-600">{eye.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skin Tone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SKIN_TONES.map((skin) => (
                  <button
                    key={skin.value}
                    onClick={() => onUpdate({ skinTone: skin.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.skinTone === skin.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-300"
                      style={{ backgroundColor: skin.color }}
                    />
                    <div className="text-xs text-gray-600">{skin.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeCategory === 'hair' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hair Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HAIR_STYLES.map((hair) => (
                  <button
                    key={hair.value}
                    onClick={() => onUpdate({ hairStyle: hair.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.hairStyle === hair.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {hair.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hair Color
              </label>
              <div className="grid grid-cols-4 gap-2">
                {HAIR_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onUpdate({ hairColor: color.value })}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      customization.hairColor === color.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-300"
                      style={{ backgroundColor: color.color }}
                    />
                    <div className="text-xs text-gray-600">{color.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeCategory === 'outfit' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Outfit Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {OUTFIT_STYLES.map((outfit) => (
                  <button
                    key={outfit.value}
                    onClick={() => onUpdate({ outfitStyle: outfit.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.outfitStyle === outfit.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {outfit.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Outfit Color
              </label>
              <input
                type="color"
                value={customization.outfitColor}
                onChange={(e) => onUpdate({ outfitColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
              />
            </div>
          </>
        )}

        {activeCategory === 'accessories' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Accessories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES.map((accessory) => (
                <button
                  key={accessory.value}
                  onClick={() => onUpdate({ accessory: accessory.value })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    customization.accessory === accessory.value
                      ? 'border-pink-500 bg-pink-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-700">
                    {accessory.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'shoes' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shoe Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHOE_STYLES.map((shoe) => (
                  <button
                    key={shoe.value}
                    onClick={() => onUpdate({ shoeStyle: shoe.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.shoeStyle === shoe.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {shoe.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shoe Color
              </label>
              <input
                type="color"
                value={customization.shoeColor}
                onChange={(e) => onUpdate({ shoeColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Socks
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SOCK_STYLES.map((sock) => (
                  <button
                    key={sock.value}
                    onClick={() => onUpdate({ sockStyle: sock.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.sockStyle === sock.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {sock.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeCategory === 'purse' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Purse Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PURSE_STYLES.map((purse) => (
                  <button
                    key={purse.value}
                    onClick={() => onUpdate({ purseStyle: purse.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      customization.purseStyle === purse.value
                        ? 'border-pink-500 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {purse.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {customization.purseStyle !== 'none' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Purse Color
                </label>
                <input
                  type="color"
                  value={customization.purseColor}
                  onChange={(e) => onUpdate({ purseColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

