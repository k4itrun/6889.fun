import eslintConfig from '@billoneta/config/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
 eslintConfig.base,
 eslintConfig.node,
 eslintConfig.typescript,
 eslintConfig.next,
 eslintConfig.react,
 eslintConfig.prettier,
 [
  {
   name: 'Override',
   rules: {
    'require-await': 'off',
    '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
   },
  },
 ],
]);
