
## プッシュ方法
```
cd C:\Users\ngu5t\Projects\ContactApp
git add .
git commit -m "修正内容（例: お問い合わせフォームの追加）"
git push
```

## プル方法
```bash
cd C:\Users\ngu5t\Projects\ContactApp
git pull
```

## フォルダ構成（クライアント）
```
ContactAppClient/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── node_modules/
├── public/
└── src/
    ├── App.tsx
    ├── App.css
    ├── main.tsx
    ├── index.css
    └── assets/
```    

## フォルダ構成（サーバー）
```
ContactAppServer/
├── appsettings.json
├── appsettings.Development.json
├── ContactAppServer.csproj
├── ContactAppServer.http
├── Program.cs
├── Properties/
│   └── launchSettings.json
├── bin/
│   └── Debug/
│       └── net10.0/
└── obj/
    ├── ContactAppServer.csproj.nuget.dgspec.json
    ├── ContactAppServer.csproj.nuget.g.props
    ├── ContactAppServer.csproj.nuget.g.targets
    ├── project.assets.json
    └── Debug/
        └── net10.0/
```