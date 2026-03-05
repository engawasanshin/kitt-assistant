# PersonalSecretary プロジェクトコンテキスト

> このファイルは全AI（Claude Code / KITT内Gemini / スタンドアロンGemini）が共有する。
> 自動生成: 2026-03-01 13:48:06

---

## プロジェクト状況

# プロジェクト状況 (最終更新: 2026-03-01 チャット8後)

---

## 00_InfoHub - 運用中
- 全デバイス・全アプリからの情報集約先: `00_InfoHub/inbox/`
- KITT会話分析のエクスポート → iCloud Drive経由で共有
- 新着チェック: `python3 00_InfoHub/check_new_items.py`（新チャット開始時に自動実行）
- 処理済み移動: `python3 00_InfoHub/check_new_items.py --process <ファイル名>`
- CLAUDE.mdにInfoHub運用ルール追加済み
- 詳細: `00_InfoHub/README.md`
- 次のステップ: inbox → 自動分類・振り分け（Step5）

---

## 01_KnowledgeManagement

### PhotoMemorySystem - 完成
- iPhone撮影 → iCloud同期 → Whisper文字起こし → カテゴリ分類 → HTMLギャラリー
- 処理: `PhotoMemorySystem/scripts/process_photo_memos.py`
- ギャラリー: `PhotoMemorySystem/scripts/generate_gallery.py`
- 出力: Gallery + Calendar + Map + .ics
- データ: 8件処理済み
- 詳細: `PhotoMemorySystem/README.md`

### VoiceMemorySystem - 完成
- iPhone録音 → iCloud同期 → Whisper文字起こし → Markdown保存
- 処理: `scripts/process_voice_memos.py`

### DocumentOrganizer - 未着手

---

## 02_ProductivityTools

### KITTAssistant - Phase1.5+ 実装済み + 記憶システム実装済み
- K.I.T.T.風WebApp（HTML+CSS+JS 1枚）: `02_ProductivityTools/KITTAssistant/index.html`
- AI: Gemini API（gemini-2.5-flash-lite, 無料枠: 1,000リクエスト/日）
- Phase1=テキストチャット+UI ✅, Phase1.5=秘書機能 ✅, Phase1.5+=ステータスボード ✅
- **API残量カウンター**: ヘッダーにリアルタイム表示（成功/制限/エラー別カウント、日替わりリセット）
- **iPhone最適化**: apple-touch-icon、Cache-Control no-cache、apple-mobile-web-app対応
- **記憶システム**: ✅ 実装済み
  - `kitt_memory.md`: Claude Codeが更新 → GitHub Pages経由でKITTに配信（ユーザープロファイル・Key Facts）
  - ローカル記憶: 会話分析時にGeminiがユーザーの好み・状況・習慣を抽出 → localStorage蓄積（最大50件）
  - システムプロンプトに名前（塩川さん）＋記憶コンテキスト自動注入
  - エクスポートMDに「記憶」セクション追加 → Claude Code側でも知見として活用可能
- GitHub Pages公開: https://engawasanshin.github.io/kitt-assistant/
- **拡張ロードマップ**（Gemini協議 2026-02-23策定、詳細は README.md 参照）:
  - 第1弾: ✅ iPhone最適化、✅ API残量カウンター、✅ 記憶システム、⬜ 音声認識(Phase2)
  - 第2弾（次回以降）: 提案ロジック強化、感情キャプチャ＆オートダイアリー
  - 第3弾（保留）: Google連携(Gmail/Tasks/Maps)、能動的ブリーフィング、BGM演出
- 詳細: `02_ProductivityTools/KITTAssistant/README.md`

### ScheduleManager - 未着手
### TaskAutomation - 未着手
### TimeTracker - 未着手

---

## 03_CreativeProjects

### VideoEditor - 未着手
### PhotoAlbum - 未着手
### WebsiteGenerator - 未着手

---

## 04_LearningProjects

### CircuitDesign - 未着手
### ProgrammingPractice - 未着手
### DataAnalysis - 未着手

---

## 05_Ideas

- inbox/ active/ archive/ の3段階管理構造あり
- 運用ルール未策定

---

## 次にやること候補

