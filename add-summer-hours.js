const ADMINISTRATION_PRODUCT = 10;
const OUT_OF_OFFICE_PROJECT = 76;
const SUMMER_HOURS_ACTIVITY = 53;

const addSummerHoursNode = (
    `<tr id='fake-summer-hours-row' class='fake-row display-none'>
        <td style='padding:4px;'>
            <a class='daylink'>
                <p>
                    Administration Out of Office
                    <br>
                    <span class='dayactivity summer-hours-dayactivity'>Summer Hours</span>
                </p>
            </a>
        </td>
        <td><p class='daydetails'>🌞 Summer Hours</p></td>
        <td class='daytime'><p>03:00</p></td>
        <td id='add-summer-hours-cell'><div><input id='add-summer-hours' class='btn btn-warning' type='button' value='+ Add'></div></td>
    </tr>`
);

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

function addSummerHours() {
    submitActivity({
        product: ADMINISTRATION_PRODUCT,
        project: OUT_OF_OFFICE_PROJECT,
        activity: SUMMER_HOURS_ACTIVITY,
        time: 3,
        'time-units': 'h',
        details: 'Summer Hours',
        capital: 0,
        international: 0,
    });
}

function displaySummerHoursRow() {
    const fakeSummerHoursRowNode = $('#fake-summer-hours-row');
    const today = $('[name="date1"]').value;
    const summerHoursDays = ['06/07/2019', '06/14/2019', '06/21/2019', '07/12/2019', '07/19/2019', '07/26/2019', '08/02/2019', '08/09/2019', '08/16/2019', '08/23/2019'];
    const alreadyAddedSummerHours = [...$All('.dayactivity:not(.summer-hours-dayactivity)')].some((el) => el.textContent === 'Summer Hours');

    if (summerHoursDays.includes(today) && !alreadyAddedSummerHours) {
        fakeSummerHoursRowNode.classList.remove('display-none');
    } else {
        fakeSummerHoursRowNode.classList.add('display-none');
    }
}

const observer = new MutationObserver(() => {
    const activityTableBody = $('#dayview > tbody');
    if (!activityTableBody) {
        return;
    }

    if ($('#fake-summer-hours-row') === null) {
        activityTableBody.insertAdjacentHTML('beforeend', addSummerHoursNode);
        $('#add-summer-hours').addEventListener('click', addSummerHours);
    }

    displaySummerHoursRow();
});

observer.observe($('#dayview'), {
  childList: true,
  subtree: true,
});
