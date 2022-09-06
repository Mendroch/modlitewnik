export const getCategoriesRequest = () => {
    return fetch(`http://kmendroch.lk.pl/api/categories`).then(resp => resp.json());
}

export const getSongsRequest = () => {
    return fetch(`http://kmendroch.lk.pl/api/songs`).then(resp => resp.json());
}
