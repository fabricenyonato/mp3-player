<template>
    <div id="player" class="flex-shrink-0 flex-grow-0 d-flex elevation-4">
        <div class="flex-grow-0 flex-shrink-0">
            <v-list style="background-color: transparent;">
                <v-list-item to="/playlist">
                    <v-list-item-avatar>
                        <v-icon class="purple white--text">mdi-album</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Title</v-list-item-title>
                        <v-list-item-subtitle>Artist</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>

        <div class="flex-grow-1 d-flex align-center mr-4 ml-4">
            <span class="mr-2">1:20</span>

            <v-slider :value="50" hide-details />

            <span class="ml-2">-2:43</span>
        </div>

        <div class="flex-grow-0 flex-shrink-0 d-flex align-center mr-4">
            <v-btn icon>
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>

            <v-btn icon x-large>
                <v-icon>mdi-play</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <div style="height: 50%" class="pl-2 pr-2">
                <v-divider vertical />
            </div>

            <v-btn icon>
                <v-icon>mdi-repeat</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-shuffle</v-icon>
            </v-btn>

            <div style="height: 50%" class="pl-2 pr-2">
                <v-divider vertical />
            </div>

            <div class="d-flex align-center">
                <v-btn icon @click="volume -= volStep" :disabled="volume === 0">
                    <v-icon>mdi-volume-minus</v-icon>
                </v-btn>

                <v-slider
                    v-model="volume"
                    hide-details
                    style="width: 100px;"
                    :min="0"
                    :max="100"
                    :step="volStep"
                />

                <v-btn icon @click="volume += volStep" :disabled="volume === 100">
                    <v-icon>mdi-volume-plus</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            volume: 50,
        }),
        methods: {
            changeVolume(sens) {
                const step = ((sens === '+') ? 1 : -1) * 10;
            }
        },
        computed: {
            volStep: () => 10,
        }
    }
</script>

<style lang="scss" scoped>
    // #cover {
    //     height: 37px;
    //     width: 37px;
    // }
</style>
