## Git操作方法

### プッシュ方法

**VSCodeの場合:**
```bash
cd C:\Users\ngu5t\Projects\ContactApp
git add .
git commit -m "修正内容（例: お問い合わせフォームの追加）"
git push
```

**Visual Studioの場合:**
```bash
cd C:\Users\nishimura0606\source\repos\ContactApp
git add .
git commit -m "修正内容（例: お問い合わせフォームの追加）"
git push
```

### プル方法

**VSCodeの場合:**
```bash
cd C:\Users\ngu5t\Projects\ContactApp
git pull
```

**Visual Studioの場合:**
```bash
cd C:\Users\nishimura0606\source\repos\ContactApp
git pull
```


## よく使うコマンド

### フロントエンド
```bash
cd contactapp.client

# 開発サーバー起動
npm run dev

# パッケージ追加
npm install パッケージ名

# ビルド
npm run build
```

### バックエンド
```bash
cd ContactApp.Server

# 開発サーバー起動
dotnet run

# パッケージ追加
dotnet add package パッケージ名

# ビルド
dotnet build
```

## アクセス先

- フロントエンド: https://localhost:62104/
- バックエンドAPI: https://localhost:7271/


## フォルダ構成（クライアント）
```
ContactAppClient/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.tsx
│   │       └── Sidebar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductList.tsx
│   │   └── Settings.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── node_modules/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## フォルダ構成（サーバー）
```
ContactAppServer/
├── Properties/
│   └── launchSettings.json
├── bin/
│   └── Debug/
│       └── net10.0/
├── obj/
│   └── Debug/
│       └── net10.0/
├── appsettings.json
├── appsettings.Development.json
├── ContactAppServer.csproj
├── ContactAppServer.http
└── Program.cs
```