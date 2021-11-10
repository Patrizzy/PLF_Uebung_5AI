<template>
    <div class="md-layout md-alignment-center-left">
        <div class="md-layout-item">{{ song.title }}</div>
        <div class="md-layout-item md-size-20">{{ song.artist }}</div>
        <div class="md-layout-item md-size-20">{{ song.genre }}</div>

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

export default {
    name: 'Song',

    props: {
        song: Object,
        required: true,
    },

    methods: {
        deleteSong() {
            deleteEntity(this.song)
                .then(() => {
                    this.$emit('deleted')
                })
        },
    },
}
</script>

<style scoped>

</style>