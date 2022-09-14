import { mapListToDOMElements, createDOMElem } from './dominteractions.js'
import { getSongs, getCategories, getTextSettings, setTextSettings, getCategoriesLastUpdateLS } from './getsetdata.js'
import { getLocalStorageData, getCategoriesUpdate, getSongsUpdate } from './updatecontent.js'
import { getSongsUpdateRequest } from './requests.js'

class Prayo {
    constructor() {
        this.viewElems = {}
        this.settings
        this.fontSizeStartGesture
        this.temporaryCategoryNum
        this.songCategoryNum
        this.songTitle
        this.backViewFromSearch
        this.isSearchOpened = false
        this.initializeApp()
        this.currentView = this.viewElems.homePanel
        this.currentPopUp
        this.initialDistance
        this.menuStartTouchPosition
    }

    initializeApp = () => {
        this.connectDOMElements()
        this.setupListeners()
        this.initializeData()
        this.setSettings()
        this.setSettingsTexts()
        this.createCustomSelect()
    }

    initializeData = () => {
        getSongsUpdateRequest.then(() => {
            this.updateData()
        }).catch(() =>  {
            this.getCategoriesAndSongs()
        })
    }

    updateData = () => {
        getLocalStorageData()
        .then(getCategoriesUpdate)
        .then(getSongsUpdate)
        .then(this.getCategoriesAndSongs)
        .catch(err => {
            alert(err)
        })
    }

    getCategoriesAndSongs = () => {
        this.categories = getCategories()
        this.songs = getSongs()
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElems = mapListToDOMElements(listOfIds, 'id')
        this.listOfRadioFontType = document.querySelectorAll("input[name='fontType']")
        this.listOfRadioFontSize = document.querySelectorAll("input[name='fontSize']")
        this.listOfRadioFontLineHeight = document.querySelectorAll("input[name='fontLineHeight']")
    }

