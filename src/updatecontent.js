import {getCategoriesRequest, getSongsRequest, getCategoriesUpdateRequest, getSongsUpdateRequest, } from "./requests.js";
import { getCategoriesLastUpdateLS, getSongsLastUpdateLS, } from "./getsetdata.js";

export const updateContent = () => {
    let categoriesLastUpdateLS = getCategoriesLastUpdateLS();
    let songsLastUpdateLS = getSongsLastUpdateLS();

    getCategoriesUpdateRequest.then((response) => {
        if (response.lastUpdate != categoriesLastUpdateLS) {
            getCategoriesRequest.then((response) => {
                localStorage.setItem("categories",JSON.stringify(response))
            })
            .catch((reason) => console.log(reason));
            localStorage.setItem("categoriesLastUpdate",JSON.stringify(response.lastUpdate))
        }
    }).catch((reason) => console.log(reason));

    getSongsUpdateRequest.then((response) => {
        if (response.lastUpdate != songsLastUpdateLS) {
            getSongsRequest.then((response) => {
                localStorage.setItem("songs",JSON.stringify(response))
            })
            .catch((reason) => console.log(reason));
            localStorage.setItem("songsLastUpdate",JSON.stringify(response.lastUpdate));
        }
    }).catch((reason) => console.log(reason));
};
