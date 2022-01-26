<template>
    <div class="page-nav md-layout md-alignment-center-center">
        <md-button
                class="md-icon-button md-raised md-dense"
                @click="navigate(0)"
        >
            <md-icon>first_page</md-icon>
        </md-button>

        <md-button
                class="md-icon-button md-raised md-dense"
                :disabled="page.isFirst()"
                @click="navigate(page.prev())"
        >
            <md-icon>chevron_left</md-icon>
        </md-button>

        <div v-if="page.totalElements">Seite {{ page.number + 1 }}/{{ page.totalPages }}</div>
        <div v-else>Nichts anzuzeigen</div>

        <md-button
                class="md-icon-button md-raised md-dense"
                :disabled="page.isLast()"
                @click="navigate(page.next())"
        >
            <md-icon>chevron_right</md-icon>
        </md-button>

        <md-button
                class="md-icon-button md-raised md-dense"
                @click="navigate(page.totalPages - 1)"
        >
            <md-icon>last_page</md-icon>
        </md-button>
    </div>
</template>

<script>
import Page from '@/models/Page'

export default {
    name: 'PageNav',

    props: {
        page: {
            type: Page,
            required: true,
        },
    },

    methods: {
        navigate(pageNum) {
            this.$emit('navigated', pageNum)
        },
    }
}
</script>

<style scoped>

</style>