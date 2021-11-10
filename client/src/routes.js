import SongView from '@/components/SongView'

export default [
    // Insert additional routes here
    { name: 'info', path: '/info', component: { name: 'InfoView', render: h => h('div', 'Info view') }, props: true },
    { name: 'song-view', path: '*', component: SongView, props: true },
]
