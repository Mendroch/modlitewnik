export const getCategoriesRequest = fetch('http://kmendroch.lk.pl/api/categories').then(resp => resp.json())

export const getSongsRequest = fetch('http://kmendroch.lk.pl/api/songs').then(resp => resp.json())

export const getCategoriesUpdateRequest = fetch('http://kmendroch.lk.pl/api/categories/last-update').then(resp => resp.json())

export const getSongsUpdateRequest = fetch('http://kmendroch.lk.pl/api/songs/last-update').then(resp => resp.json())
