<template>
    <v-row class="ma-0 pr-4 pb-4" no-gutters>
        <v-col
            v-for="(album, n) in albums"
            :key="n"
            class="d-flex child-flex pl-4 pt-4"
            sm="4"
            md="3"
            lg="2"
            xl="2"
        >
            <v-hover v-slot:default="{hover}">
                <v-card>
                    <v-img
                        :src="album.cover"
                        aspect-ratio="1"
                        class="align-end"
                    >
                        <v-list-item to="/playlist" class="white">
                            <v-list-item-content>
                                <v-list-item-title>{{album.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{album.artist}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-img>

                    <v-overlay absolute v-if="hover">
                        <v-btn icon x-large class="mr-2">
                            <v-icon>mdi-play</v-icon>
                        </v-btn>

                        <v-btn icon x-large>
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-overlay>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['albums']),
        },
    };
</script>
