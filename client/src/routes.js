import SongView from '@/components/SongView'
import SongEditor from '@/components/SongEditor'

export default [
    // Insert additional routes here
    { name: 'song-editor', path: '/song-editor', component: SongEditor, props: true },
    { name: 'info', path: '/info', component: { name: 'InfoView', render: h => h('div', 'Info view') }, props: true },
    { name: 'song-view', path: '*', component: SongView, props: true },
]
