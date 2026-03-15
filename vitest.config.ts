import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/dist/**'],
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    setupFiles: ['./test/auth/auth.setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    fileParallelism: false,
    alias: {
      '@hashibutogarasu/common': resolve(__dirname, './packages/common/src/index.ts'),
    },
    server: {
      deps: {
        inline: [/@karasu-lab\/common/],
      },
    },
  },
});
