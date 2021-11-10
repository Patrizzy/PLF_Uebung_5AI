<template>
    <div class="song-editor">
        <md-toolbar class="md-dense">
            <div class="md-toolbar-section-start">
                <md-button class="md-icon-button" :to="{ name: 'song-view' }">
                    <md-icon>arrow_back</md-icon>
                </md-button>
                <div class="md-title">Song bearbeiten</div>
            </div>

            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button" @click="save">
                    <md-icon>check</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <md-field>
            <label>Titel</label>
            <md-input type="text" v-model="song.title" />
        </md-field>

        <md-field>
            <label>Interpret</label>
            <md-input type="text" v-model="song.artist" />
        </md-field>

        <md-field>
            <label>Genre</label>
            <md-input type="text" v-model="song.genre" />
        </md-field>
    </div>
</template>

<script>
import Song from '@/models/Song'

export default {
    name: 'SongEditor',

    props: {
        song: {
            type: Song,
            required: true,
        },
    },

    methods: {
        save() {
            this.$router.back()
        },
    },
}
</script>

<style>
.song-editor .md-toolbar {
    position: fixed;
    top: 0;
    left: 0;
}
</style>