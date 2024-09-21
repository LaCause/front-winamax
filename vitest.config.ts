import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{ts,tsx,spec}'],
    exclude: ['src/vite-env.d.ts'],
    environment: 'jsdom',
  },
});
