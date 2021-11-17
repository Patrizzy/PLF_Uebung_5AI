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
                <md-button class="md-icon-button"
                     @click="save"
                     :disabled="$v.$invalid">
                    <md-icon>check</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <md-vuelidated
            field="md-field"
            class="md-layout-item">
            <label>Titel</label>
            <md-input type="text" v-model="song.title" />

            <md-vuelidated-msg constraint="required">
                Dies ist ein Pflichtfeld.
            </md-vuelidated-msg>
            <md-vuelidated-msg constraint="minLength" v-slot="{ min }">
              Der Titel muss mindestens {{ min }} Zeichen lang sein.
            </md-vuelidated-msg>
        </md-vuelidated>

        <md-vuelidated
            field="md-field"
            class="md-layout-item">
          <label>Interpret</label>
          <md-input type="text" v-model="song.artist" />

          <md-vuelidated-msg constraint="required">
            Dies ist ein Pflichtfeld.
          </md-vuelidated-msg>
        </md-vuelidated>

        <md-vuelidated
            field="md-field"
            class="md-layout-item">
          <label>Genre</label>
          <md-input type="text" v-model="song.genre" />

          <md-vuelidated-msg constraint="required">
            Dies ist ein Pflichtfeld.
          </md-vuelidated-msg>
        </md-vuelidated>
    </div>
</template>

<script>
import Song from '@/models/Song'
import { saveEntity } from '@/services/rest'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'SongEditor',

    props: {
        song: {
            type: Song,
            default: () => new Song(),
        },
    },

    methods: {
        save() {
            saveEntity(this.song)
                .then(savedSong => {
                    this.$router.back()
                })
        },
    },

    validations: {
        song: {
            title: {
              required,
              minLength: minLength(4)
            },
            artist: {
              required,
            },
            genre: {
              required,
            },
        }
    }
}
</script>

<style>
.song-editor .md-toolbar {
    position: fixed;
    top: 0;
    left: 0;
}
</style>