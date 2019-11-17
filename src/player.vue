<template>
    <div class="flex-shrink-0 flex-grow-0 d-flex elevation-4">
        <div class="flex-grow-0 flex-shrink-0">
            <v-list style="background-color: transparent;">
                <v-list-item to="/playlist">
                    <v-list-item-avatar>
                        <v-icon class="purple white--text">mdi-album</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{song.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{song.artists}}</v-list-item-subtitle>
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
                <v-btn icon>
                    <v-icon>mdi-volume-minus</v-icon>
                </v-btn>

                <v-slider
                    v-model="volume"
                    hide-details
                    style="width: 150px;"
                    :min="0"
                    :max="100"
                    :step="volumeStep"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';
    import {mutation, volumeStep} from './var';

    export default {
        methods: mapMutations([mutation.CHANGE_VOLUME]),
        computed: {
            volumeStep: () => volumeStep,
            volume: {
                get() {
                    this.$store.state.volume;
                },
                set(value) {
                    this.CHANGE_VOLUME(value);
                }
            },
            ...mapState(['song'])
        }
    }
</script>
