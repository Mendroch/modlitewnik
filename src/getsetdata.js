export const getQuote = () => {
    if (localStorage.getItem('quotes')) {
        let quotes = JSON.parse(localStorage.getItem('quotes'))
        return quotes[Math.floor(Math.random()*quotes.length)]
    } else {
        return ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
    }
}

export const getSongs = () => {
    if (localStorage.getItem('songs')) {
        return JSON.parse(localStorage.getItem('songs'))
    } else { alert('Błąd wczytywania songs') } // <- usunąć w oficjalnej wersji
}

export const getTextSettings = () => {
    if (localStorage.getItem('settings')) {
        return JSON.parse(localStorage.getItem('settings'))
    } else {
        let settings = {
            fontFamily: 'Inter',
            fontSize: '17px',
            lineHeight: '1.2'
        }
        localStorage.setItem('settings', JSON.stringify(settings));
        return settings
    }
}

export const setTextSettings = (fontFamily, fontSize, lineHeight) => {
    let settings = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        lineHeight: lineHeight
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}