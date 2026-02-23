# PersonalSecretary プロジェクトコンテキスト

> このファイルは全AI（Claude Code / KITT内Gemini / スタンドアロンGemini）が共有する。
> 自動生成: 2026-02-23 22:15:35

---

## プロジェクト状況

# プロジェクト状況 (最終更新: 2026-02-23 チャット6後)

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

### KITTAssistant - Phase1.5+ 実装済み（ロードマップ策定済み）
- K.I.T.T.風WebApp（HTML+CSS+JS 1枚）: `02_ProductivityTools/KITTAssistant/index.html`
- AI: Gemini API（gemini-2.5-flash-lite, 無料枠: 1,000リクエスト/日）
- Phase1=テキストチャット+UI ✅, Phase1.5=秘書機能 ✅, Phase1.5+=ステータスボード ✅
- GitHub Pages公開: https://engawasanshin.github.io/kitt-assistant/
- **拡張ロードマップ**（Gemini協議 2026-02-23策定、詳細は README.md 参照）:
  - 第1弾（すぐやる）: iPhone最適化、API残量カウンター、音声認識(Phase2)
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

1. **KITT第1弾: iPhone最適化 + API残量カウンター**（apple-touch-icon、キャッシュ対策、残量表示）
2. **KITT第1弾: Phase2 音声認識**（Web Speech API）
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

### チャット6: KITT拡張ロードマップ策定（Gemini協議の記録）
- **やったこと**:
  1. Geminiと協議して出たKITT拡張アイデアを実現性評価
  2. 優先度3段階に分類（第1弾:すぐやる / 第2弾:次回以降 / 第3弾:保留）
  3. `KITTAssistant/README.md` にロードマップを詳細記録
  4. `status.md` の次にやること候補を更新（ロードマップ反映）
- **考えたこと・判断**:
  - Google連携（Gmail/Tasks/Maps）は魅力的だが、OAuth認証が必要でHTML1枚構成と相性悪い → Google Apps Script経由の設計が別途必要 → 保留
  - 能動的ブリーフィング（KITTから話しかける）はPush通知/Service Worker必要 → iPhoneブラウザ制約大 → 保留
  - 第1弾はiPhone最適化・API残量カウンター・音声認識の3つ。現アーキテクチャのまま実装可能でインパクト大
  - 感情キャプチャ＆オートダイアリーは秘書機能の自然な拡張として第2弾に
- **次にやること**: KITT第1弾（iPhone最適化 + API残量カウンター + Phase2音声認識）
- **気づき・メモ**: Geminiとのブレストで出たアイデアを.mdに記録する運用が定着。KITTが「アイデアの入口」→「Claude Codeで実装」の流れが機能し始めている
### チャット5: 情報統合 Step3-4 + ステータスボード + 全AI間コンテキスト共有
- **やったこと**:
  1. `00_InfoHub/check_new_items.py` 新着チェックスクリプト作成
     - inbox/ 内のファイル検出・サマリー表示
     - `--process <ファイル名>` で処理済みに移動、`--process --all` で全件一括
  2. CLAUDE.mdにInfoHub運用ルール追加
  3. `00_InfoHub/generate_status_json.py` 作成
     - `(default)` → status_summary.json + project_context.md をKITTAssistant/に出力
     - `--stdout` → JSON標準出力、`--context` → フルコンテキストMD標準出力（Gemini用コピペ）
  4. KITTにステータスボード機能追加（左上📊ボタン）
  5. KITTのGeminiシステムプロンプトにproject_context.mdを自動注入（4000文字制限）
  6. CLAUDE.mdに「Gemini同期手順」セクション追加（作業完了時に同期を促すルール定常化）
  7. GitHub Pagesにpush済み（3回）
  8. Geminiにフルコンテキストを初回コピペ実施
- **考えたこと・判断**:
  - KITTは静的サイト → iCloud直接読み不可 → GitHub Pages経由でJSON/MD共有
  - 「情報のレベルを合わせる」が最重要。全AI（Claude Code / KITT Gemini / スタンドアロンGemini）が同じ文脈を持つべき
  - Gemini同期は手動だが、CLAUDE.mdにルール化して定常化した
  - project_context.md = .ai_contextの全ファイルを1つに集約した「共有脳」
- **次にやること**:
  - iPhoneでステータスボード＆コンテキスト注入の動作確認
  - KITTで「プロジェクト状況は？」と聞いて文脈が反映されるかテスト
  - 情報統合 Step5（inbox→自動分類・振り分け）
  - KITT Phase2（音声入力）
- **気づき・メモ**:
  - project_context.mdは8600文字超。KITT側では4000文字に切り詰めている（flash-liteのトークン効率）
  - Google AI Studioでは毎回コピペが必要。KITTをメイン利用すれば自動で済む

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

