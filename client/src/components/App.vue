<template>
  <md-app
      v-cloak
      md-waterfall
      md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense">
      <div class="md-toolbar-section-start">
        <router-link to="/" class="md-title">YouSong</router-link>
      </div>

      <div class="md-subheading md-toolbar-section-end">
        <router-link to="/artists" class="md-title">Interpreten</router-link>
      </div>

      <div class="md-subheading md-toolbar-section-end">
        <router-link to="/genres" class="md-title">Genres</router-link>
      </div>
    </md-app-toolbar>


    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  methods: {},
}
</script>

<style scoped>
</style>
