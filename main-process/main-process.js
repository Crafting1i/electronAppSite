const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... выполнять действия от имени Renderer
})