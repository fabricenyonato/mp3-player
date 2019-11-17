<template>
    <v-data-table
        :headers="headers"
        :items="songs"
        hide-default-footer
    >
        <template v-slot:item="{item, index}">
            <v-hover v-slot:default="{hover}">
                <tr>
                    <td class="text-center" style="width: 36px;">
                        <v-avatar v-if="!hover" size="36">
                            <img :src="item.cover"/>
                        </v-avatar>

                        <v-avatar v-if="hover" size="36" color="primary">
                            <v-btn icon @click="playSong(item)">
                                <v-icon class="white--text">mdi-play</v-icon>
                            </v-btn>
                        </v-avatar>
                    </td>

                    <td>{{item.title}}</td>
                    <td>{{item.artists}}</td>
                    <td>2:19</td>
                </tr>
            </v-hover>
        </template>
    </v-data-table>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {action} from './var';

    export default {
        computed: {
            ...mapState(['songs']),
            headers() {
                return [
                    {text: '', value: 'cover', sortable: false},
                    {text: 'Title', value: 'title', sortable: false},
                    {text: 'Artists', value: 'artists', sortable: false},
                    {text: 'Time', value: 'time', sortable: false},
                ];
            }
        },
        methods: {
            ...mapActions([action.playSong]),
        }
    }
</script>
