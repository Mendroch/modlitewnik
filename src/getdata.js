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