    setupListeners = () => {
        this.viewElems.headerMenuIcon.addEventListener('click', this.toggleMenu)
        this.viewElems.shadow.addEventListener('click', this.toggleShadowWith)
        this.viewElems.menuHome.addEventListener('click', () => {
            this.switchView(this.viewElems.homePanel)
            this.toggleMenu()
        })
        this.viewElems.menuSongs.addEventListener('click', () => {
            this.switchView(this.viewElems.songsCategories)
            this.toggleMenu()
        })
        this.viewElems.menuSettings.addEventListener('click', () => {
            this.switchView(this.viewElems.settings)
            this.toggleMenu()
        })
        this.viewElems.menu.addEventListener('touchstart', this.handleTouchStart, false)
        this.viewElems.menu.addEventListener('touchmove', this.handleTouch, false)
        this.viewElems.menu.addEventListener('touchend', this.handleTouchEnd, false)
        this.viewElems.songsLink.addEventListener('click', () => {
            this.switchView(this.viewElems.songsCategories)
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
        this.viewElems.song.addEventListener('touchstart', e => {
            this.zoomTouchStart(e)
        })
        this.viewElems.song.addEventListener('touchmove', e => {
            this.zoomTouchMove(e)
        })
        this.viewElems.song.addEventListener('touchend', e => {
            this.zoomTouchEnd(e)
        })
    }

    setQuote = () => {
        let quote = getQuote()
        this.viewElems.welcomeQuote.innerText = quote[0]
        this.viewElems.welcomeQuoteAuthor.innerText = quote[1]
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
            this.viewElems.headerMenuGradient.classList.remove('h-display--none')
        } else {
            this.viewElems.mainHeaderText.classList.remove('is-header__menu__header--small')
            this.viewElems.headerMenuGradient.classList.add('h-display--none')
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
                    this.editMainHeader(true, 'Kategorie')
                    this.switchSongsCategories()
                break
                case this.viewElems.songsTitles:
                    this.editMainHeader(true, 'Pieśni', false, true)
                    this.switchSongsTitles()
                break
                case this.viewElems.song:
                    this.editMainHeader(false, this.songTitle, false, true, true, true)
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
        const songsElemText = createDOMElem('p', 'c-songs-elem__text', text)
        const songsElemGradient = createDOMElem('div', 'c-songs-elem__gradient')
        const songsElemImg = createDOMElem('img', 'c-songs-elem__img', null, './img/right-arrow.png')
        songsElem.appendChild(songsElemText)
        songsElem.appendChild(songsElemGradient)
        songsElem.appendChild(songsElemImg)
        return songsElem
    }

    switchSongsCategories = () => {
        this.viewElems.songsCategories.innerHTML = ''
        this.currentView = 'categories'
        this.backViewFromSearch = 'categories'
        this.isSearchOpened = false

        this.categories.forEach(category => {
            const songsElem = this.createSongSelection(category.name)
            songsElem.addEventListener('click', () => {
                this.songCategoryNum = category.id
                this.switchView(this.viewElems.songsTitles)
            })
            this.viewElems.songsCategories.appendChild(songsElem)
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
   
        this.songs.forEach(song => {
            if (this.songCategoryNum === song.category_id) {
                const songsElem = this.createSongSelection(song.name)
                songsElem.addEventListener('click', () => {
                    this.songTitle = song.name
                    this.switchView(this.viewElems.song)
                })
                this.viewElems.songsTitles.appendChild(songsElem)
            }
        })
    }

    switchSong = () => {
        this.viewElems.song.innerHTML = ''
        this.currentView = 'song'
        this.songs.forEach(song => {
            if (this.songTitle === song.name) {
                const text = createDOMElem('p', 'c-song', null, null, song.content)
                this.viewElems.song.appendChild(text)
                return
            }
        })
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

        this.songs.forEach(song => {
            if (song.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
                const songsElem = this.createSongSelection(song.name)
                songsElem.addEventListener('click', () => {
                    this.songTitle = song.name
                    this.switchView(this.viewElems.song)
                })
                this.viewElems.search.appendChild(songsElem)
            }
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
        this.deleteCustomSelect()
        this.setSettings()
        this.setSettingsTexts()
        this.createCustomSelect()
    }

    changeAllFontSettings = () => {
        setTextSettings(this.viewElems.fontTypeSelect.value, this.viewElems.fontSizeSelect.value, this.viewElems.fontLineHeightSelect.value)
        this.setSettings()
        this.setSettingsTexts()
    }

    deleteCustomSelect = () => {
        let list = Array.from(document.getElementsByClassName("select-selected"))
        list.forEach(elem => {
            elem.remove()
        })
    }

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

    zoomTouchStart = (e) => {
        if (e.targetTouches.length === 2) {
            this.viewElems.song.classList.add('is-stop-scrolling')
            e.preventDefault()
            this.fontSizeStartGesture = this.settings.fontSize
            this.initialDistance = Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2)
            + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)))
        }
    }

    zoomTouchMove = (e) => {
        if (e.targetTouches.length === 2) {
            this.viewElems.song.classList.add('is-stop-scrolling')
            e.preventDefault()
            let currentDistance = Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2)
            + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)))

            let fontsSize = ['12px', '15px', '17px', '20px', '22px', '25px']
            let newfontSize = Math.floor((currentDistance - this.initialDistance) / 40)
            let fontSize = fontsSize[fontsSize.indexOf(this.fontSizeStartGesture) + newfontSize]
            if (fontSize !== undefined && fontSize !== this.settings.fontSize) {
                setTextSettings(this.settings.fontFamily, fontSize, this.settings.lineHeight)
                this.setSettings()
            }
        }
    }

    zoomTouchEnd = (e) => {
        if (e.touches.length === 1) {
            this.viewElems.song.classList.remove('is-stop-scrolling')
            this.fontSizeStartGesture = this.settings.fontSize
            this.deleteCustomSelect()
            this.setSettingsTexts()
            this.createCustomSelect()
        }
    }

    touchCloseMenu = () => {
        this.toggleShadow()
        this.viewElems.menu.style.display = 'none'
    }

    handleTouchStart = (e) => {
        this.menuStartTouchPosition = e.changedTouches[0].clientX
    }

    handleTouch = (e) => {
        let x = e.changedTouches[0].clientX
        let position = -this.menuStartTouchPosition + x
        if ( position < 0 ) this.viewElems.menu.style.transform = `translateX(${-(this.menuStartTouchPosition - x) + 'px'})`
    }

    handleTouchEnd = (e) => {
        let x = e.changedTouches[0].clientX
        let total = this.viewElems.menu.clientWidth
        this.viewElems.menu.style.transform = `translateX(0)`
        if ( this.menuStartTouchPosition - x > total*.5 ) this.touchCloseMenu()
    }
}

document.addEventListener('DOMContentLoaded', new Prayo())
