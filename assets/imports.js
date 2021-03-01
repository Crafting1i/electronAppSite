const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
links.forEach(link => {
    let template = link.import.querySelector('.task-template')
    let clone = document.importNode(template.content, true)
    document.querySelector('main.content.js-content').appendChild(clone)
})