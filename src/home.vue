<template>
    <div class="d-flex flex-column h100">
        <v-app-bar color="primary" dark class="flex-shrink-0 flex-grow-0">
            <v-icon class="mr-4">mdi-music-note-outline</v-icon>

            <v-toolbar-title>MP3 Player</v-toolbar-title>

            <v-spacer />

            <v-btn icon>
                <v-icon>mdi-settings-outline</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs align-with-title background-color="transparent">
                    <v-tab to="/artists">Artists</v-tab>
                    <v-tab to="/albums">Albums</v-tab>
                    <v-tab to="/titles">Titles</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <div class="flex-grow-1 overflow-auto">
            <router-view />
        </div>

        <app-player />
    </div>
</template>

<script>
    import AppPlayer from './player.vue';

    export default {
        components: {AppPlayer}
    };
</script>

<style lang="scss" scoped>
    .player {
        border: 1px solid red;
        height: 100px;
    }
</style>
