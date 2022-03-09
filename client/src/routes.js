import SongView from '@/components/SongView'
import SongEditor from '@/components/SongEditor'
import ArtistView from '@/components/ArtistView'

export default [
    // Insert additional routes here
    { name: 'song-editor', path: '/song-editor', component: SongEditor, props: true },
    { name: 'info', path: '/info', component: { name: 'InfoView', render: h => h('div', 'Info view') }, props: true },
    { name: 'artist-view', path: '/artists', component: ArtistView, props: true },
    { name: 'song-view', path: '*', component: SongView, props: true },
]
