'use client';

import { DollCustomization } from '@/types/doll';
import { SKIN_TONES, EYE_COLORS, HAIR_COLORS } from '@/types/doll';

interface DollProps {
  customization: DollCustomization;
}

export default function Doll({ customization }: DollProps) {
  const skinColor = SKIN_TONES.find(t => t.value === customization.skinTone)?.color || '#D4A574';
  const eyeColor = EYE_COLORS.find(e => e.value === customization.eyeColor)?.color || '#8B4513';
  const hairColor = HAIR_COLORS.find(h => h.value === customization.hairColor)?.color || '#8B4513';

  return (
    <svg
      viewBox="0 0 300 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <g id="body">
        {/* Neck */}
        <rect x="140" y="145" width="20" height="20" fill={skinColor} rx="5" />
        
        {/* Torso */}
        <ellipse cx="150" cy="230" rx="50" ry="65" fill={skinColor} />
        
        {/* Arms */}
        <rect x="90" y="180" width="18" height="75" fill={skinColor} rx="9" />
        <rect x="192" y="180" width="18" height="75" fill={skinColor} rx="9" />
        
        {/* Legs */}
        <rect x="125" y="285" width="20" height="95" fill={skinColor} rx="10" />
        <rect x="155" y="285" width="20" height="95" fill={skinColor} rx="10" />
      </g>

      {/* Hair - Behind head for some styles */}
      {(customization.hairStyle === 'long-straight' || 
        customization.hairStyle === 'long-wavy' ||
        customization.hairStyle === 'curly') && (
        <g id="hair-back">
          {customization.hairStyle === 'long-straight' && (
            <>
              <path d="M 105 90 Q 100 160 105 230" fill={hairColor} />
              <path d="M 195 90 Q 200 160 195 230" fill={hairColor} />
            </>
          )}
          {customization.hairStyle === 'long-wavy' && (
            <>
              <path d="M 105 90 Q 95 130 100 170 Q 95 210 105 240" fill={hairColor} />
              <path d="M 195 90 Q 205 130 200 170 Q 205 210 195 240" fill={hairColor} />
            </>
          )}
          {customization.hairStyle === 'curly' && (
            <>
              <circle cx="100" cy="100" r="20" fill={hairColor} opacity="0.9" />
              <circle cx="110" cy="120" r="18" fill={hairColor} opacity="0.9" />
              <circle cx="200" cy="100" r="20" fill={hairColor} opacity="0.9" />
              <circle cx="190" cy="120" r="18" fill={hairColor} opacity="0.9" />
            </>
          )}
        </g>
      )}

      {/* Head */}
      <ellipse cx="150" cy="110" rx="45" ry="52" fill={skinColor} />

      {/* Eyes */}
      <g id="eyes">
        <ellipse cx="135" cy="105" rx="8" ry="10" fill="white" />
        <ellipse cx="165" cy="105" rx="8" ry="10" fill="white" />
        <circle cx="135" cy="107" r="5" fill={eyeColor} />
        <circle cx="165" cy="107" r="5" fill={eyeColor} />
        <circle cx="136" cy="105" r="2.5" fill="black" />
        <circle cx="166" cy="105" r="2.5" fill="black" />
      </g>

      {/* Mouth */}
      <path
        d="M 140 125 Q 150 130 160 125"
        stroke="#FF1493"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Outfit */}
      <g id="outfit">
        {customization.outfitStyle === 'dress-casual' && (
          <>
            <path 
              d="M 100 165 L 200 165 L 195 285 L 105 285 Z" 
              fill={customization.outfitColor} 
            />
            <rect x="98" y="165" width="104" height="20" fill={customization.outfitColor} rx="5" />
          </>
        )}
        
        {customization.outfitStyle === 'dress-formal' && (
          <>
            <path 
              d="M 100 165 L 200 165 L 210 305 L 90 305 Z" 
              fill={customization.outfitColor} 
            />
            <rect x="98" y="165" width="104" height="15" fill={customization.outfitColor} />
          </>
        )}
        
        {customization.outfitStyle === 'jeans-tshirt' && (
          <>
            <rect x="100" y="165" width="100" height="60" fill={customization.outfitColor} rx="10" />
            <rect x="125" y="225" width="22" height="60" fill="#4169E1" rx="5" />
            <rect x="153" y="225" width="22" height="60" fill="#4169E1" rx="5" />
          </>
        )}
        
        {customization.outfitStyle === 'skirt-blouse' && (
          <>
            <rect x="100" y="165" width="100" height="50" fill={customization.outfitColor} rx="10" />
            <path d="M 110 215 L 190 215 L 185 275 L 115 275 Z" fill="#FF1493" />
          </>
        )}
        
        {customization.outfitStyle === 'shorts-tank' && (
          <>
            <rect x="105" y="165" width="90" height="55" fill={customization.outfitColor} rx="8" />
            <rect x="125" y="220" width="22" height="35" fill="#FFD700" rx="5" />
            <rect x="153" y="220" width="22" height="35" fill="#FFD700" rx="5" />
          </>
        )}
        
        {customization.outfitStyle === 'business-suit' && (
          <>
            <rect x="100" y="165" width="100" height="120" fill={customization.outfitColor} rx="5" />
            <rect x="120" y="175" width="60" height="40" fill="white" rx="3" />
            <line x1="150" y1="175" x2="150" y2="215" stroke={customization.outfitColor} strokeWidth="3" />
          </>
        )}
        
        {customization.outfitStyle === 'hoodie-pants' && (
          <>
            <rect x="98" y="165" width="104" height="70" fill={customization.outfitColor} rx="12" />
            <path d="M 130 165 L 170 165 L 165 180 L 135 180 Z" fill={customization.outfitColor} />
            <rect x="125" y="235" width="22" height="50" fill="#696969" rx="5" />
            <rect x="153" y="235" width="22" height="50" fill="#696969" rx="5" />
          </>
        )}
      </g>

      {/* Shoes */}
      <g id="shoes">
        {customization.shoeStyle === 'sneakers' && (
          <>
            <ellipse cx="135" cy="385" rx="18" ry="10" fill={customization.shoeColor} />
            <ellipse cx="165" cy="385" rx="18" ry="10" fill={customization.shoeColor} />
            <rect x="117" y="380" width="36" height="8" fill={customization.shoeColor} rx="4" />
            <rect x="147" y="380" width="36" height="8" fill={customization.shoeColor} rx="4" />
          </>
        )}
        
        {customization.shoeStyle === 'boots' && (
          <>
            <rect x="120" y="360" width="25" height="25" fill={customization.shoeColor} rx="3" />
            <rect x="155" y="360" width="25" height="25" fill={customization.shoeColor} rx="3" />
            <rect x="120" y="382" width="25" height="6" fill={customization.shoeColor} />
            <rect x="155" y="382" width="25" height="6" fill={customization.shoeColor} />
          </>
        )}
        
        {customization.shoeStyle === 'heels' && (
          <>
            <ellipse cx="135" cy="383" rx="15" ry="8" fill={customization.shoeColor} />
            <ellipse cx="165" cy="383" rx="15" ry="8" fill={customization.shoeColor} />
            <rect x="130" y="383" width="4" height="10" fill={customization.shoeColor} />
            <rect x="163" y="383" width="4" height="10" fill={customization.shoeColor} />
          </>
        )}
        
        {customization.shoeStyle === 'flats' && (
          <>
            <ellipse cx="135" cy="385" rx="16" ry="8" fill={customization.shoeColor} />
            <ellipse cx="165" cy="385" rx="16" ry="8" fill={customization.shoeColor} />
          </>
        )}
        
        {customization.shoeStyle === 'sandals' && (
          <>
            <ellipse cx="135" cy="385" rx="14" ry="6" fill={customization.shoeColor} />
            <ellipse cx="165" cy="385" rx="14" ry="6" fill={customization.shoeColor} />
            <line x1="125" y1="382" x2="135" y2="370" stroke={customization.shoeColor} strokeWidth="2" />
            <line x1="155" y1="382" x2="165" y2="370" stroke={customization.shoeColor} strokeWidth="2" />
          </>
        )}
      </g>

      {/* Socks */}
      {customization.sockStyle !== 'none' && (
        <g id="socks">
          {customization.sockStyle === 'ankle' && (
            <>
              <rect x="123" y="375" width="22" height="8" fill="white" rx="2" />
              <rect x="155" y="375" width="22" height="8" fill="white" rx="2" />
            </>
          )}
          {customization.sockStyle === 'crew' && (
            <>
              <rect x="123" y="360" width="22" height="23" fill="white" rx="3" />
              <rect x="155" y="360" width="22" height="23" fill="white" rx="3" />
            </>
          )}
          {customization.sockStyle === 'knee-high' && (
            <>
              <rect x="123" y="320" width="22" height="63" fill="white" rx="4" />
              <rect x="155" y="320" width="22" height="63" fill="white" rx="4" />
            </>
          )}
        </g>
      )}

      {/* Hair - Front layer (frames the face, doesn't cover it) */}
      <g id="hair-front">
        {customization.hairStyle === 'short' && (
          <>
            <ellipse cx="150" cy="75" rx="50" ry="25" fill={hairColor} />
            <rect x="100" y="65" width="100" height="25" fill={hairColor} />
          </>
        )}
        
        {(customization.hairStyle === 'long-straight' || 
          customization.hairStyle === 'long-wavy' || 
          customization.hairStyle === 'curly') && (
          <>
            <ellipse cx="150" cy="78" rx="52" ry="28" fill={hairColor} />
            <rect x="98" y="70" width="104" height="20" fill={hairColor} />
          </>
        )}
        
        {customization.hairStyle === 'bun' && (
          <>
            <ellipse cx="150" cy="78" rx="50" ry="26" fill={hairColor} />
            <rect x="100" y="70" width="100" height="20" fill={hairColor} />
            <circle cx="150" cy="55" r="22" fill={hairColor} />
          </>
        )}
        
        {customization.hairStyle === 'ponytail' && (
          <>
            <ellipse cx="150" cy="78" rx="50" ry="26" fill={hairColor} />
            <rect x="100" y="70" width="100" height="20" fill={hairColor} />
            <ellipse cx="185" cy="110" rx="12" ry="45" fill={hairColor} />
          </>
        )}
        
        {customization.hairStyle === 'braids' && (
          <>
            <ellipse cx="150" cy="78" rx="50" ry="26" fill={hairColor} />
            <rect x="100" y="70" width="100" height="20" fill={hairColor} />
            <rect x="108" y="110" width="11" height="65" fill={hairColor} rx="5" />
            <rect x="181" y="110" width="11" height="65" fill={hairColor} rx="5" />
          </>
        )}
        
        {customization.hairStyle === 'bob' && (
          <>
            <ellipse cx="150" cy="78" rx="52" ry="28" fill={hairColor} />
            <rect x="98" y="70" width="104" height="35" fill={hairColor} />
            <ellipse cx="150" cy="125" rx="52" ry="18" fill={hairColor} />
          </>
        )}
      </g>

      {/* Accessories */}
      <g id="accessories">
        {customization.accessory === 'necklace' && (
          <>
            <ellipse cx="150" cy="160" rx="25" ry="8" fill="none" stroke="#FFD700" strokeWidth="3" />
            <circle cx="150" cy="168" r="5" fill="#FFD700" />
          </>
        )}
        
        {customization.accessory === 'earrings' && (
          <>
            <circle cx="112" cy="112" r="5" fill="#FFD700" />
            <circle cx="188" cy="112" r="5" fill="#FFD700" />
          </>
        )}
        
        {customization.accessory === 'glasses' && (
          <>
            <rect x="118" y="98" width="26" height="16" fill="none" stroke="#000000" strokeWidth="2.5" rx="4" />
            <rect x="156" y="98" width="26" height="16" fill="none" stroke="#000000" strokeWidth="2.5" rx="4" />
            <line x1="144" y1="106" x2="156" y2="106" stroke="#000000" strokeWidth="2.5" />
          </>
        )}
        
        {customization.accessory === 'hat' && (
          <g>
            <ellipse cx="150" cy="60" rx="48" ry="12" fill="#8B4513" />
            <path d="M 118 60 L 128 38 L 172 38 L 182 60 Z" fill="#8B4513" />
          </g>
        )}
        
        {customization.accessory === 'scarf' && (
          <>
            <rect x="135" y="155" width="30" height="15" fill="#FF6347" rx="3" />
            <path d="M 135 160 L 120 175" stroke="#FF6347" strokeWidth="8" strokeLinecap="round" />
          </>
        )}
        
        {customization.accessory === 'watch' && (
          <rect x="93" y="210" width="11" height="14" fill="#C0C0C0" rx="2" />
        )}
      </g>

      {/* Purse */}
      {customization.purseStyle !== 'none' && (
        <g id="purse">
          {customization.purseStyle === 'handbag' && (
            <>
              <rect x="70" y="245" width="28" height="32" fill={customization.purseColor} rx="3" />
              <path d="M 76 245 Q 84 234 92 245" stroke={customization.purseColor} strokeWidth="3.5" fill="none" />
            </>
          )}
          
          {customization.purseStyle === 'tote' && (
            <>
              <rect x="68" y="240" width="30" height="38" fill={customization.purseColor} rx="2" />
              <line x1="72" y1="240" x2="72" y2="224" stroke={customization.purseColor} strokeWidth="3.5" />
              <line x1="94" y1="240" x2="94" y2="224" stroke={customization.purseColor} strokeWidth="3.5" />
            </>
          )}
          
          {customization.purseStyle === 'clutch' && (
            <rect x="72" y="252" width="32" height="20" fill={customization.purseColor} rx="2" />
          )}
          
          {customization.purseStyle === 'backpack' && (
            <>
              <rect x="185" y="185" width="28" height="38" fill={customization.purseColor} rx="3" />
              <line x1="187" y1="185" x2="180" y2="174" stroke={customization.purseColor} strokeWidth="3.5" />
              <line x1="211" y1="185" x2="218" y2="174" stroke={customization.purseColor} strokeWidth="3.5" />
            </>
          )}
          
          {customization.purseStyle === 'crossbody' && (
            <>
              <rect x="75" y="252" width="25" height="28" fill={customization.purseColor} rx="2" />
              <path d="M 87 252 Q 120 210 150 185" stroke={customization.purseColor} strokeWidth="3.5" fill="none" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}

