import {getSongsCategoriesRequest, getSongsRequest, getSongsCategoriesUpdateRequest, getSongsUpdateRequest, 
    getPrayersCategoriesRequest, getPrayersRequest, getPrayersCategoriesUpdateRequest, getPrayersUpdateRequest, 
    getLiturgyCategoriesRequest, getLiturgyRequest, getLiturgyCategoriesUpdateRequest, getLiturgyUpdateRequest
} from "./requests.js"
import { getLSData } from "./getsetdata.js"

let songsCategoriesLastUpdateLS
let songsLastUpdateLS
let prayersCategoriesLastUpdateLS
let prayersLastUpdateLS
let liturgyCategoriesLastUpdateLS
let liturgyLastUpdateLS

export const getLocalStorageData = () => {
    return new Promise((resolve, reject) => {
        songsCategoriesLastUpdateLS = getLSData('songsCategoriesLastUpdate')
        songsLastUpdateLS = getLSData('songsLastUpdate')
        prayersCategoriesLastUpdateLS = getLSData('prayersCategoriesLastUpdate')
        prayersLastUpdateLS = getLSData('prayersLastUpdate')
        liturgyCategoriesLastUpdateLS = getLSData('liturgyCategoriesLastUpdate')
        liturgyLastUpdateLS = getLSData('liturgyLastUpdate')
        resolve()
    })
}

// Aktualizuje kategorie pieśni
export const getSongsCategoriesUpdate = () => {
    return new Promise((resolve, reject) => {
        getSongsCategoriesUpdateRequest.then((response) => {
            if (response.lastUpdate != songsCategoriesLastUpdateLS) {
                localStorage.setItem("songsCategoriesLastUpdate",JSON.stringify(response.lastUpdate))
                getSongsCategoriesRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("songsCategories",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}

// Aktualizuje pieśni
export const getSongsUpdate = () => {
    return new Promise((resolve, reject) => {
        getSongsUpdateRequest.then((response) => {
            if (response.lastUpdate != songsLastUpdateLS) {
                localStorage.setItem("songsLastUpdate",JSON.stringify(response.lastUpdate));
                getSongsRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("songs",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}

// Aktualizuje kategorie modlitw
export const getPrayersCategoriesUpdate = () => {
    return new Promise((resolve, reject) => {
        getPrayersCategoriesUpdateRequest.then((response) => {
            if (response.lastUpdate != prayersCategoriesLastUpdateLS) {
                localStorage.setItem("prayersCategoriesLastUpdate",JSON.stringify(response.lastUpdate))
                getPrayersCategoriesRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("prayersCategories",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}

// Aktualizuje modlitwy
export const getPrayersUpdate = () => {
    return new Promise((resolve, reject) => {
        getPrayersUpdateRequest.then((response) => {
            if (response.lastUpdate != prayersLastUpdateLS) {
                localStorage.setItem("prayersLastUpdate",JSON.stringify(response.lastUpdate));
                getPrayersRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("prayers",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}
getLiturgyCategoriesUpdateRequest
// Aktualizuje kategorie liturgii
export const getLiturgyCategoriesUpdate = () => {
    return new Promise((resolve, reject) => {
        getLiturgyCategoriesUpdateRequest.then((response) => {
            if (response.lastUpdate != liturgyCategoriesLastUpdateLS) {
                localStorage.setItem("liturgyCategoriesLastUpdate",JSON.stringify(response.lastUpdate))
                getLiturgyCategoriesRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("liturgyCategories",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}

// Aktualizuje liturgie
export const getLiturgyUpdate = () => {
    return new Promise((resolve, reject) => {
        getLiturgyUpdateRequest.then((response) => {
            if (response.lastUpdate != liturgyLastUpdateLS) {
                localStorage.setItem("liturgyLastUpdate",JSON.stringify(response.lastUpdate));
                getLiturgyRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("liturgy",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}
