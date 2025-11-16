'use client';

import { useId, useMemo } from 'react';
import { DollCustomization } from '@/types/doll';
import { SKIN_TONES, EYE_COLORS, HAIR_COLORS } from '@/types/doll';

type Palette = {
  skin: string;
  skinHighlight: string;
  skinShadow: string;
  blush: string;
  hair: string;
  hairHighlight: string;
  hairShadow: string;
  iris: string;
  irisShadow: string;
  outfit: string;
  outfitHighlight: string;
  outfitShadow: string;
  shoe: string;
  shoeShadow: string;
  purse: string;
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
  const t = Math.min(Math.abs(amount), 1);
  const toChannel = (channel: number) => Math.round(channel + (target - channel) * t);
  return `rgb(${toChannel(r)}, ${toChannel(g)}, ${toChannel(b)})`;
};

const Doll = ({ customization }: { customization: DollCustomization }) => {
  const skin = SKIN_TONES.find((tone) => tone.value === customization.skinTone)?.color || '#d4a574';
  const iris = EYE_COLORS.find((eye) => eye.value === customization.eyeColor)?.color || '#5d4121';
  const hair = HAIR_COLORS.find((option) => option.value === customization.hairColor)?.color || '#4a2c1f';

  const palette: Palette = useMemo(
    () => ({
      skin,
      skinHighlight: mixColor(skin, 0.35),
      skinShadow: mixColor(skin, -0.3),
      blush: mixColor(skin, 0.55),
      hair,
      hairHighlight: mixColor(hair, 0.4),
      hairShadow: mixColor(hair, -0.25),
      iris,
      irisShadow: mixColor(iris, -0.35),
      outfit: customization.outfitColor,
      outfitHighlight: mixColor(customization.outfitColor, 0.2),
      outfitShadow: mixColor(customization.outfitColor, -0.25),
      shoe: customization.shoeColor,
      shoeShadow: mixColor(customization.shoeColor, -0.3),
      purse: customization.purseColor,
      purseShadow: mixColor(customization.purseColor, -0.2),
    }),
    [skin, iris, hair, customization.outfitColor, customization.shoeColor, customization.purseColor],
  );

  const baseId = useId().replace(/:/g, '');
  const id = (suffix: string) => `${suffix}-${baseId}`;

  const renderHairBack = () => {
    if (!['long-straight', 'long-wavy', 'curly', 'ponytail'].includes(customization.hairStyle)) {
      return null;
    }
    if (customization.hairStyle === 'curly') {
      return (
        <g fill={`url(#${id('hairGrad')})`}>
          <circle cx="75" cy="160" r="35" />
          <circle cx="105" cy="210" r="38" />
          <circle cx="225" cy="160" r="35" />
          <circle cx="195" cy="210" r="38" />
        </g>
      );
    }
    if (customization.hairStyle === 'ponytail') {
      return (
        <path
          d="M210 110 Q250 200 210 320"
          stroke={`url(#${id('hairGrad')})`}
          strokeWidth={50}
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    const wave = customization.hairStyle === 'long-wavy';
    return (
      <path
        d={
          wave
            ? 'M70 120 C70 240 100 340 150 350 C200 340 230 240 230 120'
            : 'M75 110 L75 330 Q150 370 225 330 L225 110 Z'
        }
        fill={`url(#${id('hairGrad')})`}
      />
    );
  };

  const renderHairFront = () => {
    switch (customization.hairStyle) {
      case 'long-straight':
        return (
          <g>
            <ellipse cx="150" cy="100" rx="100" ry="75" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="85" rx="85" ry="55" fill={`url(#${id('hairShine')})`} />
          </g>
        );
      case 'long-wavy':
        return (
          <g>
            <ellipse cx="150" cy="100" rx="100" ry="75" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="85" rx="85" ry="55" fill={`url(#${id('hairShine')})`} />
            <path d="M70 120 Q90 180 85 240" stroke={palette.hairShadow} strokeWidth="8" fill="none" opacity={0.4} />
            <path d="M230 120 Q210 180 215 240" stroke={palette.hairShadow} strokeWidth="8" fill="none" opacity={0.4} />
          </g>
        );
      case 'curly':
        return (
          <g fill={`url(#${id('hairGrad')})`}>
            <circle cx="90" cy="95" r="38" />
            <circle cx="125" cy="70" r="40" />
            <circle cx="210" cy="95" r="38" />
            <circle cx="175" cy="70" r="40" />
            <ellipse cx="150" cy="85" rx="90" ry="60" fill={`url(#${id('hairShine')})`} />
          </g>
        );
      case 'bun':
        return (
          <>
            <ellipse cx="150" cy="85" rx="95" ry="65" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="40" rx="42" ry="36" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="40" rx="35" ry="30" fill={`url(#${id('hairShine')})`} />
          </>
        );
      case 'ponytail':
        return (
          <>
            <ellipse cx="150" cy="90" rx="100" ry="70" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="80" rx="85" ry="55" fill={`url(#${id('hairShine')})`} />
          </>
        );
      case 'braids':
        return (
          <>
            <ellipse cx="150" cy="90" rx="100" ry="70" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="80" rx="85" ry="55" fill={`url(#${id('hairShine')})`} />
            <rect x="85" y="130" width="32" height="115" rx="16" fill={`url(#${id('hairGrad')})`} />
            <rect x="183" y="130" width="32" height="115" rx="16" fill={`url(#${id('hairGrad')})`} />
            <circle cx="101" cy="150" r="6" fill={palette.hairShadow} opacity={0.5} />
            <circle cx="101" cy="180" r="6" fill={palette.hairShadow} opacity={0.5} />
            <circle cx="199" cy="150" r="6" fill={palette.hairShadow} opacity={0.5} />
            <circle cx="199" cy="180" r="6" fill={palette.hairShadow} opacity={0.5} />
          </>
        );
      case 'bob':
        return (
          <>
            <ellipse cx="150" cy="100" rx="100" ry="70" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="90" rx="85" ry="55" fill={`url(#${id('hairShine')})`} />
            <ellipse cx="150" cy="155" rx="100" ry="40" fill={`url(#${id('hairGrad')})`} />
          </>
        );
      case 'short':
      default:
        return (
          <>
            <ellipse cx="150" cy="90" rx="95" ry="65" fill={`url(#${id('hairGrad')})`} />
            <ellipse cx="150" cy="80" rx="80" ry="50" fill={`url(#${id('hairShine')})`} />
          </>
        );
    }
  };

  const renderOutfit = () => {
    switch (customization.outfitStyle) {
      case 'dress-formal':
        return (
          <>
            <path
              d="M85 245 L60 380 Q120 430 150 430 Q180 430 240 380 L215 245 Z"
              fill={`url(#${id('outfitGrad')})`}
            />
            <rect x="105" y="215" width="90" height="45" rx="20" fill={palette.outfitHighlight} opacity={0.85} />
          </>
        );
      case 'jeans-tshirt':
        return (
          <>
            <rect x="95" y="225" width="110" height="90" rx="36" fill={`url(#${id('outfitGrad')})`} />
            <rect x="120" y="315" width="32" height="85" rx="16" fill="#3566c9" />
            <rect x="155" y="315" width="32" height="85" rx="16" fill="#3566c9" />
          </>
        );
      case 'skirt-blouse':
        return (
          <>
            <rect x="100" y="225" width="100" height="70" rx="28" fill={`url(#${id('outfitGrad')})`} />
            <path d="M90 295 L210 295 L195 360 L105 360 Z" fill={palette.outfitShadow} opacity={0.85} />
          </>
        );
      case 'shorts-tank':
        return (
          <>
            <rect x="105" y="225" width="90" height="65" rx="28" fill={`url(#${id('outfitGrad')})`} />
            <rect x="122" y="290" width="28" height="55" rx="12" fill={palette.outfitHighlight} />
            <rect x="150" y="290" width="28" height="55" rx="12" fill={palette.outfitHighlight} />
          </>
        );
      case 'business-suit':
        return (
          <>
            <rect x="100" y="225" width="100" height="125" rx="30" fill={`url(#${id('outfitGrad')})`} />
            <rect x="118" y="235" width="66" height="60" rx="14" fill="#fff" opacity={0.95} />
            <circle cx="150" cy="265" r="4" fill={palette.outfitShadow} />
            <circle cx="150" cy="280" r="4" fill={palette.outfitShadow} />
          </>
        );
      case 'hoodie-pants':
        return (
          <>
            <rect x="95" y="225" width="110" height="90" rx="35" fill={`url(#${id('outfitGrad')})`} />
            <rect x="120" y="315" width="30" height="85" rx="14" fill="#737c8f" />
            <rect x="158" y="315" width="30" height="85" rx="14" fill="#737c8f" />
            <circle cx="140" cy="236" r="4" fill="#fff" opacity={0.7} />
            <circle cx="160" cy="236" r="4" fill="#fff" opacity={0.7} />
          </>
        );
      case 'dress-casual':
      default:
        return (
          <path
            d="M95 240 L70 360 Q120 420 150 420 Q180 420 230 360 L205 240 Z"
            fill={`url(#${id('outfitGrad')})`}
          />
        );
    }
  };

  const renderShoes = () => {
    switch (customization.shoeStyle) {
      case 'boots':
        return (
          <g fill={palette.shoe}>
            <rect x="115" y="400" width="35" height="40" rx="12" />
            <rect x="150" y="400" width="35" height="40" rx="12" />
            <rect x="115" y="435" width="35" height="8" rx="4" fill={palette.shoeShadow} />
            <rect x="150" y="435" width="35" height="8" rx="4" fill={palette.shoeShadow} />
          </g>
        );
      case 'heels':
        return (
          <g fill={palette.shoe}>
            <ellipse cx="132" cy="430" rx="20" ry="10" />
            <ellipse cx="168" cy="430" rx="20" ry="10" />
            <rect x="128" y="430" width="4" height="16" fill={palette.shoeShadow} />
            <rect x="168" y="430" width="4" height="16" fill={palette.shoeShadow} />
          </g>
        );
      case 'flats':
        return (
          <g fill={palette.shoe}>
            <ellipse cx="132" cy="430" rx="22" ry="11" />
            <ellipse cx="168" cy="430" rx="22" ry="11" />
          </g>
        );
      case 'sandals':
        return (
          <g fill={palette.shoe}>
            <ellipse cx="132" cy="432" rx="18" ry="8" />
            <ellipse cx="168" cy="432" rx="18" ry="8" />
            <line x1="122" y1="428" x2="132" y2="415" stroke={palette.shoeShadow} strokeWidth={3} strokeLinecap="round" />
            <line x1="178" y1="428" x2="168" y2="415" stroke={palette.shoeShadow} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      case 'sneakers':
      default:
        return (
          <g fill={palette.shoe}>
            <ellipse cx="132" cy="430" rx="22" ry="11" />
            <ellipse cx="168" cy="430" rx="22" ry="11" />
            <rect x="110" y="424" width="44" height="8" rx="4" fill={palette.shoeShadow} opacity={0.3} />
            <rect x="146" y="424" width="44" height="8" rx="4" fill={palette.shoeShadow} opacity={0.3} />
          </g>
        );
    }
  };

  const renderSocks = () => {
    if (customization.sockStyle === 'none') return null;
    const heightMap: Record<'ankle' | 'crew' | 'knee-high', number> = {
      ankle: 25,
      crew: 55,
      'knee-high': 90,
    };
    const height = heightMap[customization.sockStyle];
    return (
      <g fill="#fff">
        <rect x="118" y={405 - height} width="26" height={height} rx={6} opacity={0.9} />
        <rect x="156" y={405 - height} width="26" height={height} rx={6} opacity={0.9} />
      </g>
    );
  };

  const renderPurse = () => {
    if (customization.purseStyle === 'none') return null;
    switch (customization.purseStyle) {
      case 'handbag':
        return (
          <g fill={palette.purse}>
            <rect x="60" y="275" width="36" height="38" rx="6" />
            <path d="M64 275 Q78 250 92 275" stroke={palette.purseShadow} strokeWidth={4} fill="none" />
          </g>
        );
      case 'tote':
        return (
          <g fill={palette.purse}>
            <rect x="58" y="270" width="40" height="48" rx="6" />
            <line x1="62" y1="270" x2="62" y2="245" stroke={palette.purseShadow} strokeWidth={4} />
            <line x1="94" y1="270" x2="94" y2="245" stroke={palette.purseShadow} strokeWidth={4} />
          </g>
        );
      case 'clutch':
        return <rect x="66" y="297" width="42" height="22" rx="4" fill={palette.purse} />;
      case 'backpack':
        return (
          <g fill={palette.purse}>
            <rect x="190" y="230" width="36" height="52" rx="10" />
            <line x1="190" y1="230" x2="180" y2="210" stroke={palette.purseShadow} strokeWidth={4} />
            <line x1="226" y1="230" x2="236" y2="210" stroke={palette.purseShadow} strokeWidth={4} />
          </g>
        );
      case 'crossbody':
      default:
        return (
          <g fill={palette.purse}>
            <rect x="66" y="297" width="32" height="30" rx="5" />
            <path d="M80 297 Q120 240 160 210" stroke={palette.purseShadow} strokeWidth={4} fill="none" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 300 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={id('headGrad')} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={palette.skinHighlight} />
          <stop offset="100%" stopColor={palette.skin} />
        </radialGradient>
        <radialGradient id={id('headHighlight')} cx="35%" cy="25%" r="35%">
          <stop offset="0%" stopColor={palette.skinHighlight} stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={id('neckGrad')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={palette.skinShadow} />
          <stop offset="50%" stopColor={palette.skin} />
          <stop offset="100%" stopColor={palette.skinShadow} />
        </linearGradient>
        <linearGradient id={id('torsoGrad')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.skinHighlight} stopOpacity="0.8" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id={id('hairGrad')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.hairHighlight} />
          <stop offset="70%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={palette.hairShadow} />
        </linearGradient>
        <radialGradient id={id('hairShine')} cx="30%" cy="30%" r="65%">
          <stop offset="0%" stopColor={palette.hairHighlight} stopOpacity="0.8" />
          <stop offset="50%" stopColor={palette.hair} stopOpacity="1" />
          <stop offset="100%" stopColor={palette.hair} stopOpacity="1" />
        </radialGradient>
        <linearGradient id={id('outfitGrad')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.outfitHighlight} />
          <stop offset="50%" stopColor={palette.outfit} />
          <stop offset="100%" stopColor={palette.outfitShadow} />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="450" rx="70" ry="18" fill="rgba(0,0,0,0.15)" />

      {renderHairBack()}

      {/* Body */}
      <path d="M135 230 L165 230 L170 270 Q150 285 130 270 Z" fill={`url(#${id('neckGrad')})`} />
      <ellipse cx="150" cy="310" rx="60" ry="85" fill={`url(#${id('torsoGrad')})`} opacity={0.45} />
      <g fill={palette.skin}>
        <path d="M80 245 Q60 305 90 350" stroke={palette.skin} strokeWidth={26} strokeLinecap="round" />
        <path d="M220 245 Q240 305 210 350" stroke={palette.skin} strokeWidth={26} strokeLinecap="round" />
        <rect x="120" y="330" width="26" height="95" rx="13" />
        <rect x="154" y="330" width="26" height="95" rx="13" />
      </g>

      {renderOutfit()}
      {renderSocks()}
      {renderShoes()}
      {renderPurse()}

      {/* Head */}
      <ellipse cx="150" cy="160" rx="105" ry="120" fill={`url(#${id('headGrad')})`} stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
      <ellipse cx="130" cy="190" rx="22" ry="14" fill={palette.blush} opacity={0.35} />
      <ellipse cx="170" cy="190" rx="22" ry="14" fill={palette.blush} opacity={0.35} />
      <ellipse cx="150" cy="150" rx="70" ry="60" fill={`url(#${id('headHighlight')})`} opacity={0.8} />

      {/* Ears */}
      <g fill={palette.skin}>
        <ellipse cx="65" cy="160" rx="18" ry="28" />
        <ellipse cx="235" cy="160" rx="18" ry="28" />
        <ellipse cx="70" cy="160" rx="10" ry="16" fill={palette.skinShadow} opacity={0.35} />
        <ellipse cx="230" cy="160" rx="10" ry="16" fill={palette.skinShadow} opacity={0.35} />
      </g>

      {/* Eyes */}
      <g stroke="rgba(0,0,0,0.65)" strokeWidth="3" strokeLinecap="round">
        <path d="M105 170 Q130 155 155 170" fill="none" opacity={0.4} />
        <path d="M195 170 Q170 155 145 170" fill="none" opacity={0.4} />
      </g>
      <g>
        <ellipse cx="125" cy="185" rx="32" ry="24" fill="#fff" />
        <ellipse cx="175" cy="185" rx="32" ry="24" fill="#fff" />
        <circle cx="125" cy="185" r="15" fill={palette.iris} />
        <circle cx="175" cy="185" r="15" fill={palette.iris} />
        <circle cx="125" cy="185" r="7" fill={palette.irisShadow} />
        <circle cx="175" cy="185" r="7" fill={palette.irisShadow} />
        <circle cx="132" cy="178" r="5" fill="#fff" />
        <circle cx="182" cy="178" r="5" fill="#fff" />
      </g>

      {/* Nose & Mouth */}
      <path d="M150 195 Q148 208 150 214" stroke={palette.skinShadow} strokeWidth="4" strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M120 235 Q150 255 180 235" stroke="#b54a6c" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M130 235 Q150 228 170 235" stroke="#f7b7ca" strokeWidth="3" strokeLinecap="round" fill="none" />

      {renderHairFront()}

      {/* Brows - on top of hair */}
      <g stroke={palette.hairShadow} strokeWidth="7" strokeLinecap="round" opacity={0.8}>
        <path d="M100 160 Q125 140 150 160" />
        <path d="M200 160 Q175 140 150 160" />
      </g>
    </svg>
  );
};

export default Doll;
