//adding the arrows buttons before and after the gallery bloc
let carousel = document.getElementById('carousel');

carousel.insertAdjacentHTML('afterbegin', '<button class="arrow" style="left: 7px;">⇦</button>');
carousel.insertAdjacentHTML('beforeend', '<button class="arrow" style="right: 7px;">⇨</button>');

// defining the configuration of the carousel
let img = document.querySelector('img');
let width = parseInt(getComputedStyle(img).width); // image width
let position = 0; // ribbon (=all images bloc inline) scroll position
let count = 3; // visible images count


// defining the on-click events for each arrow
let arrows= document.body.getElementsByClassName('arrow');
let ul = document.querySelector('ul');

// first arrow ⇦, shifting to the left
arrows[0].onclick = function() {
    position += width * count;

    // ribbon shift to the left at the minimum value, position = 0
    position = Math.min(position, 0); // between one negative number and 0, we choose the furthest to 0
    ul.style.transform = `translateX(${position}px)`;
 };

// second arrow ⇨, shifting to the right
arrows[1].onclick = function() {
    position -= width * count;

    // ribbon shift to the right until reaching (total ribbon length - minimum visible image) images
    position = Math.max(position, - width * (ul.querySelectorAll('li').length - 1)); // between 2 negatives number we choose the closest to zero
    ul.style.transform = `translateX(${position}px)`;
 }