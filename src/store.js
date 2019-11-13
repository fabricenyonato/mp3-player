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
        [mutation.ADD_SONG_TO_ALBUM] ({albums}, {albumName, handle, tags, albumArtist, cover}) {
            let album = albums.findIndex((i) => i.name === albumName);

            if (album === -1) {
                const newLength = albums.push({
                    name: albumName,
                    titles: [],
                });

                album = newLength - 1;
            }

            if (!albums[album].artist) {
                albums[album].artist = albumArtist;
            }

            if (!albums[album].cover) {
                albums[album].cover = cover;
            }

            albums[album].titles.push({handle, tags});
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
                        file = await handle.getFile();

                        if (file.type !== 'audio/mp3') {
                            continue;
                        }
                    }
                    catch (e) {
                        console.error(e);
                        continue;
                    }

                    let tags;
                    let cover;

                    try {
                        tags = await musicMetadata.parseBlob(file);
                        const {common: {
                            album: albumName,
                            albumartist: albumArtist,
                            picture: [{data, format}]
                        }} = tags;

                        if (data && format) {
                            var blob = new Blob([data], {type: format});
                            cover = URL.createObjectURL(blob);
                        }

                        commit(mutation.ADD_SONG_TO_ALBUM, {
                            handle,
                            tags,
                            cover,
                            albumName,
                            albumArtist,
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }

                    commit(mutation.ADD_SONGS, [{
                        handle,
                        tags,
                        cover,
                    }]);
                }
            }
            catch (e) {
                throw e;
            }
        },
    },
    getters: {
        albums({albums}) {
            return albums;
        },
        titles({songs}) {
            return songs;
        }
    },
    strict: true,
});
