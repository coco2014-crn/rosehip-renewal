# ROSE HIP renewal website

ROSE HIPの新サイトを一から制作する専用プロジェクトです。既存サイトの修正ではなく、ROSE HIP_original / ROSE HIP_edit / rosehip-siteとは別に管理します。既存コード・画像・動画はコピーしていません。

Repository: `coco2014-crn/rosehip-renewal`

## 現在の範囲・技術

PHASE 7-02の基本土台のみ。HTML / CSS / Vanilla JavaScript（ES Modules）を使用し、Mobile Firstで制作します。必要時のみPHPを使用予定です。フレームワーク・外部ライブラリは導入していません。

本文・完成デザイン・予約先・フォーム送信・SEO最終設定は後続PHASEで実装します。

## ページ

`index.html`, `about.html`, `hair.html`, `nail.html`, `eye.html`, `staff.html`, `recruit.html`, `contact.html`, `privacy.html`, `thanks.html`, `404.html`

各ページに仮title、header / nav / main / footer、主題となるh1を配置しています。本文実装時には大きなセクションにh2、その中の項目にh3を使用します。

## assets構成

- `assets/css/base.css`: 最小限のリセット・基本要素。Custom Propertiesは色・フォント等の設計確定後に追加。
- `assets/css/layout.css`: 共通レイアウト用。
- `assets/css/components.css`: 共通UI用。
- `assets/css/pages/`: home / about / service / staff / recruit / contact。HAIR・NAIL・EYEはservice.cssを共有。PRIVACY・THANKS・404は現時点では共通CSSのみ。
- `assets/js/main.js`: 共通初期化の入口。以下の4モジュールを読み込むだけで、現時点ではDOM操作なし。
- `assets/js/navigation.js`: グローバルナビゲーション用。
- `assets/js/reservation.js`: 予約UI用。
- `assets/js/accordion.js`: FAQ等のアコーディオン用。
- `assets/js/form.js`: CONTACTフォーム用。
- `assets/images/`: common / home / about / hair / nail / eye / staff / recruit。
- `assets/video/`, `assets/icons/`: 今後の動画・アイコン用。
- `php/`: 将来のサーバー側処理用。送信処理は未実装。

素材用とPHP用のディレクトリは現在空です。Gitは空ディレクトリを保存しないため、別環境へcloneした際は素材や処理の追加時に必要なディレクトリを作成してください。

## 環境変数

`.env.example`は将来のフォーム用にキーと空欄の値のみを記載しています。今回は実際の`.env`を作成せず、環境変数の読み込みも実装しません。`.env`と`.env.*`をGit対象外とし、`.env.example`のみ例外としています。秘密情報はサーバー側で管理し、HTMLやブラウザー側JavaScriptに含めません。

## ローカル確認

ES Modulesを使用するため、file://で直接開かず、プロジェクトルートを公開するローカルHTTPサーバーで確認してください。依存パッケージやビルド工程はありません。404.htmlの配信設定は公開環境の決定後に行います。
