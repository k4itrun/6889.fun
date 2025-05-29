import type { Icons } from '@/components/UI/Icons';
import { meta } from '@/config/meta';

export interface Social {
 name: string;
 link: string;
 icon: keyof typeof Icons;
}

export interface Header {
 title: string;
 description: string;
 socials: Social[];
}

export const header: Header = {
 title: 'k4itrun',
 description: meta.description,
 socials: [
  { name: 'Spotify', link: meta.accounts.spotify.url, icon: 'Spotify' },
  { name: 'Github', link: meta.accounts.github.url, icon: 'Github' },
  { name: 'Youtube', link: meta.accounts.youtube.url, icon: 'Youtube' },
  { name: 'Instagram', link: meta.accounts.instagram.url, icon: 'Instagram' },
  { name: 'Discord', link: meta.accounts.discord.url, icon: 'Discord' },
 ],
};
