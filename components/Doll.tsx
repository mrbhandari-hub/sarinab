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

  // Calculate darker shade for shadows
  const darkerSkin = `color-mix(in srgb, ${skinColor} 85%, black)`;
  const lighterSkin = `color-mix(in srgb, ${skinColor} 90%, white)`;

  return (
    <svg
      viewBox="0 0 300 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients for realistic shading */}
        <radialGradient id="faceGradient" cx="50%" cy="40%">
          <stop offset="0%" style={{ stopColor: lighterSkin, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: skinColor, stopOpacity: 1 }} />
        </radialGradient>
        
        <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: darkerSkin, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: skinColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: darkerSkin, stopOpacity: 1 }} />
        </linearGradient>

        <radialGradient id="bodyGradient" cx="50%" cy="30%">
          <stop offset="0%" style={{ stopColor: lighterSkin, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: skinColor, stopOpacity: 1 }} />
        </radialGradient>

        <linearGradient id="hairShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
          <stop offset="50%" style={{ stopColor: hairColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: hairColor, stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>

      {/* Hair - Back layer */}
      {(customization.hairStyle === 'long-straight' || 
        customization.hairStyle === 'long-wavy' ||
        customization.hairStyle === 'curly') && (
        <g id="hair-back">
          {customization.hairStyle === 'long-straight' && (
            <>
              <path d="M 105 85 Q 95 120 98 180 Q 100 220 105 250" 
                    fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
              <path d="M 195 85 Q 205 120 202 180 Q 200 220 195 250" 
                    fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            </>
          )}
          {customization.hairStyle === 'long-wavy' && (
            <>
              <path d="M 105 85 Q 90 110 95 140 Q 85 170 92 200 Q 88 230 95 255" 
                    fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
              <path d="M 195 85 Q 210 110 205 140 Q 215 170 208 200 Q 212 230 205 255" 
                    fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            </>
          )}
          {customization.hairStyle === 'curly' && (
            <>
              <ellipse cx="95" cy="95" rx="22" ry="25" fill={hairColor} opacity="0.9" />
              <ellipse cx="100" cy="125" rx="20" ry="23" fill={hairColor} opacity="0.85" />
              <ellipse cx="205" cy="95" rx="22" ry="25" fill={hairColor} opacity="0.9" />
              <ellipse cx="200" cy="125" rx="20" ry="23" fill={hairColor} opacity="0.85" />
            </>
          )}
        </g>
      )}

      {/* Neck */}
      <path d="M 135 155 Q 140 160 145 162 Q 150 163 155 162 Q 160 160 165 155 L 165 168 Q 150 172 135 168 Z" 
            fill="url(#neckGradient)" />

      {/* Body/Torso */}
      <g id="body">
        <ellipse cx="150" cy="235" rx="52" ry="68" fill="url(#bodyGradient)" />
        {/* Add slight shadow for depth */}
        <ellipse cx="150" cy="235" rx="48" ry="64" fill={skinColor} opacity="0.3" />
      </g>

      {/* Arms */}
      <g id="arms">
        {/* Left arm */}
        <path d="M 98 185 Q 92 210 90 235 Q 89 250 92 265" 
              stroke={skinColor} strokeWidth="20" fill="none" strokeLinecap="round" />
        {/* Left hand */}
        <ellipse cx="92" cy="270" rx="10" ry="12" fill={skinColor} />
        
        {/* Right arm */}
        <path d="M 202 185 Q 208 210 210 235 Q 211 250 208 265" 
              stroke={skinColor} strokeWidth="20" fill="none" strokeLinecap="round" />
        {/* Right hand */}
        <ellipse cx="208" cy="270" rx="10" ry="12" fill={skinColor} />
      </g>

      {/* Legs */}
      <g id="legs">
        <rect x="120" y="290" width="24" height="90" fill={skinColor} rx="12" />
        <rect x="156" y="290" width="24" height="90" fill={skinColor} rx="12" />
      </g>

      {/* Head */}
      <ellipse cx="150" cy="115" rx="48" ry="54" fill="url(#faceGradient)" />
      
      {/* Add chin shadow */}
      <ellipse cx="150" cy="145" rx="35" ry="15" fill={darkerSkin} opacity="0.1" />

      {/* Ears */}
      <ellipse cx="102" cy="115" rx="8" ry="12" fill={skinColor} />
      <ellipse cx="198" cy="115" rx="8" ry="12" fill={skinColor} />
      <ellipse cx="105" cy="115" rx="5" ry="8" fill={darkerSkin} opacity="0.3" />
      <ellipse cx="195" cy="115" rx="5" ry="8" fill={darkerSkin} opacity="0.3" />

      {/* Eyebrows */}
      <path d="M 125 98 Q 135 96 142 97" 
            stroke="#4a3728" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 158 97 Q 165 96 175 98" 
            stroke="#4a3728" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Eyes - More realistic */}
      <g id="eyes">
        {/* Eye whites */}
        <ellipse cx="133" cy="108" rx="11" ry="9" fill="white" />
        <ellipse cx="167" cy="108" rx="11" ry="9" fill="white" />
        
        {/* Iris */}
        <circle cx="133" cy="108" r="7" fill={eyeColor} />
        <circle cx="167" cy="108" r="7" fill={eyeColor} />
        
        {/* Pupils */}
        <circle cx="134" cy="107" r="3.5" fill="black" />
        <circle cx="168" cy="107" r="3.5" fill="black" />
        
        {/* Eye shine/highlights */}
        <circle cx="135" cy="105" r="2" fill="white" opacity="0.9" />
        <circle cx="169" cy="105" r="2" fill="white" opacity="0.9" />
        
        {/* Upper eyelids - subtle shadows */}
        <ellipse cx="133" cy="102" rx="11" ry="4" fill="black" opacity="0.1" />
        <ellipse cx="167" cy="102" rx="11" ry="4" fill="black" opacity="0.1" />
        
        {/* Eyelashes - upper */}
        <path d="M 122 104 Q 120 102 121 100" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 128 102 Q 127 99 128 97" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 138 102 Q 139 99 140 97" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 144 104 Q 146 102 147 100" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        <path d="M 156 104 Q 154 102 153 100" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 162 102 Q 161 99 160 97" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 172 102 Q 173 99 174 97" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 178 104 Q 180 102 181 100" stroke="#2a2a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Nose - subtle and realistic */}
      <path d="M 148 115 Q 147 122 148 126" 
            stroke={darkerSkin} strokeWidth="1.5" fill="none" opacity="0.4" />
      <ellipse cx="145" cy="127" rx="2.5" ry="2" fill={darkerSkin} opacity="0.2" />
      <ellipse cx="153" cy="127" rx="2.5" ry="2" fill={darkerSkin} opacity="0.2" />

      {/* Lips - more realistic */}
      <ellipse cx="150" cy="136" rx="12" ry="5" fill="#d4718e" opacity="0.7" />
      <path d="M 138 136 Q 150 141 162 136" 
            stroke="#c85678" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 142 136 Q 150 134 158 136" 
            stroke="#faa0ba" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Outfit */}
      <g id="outfit">
        {customization.outfitStyle === 'dress-casual' && (
          <>
            <path d="M 98 170 L 202 170 Q 200 200 195 240 Q 192 270 188 290 L 112 290 Q 108 270 105 240 Q 100 200 98 170 Z" 
                  fill={customization.outfitColor} />
            {/* Add dress details */}
            <rect x="98" y="170" width="104" height="25" fill={customization.outfitColor} rx="8" />
            <circle cx="150" cy="182" r="3" fill="white" opacity="0.6" />
            {/* Dress shadow/fold */}
            <path d="M 140 200 Q 150 205 160 200" stroke="black" strokeWidth="1" opacity="0.1" fill="none" />
          </>
        )}
        
        {customization.outfitStyle === 'dress-formal' && (
          <>
            <path d="M 98 170 L 202 170 Q 205 220 208 270 Q 210 290 212 310 L 88 310 Q 90 290 92 270 Q 95 220 98 170 Z" 
                  fill={customization.outfitColor} />
            <rect x="98" y="170" width="104" height="20" fill={customization.outfitColor} />
            <path d="M 120 190 Q 150 195 180 190" stroke="white" strokeWidth="2" opacity="0.3" fill="none" />
          </>
        )}
        
        {customization.outfitStyle === 'jeans-tshirt' && (
          <>
            {/* T-shirt */}
            <path d="M 98 170 L 90 190 L 95 225 L 205 225 L 210 190 L 202 170 Z" 
                  fill={customization.outfitColor} />
            <rect x="100" y="170" width="100" height="60" fill={customization.outfitColor} rx="10" />
            {/* Jeans */}
            <rect x="120" y="230" width="26" height="60" fill="#4169E1" rx="6" />
            <rect x="154" y="230" width="26" height="60" fill="#4169E1" rx="6" />
            {/* Jean details */}
            <line x1="133" y1="235" x2="133" y2="285" stroke="#2c4a8f" strokeWidth="1" opacity="0.5" />
            <line x1="167" y1="235" x2="167" y2="285" stroke="#2c4a8f" strokeWidth="1" opacity="0.5" />
          </>
        )}
        
        {customization.outfitStyle === 'skirt-blouse' && (
          <>
            <rect x="100" y="170" width="100" height="55" fill={customization.outfitColor} rx="12" />
            <path d="M 110 225 L 190 225 L 185 280 L 115 280 Z" fill="#FF1493" />
            <path d="M 135 240 Q 150 245 165 240" stroke="black" strokeWidth="1" opacity="0.1" fill="none" />
          </>
        )}
        
        {customization.outfitStyle === 'shorts-tank' && (
          <>
            <rect x="105" y="170" width="90" height="60" fill={customization.outfitColor} rx="10" />
            <rect x="120" y="230" width="26" height="40" fill="#FFD700" rx="6" />
            <rect x="154" y="230" width="26" height="40" fill="#FFD700" rx="6" />
          </>
        )}
        
        {customization.outfitStyle === 'business-suit' && (
          <>
            <rect x="100" y="170" width="100" height="125" fill={customization.outfitColor} rx="8" />
            <rect x="118" y="180" width="64" height="45" fill="white" rx="4" />
            <line x1="150" y1="180" x2="150" y2="225" stroke={customization.outfitColor} strokeWidth="4" />
            {/* Buttons */}
            <circle cx="150" cy="195" r="3" fill="white" opacity="0.8" />
            <circle cx="150" cy="210" r="3" fill="white" opacity="0.8" />
          </>
        )}
        
        {customization.outfitStyle === 'hoodie-pants' && (
          <>
            <rect x="98" y="170" width="104" height="75" fill={customization.outfitColor} rx="14" />
            <path d="M 130 170 L 170 170 L 167 185 L 133 185 Z" fill={customization.outfitColor} />
            <rect x="120" y="245" width="26" height="55" fill="#696969" rx="6" />
            <rect x="154" y="245" width="26" height="55" fill="#696969" rx="6" />
            {/* Hoodie string */}
            <circle cx="145" cy="180" r="2" fill="white" opacity="0.7" />
            <circle cx="155" cy="180" r="2" fill="white" opacity="0.7" />
          </>
        )}
      </g>

      {/* Shoes */}
      <g id="shoes">
        {customization.shoeStyle === 'sneakers' && (
          <>
            <ellipse cx="132" cy="385" rx="20" ry="11" fill={customization.shoeColor} />
            <ellipse cx="168" cy="385" rx="20" ry="11" fill={customization.shoeColor} />
            <rect x="112" y="378" width="40" height="10" fill={customization.shoeColor} rx="5" />
            <rect x="148" y="378" width="40" height="10" fill={customization.shoeColor} rx="5" />
            {/* Sneaker details */}
            <ellipse cx="132" cy="382" rx="12" ry="5" fill="white" opacity="0.4" />
            <ellipse cx="168" cy="382" rx="12" ry="5" fill="white" opacity="0.4" />
            <line x1="120" y1="383" x2="144" y2="383" stroke="white" strokeWidth="1" opacity="0.6" />
            <line x1="156" y1="383" x2="180" y2="383" stroke="white" strokeWidth="1" opacity="0.6" />
          </>
        )}
        
        {customization.shoeStyle === 'boots' && (
          <>
            <rect x="117" y="360" width="30" height="28" fill={customization.shoeColor} rx="4" />
            <rect x="153" y="360" width="30" height="28" fill={customization.shoeColor} rx="4" />
            <rect x="117" y="385" width="30" height="8" fill={customization.shoeColor} rx="2" />
            <rect x="153" y="385" width="30" height="8" fill={customization.shoeColor} rx="2" />
            {/* Boot details */}
            <line x1="120" y1="370" x2="144" y2="370" stroke="black" strokeWidth="1" opacity="0.2" />
            <line x1="156" y1="370" x2="180" y2="370" stroke="black" strokeWidth="1" opacity="0.2" />
          </>
        )}
        
        {customization.shoeStyle === 'heels' && (
          <>
            <ellipse cx="132" cy="383" rx="17" ry="9" fill={customization.shoeColor} />
            <ellipse cx="168" cy="383" rx="17" ry="9" fill={customization.shoeColor} />
            <rect x="128" y="383" width="5" height="12" fill={customization.shoeColor} />
            <rect x="166" y="383" width="5" height="12" fill={customization.shoeColor} />
            {/* Heel shine */}
            <ellipse cx="132" cy="380" rx="10" ry="4" fill="white" opacity="0.3" />
            <ellipse cx="168" cy="380" rx="10" ry="4" fill="white" opacity="0.3" />
          </>
        )}
        
        {customization.shoeStyle === 'flats' && (
          <>
            <ellipse cx="132" cy="385" rx="18" ry="9" fill={customization.shoeColor} />
            <ellipse cx="168" cy="385" rx="18" ry="9" fill={customization.shoeColor} />
            {/* Flat shoe details */}
            <path d="M 118 385 Q 132 388 146 385" stroke="black" strokeWidth="0.5" opacity="0.2" fill="none" />
            <path d="M 154 385 Q 168 388 182 385" stroke="black" strokeWidth="0.5" opacity="0.2" fill="none" />
          </>
        )}
        
        {customization.shoeStyle === 'sandals' && (
          <>
            <ellipse cx="132" cy="387" rx="16" ry="7" fill={customization.shoeColor} />
            <ellipse cx="168" cy="387" rx="16" ry="7" fill={customization.shoeColor} />
            <line x1="123" y1="384" x2="132" y2="370" stroke={customization.shoeColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="159" y1="384" x2="168" y2="370" stroke={customization.shoeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Socks */}
      {customization.sockStyle !== 'none' && (
        <g id="socks">
          {customization.sockStyle === 'ankle' && (
            <>
              <rect x="119" y="375" width="26" height="10" fill="white" rx="3" />
              <rect x="155" y="375" width="26" height="10" fill="white" rx="3" />
            </>
          )}
          {customization.sockStyle === 'crew' && (
            <>
              <rect x="119" y="358" width="26" height="27" fill="white" rx="4" />
              <rect x="155" y="358" width="26" height="27" fill="white" rx="4" />
            </>
          )}
          {customization.sockStyle === 'knee-high' && (
            <>
              <rect x="119" y="320" width="26" height="65" fill="white" rx="5" />
              <rect x="155" y="320" width="26" height="65" fill="white" rx="5" />
            </>
          )}
        </g>
      )}

      {/* Hair - Front layer (frames face naturally) */}
      <g id="hair-front">
        {customization.hairStyle === 'short' && (
          <>
            <ellipse cx="150" cy="72" rx="52" ry="28" fill="url(#hairShine)" />
            <path d="M 98 80 Q 98 95 100 105" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            <path d="M 202 80 Q 202 95 200 105" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
          </>
        )}
        
        {(customization.hairStyle === 'long-straight' || 
          customization.hairStyle === 'long-wavy' || 
          customization.hairStyle === 'curly') && (
          <>
            <ellipse cx="150" cy="75" rx="54" ry="30" fill="url(#hairShine)" />
            <path d="M 96 85 Q 95 95 96 108" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            <path d="M 204 85 Q 205 95 204 108" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
          </>
        )}
        
        {customization.hairStyle === 'bun' && (
          <>
            <ellipse cx="150" cy="75" rx="52" ry="28" fill="url(#hairShine)" />
            <circle cx="150" cy="50" r="24" fill="url(#hairShine)" />
            <ellipse cx="150" cy="50" rx="20" ry="22" fill={hairColor} opacity="0.8" />
          </>
        )}
        
        {customization.hairStyle === 'ponytail' && (
          <>
            <ellipse cx="150" cy="75" rx="52" ry="28" fill="url(#hairShine)" />
            <ellipse cx="190" cy="110" rx="13" ry="48" fill="url(#hairShine)" />
            <path d="M 185 105 Q 188 130 186 145" stroke={hairColor} strokeWidth="2" fill="none" />
          </>
        )}
        
        {customization.hairStyle === 'braids' && (
          <>
            <ellipse cx="150" cy="75" rx="52" ry="28" fill="url(#hairShine)" />
            {/* Left braid */}
            <rect x="105" y="110" width="13" height="68" fill="url(#hairShine)" rx="6" />
            <circle cx="111" cy="125" r="5" fill={hairColor} opacity="0.6" />
            <circle cx="111" cy="145" r="5" fill={hairColor} opacity="0.6" />
            <circle cx="111" cy="165" r="5" fill={hairColor} opacity="0.6" />
            {/* Right braid */}
            <rect x="182" y="110" width="13" height="68" fill="url(#hairShine)" rx="6" />
            <circle cx="188" cy="125" r="5" fill={hairColor} opacity="0.6" />
            <circle cx="188" cy="145" r="5" fill={hairColor} opacity="0.6" />
            <circle cx="188" cy="165" r="5" fill={hairColor} opacity="0.6" />
          </>
        )}
        
        {customization.hairStyle === 'bob' && (
          <>
            <ellipse cx="150" cy="75" rx="54" ry="30" fill="url(#hairShine)" />
            <path d="M 96 90 Q 95 105 98 125" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            <path d="M 204 90 Q 205 105 202 125" fill="url(#hairShine)" stroke={hairColor} strokeWidth="1" />
            <ellipse cx="150" cy="128" rx="54" ry="20" fill="url(#hairShine)" />
          </>
        )}
      </g>

      {/* Accessories */}
      <g id="accessories">
        {customization.accessory === 'necklace' && (
          <>
            <ellipse cx="150" cy="163" rx="28" ry="9" fill="none" stroke="#FFD700" strokeWidth="3.5" />
            <circle cx="150" cy="172" r="6" fill="#FFD700" />
            <circle cx="150" cy="172" r="3" fill="#FFF8DC" />
          </>
        )}
        
        {customization.accessory === 'earrings' && (
          <>
            <circle cx="108" cy="118" r="6" fill="#FFD700" />
            <circle cx="108" cy="118" r="3" fill="#FFF8DC" />
            <circle cx="192" cy="118" r="6" fill="#FFD700" />
            <circle cx="192" cy="118" r="3" fill="#FFF8DC" />
          </>
        )}
        
        {customization.accessory === 'glasses' && (
          <>
            <rect x="116" y="100" width="28" height="18" fill="none" stroke="#2a2a2a" strokeWidth="3" rx="5" />
            <rect x="156" y="100" width="28" height="18" fill="none" stroke="#2a2a2a" strokeWidth="3" rx="5" />
            <line x1="144" y1="109" x2="156" y2="109" stroke="#2a2a2a" strokeWidth="3" />
            {/* Glasses shine */}
            <line x1="120" y1="104" x2="128" y2="106" stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
            <line x1="160" y1="104" x2="168" y2="106" stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
          </>
        )}
        
        {customization.accessory === 'hat' && (
          <g>
            <ellipse cx="150" cy="58" rx="50" ry="13" fill="#8B4513" />
            <path d="M 116 58 L 126 36 L 174 36 L 184 58 Z" fill="#8B4513" />
            <rect x="124" y="36" width="52" height="6" fill="#654321" rx="2" />
          </g>
        )}
        
        {customization.accessory === 'scarf' && (
          <>
            <path d="M 135 158 L 165 158 L 163 172 L 137 172 Z" fill="#FF6347" />
            <path d="M 137 165 L 118 188" stroke="#FF6347" strokeWidth="10" strokeLinecap="round" />
            <path d="M 140 167 L 122 187" stroke="#FF4500" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </>
        )}
        
        {customization.accessory === 'watch' && (
          <>
            <rect x="90" y="210" width="13" height="16" fill="#C0C0C0" rx="3" />
            <rect x="92" y="212" width="9" height="12" fill="#1a1a1a" rx="2" />
            <line x1="96" y1="214" x2="96" y2="218" stroke="#00ff00" strokeWidth="1" />
          </>
        )}
      </g>

      {/* Purse */}
      {customization.purseStyle !== 'none' && (
        <g id="purse">
          {customization.purseStyle === 'handbag' && (
            <>
              <rect x="68" y="248" width="32" height="36" fill={customization.purseColor} rx="4" />
              <rect x="70" y="250" width="28" height="32" fill={customization.purseColor} opacity="0.8" rx="3" />
              <path d="M 74 248 Q 84 236 94 248" stroke={customization.purseColor} strokeWidth="4" fill="none" />
              <rect x="82" y="260" width="4" height="8" fill="black" opacity="0.3" rx="1" />
            </>
          )}
          
          {customization.purseStyle === 'tote' && (
            <>
              <rect x="66" y="242" width="34" height="42" fill={customization.purseColor} rx="3" />
              <line x1="70" y1="242" x2="70" y2="225" stroke={customization.purseColor} strokeWidth="4" />
              <line x1="96" y1="242" x2="96" y2="225" stroke={customization.purseColor} strokeWidth="4" />
              <rect x="70" y="254" width="26" height="3" fill="white" opacity="0.3" />
            </>
          )}
          
          {customization.purseStyle === 'clutch' && (
            <>
              <rect x="70" y="256" width="36" height="22" fill={customization.purseColor} rx="3" />
              <rect x="72" y="258" width="32" height="18" fill={customization.purseColor} opacity="0.7" rx="2" />
              <circle cx="88" cy="267" r="3" fill="#FFD700" />
            </>
          )}
          
          {customization.purseStyle === 'backpack' && (
            <>
              <rect x="188" y="188" width="32" height="42" fill={customization.purseColor} rx="4" />
              <line x1="190" y1="188" x2="182" y2="176" stroke={customization.purseColor} strokeWidth="4" />
              <line x1="218" y1="188" x2="226" y2="176" stroke={customization.purseColor} strokeWidth="4" />
              <rect x="194" y="198" width="20" height="16" fill={customization.purseColor} opacity="0.6" rx="2" />
              <circle cx="204" cy="224" r="2" fill="#FFD700" />
            </>
          )}
          
          {customization.purseStyle === 'crossbody' && (
            <>
              <rect x="72" y="255" width="28" height="30" fill={customization.purseColor} rx="3" />
              <path d="M 86 255 Q 118 215 150 190" stroke={customization.purseColor} strokeWidth="4" fill="none" />
              <rect x="76" y="262" width="20" height="3" fill="white" opacity="0.3" />
              <circle cx="86" cy="278" r="2" fill="#FFD700" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
