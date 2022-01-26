/**
 * Vuex store
 */
export default {
    /** Application state */
    state: {
        playing: null,
    },

    /** Methods that read the application state */
    getters: {
    },

    /** Methods that change the application state synchronously */
    mutations: {
        setPlaying(state, song) {
            state.playing = song
        },
    },

    /** Methods that change the application state asynchronously */
    actions: {
    },
}
