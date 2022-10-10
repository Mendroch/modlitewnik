// Pobiera kategorie z Local Storage
export const getCategories = () => {
    if (localStorage.getItem('categories')) {
        return JSON.parse(localStorage.getItem('categories'))
    }
}

// Pobiera piosenki z Local Storage
export const getSongs = () => {
    if (localStorage.getItem('songs')) {
        return JSON.parse(localStorage.getItem('songs'))
    }
}

// Pobiera ustawienia czcionki z Local Storage
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

// Zapisuje ustawienia czcionki w Local Storage
export const setTextSettings = (fontFamily, fontSize, lineHeight) => {
    let settings = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        lineHeight: lineHeight
    }
    localStorage.setItem('settings', JSON.stringify(settings))
}

// Pobiera date ostatniej aktualizacji kategorii z Local Storage
export const getCategoriesLastUpdateLS = () => {
    if (localStorage.getItem('categoriesLastUpdate')) {
        return JSON.parse(localStorage.getItem('categoriesLastUpdate'))
    } else { 
        return undefined
    }
}

// Pobiera date ostatniej aktualizacji pieśni z Local Storage
export const getSongsLastUpdateLS = () => {
    if (localStorage.getItem('songsLastUpdate')) {
        return JSON.parse(localStorage.getItem('songsLastUpdate'))
    } else { 
        return undefined
    }
}
