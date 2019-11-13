/**
 * @returns {Promise<FileSystemFileHandle[]>}
 */
export async function getMP3FilesHandles() {
    const opts = {type: 'openDirectory'};

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

    try {
        const handle = await chooseFileSystemEntries(opts)
        const entries = await handle.getEntries();

        return await f(entries);
    }
    catch (e) {
        throw e;
    }
}
