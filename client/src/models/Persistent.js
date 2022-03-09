export default class Persistent {

    constructor(obj) {
        Object.assign(this, obj)
    }

    isNew() {
        return !this._links
    }

}