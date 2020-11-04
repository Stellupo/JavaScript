
// creating each button for each div bloc
let divs = document.getElementsByClassName('pane');

for(let div of divs) {

// creating the button inside div
div.insertAdjacentHTML('afterbegin','<button class="remove-button">[x]</button>');

// consequence of clicking on the created button
let buttonClone = div.getElementsByClassName('remove-button')[0];

buttonClone.onclick = function() {
// adding the class="close" to pane, the style will automatically being applied
    div.classList.toggle("close");
}
}