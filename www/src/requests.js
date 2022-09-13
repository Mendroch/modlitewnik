export const getCategoriesRequest = fetch('https://kmendroch.lk.pl/api/categories').then(resp => resp.json()).catch(x => alert(x))

export const getSongsRequest = fetch('https://kmendroch.lk.pl/api/songs').then(resp => resp.json()).catch(x => alert(x))

export const getCategoriesUpdateRequest = fetch('https://kmendroch.lk.pl/api/categories/last-update').then(resp => resp.json()).catch(x => alert(x))

export const getSongsUpdateRequest = fetch('https://kmendroch.lk.pl/api/songs/last-update').then(resp => resp.json()).catch(x => alert(x))
