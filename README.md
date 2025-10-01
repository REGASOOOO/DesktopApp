# Henagame

A minimalist Electron desktop experience that keeps **Henagame** running quietly in your system tray and brings a glowing **hcloud** view to center stage whenever you need it.

## Features

- ⚡️ Built with Electron + TypeScript for a modern, type-safe desktop stack.
- 📌 System tray support: closing the window hides Henagame and keeps it accessible.
- 🔔 Quick tray actions: reopen the window or quit directly from the tray menu.
- 🎨 Sleek landing view with “hcloud” front and center.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (includes npm)

## Getting started

Install dependencies:

```powershell
npm install
```

### Development mode

Starts TypeScript in watch mode and launches Electron once the build output is ready.

```powershell
npm run dev
```

### Production build + run

Emit JavaScript to `dist/` and start Electron from the compiled output.

```powershell
npm run start
```

## Project structure

```
├─ src
│  ├─ main       # Electron main process (window + tray)
│  └─ renderer   # UI assets (HTML + renderer TypeScript)
├─ dist          # Compiled output (generated)
├─ package.json
└─ tsconfig.json
```

## System tray behavior

- Closing the main window hides it instead of quitting the app.
- Use the tray icon to reopen Henagame or quit completely.
- Clicking the tray icon acts as a quick shortcut to restore the window.

## Packaging

The project is preconfigured with [`electron-builder`](https://www.electron.build/) to create Windows executables.

### Generate an installer

Creates an `.exe` installer (NSIS) under `release/`.

```powershell
npm run package
```

### Generate unpacked app directory

Produces an unpacked portable build inside `release/henagame-win32-x64/` that contains the app executable.

```powershell
npm run package:dir
```

For custom icons, drop `icon.png` (>=256×256) or `icon.ico` into the `build/` folder before packaging. Electron Builder picks it up automatically.
