// handling the click on the thumbnail

thumbs.onclick = function(event) {

  let target = event.target.closest('a');

  if (!target) return;

  // avoiding the opening of the image in the window
  event.preventDefault();

  // change src of #largeImg to the href of the thumbnail
  largeImg.src = target.href;
  largeImg.alt = target.title;

}

