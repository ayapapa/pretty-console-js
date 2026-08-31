# 依頼メッセージ
次に記載の通り、レビューをお願いします。

# レビュー対象
  * URL: https://github.com/ayapapa/pretty-console-js
  * 言語: TypeScript
  * ブランチ: main
  * レビュー対象: src/*, src/lib/*, test/*, example/*, README.md
  * ※最新の情報をもとにレビューしてください。

# レビュー依頼内容
1. ソースコードの不具合の指摘とその対応策の提示
2. ソースコードの強引な型アサーションの指摘とその対応策の提示
3. ソースコードの　型、変数、クラスなどの、名前（綴り含む）、コメント内容の誤りや不足の指摘と、修正案の提示
4. 現在のテスト(test/*)におけるテスト漏れの指摘とそのテスト内容（実装）の提示
5. README.mdの内容の誤りや不足の指摘と、修正案の提示
6. （もしあれば）example/内のサンプルコードの内容（コメント含む）の誤りと不足の指摘と、修正案の提示
7. その他、気になる事があれば、ご指摘ください。

# レビュー結果レポートついて
全項目について種類（バグ、強引な型アサーション、スペルミス（実装）、説明誤り、誤記など）の明記、、および、指摘内容は具体的な個所を明記して、簡潔に記載してください。
そして、その箇所がどのような悪影響をもたらすかも、未対応時の問題として、提示してください。
問題の重要度を少なくとも3段階（A: 対応必須、B: 対応推奨またはドキュメントやコメント追加変更が必要、C: 対応推奨だが、ドキュメントに記載するほどの事ではない）
で提示してください。

全指摘内容は「指摘レポート形式」の例に従い、全ての指摘をMarkdown形式でダウンロード出来るようにしてください。

# 指摘レポート形式
以下の指摘内容記述例：
## 指摘番号 1
### 種別
  バグ
### 重要度
  A
### ファイル
  src/lib/PrettyCondole.ts
### 箇所
  235行目｜ prividerの型チェック不具合。
 | 重要度 | ファイル | 箇所 | 
### 指摘内容
  ```ts
   provider:       (v) => {
        return v != null  && Boolean(v.log) && Boolean(v.trace) && Boolean(v.debug) &&
          Boolean(v.info)  && Boolean(v.warn)  && Boolean(v.error);
  ```
  となっていて、例えば、provider.logが、booleanでもチェックが通ってしまう
### 未対応時の問題
  provider = { log: true, trace: true, ...} を指定した場合でも、エラーにならない。
### 対応案
  ```ts
  provider:       (v) => {
    if (typeof v !== 'object' || v === null) return false;
    const p = v as Partial<LogProvider>;
    return typeof p.log === 'function' &&
      typeof p.trace === 'function' &&
      typeof p.debug === 'function' &&
      typeof p.info === 'function' &&
      typeof p.warn === 'function' &&
      typeof p.error === 'function' &&
      (p.fatal === undefined || typeof p.fatal === 'function');
  },
  ### 対応結果
  （あとで、対応者が記載する）
  ```

