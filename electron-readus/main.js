// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    transparent: true,
    frame: false, // フレームを表示 or 非表示にする
    resizable: false, // ウィンドウリサイズ禁止 resizableが有効だと、一部環境によっては透過が機能しなくなる可能性があります。
    alwaysOnTop: true // 追加 常に最前面にある
  });

  mainWindow.loadFile("index.html"); // and load the index.html of the app.
  mainWindow.maximize();
  // mainWindow.setIgnoreMouseEvents(true); // 追加 マウスイベントを無視する
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
