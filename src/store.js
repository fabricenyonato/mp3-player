import Vue from 'vue';
import Vuex from 'vuex';
import * as musicMetadata from 'music-metadata-browser';
import {mutation} from './var';
import {getMP3FilesHandles} from './fn';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mp3FilesHandles: [],
        albums: {},
    },
    mutations: {
        async [mutation.addFileHandle] ({mp3FilesHandles, albums}) {
            try {
                const filesHandles = await getMP3FilesHandles();

                mp3FilesHandles.push(...filesHandles);

                for (const handle of filesHandles) {
                    try {
                        const file = await handle.getFile();

                        const tags = await musicMetadata.parseBlob(file);
                        const {common: {album}} = tags;

                        if (!albums[album]) {
                            albums[album] = [];
                        }

                        albums[album].push({handle, tags});
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            catch (e) {
                throw e;
            }
        }
    },
});
