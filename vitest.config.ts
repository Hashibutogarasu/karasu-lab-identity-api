import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    setupFiles: ['./test/auth/auth.setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    alias: {
      '@hashibutogarasu/common': resolve(__dirname, '../common/src/index.ts'),
    },
    server: {
      deps: {
        inline: [/@karasu-lab\/common/, 'better-auth-firebase-auth'],
      },
    },
  },
  plugins: [swc.vite()],
});
