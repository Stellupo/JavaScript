let mouse = document.getElementById('mouse');
mouse.style.position = "absolute"; // make the mouse 'moveable'

mouse.onclick = function(event) {
    let target = event.target.closest('pre');
    // make mouse supporting focus() and blur() methods

    if (!target) return;

    target.tabIndex = "0";
    // stay focus on mouse unless we call .blur() by clicking somewhere else
    target.focus();
};

mouse.onkeydown = function(event) {
    // using coords instead of mouse.style += since it's a string and we would need to convert it everytime we move
    let coords = mouse.getBoundingClientRect();

    // calculating new position of mouse according to the key
    if (event.key == "ArrowUp") mouse.style.top =  (coords.top - mouse.clientHeight)+ 'px';
    else if (event.key == "ArrowDown") mouse.style.top = (coords.top + mouse.clientHeight)  + 'px';
    else if (event.key == "ArrowRight") mouse.style.left = (coords.right + mouse.clientWidth) + 'px';
    else if (event.key == "ArrowLeft") mouse.style.left = (coords.left - mouse.clientWidth) + 'px';
};



