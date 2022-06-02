const ADMINISTRATION_PRODUCT = 10;
const OUT_OF_OFFICE_PROJECT = 76;
const COMPANY_HOLIDAY_ACTIVITY = 51;
const SUMMER_HOURS_ACTIVITY = 53;

const summerHoursDays = [
    '06/10/2022',
    '06/17/2022',
    '07/01/2022',
    '07/15/2022',
    '07/22/2022',
    '07/29/2022',
    '08/01/2022',
    '08/05/2022',
    '08/12/2022',
    '08/19/2022',
    '08/26/2022',
    '09/02/2022',
].reduce((acc, date) => ({
    ...acc,
    [date]: {
        details: "☀️ Summer Hours",
        time: 4,
        activity: SUMMER_HOURS_ACTIVITY,
    }
}), {});

const companyHolidayDays = {
    ...summerHoursDays,
    // '01/01/2022': {
    //     details: "🎊 New Year's Day"
    // },
    '01/17/2022': {
        details: "🎙️ Martin Luther King Day"
    },
    '02/21/2022': {
        details: "🇺🇸 President's Day"
    },
    '04/15/2022': {
        details: "🌷 Spring Holiday"
    },
    '05/30/2022': {
        details: "🌺 Memorial Day"
    },
    '06/20/2022': {
        details: "🌟 Juneteenth"
    },
    '07/04/2022': {
        details: "🇺🇸 Independence Day"
    },
    '09/05/2022': {
        details: "🛠️ Labor Day"
    },
    // '10/11/2022': {
    //     details: "🍂 Fall Holiday"
    // },
    '11/24/2022': {
        details: "🦃 Thanksgiving"
    },
    '11/25/2022': {
        details: "🦃 Day after Thanksgiving"
    },
    '12/23/2022': {
        details: "❄️ Winter Holiday"
    },
    '12/26/2022': {
        details: "❄️ Winter Holiday"
    },
    // '12/31/2022': {
    //     details: "🎊 New Year's Day"
    // },
};

function addFakeRowNode({
    product = 'Administration Out of Office',
    activity = 51,
    details = '🏖️ Company Holiday',
    time = 8
} = {}) {
    const activityString = {
        51: 'Company Holiday',
        53: 'Summer Hours',
    }[activity] ?? 'Company Holiday';

    const timeString = (() => {
        const d = new Date(0, 0);
        d.setMinutes(time * 60);
        return d.toTimeString().slice(0, 5);
    })();

    return (
        `<tr id='fake-hourglass-row' class='fake-row display-none'>
        <td style='padding:4px;'>
            <a class='daylink'>
                <p>
                    ${product}
                    <br>
                    <span class='dayactivity fake-dayactivity'>${activityString}</span>
                </p>
            </a>
        </td>
        <td><p class='daydetails'>${details}</p></td>
        <td class='daytime'><p>${timeString}</p></td>
        <td id='add-fake-cell'><div><input id='add-fake-row-button' class='btn btn-warning' type='button' value='+ Add'></div></td>
    </tr>`
    )
}

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

function displayFakeRow() {
    const fakeRowNode = $('#fake-hourglass-row');
    const today = $('[name="date1"]').value;
    const alreadyAddedCompanyHoliday = [...$All('.dayactivity:not(.fake-dayactivity)')].some((el) => ['Company Holiday', 'Summer Hours'].includes(el.textContent));

    if (Object.keys(companyHolidayDays).includes(today) && !alreadyAddedCompanyHoliday) {
        fakeRowNode.classList.remove('display-none');
    } else {
        fakeRowNode.classList.add('display-none');
    }
}

const observer = new MutationObserver(() => {
    const activityTableBody = $('#dayview > tbody');
    if (!activityTableBody) {
        return;
    }

    if ($('#fake-hourglass-row') === null) {
        const today = $('[name="date1"]').value;
        const companyHolidayDay = companyHolidayDays[today];
        if (!companyHolidayDay) {
            return;
        }
        const fakeRowDetails = companyHolidayDay.details;
        const fakeRowTime = companyHolidayDay.time ?? 8;
        const fakeRowActivity = companyHolidayDay.activity ?? COMPANY_HOLIDAY_ACTIVITY;
        activityTableBody.insertAdjacentHTML('beforeend', addFakeRowNode({ details: fakeRowDetails, time: fakeRowTime, activity: fakeRowActivity }));
        $('#add-fake-row-button').addEventListener('click', function() {
            submitActivity({
                product: ADMINISTRATION_PRODUCT,
                project: OUT_OF_OFFICE_PROJECT,
                activity: fakeRowActivity,
                time: fakeRowTime,
                'time-units': 'h',
                details: fakeRowDetails,
                capital: 0,
                international: 0,
            });
        });
    }

    displayFakeRow();
});

observer.observe($('#dayview'), {
  childList: true,
  subtree: true,
});
