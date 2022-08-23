import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

class Prayer {
    constructor() {
        this.viewElems = {}
        this.songs = this.getSongs()
        this.songCategoryNum
        this.currentView
        this.initializeApp()
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
        this.getQuote()
        // this.createSongsFile()
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds)
    }

    setupListeners = () => {
        this.viewElems.welcomePanel.addEventListener('click', () => { 
            this.switchView(this.viewElems.welcomePanel, this.viewElems.homePanel) 
        })
        this.viewElems.mainHeaderIcon.addEventListener('click', this.toggleMenu)
        this.viewElems.shadow.addEventListener('click', this.toggleMenu)
        this.viewElems.menuHome.addEventListener('click', () => {
            this.switchView(this.viewElems.songsCategories, this.viewElems.homePanel)
            this.toggleMenu()
        })
        this.viewElems.songsLink.addEventListener('click', this.switchSongsCategories)
        this.viewElems.menuSongs.addEventListener('click', () => {
            this.switchSongsCategories()
            this.toggleMenu()
        })
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

    getSongs = () => {
        if (localStorage.getItem('songs')) {
            return JSON.parse(localStorage.getItem('songs'))
        } else { alert('Błąd wczytywania songs') } // <- usunąć w oficjalnej wersji
    }

    fadeInOut = () => {
        if (this.viewElems.body.style.opacity === '1' || this.viewElems.body.style.opacity === '') {
            this.viewElems.body.style.opacity = '0'
        } else {
            this.viewElems.body.style.opacity = '1'
        }
    }

    editMainHeader = (searchInput = false, text = 'Ekran główny', arrow = false, smallText = false) => {
        if (searchInput) {
            this.viewElems.mainSearch.style.display = 'flex'
        } else {
            this.viewElems.mainSearch.style.display = 'none'
        }

        this.viewElems.mainHeaderText.innerText = text

        if (arrow) {
            this.viewElems.mainHeaderIcon.src = '../img/left-arrow.png'
            this.viewElems.mainHeaderIcon.removeEventListener('click', this.toggleMenu)
            this.viewElems.mainHeaderIcon.addEventListener('click', this.undoView)
        } else {
            this.viewElems.mainHeaderIcon.removeEventListener('click', this.undoView)
            this.viewElems.mainHeaderIcon.addEventListener('click', this.toggleMenu)
            this.viewElems.mainHeaderIcon.src = '../img/menu.png'
        }

        if (smallText) {
            this.viewElems.mainHeaderText.classList.add('mainHeaderTextSmall')
        } else {
            this.viewElems.mainHeaderText.classList.remove('mainHeaderTextSmall')
        }
    }

    switchView = (viewClose, viewOpen) => {
        this.fadeInOut()
    
        setTimeout(() => {
            this.viewElems.mainHeader.style.display = 'block' // <- to trzeba poprawić
            viewClose.style.display = 'none'
            viewOpen.style.display = 'block'
            this.fadeInOut()
        }, 100)
    }

    undoView = () => {
        if (this.currentView === 'songsTitles')  {
            this.switchSongsCategories()
            this.viewElems.songsTitles.style.display = 'none'
            this.editMainHeader(true, 'Szukaj')
        }
        if (this.currentView === 'song') {
            this.switchSongsTitles(this.songCategoryNum)
            this.viewElems.song.style.display = 'none'
            this.editMainHeader(true, 'Szukaj', true)
        }
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

    createSongSelection = (text) => {
        const songsElem = createDOMElem('div', 'songs-elem')
        const songsElemText = createDOMElem('p', 'songs-elem__text', text)
        const songsElemImg = createDOMElem('img', 'songs-elem__img', null, '../img/right-arrow.png')
        songsElem.appendChild(songsElemText)
        songsElem.appendChild(songsElemImg)
        return songsElem
    }

    switchSongsCategories = () => {
        this.viewElems.songsCategories.innerHTML = ''
        this.switchView(this.viewElems.homePanel, this.viewElems.songsCategories)
        this.editMainHeader(true, 'Szukaj')

        let i = 0
        this.songs.forEach(songCategory => {
            const songsElem = this.createSongSelection(songCategory[0])
            songsElem.dataset.songsCategory = i
            songsElem.addEventListener('click', () => {
                this.switchSongsTitles(songsElem.dataset.songsCategory)
            })
            this.viewElems.songsCategories.appendChild(songsElem)
            i++
        });
    }

    switchSongsTitles = (songCategory) => {
        this.currentView = 'songsTitles'
        this.songCategoryNum = songCategory
        this.viewElems.songsTitles.innerHTML = ''
        this.switchView(this.viewElems.songsCategories, this.viewElems.songsTitles)
        this.editMainHeader(true, 'Szukaj', true)

        let i = 0
        this.songs[songCategory][1].forEach(songTitle => {
            const songsElem = this.createSongSelection(songTitle[0])
            songsElem.dataset.songsTitle = i
            songsElem.addEventListener('click', () => {
                this.switchSong(songCategory, songsElem.dataset.songsTitle)
            })
            this.viewElems.songsTitles.appendChild(songsElem)
            i++
        });
    }

    switchSong = (songCategory, songTitle) => {
        this.currentView = 'song'
        this.viewElems.song.innerHTML = ''
        this.switchView(this.viewElems.songsTitles, this.viewElems.song)
        this.editMainHeader(false, this.songs[songCategory][1][songTitle][0], true, true)
        const text = createDOMElem('p', 'songText', this.songs[songCategory][1][songTitle][1])
        this.viewElems.song.appendChild(text)
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
