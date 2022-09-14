import {getCategoriesRequest, getSongsRequest, getCategoriesUpdateRequest, getSongsUpdateRequest, } from "./requests.js"
import { getCategoriesLastUpdateLS, getSongsLastUpdateLS, } from "./getsetdata.js"

let categoriesLastUpdateLS
let songsLastUpdateLS

export const getLocalStorageData = () => {
    return new Promise((resolve, reject) => {
        categoriesLastUpdateLS = getCategoriesLastUpdateLS()
        songsLastUpdateLS = getSongsLastUpdateLS()
        resolve()
    })
}

export const getCategoriesUpdate = () => {
    return new Promise((resolve, reject) => {
        getCategoriesUpdateRequest.then((response) => {
            if (response.lastUpdate != categoriesLastUpdateLS) {
                localStorage.setItem("categoriesLastUpdate",JSON.stringify(response.lastUpdate))
                getCategoriesRequest.then((response) => {
                    function sortStr (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                    response.sort(sortStr);
                    localStorage.setItem("categories",JSON.stringify(response))
                    resolve()
                }).catch((reject) => alert(reject))
            } else {
                resolve()
            }
        }).catch((reject) => alert(reject))
    })
}

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
