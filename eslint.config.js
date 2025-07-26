import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
   {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
      plugins: { js },
      extends: ['js/recommended'],
      languageOptions: { globals: globals.browser },
      rules: {
         'no-console': 'warn',
         semi: ['error', 'always'],
         quotes: ['error', 'single'],
      },
   },
   tseslint.configs.recommended,
   pluginVue.configs['flat/essential'],
   { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
]);
