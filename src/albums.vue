<template>
    <v-row class="ma-0 pr-4 pb-4" no-gutters>
        <v-col
            v-for="(album, albumName, n) in $store.state.albums"
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
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        class="align-end"
                    >
                        <v-list-item to="/playlist" class="white">
                            <v-list-item-content>
                                <v-list-item-title>{{albumName}}</v-list-item-title>
                                <v-list-item-subtitle>{{album[0].tags.common.albumartist}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-img>

                    <v-overlay absolute v-if="hover">
                        <v-btn icon x-large>
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
    export default {
        methods: {
            l(e) {
                console.log(e);
                return '2';
            }
        }
    };
</script>
