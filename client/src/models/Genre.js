import Persistent from '@/models/Persistent'

export default class Genre extends Persistent {

    constructor(obj) {
        super(obj)
    }

}

// Pfad dieser Entities im REST-API des Servers
Genre.path = 'genres'