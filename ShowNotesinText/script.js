/*
 * Positions elem relative to anchor as said in position.
 * Both elements: elem and anchor must be in the document
 */

function positionAt(anchor, position, elem) {
  let coords = anchor.getBoundingClientRect();
  if (position == 'top') {
    elem.style.top = (coords.top - elem.offsetHeight) +'px';
    elem.style.left = coords.left +'px';
  }
  else if (position == 'right') {
    elem.style.top = (coords.top) +'px';
    elem.style.left = (coords.left+ anchor.offsetWidth) +'px';
  }
  else if (position == 'bottom') {
    elem.style.top= (coords.bottom) +'px';
    elem.style.left = (coords.left) +'px';
  }
}

/*
 * Shows a note with the given html at the given position
 * relative to the anchor element.
 */
function showNote(anchor, position, html) {

  let note = document.createElement('div');
  note.className = "note";
  note.innerHTML = html;
  document.body.append(note);

  positionAt(anchor, position, note);
}

// test
let blockquote = document.querySelector('blockquote');

showNote(blockquote, "top", "note above");
showNote(blockquote, "right", "note at the right");
showNote(blockquote, "bottom", "note below");