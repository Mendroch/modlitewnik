import { createWelcome, createMainPanel } from './generatingviews.js'

class Prayer {
    constructor() {
        this.body = document.getElementById('body')
        createWelcome()
    }

}

document.addEventListener('DOMContentLoaded', new Prayer())
