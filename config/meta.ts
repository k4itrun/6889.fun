import pkg from '../package.json';

export interface Account {
 username: string;
 url: string;
}

export interface Meta {
 version: string;
 title: string;
 description: string;
 shortDescription: string;
 keywords: string[];
 url: string;
 accounts: {
  github: Account & { repo: string };
  discord: Account & { id: string };
  youtube: Account;
  instagram: Account;
  twitter: Omit<Account, 'url'>;
  spotify: Omit<Account, 'username'>;
 };
}

const isSnowflake = (str: unknown): string | null =>
 // unknonw
 /^(\d{17,20})$/.test(String(str)) ? String(str) : null;

export const meta: Meta = {
 version: pkg.version,
 title: 'k4itrun - Unknown developer',
 description: 'Currently working on various projects. Stay tuned for updates.',
 shortDescription: 'Random developer from this planet.',
 keywords: ['fullstack', 'frontend', 'backend', 'uxui', 'typescript', 'nextjs', 'react', 'api', 'performance', 'developer'],
 url: pkg.homepage,
 accounts: {
  github: {
   username: 'k4itrun',
   url: '/github',
   repo: 'billoneta.xyz',
  },
  discord: {
   username: '@k4itrun',
   url: '/discord',
   id: isSnowflake(process.env.DISCORD_USER_ID) ?? '1233848549414797365',
  },
  youtube: {
   username: '@k4itrun',
   url: '/youtube',
  },
  instagram: {
   username: 'kobebryant',
   url: '/instagram',
  },
  twitter: {
   username: '@kobebryant',
  },
  spotify: {
   url: '/spotify',
  },
 },
};
