'use client';

import { useState, useEffect } from 'react';
import { SavedDoll, DollCustomization } from '@/types/doll';
import { getSavedDolls, deleteSavedDoll } from '@/utils/screenshot';

interface SavedDollsProps {
  onLoad: (customization: DollCustomization) => void;
}

export default function SavedDolls({ onLoad }: SavedDollsProps) {
  const [savedDolls, setSavedDolls] = useState<SavedDoll[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSavedDolls();
    }
  }, [isOpen]);

  const loadSavedDolls = () => {
    const dolls = getSavedDolls();
    setSavedDolls(dolls);
  };

  const handleDelete = (id: string) => {
    deleteSavedDoll(id);
    loadSavedDolls();
  };

  const handleLoad = (customization: DollCustomization) => {
    onLoad(customization);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-600 transition-all font-semibold z-10"
      >
        📁 My Dolls ({savedDolls.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Saved Dolls</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {savedDolls.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No saved dolls yet!</p>
                  <p className="text-sm mt-2">Create and save your first doll to see it here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {savedDolls.map((doll) => (
                    <div
                      key={doll.id}
                      className="border-2 border-gray-200 rounded-lg p-3 hover:border-pink-300 transition-all"
                    >
                      <img
                        src={doll.imageData}
                        alt="Saved doll"
                        className="w-full h-48 object-contain mb-3 rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoad(doll.customization)}
                          className="flex-1 bg-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDelete(doll.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(doll.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

