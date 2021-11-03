import axios from 'axios'
import Page from '@/models/Page'
import SongModel from '@/models/Song'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'


export function loadPage(Entity, pageNum = 0, params = {}) {
    return axios
        .get(
            `${API_BASE}/${Entity.path}`,
            { params: { page: pageNum, ...params } }
        )
        .then(response => {
            const page = new Page(Entity, response)
            if (page.entities.length || (pageNum === 0)) {
                // Entities available, or not entities at all
                console.log('rest.loadPage() OK', page)
                return page

            } else {
                return loadPage(Entity, pageNum-1, params)
            }
        })
        .catch(response => {
            console.error('rest.loadPage() error', response)
        })
}


export function deleteEntity(entity) {
    return axios
        .delete(entity._links.self.href)
        .then(response => {
            console.log('rest.deleteEntity() OK', response)
        })
        .catch(response => {
            console.error('rest.deleteEntity() error', response)
        })
}
