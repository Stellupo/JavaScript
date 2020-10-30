/*
 * Positions elem relative to anchor as said in position.
 * Both elements: elem and anchor must be in the document
 */

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

function positionAt(anchor, position, elem) {
  let coords = getCoords(anchor);
  if (position == 'top-out') {
    elem.style.top = (coords.top - elem.offsetHeight) +'px';
    elem.style.left = coords.left +'px';
  }
  else if (position == 'right-out') {
    elem.style.top = (coords.top) +'px';
    elem.style.left = (coords.left + anchor.offsetWidth) +'px';
  }
  else if (position == 'bottom-out') {
    elem.style.top= (coords.bottom) +'px';
    elem.style.left = (coords.left) +'px';
  }
  else if (position == 'top-in') {
    elem.style.top= (coords.top) +'px';
    elem.style.left = (coords.left) +'px';
  }
  else if (position == 'right-in') {
    elem.style.top = (coords.top) +'px';
    elem.style.left = (coords.right - elem.offsetWidth) +'px';
  }
  else if (position == 'bottom-in') {
    elem.style.top= (coords.bottom - elem.offsetHeight) +'px';
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

showNote(blockquote, "top-out", "note top-out");
showNote(blockquote, "bottom-out", "note bottom-out");
showNote(blockquote, "right-out", "note right-out");
showNote(blockquote, "top-in", "note top-in");
showNote(blockquote, "bottom-in", "note bottom-in");
showNote(blockquote, "right-in", "note right-in");