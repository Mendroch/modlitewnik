import { createWelcome } from './generatingviews.js'

class Prayer {
    constructor() {
        this.body = document.getElementById('body')
        createWelcome()
    }



    // Tworzenie testowej tablicy w Local Storage

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
