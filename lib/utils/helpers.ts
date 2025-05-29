import fetch from 'sync-fetch';

export function truncateText(text: string | number | null | undefined, maxLength: number): string {
 if (text === null || text === undefined) return '';
 const str = String(text);
 if (maxLength <= 0) return '';
 return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + '…' : str;
}

export const randomColor = (): string => {
 const hexDigits = '0123456789ABCDEF';
 const color = Array.from({ length: 6 }, () => hexDigits[Math.floor(Math.random() * hexDigits.length)]).join('');
 return `#${color}`;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
 let binary = '';
 const uint8Array = new Uint8Array(buffer);
 uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
 return window.btoa(binary);
};

export const toImgB64 = (url: string): string => {
 try {
  const res: { arrayBuffer: () => ArrayBuffer } = fetch(url);
  const arrayBuffer = res.arrayBuffer();
  const base64Data = `data:image/png;base64,${arrayBufferToBase64(arrayBuffer)}`;
  return base64Data;
 } catch (_error) {
  return '';
 }
};
