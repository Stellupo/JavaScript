// creating the tooltips windows

let tooltipElem = document.createElement('p');
tooltipElem.hidden = true;
tooltipElem.className = ('tooltip');

// handling the mouse movement over the buttons

document.addEventListener('mouseover',function(event) {

    let button = event.target;
    let tooltipText = button.dataset.tooltip;
    if (!tooltipText) return;

    // completing tooltip
    tooltipElem.innerHTML = tooltipText;
    tooltipElem.hidden = false;
    document.body.append(tooltipElem);

    // defining the tooltip coordinates : top-center relatively to the button
    let coords = button.getBoundingClientRect();
    let top = coords.top - tooltipElem.offsetHeight - 5;
    let left = coords.left + button.offsetWidth/2 - tooltipElem.offsetWidth/2;

    // limiting the top & left window borders
    if (left <0) left = 0; // if crossing the left edge
    if (top <0) top = coords.top + button.offsetHeight + 5; // if crossing the top window edge, show below instead

    tooltipElem.style.top = top + 'px';
    tooltipElem.style.left = left + 'px';
});

document.addEventListener('mouseout', function(event) {

    let tooltipText = event.target.dataset.tooltip;
    if (!tooltipText) return;

    tooltipElem.hidden = true;
});