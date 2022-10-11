// Pobiera dane z Local Storage
export const getLSData = (dataName) => {
    if (localStorage.getItem(dataName)) {
        return JSON.parse(localStorage.getItem(dataName))
    } else { 
        return undefined
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
