// AUTOMATICALLY COMPLETE TIMESHEET

// Fixes bug in Date that convert different formats as different timezones
function dateSlashesToDashes(date) {
  const [ month, day, year ] = date.split('/');
  return [year, month, day].join('-');
}

function getDayOfTheWeek(date) {
    dayOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return dayOfTheWeek[date.getUTCDay()];
}

function completeTimesheet(config) {
    config = { blacklist: [], ...config }; // defaults

    function nextDay() {
        $('.input-group-addon').click();
        setTimeout(() => {
            const $nextDayNode = $('.active.day').nextElementSibling || $('.active.day').parentElement.nextElementSibling.firstElementChild;
            $nextDayNode.click();

            setTimeout(() => {
                const date = dateSlashesToDashes($('#date1').value);
                if (config.blacklist.includes(date)) {
                    nextDay();
                }
            }, 200); // delay for click

        }, 200); // delay for click


    }

    const date = new Date( dateSlashesToDashes($('#date1').value) );

    const { activity } = queryString();

    if (+date > +new Date(config.endDate)) {
        console.log(`End date (${config.endDate}) reached.`);
        return;
    }

    const dayOfTheWeek = getDayOfTheWeek(date);

    const activities = Object.keys(config.days[dayOfTheWeek] || {});

    // if no activities for the day, continue
    if (!activities.length) {
        nextDay();
    }

    if (!activity) {
        location.assign(`${location.pathname}?day=${config.startDate}&activity=${activities[0]}`);
        return;
    }

    // const activityKey = activity || Object.keys(config.days[dayOfTheWeek] || {})[0];
    //
    // if (!activityKey) {
    //     nextDay();
    // }

    filloutTimesheet(activityKey, dayOfTheWeek);

    function filloutTimesheet(activityKey, dayOfTheWeek) {
        activity = config.activity[activityKey];

        if (activity.capitalize) {
            $('#yes-select-button').click();
        }
        if (activity.international) {
            $('#yes-int-select-button').click();
        }
        $('#time-units > [value="h"]').selected = true; // always choose hours
        $('#time').value = config.days[dayOfTheWeek][activityKey];
        $('#details').value = activity.details;

        $('#activity-button').click();
    }

    // if final activity, continue

    activities.forEach((activityKey) => {
    });

    if (+date < +new Date(config.endDate)) {
        continueLoop();
    }
}

const config = {
    startDate: '2018-06-26',
    endDate: '2018-06-29',
    blacklist: ['2018-06-27'],
    activity: {
        dev: {
            details: 'Development for Konica Minolta MarketPlace 2.x',
            capitalize: true,
            international: true,
        },
        devMeeting: {
            details: 'Development team meeting',
            capitalize: false,
            international: false,
        },
    },
    days: {
        monday: { dev: 8 },
        tuesday: { dev: 8 },
        wednesday: { dev: 8 },
        thursday: { dev: 8 },
        friday: { dev: 7.5, devMeeting: 0.5 },
    },
}

// START
function start(config) {
    if (config.startDate >= config.endDate) {
        console.error('End Date must be later than Start Date');
        return;
    }

    const { start, day } = queryString();

    if (start) {
        if (day === config.startDate) {
            completeTimesheet(config);
        } else {
            location.assign(`${location.pathname}?day=${config.startDate}&start=1`);
        }
    }
}

start(config);
