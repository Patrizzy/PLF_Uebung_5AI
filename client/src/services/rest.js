import axios from 'axios'
import Page from '@/models/Page'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'

// Die _embedded-Objekte von JSON-Responses aus _embedded herausziehen
axios.defaults.transformResponse.push(embeddedAufloesen)

// Entities durch ihre self-Links ersetzen, wennn JSON-Requests erzeugt werden
axios.defaults.transformRequest.unshift(requestData => entitiesVerlinken(requestData))


/**
 * Liefert ein Promise auf eine Seite von Entities des
 * angegebenen Typs. Existiert die Seite nicht, so wird
 * die letzte vorhandene Seite geliefert.
 *
 * Argumente (optional, wenn nicht anders angegeben):
 *   Entity        (erforderlich) Entity-Klasse, liefert auch den Pfad im REST-API
 *   pageNum       Nummer der zu ladenden Seite (erste Seite: 0)
 *   params        Namen und Werte der Request-Parameter als Objekt
 *   query         Name der serverseitigen Query-Methode, falls
 *                 eine solche verwendet werden soll
 */
export function loadPage(Entity, pageNum = 0, params = {}, query) {
    // REST-URL vorbereiten
    let url = query
        ? `${API_BASE}/${Entity.path}/search/${query}`
        : `${API_BASE}/${Entity.path}`

    return axios
        .get(url, { params: { page: pageNum, ...params } })
        .then(response => {
            const page = new Page(Entity, response)

            // Seitennummer im zulässigen Bereich, oder keine Seiten?
            if (page.entities.length || (pageNum === 0)) {
                console.log('rest.loadPage() OK', page)
                return page

            } else {
                // Letzte vorhandene Seite ausliefern
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
        : axios.patch(entity._links.self.href, entity, { headers: { 'If-Match': entity.etag } })

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
/**
 * Ersetzt alle _embedded-Objekte in der Response durch ihren Inhalt
 * und entfernt HATEOAS-Templates ('{...}') von allen Links.
 */
function embeddedAufloesen(obj) {
    if (Array.isArray(obj)) {
        // Arrayelemente auflösen
        obj.forEach(embeddedAufloesen)

    } else if (obj && typeof(obj) === 'object') {
        if (obj._embedded) {
            // Den _embedded-Inhalt in diesem Objekt platzieren
            let embedded = obj._embedded

            Object.keys(embedded).forEach(k => {
                obj[k] = embedded[k]
                embeddedAufloesen(obj[k])
            })

            delete obj._embedded

        } else if (obj.href && obj.templated) {
            // Das HATEOAS-Template von diesem Link entfernen
            obj.href = ohneTemplate(obj.href)
            delete obj.templated

        } else {
            // Alle Properties dieses Objekts rekursiv bearbeiten
            Object.keys(obj).forEach(k => embeddedAufloesen(obj[k]))
        }
    }

    return obj
}


/**
 * Ersetzt alle im Request enthaltenen Entities durch ihre
 * self-Links und liefert das Ergebnis als Kopie des
 * angegebenen Objekts.
 */
function entitiesVerlinken(obj, recursive) {
    if (obj && obj._links && obj._links.self && recursive) {
        // HATEOAS-Template vom Link entfernen und den Link statt der Entity liefern
        return ohneTemplate(obj._links.self.href)

    } else if (Array.isArray(obj)) {
        // Arrayelemente ersetzen, wenn nötig
        return obj.map(el => entitiesVerlinken(el, true))

    } else if (obj && typeof(obj) === 'object' && obj.constructor !== Date) {
        // Properties ersetzen, wenn nötig
        const result = {}
        Object.keys(obj).forEach(k => {
            result[k] = entitiesVerlinken(obj[k], true)
        })

        return result

    } else {
        return obj
    }
}


/**
 * Liefert den angegebenen Link ohne HATEOAS-Template ('{...}').
 */
function ohneTemplate(templatedHref) {
    return templatedHref.replace(/\{.*\}$/, '')
}
