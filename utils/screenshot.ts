import html2canvas from 'html2canvas';

export async function captureScreenshot(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // Higher quality
    logging: false,
  });

  return canvas.toDataURL('image/png');
}

export function downloadImage(dataUrl: string, filename: string = 'my-doll.png') {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function saveDollToLocalStorage(id: string, data: any) {
  const saved = getSavedDolls();
  saved.push({ id, ...data, createdAt: Date.now() });
  localStorage.setItem('saved-dolls', JSON.stringify(saved));
}

export function getSavedDolls(): any[] {
  const saved = localStorage.getItem('saved-dolls');
  return saved ? JSON.parse(saved) : [];
}

export function deleteSavedDoll(id: string) {
  const saved = getSavedDolls();
  const filtered = saved.filter((doll) => doll.id !== id);
  localStorage.setItem('saved-dolls', JSON.stringify(filtered));
}

