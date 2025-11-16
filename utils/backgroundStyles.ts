import { CSSProperties } from 'react';
import { BackgroundType } from '@/types/doll';

const NOISE_LAYER = "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22 width=%221%22 height=%221%22%3E%3CfeTurbulence baseFrequency=%220.8%22 numOctaves=%223%22 seed=%2299%22 type=%22fractalNoise%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.15%22/%3E%3C/svg%3E')";

const makeRadial = (color: string, highlight = 'rgba(255,255,255,0.45)'): CSSProperties => ({
  backgroundImage: `radial-gradient(circle at 40% 30%, ${highlight}, transparent 45%), ${color}, ${NOISE_LAYER}`,
  backgroundBlendMode: 'soft-light, normal',
});

const gradients: Record<BackgroundType, CSSProperties> = {
  'solid-pink': makeRadial('linear-gradient(135deg, #ffd1eb 0%, #fcbad3 100%)'),
  'solid-blue': makeRadial('linear-gradient(135deg, #b3e5fc 0%, #7cd0ff 100%)'),
  'solid-purple': makeRadial('linear-gradient(135deg, #d8b6ff 0%, #b086f7 100%)'),
  'gradient-sunset': {
    backgroundImage: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.5), transparent 35%),
      linear-gradient(120deg, #ff9a8b 0%, #ff6a88 35%, #ff99ac 60%, #ffc3a0 100%),
      ${NOISE_LAYER}`,
    backgroundBlendMode: 'screen, multiply, normal',
  },
  'gradient-ocean': {
    backgroundImage: `radial-gradient(circle at 60% 20%, rgba(255,255,255,0.45), transparent 40%),
      linear-gradient(160deg, #2193b0 0%, #6dd5ed 60%, #c1f0ff 100%),
      ${NOISE_LAYER}`,
    backgroundBlendMode: 'screen, multiply, normal',
  },
  'gradient-forest': {
    backgroundImage: `radial-gradient(circle at 45% 25%, rgba(255,255,255,0.35), transparent 40%),
      linear-gradient(150deg, #355c7d 0%, #6c5b7b 40%, #c06c84 100%),
      ${NOISE_LAYER}`,
    backgroundBlendMode: 'overlay, multiply, normal',
  },
  'pattern-stars': {
    backgroundColor: '#0f172a',
    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 20%),
      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.5), transparent 25%),
      radial-gradient(circle at 60% 70%, rgba(255,255,255,0.4), transparent 20%),
      ${NOISE_LAYER}`,
    backgroundSize: '400px 400px, 350px 350px, 500px 500px, auto',
  },
  'pattern-hearts': {
    backgroundImage: `linear-gradient(135deg, #ffd6e8 0%, #ffe9f3 55%, #fff 100%),
      ${NOISE_LAYER}`,
    backgroundBlendMode: 'screen',
  },
  'pattern-dots': {
    backgroundImage: `radial-gradient(circle, rgba(255,215,0,0.8) 15%, transparent 16%),
      radial-gradient(circle, rgba(255,105,180,0.8) 15%, transparent 16%),
      linear-gradient(135deg, #fff4d9 0%, #ffe5b4 100%),
      ${NOISE_LAYER}`,
    backgroundPosition: '0 0, 20px 20px, 0 0, 0 0',
    backgroundSize: '40px 40px, 40px 40px, auto, auto',
  },
};

export const getBackgroundStyle = (bg: BackgroundType): CSSProperties =>
  gradients[bg] ?? gradients['solid-pink'];
