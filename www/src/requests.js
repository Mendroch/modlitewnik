// Zapytania do pieśni
export const getSongsCategoriesRequest = fetch('https://kmendroch.lk.pl/api/songscategories').then(resp => resp.json())

export const getSongsRequest = fetch('https://kmendroch.lk.pl/api/songs').then(resp => resp.json())

export const getSongsCategoriesUpdateRequest = fetch('https://kmendroch.lk.pl/api/songscategories/last-update').then(resp => resp.json())

export const getSongsUpdateRequest = fetch('https://kmendroch.lk.pl/api/songs/last-update').then(resp => resp.json())

// Zapytania do modlitw
export const getPrayersCategoriesRequest = fetch('https://kmendroch.lk.pl/api/prayerscategories').then(resp => resp.json())

export const getPrayersRequest = fetch('https://kmendroch.lk.pl/api/prayers').then(resp => resp.json())

export const getPrayersCategoriesUpdateRequest = fetch('https://kmendroch.lk.pl/api/prayerscategories/last-update').then(resp => resp.json())

export const getPrayersUpdateRequest = fetch('https://kmendroch.lk.pl/api/prayers/last-update').then(resp => resp.json())

// Zapytania do liturgii
export const getLiturgyCategoriesRequest = fetch('https://kmendroch.lk.pl/api/liturgycategories').then(resp => resp.json())

export const getLiturgyRequest = fetch('https://kmendroch.lk.pl/api/liturgycontents').then(resp => resp.json())

export const getLiturgyCategoriesUpdateRequest = fetch('https://kmendroch.lk.pl/api/liturgycategories/last-update').then(resp => resp.json())

export const getLiturgyUpdateRequest = fetch('https://kmendroch.lk.pl/api/liturgycontents/last-update').then(resp => resp.json())