export type EyeColor = 
  | 'brown' 
  | 'blue' 
  | 'green' 
  | 'hazel' 
  | 'gray' 
  | 'amber';

export type SkinTone = 
  | 'fair' 
  | 'light' 
  | 'medium' 
  | 'tan' 
  | 'brown' 
  | 'dark';

export type HairStyle = 
  | 'short' 
  | 'long-straight' 
  | 'long-wavy' 
  | 'curly' 
  | 'bun' 
  | 'ponytail' 
  | 'braids' 
  | 'bob';

export type HairColor = 
  | 'black' 
  | 'brown' 
  | 'blonde' 
  | 'red' 
  | 'gray' 
  | 'pink' 
  | 'blue' 
  | 'purple';

export type OutfitStyle = 
  | 'dress-casual' 
  | 'dress-formal' 
  | 'jeans-tshirt' 
  | 'skirt-blouse' 
  | 'shorts-tank' 
  | 'business-suit' 
  | 'hoodie-pants';

export type AccessoryType = 
  | 'none' 
  | 'necklace' 
  | 'earrings' 
  | 'glasses' 
  | 'hat' 
  | 'scarf' 
  | 'watch';

export type ShoeStyle = 
  | 'sneakers' 
  | 'boots' 
  | 'heels' 
  | 'flats' 
  | 'sandals';

export type SockStyle = 
  | 'none' 
  | 'ankle' 
  | 'crew' 
  | 'knee-high';

export type PurseStyle = 
  | 'none' 
  | 'handbag' 
  | 'tote' 
  | 'clutch' 
  | 'backpack' 
  | 'crossbody';

export type BackgroundType = 
  | 'solid-pink' 
  | 'solid-blue' 
  | 'solid-purple' 
  | 'gradient-sunset' 
  | 'gradient-ocean' 
  | 'gradient-forest' 
  | 'pattern-stars' 
  | 'pattern-hearts' 
  | 'pattern-dots';

export interface DollCustomization {
  eyeColor: EyeColor;
  skinTone: SkinTone;
  hairStyle: HairStyle;
  hairColor: HairColor;
  outfitStyle: OutfitStyle;
  outfitColor: string;
  accessory: AccessoryType;
  shoeStyle: ShoeStyle;
  shoeColor: string;
  sockStyle: SockStyle;
  purseStyle: PurseStyle;
  purseColor: string;
  background: BackgroundType;
}

export interface SavedDoll {
  id: string;
  customization: DollCustomization;
  imageData: string;
  createdAt: number;
}

export const DEFAULT_CUSTOMIZATION: DollCustomization = {
  eyeColor: 'brown',
  skinTone: 'medium',
  hairStyle: 'long-straight',
  hairColor: 'brown',
  outfitStyle: 'dress-casual',
  outfitColor: '#FF69B4',
  accessory: 'none',
  shoeStyle: 'sneakers',
  shoeColor: '#FFFFFF',
  sockStyle: 'none',
  purseStyle: 'none',
  purseColor: '#8B4513',
  background: 'solid-pink',
};

export const EYE_COLORS: { value: EyeColor; label: string; color: string }[] = [
  { value: 'brown', label: 'Brown', color: '#8B4513' },
  { value: 'blue', label: 'Blue', color: '#4169E1' },
  { value: 'green', label: 'Green', color: '#228B22' },
  { value: 'hazel', label: 'Hazel', color: '#8E7618' },
  { value: 'gray', label: 'Gray', color: '#708090' },
  { value: 'amber', label: 'Amber', color: '#FFBF00' },
];

export const SKIN_TONES: { value: SkinTone; label: string; color: string }[] = [
  { value: 'fair', label: 'Fair', color: '#FFDFC4' },
  { value: 'light', label: 'Light', color: '#F0C89E' },
  { value: 'medium', label: 'Medium', color: '#D4A574' },
  { value: 'tan', label: 'Tan', color: '#C68642' },
  { value: 'brown', label: 'Brown', color: '#8D5524' },
  { value: 'dark', label: 'Dark', color: '#5C4033' },
];

export const HAIR_STYLES: { value: HairStyle; label: string }[] = [
  { value: 'short', label: 'Short' },
  { value: 'long-straight', label: 'Long Straight' },
  { value: 'long-wavy', label: 'Long Wavy' },
  { value: 'curly', label: 'Curly' },
  { value: 'bun', label: 'Bun' },
  { value: 'ponytail', label: 'Ponytail' },
  { value: 'braids', label: 'Braids' },
  { value: 'bob', label: 'Bob' },
];

export const HAIR_COLORS: { value: HairColor; label: string; color: string }[] = [
  { value: 'black', label: 'Black', color: '#000000' },
  { value: 'brown', label: 'Brown', color: '#8B4513' },
  { value: 'blonde', label: 'Blonde', color: '#FFD700' },
  { value: 'red', label: 'Red', color: '#DC143C' },
  { value: 'gray', label: 'Gray', color: '#C0C0C0' },
  { value: 'pink', label: 'Pink', color: '#FF69B4' },
  { value: 'blue', label: 'Blue', color: '#4169E1' },
  { value: 'purple', label: 'Purple', color: '#9370DB' },
];

export const OUTFIT_STYLES: { value: OutfitStyle; label: string }[] = [
  { value: 'dress-casual', label: 'Casual Dress' },
  { value: 'dress-formal', label: 'Formal Dress' },
  { value: 'jeans-tshirt', label: 'Jeans & T-Shirt' },
  { value: 'skirt-blouse', label: 'Skirt & Blouse' },
  { value: 'shorts-tank', label: 'Shorts & Tank' },
  { value: 'business-suit', label: 'Business Suit' },
  { value: 'hoodie-pants', label: 'Hoodie & Pants' },
];

export const ACCESSORIES: { value: AccessoryType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'necklace', label: 'Necklace' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'glasses', label: 'Glasses' },
  { value: 'hat', label: 'Hat' },
  { value: 'scarf', label: 'Scarf' },
  { value: 'watch', label: 'Watch' },
];

export const SHOE_STYLES: { value: ShoeStyle; label: string }[] = [
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'boots', label: 'Boots' },
  { value: 'heels', label: 'Heels' },
  { value: 'flats', label: 'Flats' },
  { value: 'sandals', label: 'Sandals' },
];

export const SOCK_STYLES: { value: SockStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'ankle', label: 'Ankle Socks' },
  { value: 'crew', label: 'Crew Socks' },
  { value: 'knee-high', label: 'Knee-High Socks' },
];

export const PURSE_STYLES: { value: PurseStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'handbag', label: 'Handbag' },
  { value: 'tote', label: 'Tote Bag' },
  { value: 'clutch', label: 'Clutch' },
  { value: 'backpack', label: 'Backpack' },
  { value: 'crossbody', label: 'Crossbody' },
];

export const BACKGROUNDS: { value: BackgroundType; label: string }[] = [
  { value: 'solid-pink', label: 'Pink' },
  { value: 'solid-blue', label: 'Blue' },
  { value: 'solid-purple', label: 'Purple' },
  { value: 'gradient-sunset', label: 'Sunset' },
  { value: 'gradient-ocean', label: 'Ocean' },
  { value: 'gradient-forest', label: 'Forest' },
  { value: 'pattern-stars', label: 'Stars' },
  { value: 'pattern-hearts', label: 'Hearts' },
  { value: 'pattern-dots', label: 'Dots' },
];

