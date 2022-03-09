import Persistent from '@/models/Persistent'

export default class Song extends Persistent {

    constructor(obj) {
        super(obj)
    }

}

// Pfad dieser Entities im REST-API des Servers
Song.path = 'songs'