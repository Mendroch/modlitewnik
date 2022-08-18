import { mapListToDOMElements, createDOMElem } from './dominteractions.js'


class Prayer {
    constructor() {
        this.viewElems = {}
        this.initializeApp()
        this.getQuote()
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds)
    }

    setupListeners = () => {
        this.viewElems.welcomePanel.addEventListener('click', this.switchWelcomeView)
    }

    getQuote = () => {
        let quote
        if (localStorage.getItem('quotes')) {
            let quotes = JSON.parse(localStorage.getItem('quotes'))
            quote = quotes[Math.floor(Math.random()*quotes.length)]
        } else {
            quote = ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
        }
        this.viewElems.welcomeQuote.innerText = quote[0]
        this.viewElems.welcomeQuoteAuthor.innerText = quote[1]
    }

    fadeInOut = () => {
        if (this.viewElems.body.style.opacity === '1' || this.viewElems.body.style.opacity === '') {
            this.viewElems.body.style.opacity = '0'
        } else {
            this.viewElems.body.style.opacity = '1'
        }
    }

    switchView = () => {
        this.viewElems.welcomePanel.style.display = 'none'
        this.viewElems.homePanel.style.display = 'block'
    }

    switchWelcomeView = () => {
        this.fadeInOut()
    
        setTimeout(() => {
            this.switchView()
            this.fadeInOut()
        }, 170)
    }
}

document.addEventListener('DOMContentLoaded', new Prayer())
