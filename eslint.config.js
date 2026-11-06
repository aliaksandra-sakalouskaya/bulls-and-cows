import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
    ignores: ['dist'],
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
  eslintConfigPrettier,
]);
