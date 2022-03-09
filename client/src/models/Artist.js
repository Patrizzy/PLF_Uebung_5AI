import Persistent from '@/models/Persistent'

export default class Artist extends Persistent {

    constructor(obj) {
        super(obj)
    }

}

// Pfad dieser Entities im REST-API des Servers
Artist.path = 'artists'