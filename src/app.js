import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

class Prayer {
    constructor() {
        this.body = document.getElementById('body')
        this.createWelcome()
    }

    createWelcome = () => {
        this.body.classList.add('gradient')
        this.body.addEventListener('click', this.destroyWelcome)
        let quote = this.getQuote()

        const welcome = createDOMElem('div', 'welcome')
        const welcomeMain = createDOMElem('div', 'welcome-main')
        const welcomeMainIcon = createDOMElem('img', 'welcome-main__icon', null, '../img/pray.png')
        const welcomeMainText = createDOMElem('p', 'welcome-main__text welcome_text', quote[0])
        const welcomeMainAuthor = createDOMElem('p', 'welcome-main__author welcome_text', quote[1])
        const welcomeFooterText = createDOMElem('p', 'welcome-footer_text welcome_text', 'Dotknij ekranu aby kontynuować...')

        welcome.appendChild(welcomeMain)
        welcome.appendChild(welcomeFooterText)
        welcomeMain.appendChild(welcomeMainIcon)
        welcomeMain.appendChild(welcomeMainText)
        welcomeMain.appendChild(welcomeMainAuthor)

        body.appendChild(welcome)
    }

    destroyWelcome = () => {
        this.body.removeEventListener('click', this.destroyWelcome)
        this.body.classList.remove('gradient')
        this.body.innerHTML = ''
    }

    getQuote = () => {
        let quote
        if (localStorage.getItem('quotes')) {
            let quotes = JSON.parse(localStorage.getItem('quotes'))
            quote = quotes[Math.floor(Math.random()*quotes.length)]
        } else {
            quote = ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
        }
        return quote
    }

    // createFileLocalStorage = () => {
    //     let quotes = []
    //     quotes[0] = ['Wczoraj do Ciebie nie należy. Jutro niepewne. Tylko dziś jest Twoje', 'św. Jan Paweł II']
    //     quotes[1] = ['Bądźmy zawsze radośni, a czas minie szybko', 'św. Jan Bosko']
    //     quotes[2] = ['Moim zadaniem jest głosić, nie przekonywać', 'św. Benedyktyna']
    //     quotes[3] = ['Moim zdaniem to nie ma tak, że dobrze albo, że nie dobrze', 'jakiś typ z Asterix i Obelix']
    //     quotes[4] = ['Dość tego szukania cytatów', 'Anonim']
    //     // localStorage.setItem('quotes', JSON.stringify(quotes));
    //     console.log(quotes)
    // }
}

document.addEventListener('DOMContentLoaded', new Prayer())
