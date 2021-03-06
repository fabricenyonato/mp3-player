import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './home.vue';
import Albums from './albums.vue';
import Artists from './artists.vue';
import Titles from './titles.vue';
import Playlist from './playlist.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/',
                redirect: '/albums'
            },
            {
                path: '/albums',
                component: Albums,
            },
            {
                path: '/titles',
                component: Titles,
            },
            {
                path: '/artists',
                component: Artists,
            },
            {
                path: '/playlist',
                component: Playlist,
            },
        ]
    },
];

export default new VueRouter({routes});
