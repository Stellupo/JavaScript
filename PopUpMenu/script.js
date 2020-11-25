// moving all text into <span>

let lis = document.querySelectorAll('ul > li');

for (let li of lis) {
    let span = document.createElement('span');
    li.prepend(span);
    let text = span.nextSibling;
    span.append(text);
};

// handling the click on any element of the tree
let tree = document.getElementById('tree');

tree.addEventListener('click', function(event) {

    // If there is a click outside the node title, impossible to deploy/hide node sub-titles : nothing happens
    if (event.target.tagName != 'SPAN') return;

    let title = event.target.closest('li').children[1];
    // If the li has no child except span
    if (!title) return;
    title.classList.toggle("close");
});