1. ~~KITT第1弾: iPhone最適化 + API残量カウンター~~ ✅ 実装済み
2. ~~KITT記憶システム~~ ✅ 実装済み（名前記憶 + 会話からの知識蓄積 + 双方向共有）
3. **KITT第1弾: Phase2 音声認識**（Web Speech API）
3. **情報統合 Step5**: inbox → 分類・振り分け自動化
4. **KITT第2弾: 提案ロジック強化**（システムプロンプト改善）
5. **KITT第2弾: 感情キャプチャ＆オートダイアリー**（秘書機能拡張）
6. KITT第3弾: Google連携（Gmail/Tasks/Maps）→ 要設計チャット
7. PhotoMemory: AI分類精度向上（Claude Vision、要APIキー）
8. 日次運用の自動化 (cron/launchd)


---

## InfoHub Inbox

新着なし


---

## 最近の作業ログ（直近2セッション）

### チャット8: KITT記憶システム実装
- **やったこと**:
  1. `kitt_memory.md` 作成（ユーザープロファイル + Key Facts + Conversation Insights）
     - Claude Codeが更新 → GitHub Pages経由でKITTが読み込む
  2. システムプロンプト更新
     - 「マイケル」→「塩川さん」に変更
     - 記憶を参照・パーソナライズする指示を追加
  3. 記憶読み込みシステム（`loadKittMemory` + `getMemoryContext`）
     - GitHub Pages上のkitt_memory.mdをfetch → システムプロンプトに注入
     - ローカル記憶（localStorage）も併せて注入
  4. 会話分析時の記憶抽出ロジック
     - Geminiの抽出プロンプトに `memories` フィールド追加（ユーザーの好み・状況・習慣）
     - `responseSchema` に memories 配列追加
     - 抽出結果を `addLocalMemory()` で localStorage に蓄積（最大50件）
     - 結果モーダルに「記憶」セクション表示
     - エクスポートMDに「記憶（KITTが学んだこと）」セクション追加
- **考えたこと・判断**:
  - 双方向記憶共有: Claude Code → kitt_memory.md → KITT / KITT → localStorage → エクスポート → Claude Code
  - ローカル記憶は50件上限で管理。古いものから削除
  - kitt_memory.mdは1500文字に切り詰めてトークン節約
- **次にやること**: Phase2 音声認識（Web Speech API）
- **気づき・メモ**: 記憶システムにより、KITTが「秘書」としてユーザーを理解する基盤が完成

---

## 2026-02-24
### チャット7: KITT第1弾 実装（API残量カウンター + iPhone最適化）
- **やったこと**:
  1. API残量カウンター実装
     - localStorageで日次リクエスト数をカウント（成功/制限/エラー別）
     - 日付が変わったら自動リセット
     - ヘッダー左上にリアルタイム残量表示（ドットインジケーター付き）
     - ステータスボードに詳細表示（プログレスバー + 内訳）
  2. iPhone最適化
     - apple-touch-icon（180px PNGアイコン）
     - apple-mobile-web-app-capable meta
     - Cache-Control: no-cache
  3. GitHub Pagesにpush済み
- **考えたこと・判断**:
  - 1回送信でレート制限 → カウンターで可視化して状況把握
  - カウンターはヘッダーに常時表示（クリックでステータスボード）
- **次にやること**: Phase2 音声認識（Web Speech API）
- **気づき・メモ**: Gemini API無料枠のレート制限が厳しい。分あたりの制限がある可能性

---

## 2026-02-23

---

## 設計判断の記録

# 設計判断の記録

## 全体方針
- **無料ツール優先** (2026-02-21) - Anthropic API未所持。将来取得したら拡張可能
- **ローカル処理重視** (2026-02-21) - Whisper base モデル、キーワードベース分類
- **iCloud中心** (2026-02-21) - iPhone↔Mac の同期はiCloud Drive に統一
- **チャット分割運用** (2026-02-22) - タスク単位でClaude Codeチャットを分ける

## PhotoMemorySystem
- **未分類 → `unclassified`** (2026-02-21) - "other"ではなく未分類の概念を残す
- **Inputディレクトリは作らない** (2026-02-21) - `mkdir -p` でiCloud競合が発生した教訓
- **メタデータ形式** (2026-02-21) - iPhone実データに合わせ `*_meta.md`, `VOICE_` に修正
- **地図: 3段フォールバック** (2026-02-22) - Leafletインライン → CDN → Apple Mapsリスト
- **base64画像はギャラリーのみ** (2026-02-22) - ポップアップに入れると19MB→JSが壊れる
- **f-stringと外部コード** (2026-02-22) - `{}`含む外部JSはプレースホルダで埋め込み

## AI運用
- **`.ai_context/` で記憶統一** (2026-02-22) - 全プロジェクト共通の状況管理
- **CLAUDE.md は自動読み込み** (2026-02-22) - Claude Codeがプロジェクト開始時に読む


