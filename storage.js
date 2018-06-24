const storage = chrome.storage.sync;

const defaultsStorage = {
    get(callback = () => {}) {
        storage.get(['hours', 'details', 'capitalize', 'international', 'tags'], (defaults) => {
            callback(defaults);
        });
    },
    set(defaults) {
        storage.set(defaults);
    },
};
