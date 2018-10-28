const $ = (...args) => document.querySelector(...args);
const $All = (...args) => document.querySelectorAll(...args);

function queryString(str = location.search) {
    return str
        .slice(1)
        .split('&')
        .map(p => p.split('='))
        .reduce((obj, pair) => {
            let [key, value] = pair.map(decodeURIComponent);
            value = isNaN(value) ? value : +value;
            return ({ ...obj, [key]: value })
        }, {});
}
