import Vue from 'vue';
import Vuex from 'vuex';
import * as musicMetadata from 'music-metadata-browser';
import {mutation, action} from './var';
import {getMP3FilesHandles} from './fn';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songs: [],
        albums: [],
    },
    mutations: {
        [mutation.ADD_SONGS] ({songs}, newSongs) {
            songs.push(...newSongs);
        },
        [mutation.ADD_SONG_TO_ALBUM] ({albums}, {albumName, handle, tags}) {
            let album = albums.findIndex((i) => i.name === albumName);

            if (album === -1) {
                const newLength = albums.push({
                    name: albumName,
                    titles: [],
                });

                album = newLength - 1;
            }

            albums[album].titles.push({/* handle, tags */});
        },
    },
    actions: {
        async [action.addMusic] ({commit}) {
            try {
                const filesHandles = await getMP3FilesHandles();
                
                for (const handle of filesHandles) {
                    /**
                     * @type {File}
                     */
                    let file;

                    try {
                        /**
                         * @type {File}
                         */
                        const _file = await handle.getFile();

                        if (_file.type !== 'audio/mp3') {
                            continue;
                        }

                        file = _file;

                        const tags = await musicMetadata.parseBlob(file);
                        const {common: {album: albumName}} = tags;

                        commit(mutation.ADD_SONGS, [{
                            tags, handle
                        }]);
                        // commit(mutation.ADD_SONG_TO_ALBUM, {
                        //     album: '1',
                        //     handle: '2',
                        //     tags: '3',
                        // });

                        commit(mutation.ADD_SONG_TO_ALBUM, {
                            albumName,
                            handle,
                            tags,
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            catch (e) {
                throw e;
            }
        },
    },
    getters: {
        albums({albums}) {
            console.log('get albums')
            return albums;
        },
        titles({songs}) {
            console.log('get titles')
            return songs;
        }
    },
    strict: true,
});
