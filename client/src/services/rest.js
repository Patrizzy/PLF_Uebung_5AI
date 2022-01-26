import axios from 'axios'
import Page from '@/models/Page'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'


/**
 * Liefert ein Promise auf eine Seite von Entities des
 * angegebenen Typs. Existiert die Seite nicht, so wird
 * die letzte vorhandene Seite geliefert.
 *
 * Argumente (optional, wenn nicht anders angegeben):
 *   Entity        (erforderlich) Entity-Klasse, liefert auch den Pfad im REST-API
 *   pageNum       Nummer der zu ladenden Seite (erste Seite: 0)
 *   params        Namen und Werte der Request-Parameter als Objekt
 */
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
            return Promise.reject(response)
        })
}


/**
 * Lädt über das REST-API vom Server eine einzelne Entity des
 * angegebenen Typs und liefert ein Promise auf das geladene Objekt.
 *
 * Argumente (optional, wenn nicht anders angegeben):
 *   Entity        (erforderlich) Entity-Klasse
 *   href          (erforderlich) REST-API-Link zur Entity
 *   parameter     Namen und Werte der Request-Parameter als Objekt
 */
export function loadEntity(Entity, href, params) {
    return axios
        .get(href, { params })
        .then(response => {
            const result = new Entity(response.data)
            console.log('rest.loadEntity() OK', result)
            return result
        })
        .catch(response => {
            console.error('rest.loadEntity() error', response)
            return Promise.reject(response)
        })
}


/**
 * Aktualisiert oder erzeugt die angegebene Entity auf dem Server,
 * je nachdem, ob sie bereits vom Server stammt oder lokal erzeugt
 * wurde.
 *
 * Liefert ein Promise auf die aktuelle Version der Entity.
 */
export function saveEntity(entity) {
    const promise = entity.isNew()
        ? axios.post(`${API_BASE}/${entity.constructor.path}`, entity)
        : axios.put(entity._links.self.href, entity, { headers: { 'If-Match': entity.etag } })

    return promise
        .then(response => {
            // Resultat wieder in eine Entity umwandeln
            const saved = new entity.constructor(response.data)
            console.log('rest.saveEntity() OK', saved)

            return saved
        })
        .catch(response => {
            console.log('rest.saveEntity() error', response )
            return Promise.reject(response)
        })
}


/**
 * Löscht die angegebene Entity von Server.
 *
 * Liefert ein Promise auf den Erfolg.
 */
export function deleteEntity(entity) {
    return axios
        .delete(entity._links.self.href)
        .then(response => {
            console.log('rest.deleteEntity() OK', response)
        })
        .catch(response => {
            console.error('rest.deleteEntity() error', response)
            return Promise.reject(response)
        })
}
