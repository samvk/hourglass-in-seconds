function buildAddNewTaskNode({ day }) {
    return (
        `<div class="col-sm-12 col-md-12 addlink weekview-addlink">
			<span>
                <a href="home.html?day=${day}">
                    <span style="margin:0px 4px 0px 0px;cursor:pointer;" class="glyphicon glyphicon-star-empty" aria-hidden="true" title="New"></span>
                    Add New
                </a>
            </span>
		</div>`
    );
}

function addNewTaskNode() {
    $All('#weekview > *:not(#week-weekend):not(.week-footer)').forEach((el) => {
        const ALREADY_OBSERVED_ATTRIBUTE = 'data-observed';

        if (el.getAttribute(ALREADY_OBSERVED_ATTRIBUTE)) {
            return;
        }

        const day = el.querySelector('[href^="activity.html?d="]').href.match(/[?&]d=(\d{4}-\d{2}-\d{2})/)[1];

        el.insertAdjacentHTML('beforeend', buildAddNewTaskNode({ day }));
        el.setAttribute(ALREADY_OBSERVED_ATTRIBUTE, 'true');
    });
}

const observer = new MutationObserver(addNewTaskNode);
observer.observe($('#weekview'), {
  childList: true,
  subtree: true,
});

// DEFAULT TO "WEEK VIEW"
$('#showWeek').click();
