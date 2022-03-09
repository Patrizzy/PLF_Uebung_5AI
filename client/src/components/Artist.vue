<template>
    <div class="artist md-layout md-alignment-center-left">
        <div class="md-layout-item">
            <img :src="artist.image">
        </div>

        <div class="md-layout-item">{{ artist.name }}</div>

        <md-button class="md-icon-button md-dense" :to="{ name: 'artist-editor', params: { artist } }">
            <md-icon>edit</md-icon>
        </md-button>

        <md-button class="md-icon-button md-dense md-accent" @click="deleteArtist">
            <md-icon>delete</md-icon>
        </md-button>
    </div>
</template>

<script>
import { deleteEntity } from '@/services/rest'

export default {
    name: 'Artist',

    props: {
        artist: Object,
        required: true,
    },

    methods: {
        deleteArtist() {
            deleteEntity(this.artist)
                .then(() => {
                    this.$emit('deleted')
                })
        },
    },
}
</script>

<style>
.artist {
    padding: 0.25em;
}

.artist img {
    display: inline-block;
    width: 5em;
}
</style>