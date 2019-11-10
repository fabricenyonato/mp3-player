<template>
    <v-row class="ma-0 pr-4 pb-4" no-gutters>
        <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex pl-4 pt-4"
            sm="4"
            md="3"
            lg="2"
            xl="2"
        >
            <v-card>
                <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    class="align-end"
                >
                    <v-list-item to="/playlist" class="white">
                        <v-list-item-content>
                            <v-list-item-title>Title</v-list-item-title>
                            <v-list-item-subtitle>Artist</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-img>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    // import * as musicMetadata from 'music-metadata-browser';

    export default {
        // data: () => ({}),
        async created() {
            /* try {
                const handles = await this.getMP3Files();
                const file = await handles[0].getFile();

                const tags = await musicMetadata.parseBlob(file);
                console.log(tags);
            }
            catch (e) {
                console.error(e);
            } */
        },
    };
</script>
