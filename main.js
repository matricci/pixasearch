const { app, BrowserWindow, shell, clipboard } = require("electron");
const { ipcMain } = require("electron");
const open = require("open")
var path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    },
    icon: path.join(__dirname, "assets/icon.png")
  });
  mainWindow.autoHideMenuBar = true;

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  ipcMain.on("store-key", event => {
    mainWindow.reload();
  });

  ipcMain.on("copy-text", async (event, text) => {
    clipboard.writeText(text);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("open-browser", (event, url) => {
  console.log(url);
  open(url, {});
});
