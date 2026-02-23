# PersonalSecretary プロジェクトコンテキスト

> このファイルは全AI（Claude Code / KITT内Gemini / スタンドアロンGemini）が共有する。
> 自動生成: 2026-02-23 17:41:40

---

## プロジェクト状況

# プロジェクト状況 (最終更新: 2026-02-23 チャット5後)

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

### KITTAssistant - Phase1.5+ 実装済み
- K.I.T.T.風WebApp（HTML+CSS+JS 1枚）: `02_ProductivityTools/KITTAssistant/index.html`
- AI: Gemini API（gemini-2.5-flash-lite, 無料枠: 1,000リクエスト/日）
  - ※ gemini-2.5-flash は無料枠20に激減、gemini-2.0-flash は廃止予定
  - レートリミット時の自動リトライ機能あり（最大2回）
- UI: 赤LEDスキャナー + チャット画面（動作確認済み）
- APIキー: localStorageに保存（ヘッダー送信、URLに露出しない）
- IME対応済み（変換確定時に誤送信しない）
- Phase1=テキストチャット+UI ✅, Phase1.5=秘書機能 ✅, Phase2=音声, Phase3=記憶+連携
- Phase1.5機能: 「保存&分析」ボタン → Gemini要約・抽出 → 結果モーダル → localStorage自動保存（最大50件）
- 各メッセージにタイムスタンプ記録（既存履歴との互換性あり）
- 過去のログ一覧表示・閲覧機能あり
- エクスポート機能: 分析ログをMarkdown形式で出力（Web Share API + Blobフォールバック）
- **ステータスボード**: 左上の📊ボタンでプロジェクト状況・inbox新着・次タスクを確認可能
- **プロジェクト文脈注入**: status_summary.json → Geminiのシステムプロンプトに注入。KITTがプロジェクト状況を把握した回答ができる
- ステータス更新: `python3 00_InfoHub/generate_status_json.py` → git push（status_summary.json + project_context.md を同時生成）
- **project_context.md**: .ai_contextの全情報を1ファイルに集約 → Geminiのシステムプロンプトに自動注入
- GitHub Pages公開: https://engawasanshin.github.io/kitt-assistant/ （iPhone/Macからアクセス可）
- GitHubリポジトリ: engawasanshin/kitt-assistant
- 抽出: responseSchema + maxOutputTokens:4096 で安定したJSONパース実現
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

1. **情報統合システム構築**（進行中 - Step1-4完了）
   - ✅ KITTエクスポート機能（Web Share API → iCloud Drive）
   - ✅ 00_InfoHub/inbox/ 作成
   - ✅ 新着チェックスクリプト（check_new_items.py）
   - ✅ CLAUDE.mdにInfoHub運用ルール追加
   - ⬜ 統合されたinbox → 分類・振り分け自動化
2. KITTAssistant Phase2（音声入力: Web Speech API）
3. PhotoMemory: AI分類精度向上（Claude Vision、要APIキー）
4. PhotoMemory: 検索機能追加
5. 日次運用の自動化 (cron/launchd)
6. 各プロジェクトの優先度決め


---

## InfoHub Inbox

新着なし


---

## 最近の作業ログ（直近2セッション）

### チャット5: 情報統合 Step3-4 + ステータスボード（双方向データ共有）
- **やったこと**:
  1. `00_InfoHub/check_new_items.py` 新着チェックスクリプト作成
     - inbox/ 内のファイル検出・サマリー表示
     - `--process <ファイル名>` で処理済みに移動
     - `--process --all` で全件一括処理
  2. CLAUDE.mdにInfoHub運用ルール追加
  3. `00_InfoHub/generate_status_json.py` 作成
     - status.md + daily_log + inbox情報をJSONに集約
     - KITTAssistant/status_summary.json に出力
     - `--stdout` でGemini用コピペ出力も可能
  4. KITTにステータスボード機能追加
     - 左上📊ボタン → プロジェクト状況・inbox新着・次タスク表示
     - status_summary.jsonをfetchして表示
     - Geminiのシステムプロンプトにプロジェクト状況を自動注入
  5. GitHub Pagesにpush済み
  6. project_context.md 生成機能追加
     - .ai_context/ の全ファイル（status/decisions/known_issues/ai_collaboration/直近2セッション分のlog）を1つのMarkdownに集約
     - KITTのGeminiシステムプロンプトにフルコンテキスト注入（4000文字制限付き）
     - `--context` オプションでスタンドアロンGemini用のコピペ出力にも対応
- **考えたこと・判断**:
  - KITTは静的サイトなのでiCloud Driveを直接読めない → GitHub Pages経由でJSONを共有する方式を採用
  - Geminiにもproject_context.mdの内容をシステムプロンプトとして注入 → KITTがプロジェクト全体の文脈を持った回答ができる
  - Claude Code側でJSON+MD生成 → git push のワークフロー（手動だが確実）
  - 4000文字制限はGemini flash-liteのトークン効率を考慮した値
- **次にやること**: iPhoneでステータスボード＆コンテキスト注入の動作確認
- **気づき・メモ**: 「情報のレベルを合わせる」＝全AIが同じプロジェクト状況を参照できることが重要。project_context.mdで実現
### チャット4: AI協業ルール整備 + GitHub Pages + 情報統合Step1-2
- **やったこと**:
  1. AI協業ルール整備（Claude Code & Gemini）
     - `.ai_context/ai_collaboration.md` 新規作成（協業ルール本体）
     - `.ai_context/gemini_task_template.md` 新規作成（Geminiへの依頼テンプレート + Claude Codeへの引き継ぎセクション）
     - CLAUDE.md / MEMORY.md に協業ルール追加
  2. KITTAssistant GitHub Pages公開
     - `gh` CLIインストール & GitHub認証
     - `engawasanshin/kitt-assistant` リポジトリ作成 & Pages有効化
     - iPhoneからアクセス確認済み: https://engawasanshin.github.io/kitt-assistant/
  3. KITTAssistant改善
     - gemini-2.5-flash → gemini-2.5-flash-lite に変更（無料枠: 20→1,000リクエスト/日）
     - レートリミット(429)自動リトライ機能追加（最大2回、待ち時間自動検出）
  4. 情報統合システム Step1-2
     - KITTにエクスポート機能追加（Web Share API + Blobフォールバック）
     - `00_InfoHub/inbox/` 新規作成（全デバイスからの情報集約先）
  5. マルチAI協業アイデアを `05_Ideas/inbox/` に登録
- **考えたこと・判断**:
  - Gemini無料枠が大幅削減（2025-12月）。flash-liteが1,000/日で最もコスパ良い
  - AI協業はコピペベースが最も現実的。.mdファイルを橋渡しにする
  - KITTデータのエクスポートはWeb Share API（iPhone） + Blob（Mac）の二段構え
  - GitHub Pagesはpublicリポジトリ + HTMLファイル1枚で最も手軽なホスティング
- **次にやること**: 情報統合システム Step3-5（新着チェックスクリプト、CLAUDE.mdルール追加、ai_collaboration.md更新）
- **気づき・メモ**:
  - `gh auth refresh -s workflow` でworkflowスコープ追加が必要だった
  - iPhone Edgeはキャッシュが強い。コード更新後は手動リロード必須
  - Gemini 2.5-flash-lite は対話に十分な品質

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
- 外部JS/CSSを埋め込む場合、`{}`がf-stringと競合する
- **解決策**: `__PLACEHOLDER__` + `.replace()` 方式を使う
- f-string変数の中の `{{` は `{` に変換されない（よくある間違い）


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

