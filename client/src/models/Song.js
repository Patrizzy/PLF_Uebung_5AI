export default class Song {

    constructor(obj) {
        Object.assign(this, obj)
    }

    isNew() {
        return !this._links
    }
}

// Pfad dieser Entities im REST-API des Servers
Song.path = 'songs'