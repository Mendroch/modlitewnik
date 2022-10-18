import { mapListToDOMElements, createDOMElem } from './dominteractions.js'
import { getTextSettings, setTextSettings, getLSData } from './getsetdata.js'
import { getSongsCategoriesUpdate, getSongsUpdate, getPrayersCategoriesUpdate, 
    getPrayersUpdate, getLiturgyCategoriesUpdate, getLiturgyUpdate, getAnnouncements, getIntentions } from './updatecontent.js'
import { getSongsUpdateRequest } from './requests.js'

class Prayo {
    constructor() {
        this.viewElems = {}
        this.settings
        this.fontSizeStartGesture
        this.fontSizeInTouchEvent
        this.temporaryCategoryNum
        this.categoryNum
        this.categoryTitle
        this.textTitle
        this.backViewFromSearch
        this.isSearchOpened = false
        this.initializeApp()
        this.currentView = this.viewElems.homePanel
        this.currentPopUp
        this.initialDistance
        this.menuStartTouchPosition
        this.contentType
        this.liturgyShort
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
        this.initializeData()
        this.setSettings()
        this.updateSettingsTexts()
        this.createCustomSelect()
    }

    // Zaciąganie danych z serwera i ich aktualizacja jeśli jest to możliwe
    initializeData = () => {
        this.getCategoriesAndTexts()
        getSongsUpdateRequest.then(() => {
            this.updateData()
        }).catch(() => {
            if (!localStorage.getItem('songsLastUpdate')) {
                this.togglePopUp(this.viewElems.networkInformation, true)
                this.viewElems.shadow.removeEventListener('click', this.toggleShadowWith)
                window.addEventListener('online', () => {
                    location.reload()
                })
            }
        })
    }

    // Usuwa ekran ładowania
    removeLoadingScreen = () => {
        if (getLSData('intentions') !== undefined) {
            this.viewElems.loadingScreen.classList.add('h-display--none')
        } else {
            this.viewElems.loadingScreen.classList.remove('h-display--none')
        }
    }

    // Aktualizuje teksty
    updateData = () => {
        getSongsCategoriesUpdate()
        .then(getSongsUpdate)
        .then(getPrayersCategoriesUpdate)
        .then(getPrayersUpdate)
        .then(getLiturgyCategoriesUpdate)
        .then(getLiturgyUpdate)
        .then(getAnnouncements)
        .then(getIntentions)
        .then(this.getCategoriesAndTexts)
        .catch(err => {
            alert(err)
        })
    }

    // Pobiera dane z Local Storage
    getCategoriesAndTexts = () => {
        this.songsCategories = getLSData('songsCategories')
        this.songs = getLSData('songs')
        this.prayersCategories = getLSData('prayersCategories')
        this.prayers = getLSData('prayers')
        this.liturgyCategories = getLSData('liturgyCategories')
        this.liturgy = getLSData('liturgy')
        this.announcements = getLSData('announcements')
        this.intentions = getLSData('intentions')
        this.removeLoadingScreen()
    }

