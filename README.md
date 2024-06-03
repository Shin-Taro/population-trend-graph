# Population trend graph

都道府県別の人口推移グラフを表示するSPAです。

## Required

- Node.js: [.node-version](./.node-version)参照
- yarn: [package.json](./package.json)の `packageManager`参照

## Getting started

### 依存関係の解決

プロジェクトルートで `yarn` 実行

他のパッケージマネージャーで実行しようとするとエラーになります

### ローカルサーバの起動

プロジェクトルートで `yarn dev` を実行

http://localhost:3000 で画面を確認できます

### コードチェック

プロジェクトルートで `yarn check-code` を実行

lint、型チェック、typoチェックが走ります

## Commands

主要コマンド一覧

| コマンド名 | 説明                                            |
| ---------- | ----------------------------------------------- |
| dev        | 開発モードでアプリケーションを起動              |
| build      | Next.jsアプリケーションのビルド                 |
| start      | `build`の成果物を使用してアプリケーションを起動 |
| check-code | コードのリント、型チェック、typoチェックを実行  |
| lint       | コードのリントを実行                            |
| fix        | コードフォーマットの実行                        |
| type-check | tscを使用して型の検査を実行                     |
