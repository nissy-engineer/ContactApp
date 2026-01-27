import React, { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

interface SettingsState {
  displayName: string;
  email: string;
  theme: Theme;
  notificationsEnabled: boolean;
  syncContacts: boolean;
  language: string;
}

const STORAGE_KEY = "contactapp_settings";

const defaultSettings: SettingsState = {
  displayName: "",
  email: "",
  theme: "system",
  notificationsEnabled: true,
  syncContacts: false,
  language: "ja",
};

export default function Settings(): JSX.Element {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string }>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SettingsState>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ロード失敗時はデフォルトを使用
    }
  }, []);

  useEffect(() => {
    if (savedMessage) {
      const t = setTimeout(() => setSavedMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [savedMessage]);

  const validate = (): boolean => {
    const nextErrors: typeof errors = {};
    if (settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      nextErrors.email = "有効なメールアドレスを入力してください。";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const saveSettings = () => {
    if (!validate()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSavedMessage("設定を保存しました。");
    } catch {
      setSavedMessage("設定の保存に失敗しました。");
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedMessage("設定をリセットしました。");
    } catch {
      setSavedMessage("リセット中にエラーが発生しました。");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: "0 auto", fontFamily: "Segoe UI, Roboto, Arial" }}>
      <h1>設定</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>プロフィール</h2>
        <div style={{ marginBottom: 8 }}>
          <label>
            表示名
            <br />
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
              placeholder="あなたの名前"
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            連絡用メール
            <br />
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="name@example.com"
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </label>
          {errors.email && <div style={{ color: "crimson", marginTop: 6 }}>{errors.email}</div>}
        </div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>表示</h2>
        <div style={{ marginBottom: 8 }}>
          <label>
            テーマ
            <br />
            <select
              value={settings.theme}
              onChange={(e) => handleChange("theme", e.target.value as Theme)}
              style={{ padding: 8 }}
            >
              <option value="system">システムに合わせる</option>
              <option value="light">ライト</option>
              <option value="dark">ダーク</option>
            </select>
          </label>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) => handleChange("notificationsEnabled", e.target.checked)}
            />
            通知を有効にする
          </label>
        </div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>同期とプライバシー</h2>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.syncContacts}
              onChange={(e) => handleChange("syncContacts", e.target.checked)}
            />
            連絡先をクラウドと同期する
          </label>
        </div>
        <div>
          <label>
            言語
            <br />
            <select
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
              style={{ padding: 8 }}
            >
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </section>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={saveSettings} style={{ padding: "8px 12px" }}>
          保存
        </button>
        <button onClick={resetSettings} style={{ padding: "8px 12px" }}>
          リセット
        </button>
      </div>

      {savedMessage && <div style={{ marginTop: 12, color: "#006400" }}>{savedMessage}</div>}
    </div>
  );
}