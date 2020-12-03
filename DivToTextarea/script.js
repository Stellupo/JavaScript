let view = document.getElementById('view'); // stock div into variable because it will be removed from the DOM with a click

//creating textarea bloc
let text = document.createElement('textarea');
text.classList.add('edit');
text.value = view.innerHTML; // save previous div text content, avoid deleting all texts in the box everytime we click on it

// adding events handlers to text

// when the textarea bloc is no longer focused, textarea turns back into div
text.onblur = function() {
   view.innerHTML = text.value;
   text.replaceWith(view);
};

// when the key Enter is pressed, blur event is triggered
text.onkeydown = function(event) {
    if (event.key == 'Enter') text.blur();
};

//adding click event handler to div, div transforms into textarea
view.onclick = function() {

   view.replaceWith(text);
   text.focus();

};
