/**
* This project created by
* @author Crafting1i [Mona Megistus]
* @author Mikun Hatsune
* Thanks for using!
*/
const { DBUrl } = require('./config/config.json')
//Последний элемент массива
Array.prototype.last = function () {
    return this.length - 1
}
//Значение последнего элемента массива
Array.prototype.lastName = function () {
    return this[this.last()]
}
//Удаление элемента массива по index'у
Array.prototype.deleteByIndex = function (index) {
    delete this[index]
    return this.filter(el => el == true)
}
//Переход между секцйиями с помощью 3 и 4 кнопок мыши
document.addEventListener('mousedown', event => {
    switch (event.button) {
        case 3: //Назад
            if (vm.prevSections.length == 0 || vm.prevSections.lastName() == vm.section) return;
            vm.nextSections.push(vm.section)
            vm.section = vm.prevSections.lastName()
            vm.prevSections.pop()
            break
        case 4: //Вперёд
            if (vm.nextSections.length == 0 || vm.nextSections.lastName() == vm.section) return;
            if (vm.prevSections.length >= 20) {
                vm.prevSections.shift()
                vm.prevSections.push(vm.section)
            } else {
                vm.prevSections.push(vm.section)
            }
            vm.section = vm.nextSections.lastName()
            vm.nextSections.pop()
            break
    }
})
//Переход между секциями с помощью клавиатуры
document.addEventListener('keydown', event => {
    if (!event.altKey) return;
    switch (event.key) {
        case 'ArrowLeft': //Назад
            if (vm.prevSections.length == 0 || vm.prevSections.lastName() == vm.section) return;
            vm.nextSections.push(vm.section)
            vm.section = vm.prevSections.lastName()
            vm.prevSections.pop()
            break
        case 'ArrowRight': //Вперёд
            if (vm.nextSections.length == 0 || vm.nextSections.lastName() == vm.section) return;
            if (vm.prevSections.length >= 20) {
                vm.prevSections.shift()
                vm.prevSections.push(vm.section)
            } else {
                vm.prevSections.push(vm.section)
            }
            vm.section = vm.nextSections.lastName()
            vm.nextSections.pop()
            break
    }
})
//Подключение базы данных
const mongoose = require('mongoose');

async function start() {
    try {
        await mongoose.connect(DBUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log(`[SUCCEFULL] DateBase has been connected!`);
    } catch (error) {
        console.error(error);
    }
}
start();