    // Chwyta elementy drzewa DOM
    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds, 'id')
        this.listOfRadioFontType = document.querySelectorAll("input[name='fontType']")
        this.listOfRadioFontSize = document.querySelectorAll("input[name='fontSize']")
        this.listOfRadioFontLineHeight = document.querySelectorAll("input[name='fontLineHeight']")
    }

    // Ustawia wszystkie Listenery
    setupListeners = () => {
        this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
        this.viewElems.shadow.addEventListener('click', this.toggleShadowWith)
        this.viewElems.menuHome.addEventListener('click', () => {
            this.switchView(this.viewElems.homePanel)
            this.toggleMenu()
        })
        this.viewElems.menuSongs.addEventListener('click', () => {
            this.contentType = 'songs'
            this.switchView(this.viewElems.textsCategories)
            this.toggleMenu()
        })
        this.viewElems.menuPrayers.addEventListener('click', () => {
            this.contentType = 'prayers'
            this.switchView(this.viewElems.textsCategories)
            this.toggleMenu()
        })
        this.viewElems.menuLiturgy.addEventListener('click', () => {
            this.contentType = 'liturgy'
            this.switchView(this.viewElems.textsCategories)
            this.toggleMenu()
        })
        this.viewElems.menuAnnouncements.addEventListener('click', () => {
            this.contentType = 'announcements'
            this.switchView(this.viewElems.text)
            this.toggleMenu()
        })
        this.viewElems.menuIntentions.addEventListener('click', () => {
            this.contentType = 'intentions'
            this.switchView(this.viewElems.text)
            this.toggleMenu()
        })
        this.viewElems.menuSettings.addEventListener('click', () => {
            this.switchView(this.viewElems.settings)
            this.toggleMenu()
        })
        this.viewElems.menuInfo.addEventListener('click', () => {
            this.switchView(this.viewElems.infoPanel)
            this.toggleMenu()
        })
        this.viewElems.menu.addEventListener('touchstart', this.handleTouchStart, false)
        this.viewElems.menu.addEventListener('touchmove', this.handleTouch, false)
        this.viewElems.menu.addEventListener('touchend', this.handleTouchEnd, false)
        this.viewElems.songsLink.addEventListener('click', () => {
            this.contentType = 'songs'
            this.switchView(this.viewElems.textsCategories)
        })
        this.viewElems.prayersLink.addEventListener('click', () => {
            this.contentType = 'prayers'
            this.switchView(this.viewElems.textsCategories)
        })
        this.viewElems.liturgyLink.addEventListener('click', () => {
            this.contentType = 'liturgy'
            this.switchView(this.viewElems.textsCategories)
        })
        this.viewElems.announcementsLink.addEventListener('click', () => {
            this.contentType = 'announcements'
            this.switchView(this.viewElems.text)
        })
        this.viewElems.intentionsLink.addEventListener('click', () => {
            this.contentType = 'intentions'
            this.switchView(this.viewElems.text)
        })
        this.viewElems.headerSearchIcon.addEventListener('click', () => {
            this.switchView(this.viewElems.search)
        })
        this.viewElems.headerFontIcon.addEventListener('click', () => {
            this.togglePopUp(this.viewElems.fontAllSettings, true)
        })
        this.viewElems.searchInput.addEventListener('keyup', this.searchText)
        this.viewElems.searchDelete.addEventListener('click', this.clearInput)
        this.viewElems.settingsFontType.addEventListener('click', () => {
            this.togglePopUp(this.viewElems.fontType, true)
        })
        this.viewElems.settingsFontSize.addEventListener('click', () => {
            this.togglePopUp(this.viewElems.fontSize, true)
        })
        this.viewElems.settingsLineHeight.addEventListener('click', () => {
            this.togglePopUp(this.viewElems.fontLineHeight, true)
        })
        this.viewElems.fontTypeBtn.addEventListener('click', () => {
            this.changeFontSettings(this.listOfRadioFontType, 'fontType')
        })
        this.viewElems.fontSizeBtn.addEventListener('click', () => {
            this.changeFontSettings(this.listOfRadioFontSize, 'fontSize')
        })
        this.viewElems.fontLineHeightBtn.addEventListener('click', () => {
            this.changeFontSettings(this.listOfRadioFontLineHeight, 'fontLineHeight')
        })
        this.viewElems.fontTypeSelect.addEventListener('change', this.changeAllFontSettings)
        this.viewElems.fontSizeSelect.addEventListener('change', this.changeAllFontSettings)
        this.viewElems.fontLineHeightSelect.addEventListener('change', this.changeAllFontSettings)
        this.viewElems.text.addEventListener('touchstart', e => {
            this.zoomTouchStart(e)
        })
        this.viewElems.text.addEventListener('touchmove', e => {
            this.zoomTouchMove(e)
        })
        this.viewElems.text.addEventListener('touchend', e => {
            this.zoomTouchEnd(e)
        })
    }

    // Zamyka shadow razem z menu albo popup
    toggleShadowWith = () => {
        if (this.currentPopUp === this.viewElems.menu) {
            this.toggleMenu()
        } else {
            this.togglePopUp(this.currentPopUp)
        }
    }
    
    // Przełącza menu
    toggleMenu = () => {
        if (this.viewElems.menu.style.display === 'block') {
            this.viewElems.menu.classList.add('is-menu--close')
            this.toggleShadow()
            setTimeout(() => {
                this.viewElems.menu.style.display = 'none'
                this.viewElems.menu.classList.remove('is-menu--close')
            },180)
        } else {
            this.toggleShadow(true)
            this.viewElems.menu.style.display = 'block'
            this.currentPopUp = this.viewElems.menu
        }
    }

    // Przełącza shadow
    toggleShadow = (open = false) => {
        if (!open) {
            this.viewElems.shadow.classList.add('is-shadow--close')
            setTimeout(() => {
                this.viewElems.shadow.style.display = 'none'
                this.viewElems.shadow.classList.remove('is-shadow--close')
                this.updateRadioInputs()
            }, 180)
        } else {
            this.viewElems.shadow.style.display = 'block'
        }
    }

    // Przełącza popup
    togglePopUp = (popUp, open = false) => {
        this.currentPopUp = popUp
        this.toggleShadow(open)

        if (!open) {
            this.viewElems.body.classList.remove("is-stop-scrolling")
            popUp.classList.remove('is-pop-up--open')
            popUp.classList.add('is-pop-up--close')
            setTimeout(() => {
                popUp.classList.add('h-display--none')
                popUp.classList.remove('is-pop-up--close')
            }, 100)
        } else {
            this.viewElems.body.classList.add("is-stop-scrolling")
            popUp.classList.add('is-pop-up--open')
            popUp.classList.remove('h-display--none')
        }
    }

    // Edytuje zawartość paska menu
    editMainHeader = (searchIcon = false, text = 'Śpiewnik', searchInput = false, arrow = false, smallText = false, fontSettings = false) => {
        if (searchIcon) {
            this.viewElems.headerSearchIcon.classList.remove('h-display--none')
        } else {
            this.viewElems.headerSearchIcon.classList.add('h-display--none')
        }

        if (fontSettings) {
            this.viewElems.headerFontIcon.classList.remove('h-display--none')
        } else {
            this.viewElems.headerFontIcon.classList.add('h-display--none')
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
            this.viewElems.headerMenuIcon.src = './img/left-arrow.png'
            this.viewElems.headerMenuIcon.removeEventListener('click', this.toggleMenu)
            this.viewElems.headerMenuIcon.addEventListener('click', this.undoView)
            this.viewElems.headerMenuIcon.classList.add('is-header__menu__icon--small')
        } else {
            this.viewElems.headerMenuIcon.removeEventListener('click', this.undoView)
            this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
            this.viewElems.headerMenuIcon.src = './img/menu.png'
            this.viewElems.headerMenuIcon.classList.remove('is-header__menu__icon--small')
        }

        if (smallText) {
            this.viewElems.mainHeaderText.classList.add('is-header__menu__header--small')
        } else {
            this.viewElems.mainHeaderText.classList.remove('is-header__menu__header--small')
        }
    }

    // Przełącza przeźroczystość body
    fadeInOut = () => {
        if (this.viewElems.body.style.opacity === '1' || this.viewElems.body.style.opacity === '') {
            this.viewElems.body.style.opacity = '0'
        } else {
            this.viewElems.body.style.opacity = '1'
        }
    }

    // Przełącza widok
    switchView = (viewOpen) => {
        this.fadeInOut()
        setTimeout(() => {
            this.currentView.classList.add('h-display--none')

            switch (viewOpen) {
                case this.viewElems.homePanel:
                    this.editMainHeader()
                break
                case this.viewElems.textsCategories:
                    switch (this.contentType) {
                        case 'songs':
                            this.editMainHeader(true, 'Pieśni')
                        break
                        case 'prayers':
                            this.editMainHeader(true, 'Modlitwy')
                        break
                        case 'liturgy':
                            this.editMainHeader(false, 'Liturgia')
                        break
                    }
                    this.switchTextsCategories()
                break
                case this.viewElems.textsTitles:
                    if (this.contentType === 'liturgy') {
                        this.editMainHeader(false, this.categoryTitle, false, true)
                    } else {
                        this.editMainHeader(true, this.categoryTitle, false, true)
                    }
                    this.switchTextsTitles()
                break
                case this.viewElems.text:
                    if (this.liturgyShort) {
                        this.editMainHeader(false, this.categoryTitle, false, true, true, true)
                    } else {
                        this.editMainHeader(false, this.textTitle, false, true, true, true)
                    }
                    if (this.contentType === 'announcements') {
                        this.editMainHeader(false, 'Ogłoszenia', false, true, true, true)
                    } else if (this.contentType === 'intentions') {
                        this.editMainHeader(false, 'Intencje Mszy', false, true, true, true)
                    }
                    this.switchText()
                break
                case this.viewElems.search:
                    this.editMainHeader(false, 'Szukaj', true, true)
                    this.switchSearch()
                break
                case this.viewElems.settings:
                    this.editMainHeader(false, 'Ustawienia')
                break
                case this.viewElems.infoPanel:
                    this.editMainHeader(false, 'Informacje')
                break
            }

            this.currentView = viewOpen
            viewOpen.classList.remove('h-display--none')
            this.fadeInOut()
        }, 100)
    }

    // Cofa widok przy użyciu strzałki
    undoView = () => {
        if (this.currentView === this.viewElems.textsTitles) {
            this.switchView(this.viewElems.textsCategories)
        } else if (this.currentView === this.viewElems.text && (this.contentType === 'announcements' || this.contentType === 'intentions')) {
            this.switchView(this.viewElems.homePanel)
        } else if (this.currentView === this.viewElems.text && !this.isSearchOpened && !this.liturgyShort) {
            this.switchView(this.viewElems.textsTitles)
        } else if (this.currentView === this.viewElems.search && this.backViewFromSearch === 'textsCategories') {
            this.switchView(this.viewElems.textsCategories)
        } else if (this.currentView === this.viewElems.search && this.backViewFromSearch === 'titles') {
            this.switchView(this.viewElems.textsTitles)
        } else if (this.currentView === this.viewElems.text && this.liturgyShort) {
            this.switchView(this.viewElems.textsCategories)
            this.liturgyShort = false
        } else if (this.currentView === this.viewElems.text && this.isSearchOpened) {
            this.switchView(this.viewElems.search)
        }
    }

    // Tworzy element listy kategorii albo tytułów
    createListSelection = (text) => {
        const listElem = createDOMElem('div', 'c-songs-elem')
        const listElemTextDiv = createDOMElem('div', 'c-songs-elem__text-div')
        const listElemText = createDOMElem('p', 'c-songs-elem__text', text)
        const listElemGradient = createDOMElem('div', 'c-songs-elem__gradient')
        const listElemImg = createDOMElem('img', 'c-songs-elem__img', null, './img/right-arrow.png')
        listElemTextDiv.appendChild(listElemText)
        listElem.appendChild(listElemTextDiv)
        listElem.appendChild(listElemGradient)
        listElem.appendChild(listElemImg)
        return listElem
    }

    // Tworzy widok listy kategorii pieśni
    switchTextsCategories = () => {
        this.viewElems.textsCategories.scrollTo(0, 0)
        this.viewElems.textsCategories.innerHTML = ''
        this.currentView = 'textsCategories'
        this.backViewFromSearch = 'textsCategories'
        this.isSearchOpened = false
        let categories
        
        switch (this.contentType) {
            case "songs": categories = this.songsCategories; break
            case "prayers": categories = this.prayersCategories; break
            case "liturgy": categories = this.liturgyCategories; break
        }

        categories.forEach(category => {
            const listElem = this.createListSelection(category.name)
            listElem.addEventListener('click', () => {
                this.categoryNum = category.id
                this.categoryTitle = category.name
                if (this.contentType === "liturgy") {
                    if (category.content === "<p>---</p>") {
                        this.switchView(this.viewElems.textsTitles)
                    } else {
                        this.switchView(this.viewElems.text)
                        this.liturgyShort = true
                    }
                } else {
                    this.switchView(this.viewElems.textsTitles)
                }
            })
            this.viewElems.textsCategories.appendChild(listElem)
        })
    }

    // Tworzy widok listy tytułów pieśni
    switchTextsTitles = () => {
        this.viewElems.textsTitles.scrollTo(0, 0)
        this.viewElems.textsTitles.innerHTML = ''
        if (this.isSearchOpened) {
            this.categoryNum = this.temporaryCategoryNum
        }
        this.currentView = 'titles'
        this.backViewFromSearch = 'titles'
        this.isSearchOpened = false
        this.temporaryCategoryNum = this.categoryNum
        let titles
   
        switch (this.contentType) {
            case "songs": titles = this.songs; break
            case "prayers": titles = this.prayers; break
            case "liturgy": titles = this.liturgy; break
        }

        titles.forEach(text => {
            if (this.categoryNum === text.category_id) {
                const listElem = this.createListSelection(text.name)
                listElem.addEventListener('click', () => {
                    this.textTitle = text.name
                    this.switchView(this.viewElems.text)
                })
                this.viewElems.textsTitles.appendChild(listElem)
            }
        })
    }

    // Tworzy widok pieśni
    switchText = () => {
        this.viewElems.text.scrollTo(0, 0)
        this.viewElems.text.innerHTML = ''
        this.currentView = 'text'
        let textParagraph
        let text

        switch (this.contentType) {
            case "songs": text = this.songs; break
            case "prayers": text = this.prayers; break
            case "liturgy": 
                if (this.liturgyShort) {
                    this.liturgyCategories.forEach(category => {
                        if (this.categoryNum === category.id) {
                            textParagraph = createDOMElem('p', 'c-song', null, null, category.content)
                            this.viewElems.text.appendChild(textParagraph)
                            return
                        }
                    })
                }
                text = this.liturgy
            break
            case "announcements":
                textParagraph = createDOMElem('p', 'c-song', null, null, this.announcements.content)
                this.viewElems.text.appendChild(textParagraph)
                return
            break
            case "intentions":
                textParagraph = createDOMElem('p', 'c-song', null, null, this.intentions.content)
                this.viewElems.text.appendChild(textParagraph)
                return
            break
        }

        let i = 0
        text.forEach(text => {
            if (this.textTitle === text.name && i === 0) {
                textParagraph = createDOMElem('p', 'c-song', null, null, text.content)
                this.viewElems.text.appendChild(textParagraph)
                i++
            }
        })
    }

    // Tworzy widok wyszukiwania
    switchSearch = () => {
        if (!this.isSearchOpened) {
            this.clearInput()
        } else this.viewElems.searchInput.focus()

        this.searchText()
        this.isSearchOpened = true
        this.currentView = 'search'
    }

    // Czyści input
    clearInput = () => {
        this.viewElems.searchInput.value = ''
        this.viewElems.search.innerHTML = ''
        this.viewElems.searchDelete.classList.add('h-display--none')
        this.viewElems.searchInput.focus()
        this.searchText()
    }

    // Wyszukuje pieśni i wyświetla wyniki
    searchText = () => {
        this.viewElems.search.innerHTML = ''
        let inputText = this.viewElems.searchInput.value
        let texts

        if (inputText === '') {
            this.viewElems.searchDelete.classList.add('h-display--none')
        } else {
            this.viewElems.searchDelete.classList.remove('h-display--none')
        }

        switch (this.contentType) {
            case "songs": texts = this.songs; break
            case "prayers": texts = this.prayers; break
            case "liturgy": texts = this.liturgy; break
        }

        texts.forEach(text => {
            if (text.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
                const listElem = this.createListSelection(text.name)
                listElem.addEventListener('click', () => {
                    this.textTitle = text.name
                    this.switchView(this.viewElems.text)
                })
                this.viewElems.search.appendChild(listElem)
            }
        })
    }
    
    // Aktualizuje zaznaczenie radio inputów w ustawieniach
    updateRadioInputs = () => {
        let list = [
            this.listOfRadioFontType,
            this.listOfRadioFontSize,
            this.listOfRadioFontLineHeight
        ]
        list.forEach(element => {
            for (const radio of element) {
                if (radio.value === this.settings.fontFamily 
                    || radio.value === this.settings.fontSize 
                    || radio.value === this.settings.lineHeight) {
                    radio.checked = true
                    break
                }
            }
        })
    }

    // Aktualizuje wszystkie napisy ustawień
    updateSettingsTexts = () => {
        this.viewElems.settingsFontTypeText.innerText = this.settings.fontFamily
        this.viewElems.fontTypeSelect.value = this.settings.fontFamily
        this.viewElems.settingsFontSizeText.innerText = this.settings.fontSize
        this.viewElems.fontSizeSelect.value = this.settings.fontSize
        let lineHeight = this.settings.lineHeight
        if (lineHeight === '1') {
            lineHeight = '80%'
        } else if (lineHeight === '1.2') {
            lineHeight = '100%'
        } else {
            lineHeight = '120%'
        }
        this.viewElems.settingsLineHeightText.innerText = lineHeight
        this.viewElems.fontLineHeightSelect.value = this.settings.lineHeight

        this.updateRadioInputs()
    }

    // Aktualizuje wygląd czcionki do bierzących ustawień
    setSettings = () => {
        this.settings = getTextSettings()
        this.viewElems.text.style.fontFamily = `'${this.settings.fontFamily}', sans-serif`
        this.viewElems.text.style.fontSize = this.settings.fontSize
        this.viewElems.text.style.lineHeight = this.settings.lineHeight
    }

    // Wprowadza zmiany ustawień czcionki przy zatwierdzeniu popup w ustawieniach
    changeFontSettings = (list, view) => {
        for (const radio of list) {
            if (radio.checked) {
                if (view === 'fontType') {
                    setTextSettings(radio.value, this.settings.fontSize, this.settings.lineHeight)
                    this.togglePopUp(this.viewElems.fontType)
                } else if (view === 'fontSize') {
                    setTextSettings(this.settings.fontFamily, radio.value, this.settings.lineHeight)
                    this.togglePopUp(this.viewElems.fontSize)
                } else {
                    setTextSettings(this.settings.fontFamily, this.settings.fontSize, radio.value)
                    this.togglePopUp(this.viewElems.fontLineHeight)
                }
                break
            }
        }
        this.deleteCustomSelect()
        this.setSettings()
        this.updateSettingsTexts()
        this.createCustomSelect()
    }

    // Zapisuje i wprowadza zmiany ustawień czcionki
    changeAllFontSettings = () => {
        setTextSettings(this.viewElems.fontTypeSelect.value, this.viewElems.fontSizeSelect.value, this.viewElems.fontLineHeightSelect.value)
        this.setSettings()
        this.updateSettingsTexts()
    }

    // Usuwa customowe pola wyboru ustawień
    deleteCustomSelect = () => {
        let list = Array.from(document.getElementsByClassName("select-selected"))
        list.forEach(elem => {
            elem.remove()
        })
    }

    // Tworzy customowe pola wyboru ustawień
    createCustomSelect = () => {
        let fontClasses = [
            "is-font-type--Inter",
            "is-font-type--ArchivoNarrow",
            "is-font-type--Anaheim",
            "is-font-type--EBGaramond",
            "is-font-type--PTSans",
            "is-font-type--Raleway"
        ]
        var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select")
        l = x.length
        for (i = 0; i < l; i++) {
            let changeAllFontSettings = this.changeAllFontSettings
            selElmnt = x[i].getElementsByTagName("select")[0]
            ll = selElmnt.length
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV")
            a.classList.add('select-selected')
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
            x[i].appendChild(a)
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV")
            b.classList.add('select-items')
            b.classList.add('select-hide')
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV")
                c.innerHTML = selElmnt.options[j].innerHTML
                if (i === 0) {
                    c.classList.add(fontClasses[j-1])   
                }+
                c.addEventListener("click", function(e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h, sl, yl
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0]
                    sl = s.length
                    h = this.parentNode.previousSibling
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i
                            h.innerHTML = this.innerHTML
                            y = this.parentNode.getElementsByClassName("same-as-selected")
                            yl = y.length
                            for (k = 0; k < yl; k++) {
                                y[k].classList.remove("same-as-selected")
                            }
                            this.classList.add("same-as-selected")
                            break
                        }
                    }
                    h.click()
                    changeAllFontSettings()
                })
                b.appendChild(c)
            }
            x[i].appendChild(b)
            a.addEventListener("click", function(e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation()
                closeAllSelect(this)
                this.nextSibling.classList.toggle("select-hide")
                this.classList.toggle("select-arrow-active")
            })
        }
        function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, xl, yl, arrNo = []
        x = document.getElementsByClassName("select-items")
        y = document.getElementsByClassName("select-selected")
        xl = x.length
        yl = y.length
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
            arrNo.push(i)
            } else {
            y[i].classList.remove("select-arrow-active")
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide")
            }
        }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect)
    }

    // Określa początkowe wartości przy używaniu gestu
    zoomTouchStart = (e) => {
        if (e.touches.length === 2) {
            e.preventDefault()
            this.fontSizeStartGesture = this.settings.fontSize
            this.initialDistance = Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2)
            + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)))
        }
    }

    // Aktualizuje rozmiar czcionki przy używaniu gestu
    zoomTouchMove = (e) => {
        if (e.touches.length === 2) {
            let currentDistance = Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2)
            + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)))

            let fontsSize = ['12px', '15px', '17px', '20px', '22px', '25px']
            let newfontSize = Math.floor((currentDistance - this.initialDistance) / 40)
            let fontSize = fontsSize[fontsSize.indexOf(this.fontSizeStartGesture) + newfontSize]
            if (fontSize !== undefined && fontSize !== this.fontSizeInTouchEvent) {
                this.viewElems.text.style.fontSize = fontSize
                this.fontSizeInTouchEvent = fontSize
            }
        }
    }

    // Zapisuje ustawienia czcinki po zakończeniu używania gestu
    zoomTouchEnd = (e) => {
        if (e.touches.length === 1) {
            this.deleteCustomSelect()
            setTextSettings(this.settings.fontFamily, this.fontSizeInTouchEvent, this.settings.lineHeight)
            this.settings = getTextSettings()
            this.updateSettingsTexts()
            this.createCustomSelect()
        }
    }

    // Zamyka menu 
    touchCloseMenu = () => {
        this.toggleShadow()
        this.viewElems.menu.style.display = 'none'
    }

    // Określa początkową pozycje dotyku przy zamykaniu menu gestem
    handleTouchStart = (e) => {
        this.menuStartTouchPosition = e.changedTouches[0].clientX
    }

    // Aktualizuje pozycje menu
    handleTouch = (e) => {
        let x = e.changedTouches[0].clientX
        let position = -this.menuStartTouchPosition + x
        if ( position < 0 ) this.viewElems.menu.style.transform = `translateX(${-(this.menuStartTouchPosition - x) + 'px'})`
    }

    // Zamyka lub przywraca menu do pozycji początkowej po oderwaniu palca
    handleTouchEnd = (e) => {
        let x = e.changedTouches[0].clientX
        let total = this.viewElems.menu.clientWidth
        this.viewElems.menu.style.transform = `translateX(0)`
        if ( this.menuStartTouchPosition - x > total*.5 ) this.touchCloseMenu()
    }
}

document.addEventListener('DOMContentLoaded', new Prayo())
