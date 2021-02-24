const { ipcRenderer } = require('electron')

const button = document.querySelector('#dialog')


button.addEventListener('click', (event) => {
    ipcRenderer.send('dialog')
    ipcRenderer.on('delete', (event, index) => {
        if (index === 1) {
            console.log('Произошла отмена');
        } else {
            console.log(index);
        }
    })
})