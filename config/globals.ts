export interface ColorOption {
 name: string;
 hex: string;
}

export interface GlobalConfig {
 colorOptions: ColorOption[];
}

export const webhook = `${process.env.DISCORD_WEBHOOK_URL}`;

export const globalConfig: GlobalConfig = {
 colorOptions: [
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Lime', hex: '#BFFF00' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Mint', hex: '#98FF98' },
  { name: 'Rose', hex: '#FF007F' },
  { name: 'Slate', hex: '#708090' },
 ],
};
