function addFakeTemplateRowNode({
    id = '',
    productFriendlyName = 'Unknown product',
    projectFriendlyName = 'Unknown project',
    activityFriendlyName = 'Unknown activity',
    details = '',
    time = 8,
    'time-units': timeUnits = 'h',
    capital = 0,
    international = 0,
} = {}) {
    const timeString = (() => {
    const d = new Date(0, 0);
    d.setMinutes(timeUnits === 'm' ? time : time * 60);
    return d.toTimeString().slice(0, 5);
})();

    return (
        `<tr id='fake-template-row' class='fake-row' data-id='${id}'>
            <td style='padding:4px;'>
                <a class='daylink'>
                    <p>
                        ${productFriendlyName} ${projectFriendlyName}
                        <br>
                        <span class='dayactivity fake-dayactivity'>${activityFriendlyName}</span>
                    </p>
                </a>
            </td>
            <td>
                <p class='daydetails'>${details}</p>
                ${capital ? '<img src="img/dollar.png" title="Capitalizable activity">': ''}
                ${international ? '<img src="img/international.png" title="International activity">': ''}
            </td>
            <td class='daytime'><p>${timeString}</p></td>
            <td class="delete-activity-cell"><div class="delete-activity-button btn-danger" title="Delete">✖</div></td>
            <td><div><input class='btn btn-warning add-fake-template-row-button' type='button' value='+ Add'></div></td>
        </tr>`
    )
}

const rerenderTemplateTable = () => {
    const templateTableBody = $('#dayview-templates > tbody');
    if (!templateTableBody) {
        return;
    }

    // don't delete first row (the header)
    while (templateTableBody.children.length > 1) {
        templateTableBody.removeChild(templateTableBody.lastChild);
    }

    templatesStorage.get((templates) => {
        if (templates.length === 0) {
            $('#fake-template-table-container').classList.add('display-none');
        } else {
            $('#fake-template-table-container').classList.remove('display-none');
        }

        templates.forEach((template) => {
            templateTableBody.insertAdjacentHTML('beforeend', addFakeTemplateRowNode(template));
            $(`[data-id="${template.id}"] .add-fake-template-row-button`).addEventListener('click', function() {
                submitActivity({
                        product: template.product,
                        project: template.project,
                        activity: template.activity,
                        time: template.time,
                        'time-units': template['time-units'],
                        details: template.details,
                        capital: template.capital,
                        international: template.international,

                });
            });
            $(`[data-id="${template.id}"] .delete-activity-button`).addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this template?')) {
                    templatesStorage.remove(template.id);
                    // rerenderTemplateTable();
                }
            });
        });
    });
};

chrome.storage.onChanged.addListener((changes) => {
    if (changes.templates) {
        rerenderTemplateTable();
    }
});

const templateObserverCallback = () => {
    const activityTableBody = $('#dayview > tbody');
    if (!activityTableBody) {
        return;
    }

    if ($('#fake-template-table-container') !== null) {
        return;
    }

    const activityContainer = activityTableBody.closest('.col-xs-12.col-md-5');

    activityContainer.insertAdjacentHTML('afterend',
        `<div id="fake-template-table-container" class="col-xs-12 col-md-5 display-none">
            <div class="col-sm-12 col-md-12">
                <table style="width: 100%; margin-bottom: 20px; font-size: 1.2em; padding: 2px;" id="dayview-templates">
                    <tbody>
                    <tr class="dayheader">
                        <th colspan="2" class="headermonth"><span class="bigday"></span><span class="bigmonth">Templates</span></th>
                        <th class="headertime"><span class="bigtime"></span></th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>`
    );

    rerenderTemplateTable()
};

templateObserverCallback();

const templateObserver = new MutationObserver(templateObserverCallback);

templateObserver.observe($('#dayview'), {
  childList: true,
  subtree: true,
});


/////////////////////////////

const saveAsTemplateObserverCallback = () => {
    const cancelButton = $('#cancel-button');

    if (!cancelButton) {
        return;
    }

    if ($('#save-template-button') !== null) {
        return;
    }

    cancelButton.insertAdjacentHTML('beforebegin',
        `<input class="btn btn-custom" type="button" value="Save as Template" id="save-template-button">`
    );

    $('#save-template-button').addEventListener('click', () => {
        const $product = $('#product');
        const $project = $('#project');
        const $activity = $('#activity');

        const template = {
            id: crypto.randomUUID(),
            productFriendlyName: $product.options[$product.selectedIndex].text,
            projectFriendlyName: $project.options[$project.selectedIndex].text,
            activityFriendlyName: $activity.options[$activity.selectedIndex].text,
            product: $product.value,
            project: $project.value,
            activity: $activity.value,
            time: $('#time').value,
            'time-units': $('#time-units').value,
            details: $('#details').value,
            capital: $('#yes-select-button').classList.contains('btn-lit') ? 1 : 0,
            international: $('#yes-int-select-button').classList.contains('btn-lit') ? 1 : 0,
        };

        if (!(template.product && template.project && template.activity && template.time && template.details)) {
            alert('Please fill out all required fields ("Time Spend" and "Details").');
            return;
        }

        templatesStorage.add(template);
        // rerenderTemplateTable();
    });
};

saveAsTemplateObserverCallback()

const saveAsTemplateObserver = new MutationObserver(saveAsTemplateObserverCallback);

saveAsTemplateObserver.observe($('#cancel-button'), {
  childList: true,
  subtree: true,
});

// add keyboard shortcuts for submit (ctrl+enter), next business day (ctrl+⇨), previous business day (ctrl+⇦)
document.addEventListener('keydown', (e) => {
    const textField = ['input', 'textarea'].includes(e.target.tagName.toLowerCase());

    if (e.ctrlKey && (e.altKey || e.shiftKey)) {
        if (!textField) {
            if (e.key === '1') {
                console.log('click!')
            }
        }
    }
});
