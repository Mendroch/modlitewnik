import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

// Tworzenie i zamykanie ekranu powitalnego
const getQuote = () => {
    let quote
    if (localStorage.getItem('quotes')) {
        let quotes = JSON.parse(localStorage.getItem('quotes'))
        quote = quotes[Math.floor(Math.random()*quotes.length)]
    } else {
        quote = ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
    }
    return quote
}

const destroyWelcome = () => {
    body.removeEventListener('click', destroyWelcome)
    body.classList.remove('gradient')
    body.innerHTML = ''
}

export const createWelcome = () => {
    body.classList.add('gradient')
    body.addEventListener('click', destroyWelcome)
    let quote = getQuote()

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
