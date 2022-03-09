export default class Page {

    constructor(Entity, response) {
        if (response) {
            this.entities = response.data[Entity.path].map(obj => new Entity(obj))
            Object.assign(this, response.data.page)
        } else {
            this.entities = []
        }
    }

    next() {
        return this.number + 1
    }

    prev() {
        return this.number - 1
    }

    isFirst() {
        return this.number <= 0
    }

    isLast() {
        return this.number >= this.totalPages - 1
    }
}