export const getQuote = () => {
    if (localStorage.getItem('quotes')) {
        let quotes = JSON.parse(localStorage.getItem('quotes'))
        return quotes[Math.floor(Math.random()*quotes.length)]
    } else {
        return ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
    }
}

export const getCategories = () => {
    if (localStorage.getItem('categories')) {
        return JSON.parse(localStorage.getItem('categories'))
    }
}

export const getSongs = () => {
    if (localStorage.getItem('songs')) {
        return JSON.parse(localStorage.getItem('songs'))
    }
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
        localStorage.setItem('settings', JSON.stringify(settings))
        return settings
    }
}

export const setTextSettings = (fontFamily, fontSize, lineHeight) => {
    let settings = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        lineHeight: lineHeight
    }
    localStorage.setItem('settings', JSON.stringify(settings))
}

export const setLocalStorageFiles = () => {
    if (!localStorage.getItem('quotes')) {
        createQuoteFile()
    }
}

export const getCategoriesLastUpdateLS = () => {
    if (localStorage.getItem('categoriesLastUpdate')) {
        return JSON.parse(localStorage.getItem('categoriesLastUpdate'))
    } else { 
        return undefined
    }
}

export const getSongsLastUpdateLS = () => {
    if (localStorage.getItem('songsLastUpdate')) {
        return JSON.parse(localStorage.getItem('songsLastUpdate'))
    } else { 
        return undefined
    }
}

const createQuoteFile = () => {
    const quotes = [
        ['Marność nad marnościami, powiada Kohelet, marność nad marnościami – wszystko marność.', 'Koh 1:2'],
        ['Poznacie ich po ich owocach', 'Mt 7:16,20'],
        ['Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam.', 'Mt 7:7']
    ]

    localStorage.setItem('quotes', JSON.stringify(quotes))
}
