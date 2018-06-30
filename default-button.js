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
    if (defaults.capitalize) {
        $('#yes-select-button').click();
    }
    if (defaults.international) {
        $('#yes-int-select-button').click();
    }
    $('#time-units > [value="h"]').selected = true; // always choose hours
    if (defaults.hours) {
        $('#time').value = defaults.hours;
    } else {
        if (parseInt($('#time').value) === 0) {
            $('#time').value = ''; // set value to '' not '0'
        }
    }
    if (defaults.details) {
        $('#details').value = defaults.details;
    }
    // if (defaults.tags) {
        // addTags(defaults.tags);
    // }
});

function buildDefaultNode({ storage, node, type }) {
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
    { placement: '#time-units', storage: 'hours', node: '#time', type: 'value' },
    { placement: '#details', storage: 'details', node: '#details', type: 'value' },
    { placement: '#yes-select-button', storage: 'capitalize', node: '#yes-select-button', type: 'select-button' },
    { placement: '#yes-int-select-button', storage: 'international', node: '#yes-int-select-button', type: 'select-button' },
    // { placement: '#tags', storage: 'tags', node: '#tags', type: 'tags' },
];

Object.values(defaultButtonConfigs).forEach(({ placement, storage, node, type }) => {
    $(placement).parentElement.insertAdjacentHTML('afterend', buildDefaultNode({ storage, node, type }));
});

$All('.default-button').forEach((el) => {
    el.addEventListener('click', ({ target: el }) => {
        const key = el.getAttribute('data-storage');
        const value = saveDefaultValue({ node: el.getAttribute('data-node'), type: el.getAttribute('data-type') });

        defaultsStorage.set({
            [key]: value,
        });

        el.classList.remove('saved');
        setTimeout(() => el.classList.add('saved'), 0);
    });
});

// ADD "NEXT BUSINESS DAY" BUTTON
function nextDay() {
    $('.input-group-addon').click();
    const $nextDayNode = (() => {
        const $today = $('.active.day');
        const tomorrowWeekend = !($today.nextElementSibling && $today.nextElementSibling.nextElementSibling);

        if (tomorrowWeekend) {
            return $today.parentElement.nextElementSibling.children[1];
        }
        return $today.nextElementSibling;
    })();
    $nextDayNode.click();
}

$nextDayButton = `<div class="col-sm-1 col-md-1">
    <span class="next-day-button" title="Next business day">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </span>
</div>`;

$('#datepicker1').insertAdjacentHTML('afterend', $nextDayButton);

$('.next-day-button').addEventListener('click', nextDay);
