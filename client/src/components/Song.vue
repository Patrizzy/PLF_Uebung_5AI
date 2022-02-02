<template>
    <div class="song md-layout md-alignment-center-left">
        <div class="md-layout-item">{{ song.title }}</div>

        <div class="md-layout-item md-size-20">{{ song.artist.name }}</div>

        <div class="md-layout-item md-size-30">
            <span class="genre" v-for="g in song.genres" :key="g">{{ g }}</span>
        </div>

        <md-button
            class="md-icon-button md-dense"
            @click="togglePlaying"
        >
            <md-icon v-show="!isPlaying">play_arrow</md-icon>
            <md-icon v-show="isPlaying">stop</md-icon>
        </md-button>

        <md-button class="md-icon-button md-dense" :to="{ name: 'song-editor', params: { song } }">
            <md-icon>edit</md-icon>
        </md-button>

        <md-button class="md-icon-button md-dense md-accent" @click="deleteSong">
            <md-icon>delete</md-icon>
        </md-button>
    </div>
</template>

<script>
import { deleteEntity } from '@/services/rest'
import { play, playing, stop } from '@/services/player'

export default {
    name: 'Song',

    props: {
        song: Object,
        required: true,
    },

    computed: {
        isPlaying() {
            return this.$store.state.playing === this.song
        },
    },

    methods: {
        deleteSong() {
            deleteEntity(this.song)
                .then(() => {
                    this.$emit('deleted')
                })
        },

        togglePlaying() {
            if (this.isPlaying) {
                stop()

            } else {
                play(this.song)
            }
        },
    },
}
</script>

<style>
.song {
    padding: 0.25em;
}

.song audio.md-layout-item {
    height: 24px;
}

.song .genre + .genre::before {
    content: ', '
}
</style>