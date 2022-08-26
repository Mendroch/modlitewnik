import { mapListToDOMElements, createDOMElem } from './dominteractions.js'

class Prayer {
    constructor() {
        this.viewElems = {}
        this.songs = this.getSongs()
        this.songCategoryNum
        this.currentView
        this.searchOpen = false
        this.songOpen = false
        this.initializeApp()
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
        this.getQuote()
        // this.searchSong('boż')
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
        this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
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
        this.viewElems.headerSearchIcon.addEventListener('click', this.switchSearch)
        this.viewElems.searchInput.addEventListener('keyup', this.searchSong)
        this.viewElems.searchDelete.addEventListener('click', this.clearInput)
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

    editMainHeader = (searchIcon = false, text = 'Ekran główny', searchInput = false, arrow = false, smallText = false) => {
        if (searchIcon) {
            this.viewElems.headerSearchIcon.classList.remove('h-display--none')
        } else {
            this.viewElems.headerSearchIcon.classList.add('h-display--none')
        }

        this.viewElems.mainHeaderText.innerText = text

        if (searchInput) {
            this.viewElems.mainSearch.classList.remove('h-display--none')
            this.viewElems.mainSearch.classList.add('h-display--flex')
        } else {
            this.viewElems.mainSearch.classList.remove('h-display--flex')
            this.viewElems.mainSearch.classList.add('h-display--none')
        }

        if (arrow) {
            this.viewElems.headerMenuIcon.src = '../img/left-arrow.png'
            this.viewElems.headerMenuIcon.removeEventListener('click', this.toggleMenu)
            this.viewElems.headerMenuIcon.addEventListener('click', this.undoView)
            this.viewElems.headerMenuIcon.classList.add('is-header__menu__icon--small')
        } else {
            this.viewElems.headerMenuIcon.removeEventListener('click', this.undoView)
            this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
            this.viewElems.headerMenuIcon.src = '../img/menu.png'
            this.viewElems.headerMenuIcon.classList.remove('is-header__menu__icon--small')
        }

        if (smallText) {
            this.viewElems.mainHeaderText.classList.add('is-header__menu__header--small')
        } else {
            this.viewElems.mainHeaderText.classList.remove('is-header__menu__header--small')
        }
    }

    fadeInOut = () => {
        if (this.viewElems.body.style.opacity === '1' || this.viewElems.body.style.opacity === '') {
            this.viewElems.body.style.opacity = '0'
        } else {
            this.viewElems.body.style.opacity = '1'
        }
    }

    switchView = (viewClose, viewOpen, searchIcon, text, searchInput, arrow, smallText) => {
        this.fadeInOut()
    
        setTimeout(() => {
            this.viewElems.mainHeader.style.display = 'block' // <- to trzeba poprawić
            viewClose.classList.add('h-display--none')
            this.editMainHeader(searchIcon, text, searchInput, arrow, smallText)
            viewOpen.classList.remove('h-display--none')
            this.fadeInOut()
        }, 100)
    }

    undoView = () => {
        if (this.searchOpen) {
            if (this.currentView === 'songsCategories')  {
                this.switchSongsCategories()
            } else if (this.currentView === 'songsTitles') {
                this.switchSongsTitles(this.songCategoryNum)
            } else if (this.songOpen === true) { /////////////////// tutaj //////////////
                this.switchSearch()
                this.songOpen = false
                return
            }
            this.searchOpen = false
            return
        }
        if (this.currentView === 'songsTitles')  {
            this.switchSongsCategories()
            this.viewElems.songsTitles.classList.add('h-display--none')
        }
        if (this.songOpen === true) { /////////////////// tutaj //////////////
            this.switchSongsTitles(this.songCategoryNum)
            this.viewElems.song.classList.add('h-display--none')
            this.songOpen = false
        }
    }

    toggleMenu = () => {
        if (this.viewElems.menu.style.display === 'block') {
            this.viewElems.menu.classList.add('is-menu--close')
            this.viewElems.shadow.classList.add('is-shadow--close')
            setTimeout(() => {
                this.viewElems.menu.style.display = 'none'
                this.viewElems.shadow.style.display = 'none'
                this.viewElems.menu.classList.remove('is-menu--close')
                this.viewElems.shadow.classList.remove('is-shadow--close')

            }, 180)
        } else {
            this.viewElems.menu.style.display = 'block'
            this.viewElems.shadow.style.display = 'block'
        }
    }

    createSongSelection = (text) => {
        const songsElem = createDOMElem('div', 'c-songs-elem')
        const songsElemText = createDOMElem('p', null, text)
        const songsElemImg = createDOMElem('img', 'h-songs-elem__img', null, '../img/right-arrow.png')
        songsElem.appendChild(songsElemText)
        songsElem.appendChild(songsElemImg)
        return songsElem
    }

    switchSearch = () => {
        this.searchOpen = true
        this.viewElems.searchInput.value = ''
        this.viewElems.search.innerHTML = ''
        this.viewElems.searchDelete.classList.add('h-display--none')
        if (this.currentView === 'songsCategories') {
            this.switchView(this.viewElems.songsCategories, this.viewElems.search, false, 'Pieśni', true, true)
        }
        if (this.currentView === 'songsTitles') {
            this.switchView(this.viewElems.songsTitles, this.viewElems.search, false, 'Pieśni', true, true)
        }
        if (this.songOpen == true) { /////////////////// tutaj //////////////
            this.switchView(this.viewElems.song, this.viewElems.search, false, 'Pieśni', true, true)
        }
        this.viewElems.searchInput.focus()

    }

    switchSongsCategories = () => {
        this.currentView = 'songsCategories'
        this.viewElems.songsCategories.innerHTML = ''
        if (this.searchOpen) {
            this.switchView(this.viewElems.search, this.viewElems.songsCategories, true, 'Pieśni')
        } else {
            this.switchView(this.viewElems.homePanel, this.viewElems.songsCategories, true, 'Pieśni')
        }

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
        if (this.searchOpen) {
            this.switchView(this.viewElems.search, this.viewElems.songsTitles, true, 'Pieśni', false, true)
        } else {
            this.switchView(this.viewElems.songsCategories, this.viewElems.songsTitles, true, 'Pieśni', false, true)
        }

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
        this.songOpen = true /////////////////// tutaj //////////////
        this.viewElems.song.innerHTML = ''
        if (this.searchOpen) {
            this.switchView(this.viewElems.search, this.viewElems.song, false, this.songs[songCategory][1][songTitle][0], false, true, true)
        } else {
            this.switchView(this.viewElems.songsTitles, this.viewElems.song, false, this.songs[songCategory][1][songTitle][0], false, true, true)
        }
        const text = createDOMElem('p', 'c-song', this.songs[songCategory][1][songTitle][1])
        this.viewElems.song.appendChild(text)
    }

    clearInput = () => {
        this.viewElems.searchInput.value = ''
        this.viewElems.search.innerHTML = ''
        this.viewElems.searchDelete.classList.add('h-display--none')
        this.viewElems.searchInput.focus()
    }

    searchSong = () => {
        this.viewElems.search.innerHTML = ''
        let inputText = this.viewElems.searchInput.value

        if (inputText === '') {
            this.viewElems.searchDelete.classList.add('h-display--none')
        } else {
            this.viewElems.searchDelete.classList.remove('h-display--none')
        }

        if (inputText !== '' && inputText !== ' ') {
            this.songs.forEach((_, songCategory) => {
                let i = 0
                this.songs[songCategory][1].forEach(songTitle => {
    
                    if (songTitle[0] !== undefined) {
                        if (songTitle[0].toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
                            const songsElem = this.createSongSelection(songTitle[0])
                            songsElem.dataset.songsTitle = i
                            songsElem.addEventListener('click', () => {
                                this.switchSong(songCategory, songsElem.dataset.songsTitle)
                            })
                            this.viewElems.search.appendChild(songsElem)
                        }
                    }
                    i++
                })
            })
        }
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
            ['Pieśni maryjne', [['Amen, jak Maryja', 
                `Kiedy ci smutno i nic nie wychodzi, mów:
                Amen, jak Maryja,
                Amen, jak Maryja,
                Amen, widocznie Bóg tak chce.
                Tak jak Maryja wypełniaj wolę Boga
                I zanieś tam swój uśmiech
                Gdzie często płyną łzy.

                Gdy z ciebie szydzą i z ciebie się śmieją, mów.
                Amen, jak Maryja,
                Amen, jak Maryja,
                Amen, widocznie Bóg tak chce.

                Gdy w twoim sercu nic więcej prócz bólu, mów
                Amen, jak Maryja,
                Amen, jak Maryja,
                Amen, widocznie Bóg tak chce.`],
            ['Bogarodzica', `Bogurodzica, dziewica, Bogiem sławiena Maryja!
            U twego syna, Gospodzina, matko zwolena Maryja!
            Zyszczy nam, spuści nam.
            Kirielejson.
            
            Twego dziela Krzciciela, bożyce,
            Usłysz głosy, napełni myśli człowiecze.
            Słysz modlitwę, jąż nosimy,
            A dać raczy, jegoż prosimy,
            A na świecie zbożny pobyt,
            Po żywocie rajski przebyt.
            Kirielejson.
            
            Nas dla wstał z martwych syn boży,
            Wierzyż w to człowiecze zbożny,
            Iż przez trud Bog swoj lud
            Odjął diablej strożej.
            
            Przydał nam zdrowia wiecznego,
            Starostę skował pkielnego,
            Śmierć podjął, wspominął
            Człowieka pirwego.
            
            Jenże trudy cirzpiał zawiernie,
            Jeszcze był nie prześpiał zaśmierne,
            Aliż sam Bog z martwych wstał.
            
            Adamie, ty boży kmieciu,
            Ty siedzisz u Boga [w] wiecu,
            Domieściż twe dzieci,
            Gdzie krolują anjeli.
            
            Tegoż nas domieściż, Jezu Kryste miły,
            Bychom z Tobą byli,
            Gdzież się nam radują szwe niebieskie siły.
            
            Była radość, była miłość, było widzienie tworca
            Anjelskie bez końca,
            Tuć się nam zwidziało diable potępienie.
            
            Ni śrzebrzem, ni złotem nas diabłu odkupił,
            Swą mocą zastąpił.
            
            Ciebie dla, człowiecze, dał Bog przekłoć sobie
            Ręce, nodze obie.
            Kry święta szła z boka na zbawienie tobie.
            
            Wierzyż w to, człowiecze, iż Jezu Kryst prawy,
            Cirpiał za nas rany,
            Swą świętą krew’ przelał za nas krześcijany.
            
            O duszy o grzeszne sam Bog pieczą ima,
            Diabłu ją otyma,
            Gdzie to sam kroluje, k sob[ie] ją przyma.
            
            Maryja dziewice, prośmy synka twego
            Krola niebieskiego,
            Haza nas huchowa ote wszego złego.
            Amen tako Bog daj,
            Bychom szli szwyćcy w raj.`],
            ['Brzmi cichej godziny', `Brzmi cichej godziny,
            Przez góry doliny, Dzwonku Twój głos.
            Brzmij Pannie Maryi,
            Nieś pozdrowienie Jej, Aż do niebios.
            
            Bo Ona łask pełna,
            Niebo i ziemia ma Pokłon Jej dać.
            Chcę też Jej dzwonkiem być,
            Ją pozdrowieniem czcić, Ją miłować.
            
            Pan Bóg wszechmogący,
            Nas pocieszający, On jest z Tobą,
            Królowo Niebieska,
            Nasza pośredniczko, Bądź też ze mną.
            
            Panno wysławiona.
            Spraw niech Twa Dziecina, Nam tu sprzyja.
            Tyś błogosławiona,
            Bez grzechu poczęta. O Maryja!`]]],
            ['Pieśni na Boże Ciało', [[]]],
            ['Pieśni nabożne', [[]]],
            ['Pieśni o świętych', [[]]],
            ['Pieśni podczas Mszy świętej', [[]]]
        ]



        localStorage.setItem('songs', JSON.stringify(songs));
    }
}

document.addEventListener('DOMContentLoaded', new Prayer())
