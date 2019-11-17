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
        playlist: [],
        volume: 50,
        songIndex: 0,
        song: null,
    },
    mutations: {
        [mutation.CHANGE_VOLUME]({volume}, _volume) {
            volume = _volume;
        },
        [mutation.ADD_SONGS]({songs}, newSongs) {
            songs.push(...newSongs);
        },
        [mutation.ADD_SONG_TO_ALBUM]({albums}, {album, handle, tags, albumartist, cover}) {
            let index = albums.findIndex((i) => i.name === album);

            if (index === -1) {
                const newLength = albums.push({
                    name: album,
                    titles: [],
                });

                index = newLength - 1;
            }

            if (!albums[index].artist) {
                albums[index].artist = albumartist;
            }

            if (!albums[index].cover) {
                albums[index].cover = cover;
            }

            albums[index].titles.push({handle, tags});
        },
        [mutation.PLAY_SONG](state, song) {
            state.song = song;
        }
    },
    actions: {
        async [action.addMusic]({commit}) {
            try {
                const filesHandles = await getMP3FilesHandles();

                for (const handle of filesHandles) {
                    let file;

                    try {
                        file = await handle.getFile();

                        if (file.type !== 'audio/mp3') {
                            continue;
                        }
                    }
                    catch (e) {
                        console.error(e);
                        continue;
                    }

                    let cover;
                    let title;
                    let album;
                    let artists;

                    try {
                        const {common} = await musicMetadata.parseBlob(file);

                        title = common.title;
                        album = common.album;
                        artists = common.artists;

                        const {
                            albumartist,
                            picture: [{data, format}],
                        } = common;

                        if (data && format) {
                            const blob = new Blob([data], {type: format});
                            cover = URL.createObjectURL(blob);
                        }

                        commit(mutation.ADD_SONG_TO_ALBUM, {
                            handle,
                            albumartist,
                            cover,
                            album,
                            title,
                            artists
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }

                    commit(mutation.ADD_SONGS, [{
                        handle,
                        cover,
                        album,
                        title,
                        artists
                    }]);
                }
            }
            catch (e) {
                throw e;
            }
        },
        [action.playSong]({commit}, song) {
            commit(mutation.PLAY_SONG, song);
        }
    },
    getters: {},
    strict: true,
});