---

## 既知の制約・注意点

# 既知の制約・注意点

## iCloud Drive
- **Input ディレクトリを mkdir するな** → 空フォルダとiCloud側が競合し `Input 2` が生まれる
- **大きいHTMLファイル** → iCloud同期に時間がかかる（9.5MBで数分）
- **シンボリックリンク** → `data/` → iCloud Drive 上の実フォルダ。パス解決に注意

## iPhone ブラウザ (Edge on iOS)
- **file:// プロトコル制限**
  - JS は動く（タブ切り替え、カレンダー等OK）
  - 外部CDNスクリプト読み込み → 動かない場合あり
  - HTTPS地図タイル → ブロックされる（WebKit制限）
  - **対策**: Leafletインライン + Apple Mapsフォールバック
- **「ファイル」アプリ** → Quick Look で開くとJS一切動かない。Edgeで開くこと

## Whisper (ローカル)
- `whisper --model base --language ja` で日本語文字起こし
- 短い音声（数秒）でも処理に10-20秒かかる
- 精度: 日常会話レベルはOK、専門用語は弱い

## Python f-string テンプレート
- 外部JS/CSSを埋め込む場合、波括弧がf-stringと競合する
- **解決策**: `__PLACEHOLDER__` + `.replace()` 方式を使う
- f-string変数の中の二重波括弧は単一波括弧に変換されない（よくある間違い）


---

## AI協業ルール

# AI協業ルール - Claude Code & Gemini

## 概要
このプロジェクトは **Claude Code** と **Gemini** の2つのAIが協業して開発を進める。
お互いが同じ知識レベルを保つために、`.ai_context/` 配下の .md ファイルを共有コンテキストとして使用する。

## 役割分担

| AI | 担当 | 得意なこと |
|----|------|-----------|
| **Claude Code** | 統合・デバッグ・品質管理 | 既存コードとの整合性、複雑なロジック、ファイル操作、プロジェクト全体の管理 |
| **Gemini** | モジュール作成・設計案・壁打ち | 小さな関数・コンポーネントの雛形作成、設計のアイデア出し、簡単なスクリプト |

## 基本フロー

```
1. Claude Code がタスクを分解し、Gemini向けの依頼を作成
2. ユーザーがその依頼をGeminiに貼り付けて作業してもらう
3. Geminiの出力をユーザーがClaude Codeに貼り付ける
4. Claude Code が統合・デバッグ・テストを行う
5. 完了後、.ai_context/ を更新（次回どちらのAIでも状況がわかるように）
```

## Gemini依頼時のルール

Claude Code がGemini向けの依頼を作成する際は、以下を含めること:

1. **コンテキストブロック**: 関連する .md ファイルの内容（status.md の該当部分など）
2. **タスク説明**: 何を作るか、入出力の仕様
3. **制約**: 技術的な条件（ブラウザ互換性、既存コードとのインターフェース等）
4. **出力形式**: コードだけ / ファイル全体 / 関数単体 など

テンプレートは `gemini_task_template.md` を参照。

## .md ファイルの書き方ルール（両AI共通）

- **どちらのAIが読んでもわかる文章**で書く（Claude固有の指示とGemini共通の情報を混ぜない）
- 専門的な略語を使う場合は初出時に説明を添える
- ファイルパスは PersonalSecretary/ からの相対パスで記載
- コード例を書く際は言語を明記（```python など）
- 状況の更新日時を必ず記載する

## 共有コンテキストファイル一覧

| ファイル | 内容 | 誰が更新する |
|---------|------|-------------|
| `.ai_context/status.md` | プロジェクト全体の現状 | Claude Code（作業完了時） |
| `.ai_context/daily_log.md` | 日々の作業ログ | Claude Code（チャット終了時） |
| `.ai_context/decisions.md` | 設計判断の記録 | Claude Code |
| `.ai_context/known_issues.md` | 既知の制約・注意点 | Claude Code |
| `.ai_context/ai_collaboration.md` | このファイル。協業ルール | Claude Code |
| `各プロジェクト/README.md` | プロジェクト個別の仕様 | Claude Code |

※ Gemini は直接ファイルを更新できないため、更新は全て Claude Code が行う。
※ Gemini の作業結果を統合した後、Claude Code が関連ファイルを更新する。

## 注意事項

- Gemini に渡すコンテキストは必要最小限にする（トークン節約）
- APIキーやシークレットは絶対に .md ファイルに書かない
- Gemini の出力はそのまま使わず、必ず Claude Code でレビューしてから統合する

