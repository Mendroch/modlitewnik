import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

class Prayer {
    constructor() {
        this.body = document.getElementById('body')
        this.createWelcome()
    }

    createWelcome = () => {
        this.body.classList.add('gradient')
        this.body.addEventListener('click', this.destroyWelcome)
        // Tymczasowe teksty
        let text = `“Wczoraj do Ciebie nie należy. Jutro niepewne. Tylko dziś jest Twoje”.`
        let author = `św. Jan Paweł II`

        const welcome = createDOMElem('div', 'welcome')
        const welcomeMain = createDOMElem('div', 'welcome-main')
        const welcomeMainIcon = createDOMElem('img', 'welcome-main__icon', null, '../img/pray.png')
        const welcomeMainText = createDOMElem('p', 'welcome-main__text welcome_text', text)
        const welcomeMainAuthor = createDOMElem('p', 'welcome-main__author welcome_text', author)
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
}

document.addEventListener('DOMContentLoaded', new Prayer())
