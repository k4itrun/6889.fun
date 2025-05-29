export interface Technologies {
 link: string;
 name: string;
 icon: string;
}

const techs: Record<string, string> = {
 html: 'https://developer.mozilla.org/docs/Web/HTML',
 css: 'https://developer.mozilla.org/docs/Web/CSS',
 javascript: 'https://developer.mozilla.org/docs/Web/JavaScript',
 typescript: 'https://www.typescriptlang.org/',
 elixir: 'https://elixir-lang.org/',
 go: 'https://go.dev/',
 rust: 'https://www.rust-lang.org/',
 bash: 'https://www.gnu.org/software/bash/',
 python: 'https://www.python.org/',
 php: 'https://www.php.net/',
 react: 'https://react.dev/',
 'next.js': 'https://nextjs.org/',
 express: 'https://expressjs.com/',
 tailwindcss: 'https://tailwindcss.com/',
 bootstrap: 'https://getbootstrap.com/',
 'node.js': 'https://nodejs.org/',
 git: 'https://git-scm.com/',
 docker: 'https://www.docker.com/',
 postgresql: 'https://www.postgresql.org/',
 mongodb: 'https://www.mongodb.com/',
 vite: 'https://vitejs.dev/',
 jest: 'https://jestjs.io/',
 redux: 'https://redux.js.org/',
 prisma: 'https://www.prisma.io/',
};

function first(str: string) {
 if (!str.length) return str;
 return str.replace(/([a-zA-Z])/u, (firs) => firs.toUpperCase());
}

export const technologies: Technologies[] = Object.entries(techs).map(([key, link]) => {
 return {
  link,
  name: first(key),
  icon: `https://skillicons.dev/icons?i=${key.replace(/\.| /g, '').toLowerCase()}`,
 };
});
