import { mapListToDOMElements, createDOMElem } from './dominteractions.js'
import { getQuote, getSongs, getTextSettings, setTextSettings, setLocalStorageFiles } from './getsetdata.js'
import { getCategoriesRequest, getSongsRequest } from './requests.js'

class Prayo {
    constructor() {
        setLocalStorageFiles()
        this.viewElems = {}
        this.songs = getSongs()
        this.settings
        this.temporaryCategoryNum
        this.songCategoryNum
        this.songTitleNum
        this.backViewFromSearch
        this.isSearchOpened = false
        this.initializeApp()
        this.currentView = this.viewElems.welcomePanel
        this.currentPopUp
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
        this.setQuote()
        this.setSettings()
        this.setSettingsTexts()
        this.fetchAndDisplaySongs()  // <- funkcja testowa
    }

    fetchAndDisplaySongs = () => {
        getSongsRequest().then(songs => console.log(songs))
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds, 'id')
        this.listOfRadioFontType = document.querySelectorAll("input[name='fontType']")
        this.listOfRadioFontSize = document.querySelectorAll("input[name='fontSize']")
        this.listOfRadioFontLineHeight = document.querySelectorAll("input[name='fontLineHeight']")
    }

    setupListeners = () => {
        this.viewElems.welcomePanel.addEventListener('click', () => { 
            this.switchView(this.viewElems.homePanel)
        })
        this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
        this.viewElems.shadow.addEventListener('click', this.toggleShadowWith)
        this.viewElems.menuHome.addEventListener('click', () => {
            this.switchView(this.viewElems.homePanel)
            this.toggleMenu()
        })
        this.viewElems.menuSettings.addEventListener('click', () => {
            this.switchView(this.viewElems.settings)
            this.toggleMenu()
        })
        this.viewElems.songsLink.addEventListener('click', () => {
            this.switchView(this.viewElems.songsCategories)
        })
        this.viewElems.menuSongs.addEventListener('click', () => {
            this.switchView(this.viewElems.songsCategories)
            this.toggleMenu()
        })
        this.viewElems.headerSearchIcon.addEventListener('click', () => {
            this.switchView(this.viewElems.search)
        })
        this.viewElems.headerFontIcon.addEventListener('click', () => {
            this.togglePopUp(this.viewElems.fontAllSettings, true)
        })
        this.viewElems.searchInput.addEventListener('keyup', this.searchSong)
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
    }

    setQuote = () => {
        let quote = getQuote()
        this.viewElems.welcomeQuote.innerText = quote[0]
        this.viewElems.welcomeQuoteAuthor.innerText = quote[1]
    }

    schowHeader = () => {
        this.viewElems.mainHeader.classList.remove('h-display--none')
    }

    toggleShadowWith = () => {
        if (this.currentPopUp === this.viewElems.menu) {
            this.toggleMenu()
        } else {
            this.togglePopUp(this.currentPopUp)
        }
    }
    
    toggleMenu = () => {
        if (this.viewElems.menu.style.display === 'block') {
            this.viewElems.menu.classList.add('is-menu--close')
            this.toggleShadow()
            return new Promise(() => {
                setTimeout(() => {
                    this.viewElems.menu.style.display = 'none'
                    this.viewElems.menu.classList.remove('is-menu--close')
                },180)
            })
        } else {
            this.toggleShadow(true)
            this.viewElems.menu.style.display = 'block'
            this.currentPopUp = this.viewElems.menu
        }
    }

    toggleShadow = (open = false) => {
        if (!open) {
            this.viewElems.shadow.classList.add('is-shadow--close')
            return new Promise(() => {
                setTimeout(() => {
                    this.viewElems.shadow.style.display = 'none'
                    this.viewElems.shadow.classList.remove('is-shadow--close')
                    this.updateRadioInputs()
                }, 180)
            })
            
        } else {
            this.viewElems.shadow.style.display = 'block'
        }
    }

    togglePopUp = (popUp, open = false) => {
        this.currentPopUp = popUp
        this.toggleShadow(open)

        if (!open) {
            this.viewElems.body.classList.remove("is-stop-scrolling")
            popUp.classList.remove('is-pop-up--open')
            popUp.classList.add('is-pop-up--close')
            return new Promise(() => {
                setTimeout(() => {
                    popUp.classList.add('h-display--none')
                    popUp.classList.remove('is-pop-up--close')
                }, 100)
            })
        } else {
            this.viewElems.body.classList.add("is-stop-scrolling")
            popUp.classList.add('is-pop-up--open')
            popUp.classList.remove('h-display--none')
        }
    }

    editMainHeader = (searchIcon = false, text = 'Ekran główny', searchInput = false, arrow = false, smallText = false, fontSettings = false) => {
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

    switchView = (viewOpen) => {
        this.fadeInOut()
        setTimeout(() => {
            this.currentView.classList.add('h-display--none')

            switch (viewOpen) {
                case this.viewElems.songsCategories:
                    this.editMainHeader(true, 'Pieśni')
                    this.switchSongsCategories()
                break
                case this.viewElems.songsTitles:
                    this.editMainHeader(true, 'Pieśni', false, true)
                    this.switchSongsTitles()
                break
                case this.viewElems.song:
                    this.editMainHeader(false, this.songs[this.songCategoryNum][1][this.songTitleNum][0], false, true, true, true)
                    this.switchSong()
                break
                case this.viewElems.search:
                    this.editMainHeader(false, 'Szukaj', true, true)
                    this.switchSearch()
                break
                case this.viewElems.settings:
                    this.editMainHeader(false, 'Ustawienia')
                break
                case this.viewElems.homePanel:
                    this.schowHeader()
                    this.editMainHeader()
                break
            }

            this.currentView = viewOpen
            viewOpen.classList.remove('h-display--none')
            this.fadeInOut()
        }, 100)
    }

    undoView = () => {
        if (this.currentView === this.viewElems.songsTitles) {
            this.switchView(this.viewElems.songsCategories)
        } else if (this.currentView === this.viewElems.song && !this.isSearchOpened) {
            this.switchView(this.viewElems.songsTitles)
        } else if (this.currentView === this.viewElems.search && this.backViewFromSearch === 'categories') {
            this.switchView(this.viewElems.songsCategories)
        } else if (this.currentView === this.viewElems.search && this.backViewFromSearch === 'titles') {
            this.switchView(this.viewElems.songsTitles)
        } else if (this.currentView === this.viewElems.song && this.isSearchOpened) {
            this.switchView(this.viewElems.search)
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

    switchSongsCategories = () => {
        this.viewElems.songsCategories.innerHTML = ''
        this.currentView = 'categories'
        this.backViewFromSearch = 'categories'
        this.isSearchOpened = false

        let i = 0
        this.songs.forEach(songCategory => {
            const songsElem = this.createSongSelection(songCategory[0])
            songsElem.dataset.songsCategory = i
            songsElem.addEventListener('click', () => {
                this.songCategoryNum = songsElem.dataset.songsCategory
                this.switchView(this.viewElems.songsTitles)
            })
            this.viewElems.songsCategories.appendChild(songsElem)
            i++
        })
    }

    switchSongsTitles = () => {
        this.viewElems.songsTitles.innerHTML = ''
        if (this.isSearchOpened) {
            this.songCategoryNum = this.temporaryCategoryNum
        }
        this.currentView = 'titles'
        this.backViewFromSearch = 'titles'
        this.isSearchOpened = false
        this.temporaryCategoryNum = this.songCategoryNum
   
        let i = 0
        this.songs[this.songCategoryNum][1].forEach(songTitle => {
            const songsElem = this.createSongSelection(songTitle[0])
            songsElem.dataset.songsTitle = i
            songsElem.addEventListener('click', () => {
                this.songTitleNum = songsElem.dataset.songsTitle
                this.switchView(this.viewElems.song)
            })
            this.viewElems.songsTitles.appendChild(songsElem)
            i++
        })
    }

    switchSong = () => {
        this.viewElems.song.innerHTML = ''
        this.currentView = 'song'
        const text = createDOMElem('p', 'c-song', this.songs[this.songCategoryNum][1][this.songTitleNum][1])
        this.viewElems.song.appendChild(text)
    }

    switchSearch = () => {
        if (!this.isSearchOpened) {
            this.clearInput()
        } else this.viewElems.searchInput.focus()

        this.searchSong()
        this.isSearchOpened = true
        this.currentView = 'search'
    }

    clearInput = () => {
        this.viewElems.searchInput.value = ''
        this.viewElems.search.innerHTML = ''
        this.viewElems.searchDelete.classList.add('h-display--none')
        this.viewElems.searchInput.focus()
        this.searchSong()
    }

    searchSong = () => {
        this.viewElems.search.innerHTML = ''
        let inputText = this.viewElems.searchInput.value

        if (inputText === '') {
            this.viewElems.searchDelete.classList.add('h-display--none')
        } else {
            this.viewElems.searchDelete.classList.remove('h-display--none')
        }

        this.songs.forEach((_, songCategory) => {
            let i = 0
            this.songs[songCategory][1].forEach(songTitle => {
    
                if (songTitle[0] !== undefined) {
                    if ((songTitle[0].toLowerCase().indexOf(inputText.toLowerCase()) !== -1)) {
                        const songsElem = this.createSongSelection(songTitle[0])
                        songsElem.dataset.songsTitle = i
                        songsElem.addEventListener('click', () => {
                            this.songCategoryNum = songCategory
                            this.songTitleNum = songsElem.dataset.songsTitle
                            this.switchView(this.viewElems.song)
                        })
                        this.viewElems.search.appendChild(songsElem)
                    }
                }
                i++
            })
        })
    }

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

    setSettingsTexts = () => {
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

    setSettings = () => {
        this.settings = getTextSettings()
        this.viewElems.song.style.fontFamily = `'${this.settings.fontFamily}', sans-serif`
        this.viewElems.song.style.fontSize = this.settings.fontSize
        this.viewElems.song.style.lineHeight = this.settings.lineHeight
    }

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
        this.setSettings()
        this.setSettingsTexts()
    }

    changeAllFontSettings = () => {
        setTextSettings(this.viewElems.fontTypeSelect.value, this.viewElems.fontSizeSelect.value, this.viewElems.fontLineHeightSelect.value)
        this.setSettings()
        this.setSettingsTexts()
    }
}

document.addEventListener('DOMContentLoaded', new Prayo())
