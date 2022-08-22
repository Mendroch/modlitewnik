const _getDOMElem = (id) => {
    return document.getElementById(id);
}

export const mapListToDOMElements = listOfId => {
    const _viewElems = {}

    for (const id of listOfId) {
        _viewElems[id] = _getDOMElem(id);
    }

    return _viewElems;
}

export const createDOMElem = (tagName, className, innerText, src, dataset) => {
    const tag = document.createElement(tagName)
    tag.classList = className

    if (innerText) tag.innerText = innerText
    if (src) tag.src = src
    if (dataset) tag.dataset.songsCategory = dataset

    return tag
}