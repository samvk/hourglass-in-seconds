function addFakeTemplateRowNode({
    id = '',
    product = 'Administration Out of Office',
    activity = COMPANY_HOLIDAY_ACTIVITY,
    details = '🏖️ Company Holiday',
    time = 8
} = {}) {
    const productString = {
        [ADMINISTRATION_PRODUCT]: 'Administration Out of Office',
    }[product] ?? `Unknown product: ${product}`;
    const activityString = {
        [COMPANY_HOLIDAY_ACTIVITY]: 'Company Holiday',
        [PTO_ACTIVITY]: 'PTO',
    }[activity] ?? `Unknown activity: ${activity}`;

    const timeString = (() => {
        const d = new Date(0, 0);
        d.setMinutes(time * 60);
        return d.toTimeString().slice(0, 5);
    })();

    return (
        `<tr id='fake-template-row' class='fake-row' data-id='${id}'>
            <td style='padding:4px;'>
                <a class='daylink'>
                    <p>
                        ${productString}
                        <br>
                        <span class='dayactivity fake-dayactivity'>${activityString}</span>
                    </p>
                </a>
            </td>
            <td><p class='daydetails'>${details}</p></td>
            <td class='daytime'><p>${timeString}</p></td>
            <td><div><input id='add-fake-template-row-button' class='btn btn-warning add-fake-row-button' type='button' value='+ Add'></div></td>
        </tr>`
    )
}

const templateObserverCallback = () => {
    const activityTableBody = $('#dayview > tbody');
    if (!activityTableBody) {
        return;
    }

    if ($('#fake-template-row') !== null) {
        return;
    }

    const activityContainer = activityTableBody.closest('.col-xs-12.col-md-5');

    activityContainer.insertAdjacentHTML('afterend',
            `<div class="col-xs-12 col-md-5">
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

        const templateTableBody = $('#dayview-templates > tbody');

        const templates = [
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

        templates.forEach((template) => {
            templateTableBody.insertAdjacentHTML('beforeend', addFakeTemplateRowNode(template));
            $(`[data-id="${template.id}"] .add-fake-row-button`).addEventListener('click', function() {
                const { id: _id, ...templateWithoutId } = template;
                submitActivity(templateWithoutId);
            });
        });
};

templateObserverCallback();

const templateObserver = new MutationObserver(templateObserverCallback);

templateObserver.observe($('#dayview'), {
  childList: true,
  subtree: true,
});
