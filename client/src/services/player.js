import Song from '@/models/Song'
import { loadEntity } from '@/services/rest'
import { store } from '@/config'

// Da zu jedem Zeitpunkt höchstens ein einzelner Song abgespielt wird,
// reicht ein einziger Player
const player = document.createElement('audio')

// Wenn ein Song zu Ende gespielt wurde, dies wie einen stop()-Aufruf behandlen
player.addEventListener('ended', stop)


export function play(song) {
    // Den gerade abgespielten Song beenden
    stop()

    // Audiotrack laden, wenn noch nicht vorhanden
    const audioPromise = song.audio
        ? Promise.resolve(song.audio)
        : loadEntity(Song, song._links.self.href, { projection: 'nurAudio' })
            .then(songMitAudio => songMitAudio.audio)

    // Song abspielen, sobald Audiotrack verfügbar
    audioPromise
        .then(audio => {
            song.audio = audio
            player.setAttribute('src', audio)
            player
                .play()
                .then(() => store.commit('setPlaying', song))
                .catch(stop)
        })
}


export function stop() {
    player.setAttribute('src', '')
    store.commit('setPlaying', null)
}
