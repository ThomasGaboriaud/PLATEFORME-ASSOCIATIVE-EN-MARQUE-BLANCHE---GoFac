import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  {
    ignores: ['.expo/**', 'android/**', 'ios/**'],
  },
  {
    // Évite la détection automatique de React, incompatible avec ESLint 10.
    settings: { react: { version: '19.3' } },
  },
]);
