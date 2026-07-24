import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    hookTimeout: 30000,
    testTimeout: 15000,
    // All test files share one SQLite file (see package.json's "test"
    // script); running files in parallel lets one file's beforeEach
    // (which wipes all rows) race another file's in-flight creates.
    fileParallelism: false,
  },
});
