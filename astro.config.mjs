import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  vite: {
    plugins: [yaml()]
  },
  typeCheck: false, // Disable type checking in Astro
});