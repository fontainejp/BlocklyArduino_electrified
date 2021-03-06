const electron = require('electron')
const {ipcMain} = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const userDataPath = app.getPath ('userData');
app.setPath ('userData', app.getAppPath());

let mainWindow
let termWindow

app.on('window-all-closed', () => {
    app.quit()
})

function createWindow () {
	mainWindow = new BrowserWindow({
		width:1280,
		height:800,
		icon:'./favicon.ico'
		})
	if (process.platform == 'win32' && process.argv.length >= 2) {
		mainWindow.loadURL(path.join(__dirname, '../../www/index_electron.html?url='+process.argv[1]))
	} else {
		mainWindow.loadURL(path.join(__dirname, '../../www/index_electron.html'))
	}
	mainWindow.setMenu(null);
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)
app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})
	
function createTerm() {
	termWindow = new BrowserWindow({
		width:640,
		height:560,
		'parent':mainWindow,
		resizable:true,
		movable:true,
		frame:true,
		modal:true
		}) 
	termWindow.loadURL(path.join(__dirname, "../../www/tools/serialconsole/term.html"))
	termWindow.setMenu(null);
	termWindow.on('closed', function () { 
		termWindow = null 
	})
}
ipcMain.on("prompt", function () {
	createTerm()       
});

function createfactory() {
	termWindow = new BrowserWindow({
		width:1066,
		height:700,
		'parent':mainWindow,
		resizable:true,
		movable:true,
		frame:true,
		modal:true
		}) 
	termWindow.loadURL(path.join(__dirname, "../../www/tools/factory/index.html"))
	termWindow.setMenu(null);
	termWindow.on('closed', function () { 
		termWindow = null 
	})
}
ipcMain.on("factory", function () {
	createfactory()       
});