# ToDoリスト管理アプリ

## アプリの概要
このアプリは、日々のタスクを効率的に管理するためのシンプルなWebアプリです。タスクの追加、完了、削除が簡単に行えます。

デモページは[こちら](https://potemkin-learning.github.io/To-do-App/)

## 機能一覧
- タスクの追加
  - 入力フォームを使用して新しいタスクをリストに追加できます。
- タスクの表示
  - 未完了タスクと完了済みタスクを分けて表示します。
- タスクの完了
  - チェックボックスをオンにすることでタスクを完了済みにできます。
  - 完了済みタスクは打ち消し線付きで表示されます。
- タスクの削除
  - 削除ボタンをクリックすることでタスクをリストから削除できます。
- データの永続化
  - ローカルストレージを使用して、ページをリロードしてもタスクの状態が保持されます。

## 使用技術
- HTML
- CSS
- JavaScript

## 制作の背景・目的
JavaScriptの学習を目的として、Webアプリ制作の基礎を学ぶために作成しました。

## 工夫した点・こだわった点
- **イベント委譲の活用**:
  - 動的に生成される要素に対して効率的にイベントリスナーを設定するため、イベント委譲を使用しました。
- **ローカルストレージの利用**:
  - タスクデータをローカルストレージに保存することで、データの永続化を実現しました。
- **ユーザーインターフェースの工夫**:
  - 未完了タスクと完了済みタスクを視覚的に区別できるよう、打ち消し線や背景色を適用しました。
- **コードの可読性向上**:
  - 関数を分割し、役割を明確にすることでコードの可読性を向上させました。

## 学んだこと
- JavaScriptのイベント処理の仕組みを理解し、イベント委譲という概念の重要性を学んだ。
- Chrome開発者ツールを活用した効率的なデバッグの重要性を認識した。
- ローカルストレージを使用したデータ永続化の実装方法を学んだ。

## 次回以降の課題
  - JavaScript
    - パフォーマンスを最適化し、差分更新を実現する。
    - エラーハンドリングとバリデーションを強化する。
  - HTML・CSS
    - セマンティクスを強化し、コードの意味を明確にする。
    - クラス名に統一感を持たせ、可読性を向上させる。
