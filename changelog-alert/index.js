const changelogUrl = 'https://github.com/samvk/hourglass-in-seconds/blob/master/CHANGELOG.md';

const alertIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAn1BMVEUAAAAAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtYAwtZy+P2yAAAANHRSTlMADfQR+b5E5Xyhmms4GAmLVE81L+vKwqWIgCoE7tW5ZExIIR2vPiXOq4NwWODaxrORdV6yaOUrugAAAppJREFUSMfN1udyqkAYBuCXJk0s2Hs3GpMYk/f+r+0ACyKygjJzZvL8ymZm3f3Kfor/bGEuUJWnk++VDyZ5QUVv5CcqWpFsoaItOUdFHZJjVDQiv5Ha7VHidOj1ncU6DtlsZD7KR6E+ha9auNKUbNUMFGnyqpeNtsbACEVM3hjcnOuTZb22YUhVKegrxNbhv9ootGZgNoHfjPcPIcxI7lBMUZm0haszZEzizd39E718bWbFYOjDCxf70QalhmRaTVdkYI+nNDBmoHlNwQdDdTyjvsOc5FS565kOMiaQWQ5QE0dfnRnoekhpNo8N2cn0sL27qMOAqV3XRwaO0s1N7KNSB4v2wBiGe+yoV5MmFS34jbw2uYHFgAP0GKgB4i72TfXe2rJrX8gzMBdtrESp9pOsXZJCOmtIHcgvwFPFmd6U0RpaN055m7rVeFTmroimFT2KMdbTeAwtk7A32uMhQvIEQIQ93cAzyfq18VwUiIIVFbWj6m6gTSmuOYt7Ry6+3BbCILp5HeNWPPvS3pH7JLlKJ3bodJtLqo8j/g4rmC5/mRlau8KoF6I+qQFD/eS0XlQ3uZV4PvlJqp9uXroHmRqZT4nLSM+/LmqQNzWZT8neZGT27msHBn7kRYo5yBowo/3wzpR9dkvljfyb8LuU757UFx5w0ZmwZV+kGVa88+eskt1d8Nd7HLqBPIdZvQ6gjJLrTi0N8C1n4LQhceS9/jE+S3/b9g23+EHI6fZSQZnJmRLymSErVZ6h4EkH3hvhaYrJrBZe0GHGCrD6ww2eVL879zeKu9VAx3JWKKPNmFgCBgXVFJ1VykpfjvF6ChR3/vkx79y/wxd/f47tgoPL1btMuXjRxL55oq+r6clMrKLhiOFRUWdou/iD/gEOIbARBWT4PwAAAABJRU5ErkJggg==';

// "What's new?" popup
const latestVersion = chrome.runtime.getManifest().version;

const $popupNode = `<a
    class="changelog-alert changelog-alert--hidden"
    href="${changelogUrl}"
    target="_blank"
    title="What's new?"
>
    <img src="${alertIcon}" alt="View Changelog">
</a>`;

document.body.insertAdjacentHTML('beforeend', $popupNode);

const $changelogAlert = $('.changelog-alert');

$changelogAlert.addEventListener('mouseup', ({ target: el }) => {
    $changelogAlert.classList.add('changelog-alert--hidden');
    storage.set({ version: latestVersion });
});

function handleVersionBump(storedVersion = '0.0.0') {
    const [ major, minor ] = latestVersion.split('.');
    const [ storedMajor, storedMinor ] = storedVersion.split('.');

    if ((major > storedMajor) || (minor > storedMinor)) {
        $changelogAlert.classList.remove('changelog-alert--hidden');
    }
}

storage.get(['version'], ({ version: storedVersion }) => handleVersionBump(storedVersion));
