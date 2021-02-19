function messageDialog() {
    let { dialog } = require('electron')
    let buttons = ['Ok', 'No', 'Maybe'];
    dialog.showMessageBox({
        buttons: buttons,
        title: 'Electron Message Dialog',
        message: 'Please select an answer',
        detail: 'A more descriptive message with some details',
    }, (buttonIndex) => {
        console.log('User selected: ' + buttons[buttonIndex]) // Получим ответ из диалога
    })
}

module.exports = messageDialog