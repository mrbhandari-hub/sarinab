'use client';

import { useId, useMemo } from 'react';
import { DollCustomization } from '@/types/doll';
import { SKIN_TONES, EYE_COLORS, HAIR_COLORS } from '@/types/doll';

type Palette = {
  skin: string;
  skinHighlight: string;
  skinShadow: string;
  cheek: string;
  hair: string;
  hairHighlight: string;
  hairShadow: string;
  iris: string;
  irisShadow: string;
  outfit: string;
  outfitHighlight: string;
  outfitShadow: string;
  shoe: string;
  shoeHighlight: string;
  shoeShadow: string;
  purse: string;
  purseHighlight: string;
  purseShadow: string;
};

const mixColor = (hex: string, amount: number): string => {
  if (!hex.startsWith('#')) return hex;
  let clean = hex.slice(1);
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = Number.parseInt(clean, 16);
  if (Number.isNaN(num)) return hex;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const target = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  const mix = (channel: number) => Math.round(channel + (target - channel) * t);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

const Doll = ({ customization }: { customization: DollCustomization }) => {
  const skinColor = SKIN_TONES.find((tone) => tone.value === customization.skinTone)?.color || '#d4a574';
  const eyeColor = EYE_COLORS.find((eye) => eye.value === customization.eyeColor)?.color || '#8B4513';
  const hairColor = HAIR_COLORS.find((hair) => hair.value === customization.hairColor)?.color || '#8B4513';

  const palette: Palette = useMemo(() => ({
    skin: skinColor,
    skinHighlight: mixColor(skinColor, 0.25),
    skinShadow: mixColor(skinColor, -0.25),
    cheek: mixColor(skinColor, 0.4),
    hair: hairColor,
    hairHighlight: mixColor(hairColor, 0.35),
    hairShadow: mixColor(hairColor, -0.35),
    iris: eyeColor,
    irisShadow: mixColor(eyeColor, -0.4),
    outfit: customization.outfitColor,
    outfitHighlight: mixColor(customization.outfitColor, 0.2),
    outfitShadow: mixColor(customization.outfitColor, -0.2),
    shoe: customization.shoeColor,
    shoeHighlight: mixColor(customization.shoeColor, 0.25),
    shoeShadow: mixColor(customization.shoeColor, -0.3),
    purse: customization.purseColor,
    purseHighlight: mixColor(customization.purseColor, 0.2),
    purseShadow: mixColor(customization.purseColor, -0.2),
  }), [skinColor, hairColor, eyeColor, customization.outfitColor, customization.shoeColor, customization.purseColor]);

  const baseId = useId().replace(/:/g, '');
  const makeId = (suffix: string) => `${suffix}-${baseId}`;

  return (
    <svg viewBox="0 0 300 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={makeId('faceGradient')} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={palette.skinHighlight} />
          <stop offset="100%" stopColor={palette.skin} />
        </radialGradient>
        <linearGradient id={makeId('neckGradient')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={palette.skinShadow} />
          <stop offset="50%" stopColor={palette.skin} />
          <stop offset="100%" stopColor={palette.skinShadow} />
        </linearGradient>
        <radialGradient id={makeId('torsoGradient')} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={palette.skinHighlight} />
          <stop offset="100%" stopColor={palette.skin} />
        </radialGradient>
        <linearGradient id={makeId('hairGradient')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.hairHighlight} />
          <stop offset="70%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={palette.hairShadow} />
        </linearGradient>
        <linearGradient id={makeId('outfitGradient')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.outfitHighlight} />
          <stop offset="45%" stopColor={palette.outfit} />
          <stop offset="100%" stopColor={palette.outfitShadow} />
        </linearGradient>
        <linearGradient id={makeId('shoeGradient')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.shoeHighlight} />
          <stop offset="100%" stopColor={palette.shoeShadow} />
        </linearGradient>
        <linearGradient id={makeId('purseGradient')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.purseHighlight} />
          <stop offset="100%" stopColor={palette.purseShadow} />
        </linearGradient>
        <filter id={makeId('softShadow')} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>

      <g filter={`url(#${makeId('softShadow')})`}>
        {/* Hair back layers for length */}
        {(customization.hairStyle === 'long-straight' || customization.hairStyle === 'long-wavy' || customization.hairStyle === 'curly') && (
          <g fill={`url(#${makeId('hairGradient')})`} stroke={palette.hairShadow} strokeWidth={0.5}>
            {customization.hairStyle === 'long-straight' && (
              <>
                <path d="M 108 82 Q 92 170 105 255" />
                <path d="M 192 82 Q 208 170 195 255" />
              </>
            )}
            {customization.hairStyle === 'long-wavy' && (
              <>
                <path d="M 108 82 Q 90 130 100 175 Q 90 220 105 260" />
                <path d="M 192 82 Q 210 130 200 175 Q 210 220 195 260" />
              </>
            )}
            {customization.hairStyle === 'curly' && (
              <>
                <ellipse cx="95" cy="100" rx="24" ry="28" />
                <ellipse cx="100" cy="140" rx="22" ry="26" />
                <ellipse cx="205" cy="100" rx="24" ry="28" />
                <ellipse cx="200" cy="140" rx="22" ry="26" />
              </>
            )}
          </g>
        )}

        {/* Neck */}
        <path d="M 138 156 Q 150 168 162 156 L 162 174 Q 150 178 138 174 Z" fill={`url(#${makeId('neckGradient')})`} />

        {/* Torso */}
        <ellipse cx="150" cy="240" rx="54" ry="72" fill={`url(#${makeId('torsoGradient')})`} />

        {/* Arms */}
        <g fill={palette.skin}>
          <path d="M 96 190 Q 88 225 96 260" stroke={palette.skin} strokeWidth={22} strokeLinecap="round" />
          <ellipse cx="95" cy="270" rx="12" ry="14" fill={palette.skinHighlight} />
          <path d="M 204 190 Q 212 225 204 260" stroke={palette.skin} strokeWidth={22} strokeLinecap="round" />
          <ellipse cx="205" cy="270" rx="12" ry="14" fill={palette.skinHighlight} />
        </g>

        {/* Legs */}
        <g fill={palette.skin}>
          <rect x="118" y="300" width="26" height="98" rx="13" />
          <rect x="156" y="300" width="26" height="98" rx="13" />
        </g>

        {/* Head */}
        <ellipse cx="150" cy="120" rx="52" ry="58" fill={`url(#${makeId('faceGradient')})`} />
        {/* Chin shadow */}
        <ellipse cx="150" cy="155" rx="36" ry="14" fill={palette.skinShadow} opacity={0.18} />

        {/* Ears */}
        <g fill={palette.skin}>
          <ellipse cx="100" cy="118" rx="9" ry="13" />
          <ellipse cx="200" cy="118" rx="9" ry="13" />
          <ellipse cx="102" cy="118" rx="5" ry="8" fill={palette.skinShadow} opacity={0.35} />
          <ellipse cx="198" cy="118" rx="5" ry="8" fill={palette.skinShadow} opacity={0.35} />
        </g>

        {/* Eyebrows */}
        <path d="M 120 101 Q 135 92 148 100" stroke={palette.hairShadow} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        <path d="M 152 100 Q 165 92 180 101" stroke={palette.hairShadow} strokeWidth={4} strokeLinecap="round" opacity={0.7} />

        {/* Eyes */}
        <g>
          <ellipse cx="134" cy="112" rx="13" ry="10" fill="white" />
          <ellipse cx="166" cy="112" rx="13" ry="10" fill="white" />
          <circle cx="134" cy="112" r="7" fill={palette.iris} />
          <circle cx="166" cy="112" r="7" fill={palette.iris} />
          <circle cx="134" cy="112" r="3.5" fill={palette.irisShadow} />
          <circle cx="166" cy="112" r="3.5" fill={palette.irisShadow} />
          <circle cx="135.5" cy="110" r="2" fill="white" />
          <circle cx="167.5" cy="110" r="2" fill="white" />
          <ellipse cx="134" cy="106" rx="11" ry="4" fill={palette.skinShadow} opacity={0.25} />
          <ellipse cx="166" cy="106" rx="11" ry="4" fill={palette.skinShadow} opacity={0.25} />
        </g>

        {/* Eyelashes */}
        <g stroke={palette.hairShadow} strokeWidth={1.5} strokeLinecap="round">
          <path d="M 121 108 Q 118 105 119 102" />
          <path d="M 129 106 Q 128 103 129 100" />
          <path d="M 139 106 Q 140 103 141 100" />
          <path d="M 146 108 Q 149 105 150 102" />
          <path d="M 159 108 Q 162 105 163 102" />
          <path d="M 167 106 Q 168 103 167 100" />
          <path d="M 177 106 Q 178 103 179 100" />
          <path d="M 184 108 Q 187 105 188 102" />
        </g>

        {/* Nose */}
        <path d="M 148 120 Q 146 130 149 135" stroke={palette.skinShadow} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.5} />
        <ellipse cx="144" cy="136" rx="3" ry="2" fill={palette.skinShadow} opacity={0.25} />
        <ellipse cx="154" cy="136" rx="3" ry="2" fill={palette.skinShadow} opacity={0.25} />

        {/* Mouth */}
        <path d="M 138 145 Q 150 150 162 145" stroke="#c04b72" strokeWidth={3} strokeLinecap="round" fill="none" />
        <path d="M 140 145 Q 150 142 160 145" stroke="#f5a6c2" strokeWidth={1.5} strokeLinecap="round" fill="none" />

        {/* Cheeks */}
        <ellipse cx="124" cy="133" rx="10" ry="6" fill={palette.cheek} opacity={0.4} />
        <ellipse cx="176" cy="133" rx="10" ry="6" fill={palette.cheek} opacity={0.4} />

        {/* Outfit */}
        <g fill={`url(#${makeId('outfitGradient')})`}>
          {customization.outfitStyle === 'dress-casual' && (
            <path d="M 105 175 L 95 260 Q 100 295 110 315 L 190 315 Q 200 295 205 260 L 195 175 Z" />
          )}
          {customization.outfitStyle === 'dress-formal' && (
            <path d="M 105 175 L 90 290 Q 88 315 85 335 L 215 335 Q 212 315 210 290 L 195 175 Z" />
          )}
          {customization.outfitStyle === 'jeans-tshirt' && (
            <>
              <rect x="105" y="175" width="90" height="65" rx="18" />
              <rect x="120" y="240" width="28" height="65" rx="6" fill="#3566c9" opacity={0.8} />
              <rect x="152" y="240" width="28" height="65" rx="6" fill="#3566c9" opacity={0.8} />
            </>
          )}
          {customization.outfitStyle === 'skirt-blouse' && (
            <>
              <rect x="108" y="175" width="84" height="60" rx="14" />
              <path d="M 110 235 L 190 235 L 185 300 L 115 300 Z" fill="#ff4d94" opacity={0.85} />
            </>
          )}
          {customization.outfitStyle === 'shorts-tank' && (
            <>
              <rect x="110" y="175" width="80" height="60" rx="18" />
              <rect x="122" y="235" width="26" height="40" rx="5" fill="#ffd45d" />
              <rect x="152" y="235" width="26" height="40" rx="5" fill="#ffd45d" />
            </>
          )}
          {customization.outfitStyle === 'business-suit' && (
            <>
              <rect x="108" y="175" width="84" height="125" rx="12" />
              <rect x="120" y="188" width="60" height="52" rx="6" fill="white" opacity={0.9} />
              <line x1="150" y1="188" x2="150" y2="240" stroke={palette.outfitShadow} strokeWidth={4} strokeLinecap="round" />
              <circle cx="150" cy="205" r="3" fill="#fef7ff" />
              <circle cx="150" cy="220" r="3" fill="#fef7ff" />
            </>
          )}
          {customization.outfitStyle === 'hoodie-pants' && (
            <>
              <rect x="102" y="175" width="96" height="80" rx="18" />
              <path d="M 128 175 L 172 175 L 165 192 L 135 192 Z" />
              <rect x="124" y="255" width="26" height="60" rx="6" fill="#6b7280" />
              <rect x="150" y="255" width="26" height="60" rx="6" fill="#6b7280" />
              <circle cx="142" cy="198" r="2" fill="white" opacity={0.8} />
              <circle cx="158" cy="198" r="2" fill="white" opacity={0.8} />
            </>
          )}
        </g>
        {/* Outfit folds */}
        <path d="M 120 215 Q 150 225 180 215" stroke={palette.outfitShadow} strokeWidth={1.2} opacity={0.25} fill="none" />

        {/* Shoes */}
        <g fill={`url(#${makeId('shoeGradient')})`}>
          {customization.shoeStyle === 'sneakers' && (
            <>
              <ellipse cx="132" cy="405" rx="22" ry="12" />
              <ellipse cx="168" cy="405" rx="22" ry="12" />
              <rect x="110" y="398" width="44" height="10" rx="5" fill={palette.shoe} />
              <rect x="146" y="398" width="44" height="10" rx="5" fill={palette.shoe} />
            </>
          )}
          {customization.shoeStyle === 'boots' && (
            <>
              <rect x="118" y="380" width="28" height="30" rx="4" />
              <rect x="154" y="380" width="28" height="30" rx="4" />
              <rect x="118" y="408" width="28" height="8" rx="2" />
              <rect x="154" y="408" width="28" height="8" rx="2" />
            </>
          )}
          {customization.shoeStyle === 'heels' && (
            <>
              <ellipse cx="132" cy="404" rx="18" ry="9" />
              <ellipse cx="168" cy="404" rx="18" ry="9" />
              <rect x="130" y="404" width="4" height="14" fill={palette.shoeShadow} />
              <rect x="166" y="404" width="4" height="14" fill={palette.shoeShadow} />
            </>
          )}
          {customization.shoeStyle === 'flats' && (
            <>
              <ellipse cx="132" cy="405" rx="20" ry="9" />
              <ellipse cx="168" cy="405" rx="20" ry="9" />
            </>
          )}
          {customization.shoeStyle === 'sandals' && (
            <>
              <ellipse cx="132" cy="406" rx="18" ry="8" />
              <ellipse cx="168" cy="406" rx="18" ry="8" />
              <line x1="122" y1="400" x2="132" y2="388" stroke={palette.shoeShadow} strokeWidth={3} strokeLinecap="round" />
              <line x1="158" y1="400" x2="168" y2="388" stroke={palette.shoeShadow} strokeWidth={3} strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Socks */}
        {customization.sockStyle !== 'none' && (
          <g fill="white" opacity={0.92}>
            {customization.sockStyle === 'ankle' && (
              <>
                <rect x="118" y="390" width="28" height="12" rx="4" />
                <rect x="154" y="390" width="28" height="12" rx="4" />
              </>
            )}
            {customization.sockStyle === 'crew' && (
              <>
                <rect x="118" y="365" width="28" height="37" rx="5" />
                <rect x="154" y="365" width="28" height="37" rx="5" />
              </>
            )}
            {customization.sockStyle === 'knee-high' && (
              <>
                <rect x="118" y="330" width="28" height="74" rx="6" />
                <rect x="154" y="330" width="28" height="74" rx="6" />
              </>
            )}
          </g>
        )}

        {/* Hair front */}
        <g fill={`url(#${makeId('hairGradient')})`}>
          {customization.hairStyle === 'short' && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="32" />
              <path d="M 95 90 Q 95 115 110 125" fill={palette.hairShadow} opacity={0.3} />
              <path d="M 205 90 Q 205 115 190 125" fill={palette.hairShadow} opacity={0.3} />
            </>
          )}
          {(customization.hairStyle === 'long-straight' || customization.hairStyle === 'long-wavy' || customization.hairStyle === 'curly') && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="32" />
              <path d="M 90 95 Q 92 118 105 140" opacity={0.45} fill={palette.hairShadow} />
              <path d="M 210 95 Q 208 118 195 140" opacity={0.45} fill={palette.hairShadow} />
            </>
          )}
          {customization.hairStyle === 'bun' && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="30" />
              <ellipse cx="150" cy="52" rx="28" ry="26" />
              <ellipse cx="150" cy="52" rx="20" ry="22" fill={palette.hairHighlight} opacity={0.7} />
            </>
          )}
          {customization.hairStyle === 'ponytail' && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="32" />
              <ellipse cx="190" cy="125" rx="15" ry="52" />
            </>
          )}
          {customization.hairStyle === 'braids' && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="32" />
              <rect x="106" y="115" width="15" height="72" rx="6" />
              <rect x="179" y="115" width="15" height="72" rx="6" />
            </>
          )}
          {customization.hairStyle === 'bob' && (
            <>
              <ellipse cx="150" cy="78" rx="55" ry="32" />
              <ellipse cx="150" cy="128" rx="55" ry="20" />
            </>
          )}
        </g>

        {/* Accessories */}
        <g>
          {customization.accessory === 'necklace' && (
            <>
              <ellipse cx="150" cy="170" rx="30" ry="10" fill="none" stroke="#fddc5c" strokeWidth={4} />
              <circle cx="150" cy="178" r="7" fill="#ffe9a0" stroke="#fddc5c" strokeWidth={1} />
            </>
          )}
          {customization.accessory === 'earrings' && (
            <>
              <line x1="100" y1="125" x2="100" y2="140" stroke="#f4d03f" strokeWidth={3} strokeLinecap="round" />
              <circle cx="100" cy="143" r="4" fill="#fceda5" />
              <line x1="200" y1="125" x2="200" y2="140" stroke="#f4d03f" strokeWidth={3} strokeLinecap="round" />
              <circle cx="200" cy="143" r="4" fill="#fceda5" />
            </>
          )}
          {customization.accessory === 'glasses' && (
            <>
              <rect x="118" y="104" width="30" height="18" rx="6" stroke="#1f2937" strokeWidth={3} fill="rgba(255,255,255,0.25)" />
              <rect x="152" y="104" width="30" height="18" rx="6" stroke="#1f2937" strokeWidth={3} fill="rgba(255,255,255,0.25)" />
              <line x1="148" y1="113" x2="152" y2="113" stroke="#1f2937" strokeWidth={3} />
              <line x1="122" y1="108" x2="132" y2="110" stroke="white" strokeWidth={2} opacity={0.8} />
              <line x1="156" y1="108" x2="166" y2="110" stroke="white" strokeWidth={2} opacity={0.8} />
            </>
          )}
          {customization.accessory === 'hat' && (
            <g fill={`url(#${makeId('hairGradient')})`}>
              <ellipse cx="150" cy="62" rx="60" ry="15" />
              <path d="M 112 62 L 130 32 L 170 32 L 188 62 Z" />
              <rect x="130" y="32" width="40" height="8" fill={palette.hairShadow} opacity={0.6} />
            </g>
          )}
          {customization.accessory === 'scarf' && (
            <>
              <path d="M 135 165 L 165 165 L 162 182 L 138 182 Z" fill="#ff7f50" />
              <path d="M 138 178 L 120 202" stroke="#ff6333" strokeWidth={10} strokeLinecap="round" />
            </>
          )}
          {customization.accessory === 'watch' && (
            <>
              <rect x="88" y="214" width="16" height="18" rx="4" fill="#cfcfcf" />
              <rect x="90" y="216" width="12" height="14" rx="3" fill="#1a1a1a" />
            </>
          )}
        </g>

        {/* Purse */}
        {customization.purseStyle !== 'none' && (
          <g fill={`url(#${makeId('purseGradient')})`}>
            {customization.purseStyle === 'handbag' && (
              <>
                <rect x="68" y="252" width="34" height="38" rx="5" />
                <path d="M 73 252 Q 85 235 97 252" stroke={palette.purseShadow} strokeWidth={4} fill="none" />
              </>
            )}
            {customization.purseStyle === 'tote' && (
              <>
                <rect x="66" y="246" width="36" height="44" rx="4" />
                <line x1="70" y1="246" x2="70" y2="224" stroke={palette.purseShadow} strokeWidth={4} />
                <line x1="98" y1="246" x2="98" y2="224" stroke={palette.purseShadow} strokeWidth={4} />
              </>
            )}
            {customization.purseStyle === 'clutch' && <rect x="70" y="260" width="36" height="22" rx="4" />}
            {customization.purseStyle === 'backpack' && (
              <>
                <rect x="188" y="192" width="34" height="42" rx="5" />
                <line x1="190" y1="192" x2="182" y2="176" stroke={palette.purseShadow} strokeWidth={4} />
                <line x1="222" y1="192" x2="230" y2="176" stroke={palette.purseShadow} strokeWidth={4} />
              </>
            )}
            {customization.purseStyle === 'crossbody' && (
              <>
                <rect x="72" y="260" width="30" height="30" rx="4" />
                <path d="M 86 260 Q 120 215 152 192" stroke={palette.purseShadow} strokeWidth={4} fill="none" />
              </>
            )}
          </g>
        )}
      </g>
    </svg>
  );
};

export default Doll;
