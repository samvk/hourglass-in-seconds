function deleteActivity(id) {
    return fetch(`https://sec.kmbs.us/version2/lab/hourglass/deletetask.php?id=${id}`);
}

function subtractTime(total, subtract) {
    const convertTimeToHoursAndMinutes = (time) => time.split(':').map(Number);
    const convertNumberToTime = (x) => x.toString().padStart(2, '0');
    const [totalHours, totalMinutes] = convertTimeToHoursAndMinutes(total);
    const [subtractHours, subtractMinutes] = convertTimeToHoursAndMinutes(subtract);
    let subtractExtraHour = false;

    let newMinutes = totalMinutes - subtractMinutes;
    if (newMinutes < 0) {
        newMinutes = newMinutes + 60;
        subtractExtraHour = true;
    }
    const newHours = totalHours - subtractHours - (subtractExtraHour ? 1 : 0);

    return `${convertNumberToTime(newHours)}:${convertNumberToTime(newMinutes)}`;
}

function deleteActivityAndUpdateTable(el) {
    const activityId = el.querySelector('.daylink').href.split('id=').pop();

    const totalTimeNode = $('.bigtime');
    const total = totalTimeNode.textContent;
    const subtract = el.querySelector('.daytime').textContent;

    const newTotalTime = subtractTime(total, subtract);

    deleteActivity(activityId).then(() => {
        el.classList.add('display-none');
        totalTimeNode.textContent = newTotalTime;
    });
}

function buildDeleteActivityButtons() {
    activityRowNodes = $All('#dayview > tbody > tr:not(.dayheader)');

    activityRowNodes.forEach((el) => {
        const deleteActivityCellAlreadyExists = el.querySelector('.delete-activity-cell');
        const fakeCell = el.classList.contains('fake-row') || !el.querySelector('.daytime');

        if (deleteActivityCellAlreadyExists || fakeCell) {
            return;
        }

        const deleteActivityCell = document.createElement('td');
        deleteActivityCell.className = 'delete-activity-cell';
        deleteActivityCell.innerHTML = '<div class="delete-activity-button btn-danger" title="Delete">✖</div>';
        deleteActivityCell.addEventListener('click', () => deleteActivityAndUpdateTable(el));

        el.insertAdjacentElement('beforeend', deleteActivityCell);
    });
}

const deleteButtonObserverCallback = () => {
    const activityTableBody = $('#dayview > tbody');
    if (!activityTableBody) {
        return;
    }

    buildDeleteActivityButtons();
};

deleteButtonObserverCallback();

const deleteButtonObserver = new MutationObserver(deleteButtonObserverCallback);

deleteButtonObserver.observe($('#dayview'), {
    childList: true,
    subtree: true,
});
