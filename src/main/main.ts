import { app, BrowserWindow, Menu, Tray, nativeImage } from "electron";
import type { Event as ElectronEvent } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

const trayIconDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAKUlEQVR42mNgoBAwUqifAeJgHFQYhgYGBkYwMDAw/P//PwMaYBqGAcGAADYWAxL4OoJ9AAAAABJRU5ErkJggg==";

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function createWindow(): void {
  if (mainWindow) {
    return;
  }

  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    title: "Henagame",
    show: false,
    backgroundColor: "#111827",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const indexHtml = path.join(__dirname, "../renderer/index.html");
  mainWindow.loadFile(indexHtml).catch((error: unknown) => {
    console.error("Failed to load renderer:", error);
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("close", (event: ElectronEvent) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function showMainWindow(): void {
  if (!mainWindow) {
    createWindow();
    return;
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

function createTray(): void {
  if (tray) {
    return;
  }

  const icon = nativeImage.createFromDataURL(trayIconDataUrl);
  tray = new Tray(icon);
  tray.setToolTip("Henagame");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Henagame",
      click: showMainWindow,
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on("click", showMainWindow);
}

app.whenReady().then(() => {
  app.setAppUserModelId("com.henagame.desktop");
  createWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      showMainWindow();
    }
  });
});

app.on("second-instance", () => {
  showMainWindow();
});

app.on("before-quit", () => {
  isQuitting = true;
});

app.on("window-all-closed", (event: ElectronEvent) => {
  event.preventDefault();
});

app.on("quit", () => {
  tray?.destroy();
});
