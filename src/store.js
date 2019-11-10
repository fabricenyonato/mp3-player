import Vue from 'vue';
import Vuex from 'vuex';
import {mutation} from './var';
import {getMP3FilesHandles} from './fn';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mp3FilesHandles: [],
    },
    mutations: {
        async [mutation.addFileHandle] ({mp3FilesHandles}) {
            try {
                const filesHandles = await getMP3FilesHandles();

                mp3FilesHandles.push(...filesHandles);
            }
            catch (e) {
                throw e;
            }
        }
    },
});
