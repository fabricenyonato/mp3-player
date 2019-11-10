<template>
    <div>
        <input type="file" name="aaa" id="">
    </div>
</template>

<script>
    import * as musicMetadata from 'music-metadata-browser';

    export default {
        async created() {
            try {
                const handles = await this.getMP3Files();
                const file = await handles[0].getFile();

                const tags = await musicMetadata.parseBlob(file);
                console.log(tags);
            }
            catch (e) {
                console.error(e);
            }
        },
        methods: {
            async getMP3Files() {
                const opts = {type: 'openDirectory'};

                try {
                    const handle = await chooseFileSystemEntries(opts)
                    const entries = await handle.getEntries();

                    const f = async (entries) => {
                        const files = [];

                        for await (const _handle of entries) {
                            if (_handle.isFile) {
                                files.push(_handle);
                            }
                            else if (_handle.isDirectory)  {
                                try {
                                    const _entries = await _handle.getEntries();
                                    const _files = await f(_entries);

                                    files.push(..._files);
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            }
                        }

                        return files
                    };

                    return await f(entries);
                }
                catch (e) {
                    console.error(e);
                }
            },
        }
    };
</script>
