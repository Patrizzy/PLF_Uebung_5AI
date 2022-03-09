<template>
  <div class="artist-view">
    <div>
        <page-nav :page="page" @navigated="load"/>
    </div>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target :to="{ name: 'artist-editor' }">
          <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>

    <artist
        v-for="s in page.entities"
        :key="s._links.self.href"
        :artist="s"
        @deleted="load(page.number)"
    />
  </div>
</template>

<script>
import Page from '@/models/Page'
import PageNav from '@/components/PageNav'
import Artist from '@/components/Artist'
import ArtistEntity from '@/models/Artist'
import { loadPage } from '@/services/rest'

export default {
    name: 'ArtistView',

    components: {
        PageNav,
        Artist,
    },

    data() {
        return {
            page: new Page(),
        }
    },

    created() {
        this.load()
    },

    methods: {
        load(pageNum = 0) {
            loadPage(ArtistEntity, pageNum, { size: 6 })
                .then(page => {
                    this.page = page
                })
        }
    },
}
</script>

<style scoped>
.artist-view .page-nav {
    margin-bottom: 1em;
}

.artist-view .artist:nth-child(2n+1) {
    background-color: #f0f0f0;
}
</style>