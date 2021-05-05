// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd8tr0y47lvUhyL7NWT112epaxWXsMABw",
  authDomain: "moving-5e9c4.firebaseapp.com",
  projectId: "moving-5e9c4",
  storageBucket: "moving-5e9c4.appspot.com",
  messagingSenderId: "1032830265053",
  appId: "1:1032830265053:web:f989c3ee6e6fb588669d34",
  measurementId: "G-Z7JJY20GS8",
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    transparent: false,
    frame: true, // フレームを表示 or 非表示にする
    resizable: false, // ウィンドウリサイズ禁止 resizableが有効だと、一部環境によっては透過が機能しなくなる可能性があります。
  });

  mainWindow.loadFile("index.html"); // and load the index.html of the app.
  mainWindow.maximize();
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
