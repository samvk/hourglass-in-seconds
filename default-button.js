// ADD MORE DEFAULT BUTTONS

function addTags(tags) {
    $tagsContainer = $('#tags .taggle_list');
    [...new Set(tags)].forEach((tag) => {
        $tagNode = `<li class="taggle"><span class="taggle_text">${tag}</span><a href="javascript:void(0)" class="close">r</a>
            <input type="hidden" value="${tag}" name="taggles[]">
        </li>`;

        $tagsContainer.insertAdjacentHTML('afterbegin', $tagNode);
    });
}

defaultsStorage.get((defaults) => {
    if (parseInt($('#time').value, 10) === 0) {
        $('#time').value = ''; // set value to '' not '0'
    }

    if (new URLSearchParams(location.search).has('id')) {
        const currentTimeValue = parseInt($('#time').value, 10);
        if (typeof currentTimeValue === 'number' && !Number.isNaN(currentTimeValue) && $('#time-units').value === 'm') {
            $('#time').value = `${+((currentTimeValue / 60).toFixed(12))}`;
            $('#time-units').value = 'h';
        }

        // don't set defaults if we're editing an existing activity
        return;
    }

    $('#time-units').value = 'h'; // always choose hours

    if (defaults.product) {
        $('#product').value = defaults.product;
    }
    if (defaults.project) {
        $('#project').value = defaults.project;
    }
    if (defaults.activity) {
        $('#activity').value = defaults.activity;
    }
    if (defaults.capitalize) {
        $('#yes-select-button').click();
    }
    if (defaults.international) {
        $('#yes-int-select-button').click();
    }
    if (defaults.hours) {
        $('#time').value = defaults.hours;
    }
    if (defaults.details) {
        $('#details').value = defaults.details;
    }
    // if (defaults.tags) {
        // addTags(defaults.tags);
    // }
});

function buildDefaultNode({ storage, node, type, replacement, dependant }) {
    return (
        `<div class="col-sm-1 col-md-1">
            <img
                src="img/set-default.png"
                alt="Set as Default"
                title="Set as Default"
                class="clickable default-button"
                data-storage='${storage}'
                data-node='${node}'
                data-type='${type}'
                data-replacement='${replacement}'
                data-dependant='${dependant}'
            >
        </div>`
    );
}

function saveDefaultValue({ node, type }) {
    return {
        value: $(node).value,
        "select-button": $(node).classList.contains('btn-lit'),
        // tags: [...$All(`${node} .taggle_text`)].map((el) => el.textContent),
    }[type];
}

const defaultButtonConfigs = [
    { placement: '#product', storage: 'product', node: '#product', type: 'value', replacement: '#set-default-product', dependant: 'project' },
    { placement: '#project', storage: 'project', node: '#project', type: 'value', replacement: '#set-default-project', dependant: 'product' },
    { placement: '#activity', storage: 'activity', node: '#activity', type: 'value', replacement: '#set-default-activity' },
    { placement: '#time-units', storage: 'hours', node: '#time', type: 'value' },
    { placement: '#details', storage: 'details', node: '#details', type: 'value' },
    { placement: '#yes-select-button', storage: 'capitalize', node: '#yes-select-button', type: 'select-button' },
    { placement: '#yes-int-select-button', storage: 'international', node: '#yes-int-select-button', type: 'select-button' },
    // { placement: '#tags', storage: 'tags', node: '#tags', type: 'tags' },
];

Object.values(defaultButtonConfigs).forEach(({ placement, storage, node, type, replacement, dependant }) => {
    $(placement).parentElement.insertAdjacentHTML('afterend', buildDefaultNode({ storage, node, type, replacement, dependant }));
});

$All('.default-button').forEach((el) => {
    el.addEventListener('click', ({ target: el }) => {
        const key = el.getAttribute('data-storage');
        const value = saveDefaultValue({ node: el.getAttribute('data-node'), type: el.getAttribute('data-type') });

        defaultsStorage.set({
            [key]: value,
        });

        const replacementNodeSelector = el.getAttribute('data-replacement');
        if (replacementNodeSelector) {
            console.log($(replacementNodeSelector))
            console.log($(replacementNodeSelector)?.click)
            $(replacementNodeSelector)?.click();
        }

        el.classList.remove('saved');
        setTimeout(() => el.classList.add('saved'), 0);

        const dependant = el.getAttribute('data-dependant');
        if (dependant) {
            $(`[data-storage="${dependant}"]`)?.click();
        }
    });
});

function submitForm() {
    $('#activity-button').click();
}

// ADD "NEXT BUSINESS DAY" BUTTON
function changeDay(direction) {
    $('.input-group-addon').click();
    const $today = $('.active.day');

    let $changeDayNode;
    if (direction === 1) {
        $changeDayNode = (() => {
            const tomorrowWeekend = !($today.nextElementSibling && $today.nextElementSibling.nextElementSibling);

            if (tomorrowWeekend) {
                return $today.parentElement.nextElementSibling.firstElementChild.nextElementSibling;
            }
            return $today.nextElementSibling;
        })();
    } else if (direction === -1) {
        $changeDayNode = (() => {
            const yesterdayWeekend = !($today.previousElementSibling && $today.previousElementSibling.previousElementSibling );

            if (yesterdayWeekend) {
                return $today.parentElement.previousElementSibling.lastChild.previousElementSibling;
            }
            return $today.previousElementSibling;
        })();
    }
    $changeDayNode.click();
}

function nextDay() { changeDay(1) };
function prevDay() { changeDay(-1) };

$nextDayButton = `<div class="col-sm-1 col-md-1">
    <span class="next-day-button" title="Next business day">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </span>
</div>`;

$('#datepicker1').insertAdjacentHTML('afterend', $nextDayButton);

$('.next-day-button').addEventListener('click', nextDay);

// add keyboard shortcuts for submit (ctrl+enter), next business day (ctrl+⇨), previous business day (ctrl+⇦)
document.addEventListener('keydown', (e) => {
    const textField = ['input', 'textarea'].includes(e.target.tagName.toLowerCase());

    if (e.ctrlKey) {
        if (e.key === 'Enter') {
            submitForm();
        }
        if (!textField) {
            if (e.key === 'ArrowRight') {
                nextDay();
            }
            if (e.key === 'ArrowLeft') {
                prevDay();
            }

        }
    }
});
