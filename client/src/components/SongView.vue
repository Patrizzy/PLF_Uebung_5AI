<template>
  <div class="song-view">
    <div>
        <page-nav :page="page" @navigated="load"/>
    </div>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target :to="{ name: 'song-editor' }">
          <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>

      <div class="header md-layout md-alignment-center-left">
        <md-field class="md-layout-item">
            <label>Titel</label>
            <md-input type="text" v-model="title" @input="load(0)" />
        </md-field>

        <md-field class="md-layout-item">
            <label>Interpret</label>
            <md-input type="text" v-model="name" @input="load(0)" />
        </md-field>
      </div>

    <song
        v-for="s in page.entities"
        :key="s._links.self.href"
        :song="s"
        @deleted="load(page.number)"
    />
  </div>
</template>

<script>
import Page from '@/models/Page'
import PageNav from '@/components/PageNav'
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import { loadPage } from '@/services/rest'

export default {
    name: 'SongView',

    components: {
        PageNav,
        Song,
    },

    data() {
        return {
            page: new Page(),
            title: null,
            name: null,
        }
    },

    created() {
        this.load()
    },

    methods: {
        load(pageNum = 0) {
            loadPage(
                SongEntity,
                pageNum,
                {
                    size: 6,
                    projection: 'ohneAudio',
                    title: this.title || '',
                    name: this.name || '',
                },
                'findByTitleContainsAndArtistNameContainsAllIgnoreCase'
            )
            .then(page => {
                this.page = page
            })
        }
    },
}
</script>

<style>
.song-view .page-nav {
    margin-bottom: 1em;
}

.song-view .song:nth-child(2n+1) {
    background-color: #f0f0f0;
}

.song-view .header .md-field {
    margin-top: -6px;
    margin-bottom: 6px;
}

.song-view .header > * + * {
    margin-left: 1em;
}
</style>