// collect all the li elements in animals
let animals = document.querySelectorAll('li');

// for elements inside each li bloc
for (let animal of animals) {
    // access the text inside the first text element
    let title = animal.firstChild.data;

    // get rid of /n
    title = title.trim();

    // show :" title: number of li elements inside the li bloc"
    alert(title +': '+animal.getElementsByTagName('li').length);
}