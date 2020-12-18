// general functions

// updating the visual of the page according to the presence of tasks in tasks_list
function updateList(list) {
    let section = document.getElementById("section");
    let footer = document.querySelector('footer');

    // if the list has at least one task, remove h2 & h3
    if (list.children.length > 1) {

        // hiding the part up to the input bar & making the list appears
        section.querySelector('h2').classList.add("close");
        section.querySelector('h3').classList.add("close");
        list.classList.remove("close");

        // hiding the footer to be more visible
        footer.classList.add('close');
        return;
    }

    // if list is empty, it disappears, the titles & the footer come back
    list.classList.add("close");
    section.querySelector('h2').classList.remove("close");
    section.querySelector('h3').classList.remove("close");
    footer.classList.remove('close');
}

// creating the element for the new task
function createTask(title) {
    let task = document.createElement('div');
    task.id = 'task';
    let task_name = document.createElement('p');
    task_name.innerHTML = title; // adding the title of the task to our element p

    task.append(task_name);

    // adding the buttons check, edit and delete
    task.insertAdjacentHTML('beforeend', '<div id="button_wrapper"><img src="Images/check.png" alt="check" title="check the task"><img src="Images/edit.png" alt="edit" title="edit the task"> <img src="Images/delete.png" alt="delete" title="delete the task"></div>');

    task_list.append(task);

    // handling click on the button wrapper of the current task
    let task_buttons = task.querySelector("div");

    task_buttons.addEventListener ('click', function(event) {
        let button = event.target.closest('img');

        // if we don't click on buttons, return
        if (!button) return;

        // 3 possible buttons : check, edit, delete

        // button check
        if (button == task_buttons.children[0]) {
            task_buttons.parentElement.remove();
            // the modal windows opens
            document.getElementById('modal_container').style.display = "flex";

            // making the page unsrollable
            document.querySelector('body').style.overflow = "hidden";
        }

        // button edit
        else if (button == task_buttons.children[1]) {
            task_name.setAttribute("contenteditable","true");
            task_name.focus(); // force the focus
        }

        // button delete
        else if (button == task_buttons.children[2]) task_buttons.parentElement.remove();

        // checking if there is still tasks in the list, otherwise adapt the visual
        updateList(task_list);

    });

    // checking if there is still tasks in the list, otherwise adapt the visual
    updateList(task_list);

}

// Handling events on page elements

// Input bar

let input_bar = document.getElementById('input_bar');
let addButton = document.getElementById('add_tasks');
let task_list = document.getElementById('tasks_list');



// handling click event on button Add task
addButton.addEventListener("click", function() {
    // getting the title of the task
    let title = input_bar.value;

    // if the title is empty
    if (title == "") {
        alert ("Oh, Silly! You need a name for your task :o");
        input_bar.focus();
        return
    }

    // if the title is complete
    createTask(title);
    // reinitializing the input bar
    input_bar.value = "";
});

// handling input on input_bar
input_bar.addEventListener("keydown", function(event) {
     if (event.key != "Enter") return;

    // getting the title of the task
    let title = input_bar.value;

    // if the title is empty
    if (title == "") {
        alert ("Oh, Silly! You need a name for your task :o");
        return
    }

    // if the title is complete
    createTask(title);
    // reinitializing the input bar
    input_bar.value = "";
});

// assuring the data storage : the task title appears in input bar if we have began to write
input_bar.value = localStorage.getItem('title');
// for each new input letter, we store it in localStorage.
input_bar.addEventListener("input", function() {
    localStorage.setItem('title',input_bar.value);
});


// Button Clear tasks
// handling click event on clear_tasks
let clearButton = document.getElementById('clear_tasks');


clearButton.addEventListener("click", function() {
    // getting the tasks in the list
    let tasks = task_list.querySelectorAll('div');

    // removing the tasks one by one
    for (let task of tasks) {
        task.remove();
    }

    updateList(task_list);
});


// Modal with rewarding GIF
// handling events when we have the modal on page
let modal_container = document.getElementById('modal_container');

modal_container.addEventListener("click", function(event) {
    let target = event.target;

    if (target.id != "modal_container") return;

    if (modal_container.style.display == "flex") modal_container.style.display = "";
    updateList(task_list);
});

let buttonClose = document.getElementById('modal').querySelector('button');

// removing the modal_container if we click on the button
buttonClose.addEventListener('click', function() {
    modal_container.style.display = "";
    updateList(task_list);
});


// Task Name editing process
// handling events when we are editing a task name

// when the task name is focus, we can edit it
task_list.addEventListener("click", function(event) {
    let target = event.target;

    if (target.tagName != "P") return;

    // if the task name has been clicked on
    target.setAttribute("contenteditable","true"); // task name is now editable
    target.focus();

    // when the task name is edited, and we click elsewhere
    target.addEventListener("blur", function() {

        // if the title is empty, we will delete the whole line of the task
        if (target.textContent == "") {
                target.parentElement.remove(); //todo ideally just alert the user (but if we click on ok on the alert it's an infinite loop)
        }
        // else we make the task non editable again
        else {
            target.setAttribute("contenteditable","");
            target.blur();
        }

        updateList(task_list);

    });

    // if the task name is edited, and we press Enter key
    target.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            // if the title is empty, we will delete the whole line of the task
            if (target.textContent == "") {
                    target.parentElement.remove(); //todo ideally just alert the user (but if we click on ok on the alert it's an infinite loop)
            }
            // else we make the task non editable again
            else {
                target.setAttribute("contenteditable","");
                target.blur();
            }
        }

        updateList(task_list);

    });

});


/* todo
cleaner le code et voir les var inutiles
possibilité de déplacer les tâches les ordonner
penser au local storage : de la tâche en input, et des tâches elles mêmes dans task list
ajouter une sorde de % des tâches déjà réalisées avec un niveau ..?
possibilité de rentrer une date .. ?
*/

