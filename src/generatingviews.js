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
    createMainPanel()
}

export const createWelcome = () => {
    body.classList.add('gradient')
    body.addEventListener('click', destroyWelcome)
    let quote = getQuote()

    const welcome = createDOMElem('div', 'welcome')
    const welcomeMain = createDOMElem('div', 'welcome-main')
    const welcomeMainIcon = createDOMElem('img', 'welcome-main__icon', null, '../img/pray.png')
    const welcomeMainText = createDOMElem('p', 'welcome_text', quote[0])
    const welcomeMainAuthor = createDOMElem('p', 'welcome-main__author welcome_text', quote[1])
    const welcomeFooterText = createDOMElem('p', 'welcome-footer__text welcome_text', 'Dotknij ekranu aby kontynuować...')

    welcome.appendChild(welcomeMain)
    welcome.appendChild(welcomeFooterText)
    welcomeMain.appendChild(welcomeMainIcon)
    welcomeMain.appendChild(welcomeMainText)
    welcomeMain.appendChild(welcomeMainAuthor)

    body.appendChild(welcome)
}

// Tworzenie ekranu głównego
export const createMainPanel = () => {
    const main = createDOMElem('div')

    const mainHeader = createDOMElem('header', 'home-header')
    const mainHeaderContainer = createDOMElem('div', 'container home-header__container')
    const mainHeaderImg = createDOMElem('img', 'home-header__menu-icon', null, '../img/menu.png')
    const mainHeaderHeader = createDOMElem('h1', 'home-header__header', 'Ekran główny')

    const mainContainer = createDOMElem('main', 'container')
    const mainHomeElem = createDOMElem('div', 'home-elem')
    const mainHomeElemImgDiv = createDOMElem('div', 'home-elem__img-div')
    const mainHomeElemImg = createDOMElem('img', 'home-elem__img', null, '../img/music-book.png')
    const mainHomeElemTexts = createDOMElem('div', 'home-elem__texts')
    const mainHomeElemHeader = createDOMElem('p', 'home-elem__texts-header', 'PIEŚNI')
    const mainHomeElemStrap = createDOMElem('div', 'home-elem__texts-strap')
    const mainHomeElemDirecting = createDOMElem('p', 'home-elem__texts-directing', 'PRZEJDŹ DO PIEŚNI')

    main.appendChild(mainHeader)
    main.appendChild(mainContainer)
    mainHeader.appendChild(mainHeaderContainer)
    mainHeaderContainer.appendChild(mainHeaderImg)
    mainHeaderContainer.appendChild(mainHeaderHeader)
    mainContainer.appendChild(mainHomeElem)
    mainHomeElem.appendChild(mainHomeElemImgDiv)
    mainHomeElemImgDiv.appendChild(mainHomeElemImg)
    mainHomeElem.appendChild(mainHomeElemTexts)
    mainHomeElemTexts.appendChild(mainHomeElemHeader)
    mainHomeElemTexts.appendChild(mainHomeElemStrap)
    mainHomeElemTexts.appendChild(mainHomeElemDirecting)

    body.appendChild(main)
}
