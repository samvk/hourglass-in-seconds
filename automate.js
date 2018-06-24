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
    function fillOutTimesheet() {
        function continueLoop() {
            $('.input-group-addon').click();
            setTimeout(() => {
                const $nextDayNode = $('.active.day').nextElementSibling || $('.active.day').parentElement.nextElementSibling.firstElementChild;
                console.log('$nextDayNode', $nextDayNode);
                $nextDayNode.click();
                setTimeout(fillOutTimesheet, 0);
            }, 100);

        }

        const date = new Date( dateSlashesToDashes($('#date1').value) );

        const blackListDates = config.blacklist.map((blacklistDate) => +new Date(blacklistDate));
        console.log('blackListDates', blackListDates);
        console.log('+date', +date);
        console.log('blackListDates.includes(+date)', blackListDates.includes(+date));
        if ( blackListDates.includes(+date) ) {
            continueLoop();
        }

        const dayOfTheWeek = getDayOfTheWeek(date);

        const activities = Object.keys(config.days[dayOfTheWeek] || {});

        activities.forEach((activityKey) => {
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

            // $('#activity-button').click();
        });

        console.log('date', date);
        console.log('+date', +date);
        console.log('+new Date(config.endDate)', +new Date(config.endDate));
        console.log('+date >= +new Date(config.endDate)', +date >= +new Date(config.endDate));
        if (+date < +new Date(config.endDate)) {
            continueLoop();
        }
    }

    // location.assign(`/version2/lab/hourglass/home.html?day=${config.startDate}`); // FIXME::method needs to run even after page change
    fillOutTimesheet(config);
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

completeTimesheet(config);
