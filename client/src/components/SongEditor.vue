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

        <md-autocomplete
                v-model="song.artist.name"
                :md-options="artistPromise"
                @md-changed="searchArtists"
                @md-opened="searchArtists"
                @md-selected="selectArtist"
        >
            <label>Interpret</label>
            <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
            </template>
        </md-autocomplete>

        <md-vuelidated field="md-chips" v-model="song.genres" :md-auto-insert="true" md-placeholder="Genres*">
            <md-vuelidated-msg constraint="required">
                Mindestens ein Genre muss angegeben werden.
            </md-vuelidated-msg>
            <md-vuelidated-msg constraint="minLength">
                Mindestens ein Genre muss angegeben werden.
            </md-vuelidated-msg>
        </md-vuelidated>

        <div class="md-layout md-alignment-center-left">
            <md-field class="md-layout-item">
                <label>Audiodatei</label>
                <md-file @md-change="readAudioFile" v-model="song.filename" accept="audio/*" />
            </md-field>

            <audio class="md-layout-item md-flex-nogrow" :src="song.audio" controls></audio>
        </div>

        <div v-if="errors">
        <span v-for="error in errors">
          {{ error.message }}
        </span>
        </div>
    </div>
</template>

<script>
import Song from '@/models/Song'
import Artist from '@/models/Artist'
import { saveEntity, loadPage } from '@/services/rest'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'SongEditor',

    props: {
        song: {
            type: Song,
            default: () => new Song(),
        },
    },

    data: () => ({
        artists: [],
        errors: [],
        selectedArtistName: null,
    }),

    computed: {
        artistPromise() {
            return Promise.resolve(this.artists)
        },
    },

    methods: {
        save() {
            saveEntity(this.song)
                .then(savedSong => {
                    this.$router.back()
                })
                .catch(errors => {
                  console.log("in editor: ",errors)
                  this.errors = errors
                })
        },

        readAudioFile(fileList) {
            const reader = new FileReader()
            reader.onload = event => {
                this.song.audio = event.target.result
            }
            reader.readAsDataURL(fileList[0])
        },

        searchArtists(suchbegriff) {
            loadPage(Artist, 0, { size: 99999, name: suchbegriff || '' }, 'findByNameContainsIgnoreCase')
                .then(page => this.artists = page.entities)

        },

        selectArtist(artist) {
            this.song.artist = artist
        },
    },

    validations: {
        song: {
            title: {
                required,
                minLength: minLength(2)
            },
            artist: {
                //required,
            },
            genres: {
                required,
                minLength: minLength(1)
            },
            audio: {},
            filename: {},
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

.song-editor audio.md-layout-item {
    height: 24px;
}
</style>