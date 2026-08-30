import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

// TypeScriptやJSXのサポートが必要な場合は、pluginsに設定を追加
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // tsup の src/index.ts に合わせる
      formats: ['es', 'cjs'], // --format esm,cjs に合わせる
      fileName: (format) => format === 'cjs' ? 'index.cjs' : 'index.js',
    },
    outDir: 'dist', // --out-dir dist に合わせる
    // 型定義 (--dts) の場合は、vite-plugin-dts が必要になるため、
    // 追加でプラグイン設定を書く必要があります。
  },  // テスト環境でのみ無効にする設定はここに書く
  test: {
    // 除外するファイルパターン
    exclude: [...configDefaults.exclude, 'e2e/*'],
    
    // カバレッジ計測の設定
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'html'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
    },
    
    // ルートディレクトリ
    root: '.',
  },
})
