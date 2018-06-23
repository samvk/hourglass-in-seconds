const $ = (...args) => document.querySelector(...args);

$('#yes-select-button').click(); // Capitalize button
$('#yes-int-select-button').click(); // International button

$('#time').value = '8';
$('#time-units > [value="h"]').selected = true;

$('#details').value = 'Development for Konica Minolta MarketPlace 2.x';

$('#activity-button').click();
