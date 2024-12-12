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

const templatesStorage = {
    get(callback = () => {}) {
        storage.get(['templates'], ({ templates }) => {
            if (!templates) {
                const defaultTemplates = [
                    {
                        id: '00000000-1111-1111-1111-000000000000',
                        product: ADMINISTRATION_PRODUCT,
                        project: OUT_OF_OFFICE_PROJECT,
                        activity: 14,
                        time: 8,
                        'time-units': 'h',
                        details: 'PTO',
                        capital: 0,
                        international: 0,
                    },
                ];
                storage.set({ templates: defaultTemplates }, (templates) => {
                    callback(templates);
                });
            } else {
                callback(templates);
            }
        });
    },
};
templatesStorage.add = (template) => {
    return templatesStorage.get((templates) => {
        templates.push(template);
        return storage.set({ templates });
    });
};
templatesStorage.remove = (templateId) => {
    return templatesStorage.get((templates) => {
        return storage.set({ templates: templates.filter((template) => template.id !== templateId) });
    });
};
