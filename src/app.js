import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

class Prayer {
    constructor() {
        this.viewElems = {}
        this.initializeApp()
        this.getQuote()
        // this.createSongsFile()
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds)
    }

    setupListeners = () => {
        this.viewElems.welcomePanel.addEventListener('click', this.switchWelcomeView)
        this.viewElems.mainHeaderIcon.addEventListener('click', this.toggleMenu)
        this.viewElems.shadow.addEventListener('click', this.toggleMenu)
        this.viewElems.menuHome.addEventListener('click', this.toggleMenu)
        this.viewElems.menuHome.addEventListener('click', this.switchMainView)
        this.viewElems.songsLink.addEventListener('click', this.switchSongsView)
        this.viewElems.menuSongs.addEventListener('click', this.switchSongsView)
        this.viewElems.menuSongs.addEventListener('click', this.toggleMenu)
    }

    getQuote = () => {
        let quote
        if (localStorage.getItem('quotes')) {
            let quotes = JSON.parse(localStorage.getItem('quotes'))
            quote = quotes[Math.floor(Math.random()*quotes.length)]
        } else {
            quote = ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
        }
        this.viewElems.welcomeQuote.innerText = quote[0]
        this.viewElems.welcomeQuoteAuthor.innerText = quote[1]
    }

    fadeInOut = () => {
        if (this.viewElems.body.style.opacity === '1' || this.viewElems.body.style.opacity === '') {
            this.viewElems.body.style.opacity = '0'
        } else {
            this.viewElems.body.style.opacity = '1'
        }
    }

    switchView = (viewClose, viewOpen, searchInput = false, text = 'Ekran główny') => {
        this.fadeInOut()
    
        setTimeout(() => {
            this.viewElems.mainHeader.style.display = 'block' // <- to trzeba poprawić
            viewClose.style.display = 'none'
            viewOpen.style.display = 'block'
            if (searchInput) {
                this.viewElems.mainSearch.style.display = 'flex'
            } else {
                this.viewElems.mainSearch.style.display = 'none'
            }
            this.viewElems.mainHeaderText.innerText = text
            this.fadeInOut()
        }, 100)
    }

    toggleMenu = () => {
        if (this.viewElems.menu.style.display === 'block') {
            this.viewElems.menu.classList.add('menuClose')
            this.viewElems.shadow.classList.add('shadowClose')
            setTimeout(() => {
                this.viewElems.menu.style.display = 'none'
                this.viewElems.shadow.style.display = 'none'
                this.viewElems.menu.classList.remove('menuClose')
                this.viewElems.shadow.classList.remove('shadowClose')

            }, 180)
        } else {
            this.viewElems.menu.style.display = 'block'
            this.viewElems.shadow.style.display = 'block'
        }
    }

    switchWelcomeView = () => {
        this.switchView(this.viewElems.welcomePanel, this.viewElems.homePanel)
    }

    switchMainView = () => {
        this.switchView(this.viewElems.songs, this.viewElems.homePanel)
    }

    switchSongsView = () => {
        this.switchView(this.viewElems.homePanel, this.viewElems.songs, true, 'Szukaj')
        let songs
        if (localStorage.getItem('songs')) {
            songs = JSON.parse(localStorage.getItem('songs'))
        } else {
            songs = [['Błąd wczytywania piosenek z Local Storage']]
        }

        this.viewElems.songsCategories.innerHTML = ""

        songs.forEach(category => {
            const songsElem = createDOMElem('div', 'songs-elem')
            const songsElemText = createDOMElem('p', 'songs-elem__text', category[0])
            const songsElemImg = createDOMElem('img', 'songs-elem__img', null, '../img/right-arrow.png')
            songsElem.appendChild(songsElemText)
            songsElem.appendChild(songsElemImg)
            this.viewElems.songsCategories.appendChild(songsElem)
        });
    }

    createSongsFile = () => {

        const songs = [
            ['Pieśni adwentowe', [
                ['Archanioł Boży Gabryel', 
                `Archanioł Boży Gabryel,
                Posłan do Panny Maryjej,
                Z Majestatu Trójcy świętej,
                Tak sprawował poselstwo kniej:
                Zdrowaś Panno łaskiś pełna,
                Pan jest z Tobą to rzecz pewna.
                
                Panna się wielce zdumiała
                Z poselstwa, które słyszała;
                Pokorniuchno się skłoniła,
                Jako Panna sromieźliwa,
                Zasmuciła się z tej mowy,
                Nic nie rzekła Aniołowi.
                
                Ale poseł z wysokości
                Napełnion Boskiej mądrości,
                Rzekł jej: nie bój się Maryja,
                Najszczęśliwszaś Panno miła,
                Nalazlaś łaskę u Pana,
                Oto poczniesz jego Syna.
                
                Jezus nazwiesz Imię jego,
                Będzie Synem najwyższego,
                Wielki z strony człowieczeństwa,
                A niezmierny z strony Bóstwa:
                Wieczny Syn Ojca wiecznego,
                Zbawiciel świata wszystkiego.
                
                A jakożby to mogło być,
                Jęła Panna kniemu mówić:
                
                
                Ja nie chcę męża nigdy znać;
                Jął jej Anioł tak powiadać:
                Iż duch święty z swej miłości,
                Sprawi to w tobie w czystości.
                
                Temu Panna uwierzyła,
                Przyzwalając tak mówiła:
                O Pośle Boga wiecznego,
                Gdyż to wola Pana mego,
                Toć ja służebnica jego,
                Stań się według słowa tego.
                
                Rychlej niżby kto mgnął okiem,
                Stał się Syn Boży człowiekiem,
                W żywocie Panny najczystszej,
                Ze krwie czystego serca jej,
                Sprawą Boga wszechmocnego,
                Miłośnika człowieczego.
                
                I toć wielka miłość była,
                Boga Ojca jego Syna;
                Iż dla człowieka grzesznego,
                Z majestatu najświętszego,
                Z miłości wiecznej przed wiekiem,
                Stał się Syn Boży człowiekiem.
                
                O Aniele Gabryelu!
                Najszlachetniejszy z tak wielu,
                O Pośle najznakomitszy,
                Nie jest równy tobie inszy:
                Z poselstwa któreś sprawował,
                Znać iż cię Bóg umiłował.
                
                Pośle Boga wszechmocnego,
                Gdyś tak w wielkiej łasce jego,
                Módl się do Pana za nami,
                I do tej najświętszej Panny,
                
                
                Abyśmy z grzechów powstali,
                Po śmierci z nim królowali.
                
                Bogu Ojcu wszechmocnemu,
                Synowi jego miłemu,
                I Duchowi najświętszemu,
                Bogu w Trójcy jedynemu,
                Dziękujmy dziś w pokorności,
                Za ten cud jego miłości.`],
                ['Boże wieczny, Boże żywy', 
                `Boże wieczny, Boże żywy!
                Odkupicielu prawdziwy,
                Wysłuchaj nasz głos płaczliwy!
                
                Któryś jest na wysokości,
                Schyl nieba, użycz litości:
                Spuść się w nasze głębokości.
                
                O niebieskie góry srogie,
                Spuśćcie rosę na ubogie,
                Dajcie nam zbawienie drogie.
                
                Nietrzymajcie przejrzanego,
                Chmury swoim dżdżem naszego
                Przynieście sprawiedliwego.
                
                Przyjdź co rychlej miłosierny,
                O Boże! człowiek mizerny,
                Ciebie czeka, tobie wierny.
                
                Obejdź się z nami łaskawie
                Zmiłuj się po nagłej sprawie,
                Racz przyjść ku twej wiecznej sławie.
                
                Odmień Panie twój gniew srogi,
                Odmień, niech człowiek ubogi
                Nawiedzi twe święte progi.
                
                
                Usłysz płacz stworzenia swego,
                Daj doczekać uciesznego
                Narodzenia Syna twego.
                
                Amen zakrzykniem wdzięcznemi
                Głosy, by nas Bóg z świętemi
                Złączył poczty anielskiemi.`]
            ]],
            ['Pieśni cerkiewne', [[]]],
            ['Pieśni maryjne', [[]]],
            ['Pieśni na Boże Ciało', [[]]],
            ['Pieśni nabożne', [[]]],
            ['Pieśni o świętych', [[]]],
            ['Pieśni podczas Mszy świętej', [[]]]
        ]



        localStorage.setItem('songs', JSON.stringify(songs));
    }
}

document.addEventListener('DOMContentLoaded', new Prayer())
