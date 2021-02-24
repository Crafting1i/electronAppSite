require('update-electron-app')({
    logger: require('electron-log')
})

const path = require('path')
const glob = require('glob')
const { app, BrowserWindow, dialog } = require('electron')


const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

let mainWindow;

function initialize() {
    makeSingleInstance()

    loadDemos()

    function createWindow() {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
            webPreferences: {
                nodeIntegration: true
            }
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

        // const options = {
        //   type: 'info',
        //   title: 'Application Menu Demo',
        //   buttons: ['Ok'],
        //   message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
        // }
        // dialog.showMessageBox(BrowserWindow, options, function () {})

        // function messageDialog() {
        //     let buttons = ['Ok', 'No', 'Maybe'];
        //     dialog.showMessageBox({
        //         buttons: buttons,
        //         title: 'Electron Message Dialog',
        //         message: 'Please select an answer',
        //         detail: 'A more descriptive message with some details',
        //     }, (buttonIndex) => {
        //         console.log('User selected: ' + buttons[buttonIndex]) // Получим ответ из диалога
        //     })
        // }
        // messageDialog()


        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos() {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
    files.forEach((file) => { require(file) })
}

initialize()