const $ = (...args) => document.querySelector(...args);
const $All = (...args) => document.querySelectorAll(...args);

function submitActivity(entries) {
    Object.entries(entries).forEach(([name, value]) => {
        const inputNode = $(`[name="${name}"]`);
        if (inputNode.tagName === 'SELECT') {
            inputNode.insertAdjacentHTML('beforeend', `<option value="${value}"></option>`); // force select option (even if list not rendered)
        }
        inputNode.value = value;
    });

    submitForm();
}

const ADMINISTRATION_PRODUCT = 10;
const OUT_OF_OFFICE_PROJECT = 76;
const COMPANY_HOLIDAY_ACTIVITY = 51;
const SUMMER_HOURS_ACTIVITY = 53;
const PTO_ACTIVITY = 14;
