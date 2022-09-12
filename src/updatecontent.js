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
                    localStorage.setItem("categories",JSON.stringify(response))
                    resolve()
                })
            } else {
                resolve()
            }
        })
    })
}

export const getSongsUpdate = () => {
    return new Promise((resolve, reject) => {
        getSongsUpdateRequest.then((response) => {
            if (response.lastUpdate != songsLastUpdateLS) {
                localStorage.setItem("songsLastUpdate",JSON.stringify(response.lastUpdate));
                getSongsRequest.then((response) => {
                    localStorage.setItem("songs",JSON.stringify(response))
                    resolve()
                })
            } else {
                resolve()
            }
        })
    })
}
