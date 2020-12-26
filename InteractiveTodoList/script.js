// general functions

// updating the visual of the page according to the presence of tasks in tasks_list
function updateList(list) {

    // updating the data storage everytime the tasks list been updated
    localStorage.setItem('tasksList',list.innerHTML);

    let section = document.getElementById("section");
    let footer = document.querySelector('footer');
    let list_footer = document.getElementById('list_footer');

    // if the list has at least one task, remove h2 & h3
    if (list.children.length > 1) {

        // hiding the part up to the input bar & making the list appears
        section.querySelector('h2').classList.add("close");
        section.querySelector('h3').classList.add("close");
        list.classList.remove("close");
        list_footer.classList = "open"; //to do probleme avec l'attribut

        // hiding the footer to be more visible
        footer.classList.add('close');
        return;
    }

    // if list is empty, it disappears, the titles & the footer come back
    list.classList.add("close");
    list_footer.classList ="close";
    section.querySelector('h2').classList.remove("close");
    section.querySelector('h3').classList.remove("close");
    footer.classList.remove('close');
}

// creating the element for the new task
function createTask(title, task_completed) {
    let task = document.createElement('div');
    task.id = 'task';
    let task_name = document.createElement('p');
    task_name.innerHTML = title; // adding the title of the task to our element p

    task.append(task_name);

    // adding the buttons check, edit and delete
    task.insertAdjacentHTML('beforeend', '<div id="button_wrapper"><img src="Images/check.png" alt="check" title="check the task"><img src="Images/edit.png" alt="edit" title="edit the task"> <img src="Images/delete.png" alt="delete" title="delete the task"></div>');

    task_list.append(task);

    // checking if there is still tasks in the list, otherwise adapt the visual
    updateList(task_list);
    // updating the progression bar with the new task
    updateProgressionBar (task_completed);
}


function editTask (task, task_completed) {
   // if the task name has been clicked on
    task.setAttribute("contenteditable","true"); // task name is now editable
    task.focus();

    // if the task name is edited, and we click elsewhere
    task.addEventListener("blur", function() {

        // if the title is empty, we will delete the whole line of the task
        if (task.textContent == "") {
                task.parentElement.remove();
                updateProgressionBar (task_completed);
        }
        // else we make the task non editable again
        else {
            task.setAttribute("contenteditable","");
            task.blur();
        }

        // update the progression bar in case we delete the task
        updateProgressionBar (task_completed);
        // // update the list in case we delete the task
        updateList(task_list);

    });

    // if the task name is edited, and we press Enter key
    task.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            // if the title is empty, we will delete the whole line of the task
            if (task.textContent == "") {
                    task.parentElement.remove();
            }
            // else we make the task non editable again
            else {
                task.setAttribute("contenteditable","");
                task.blur();
            }

            // update the progression bar in case we delete the task
            updateProgressionBar (task_completed);
            // // update the list in case we delete the task
            updateList(task_list);

        }
    });

}

function updateProgressionBar (task_completed) {

    let progression_bar = document.getElementById('progress');
    let tasks = task_list.querySelectorAll('#task');

      /* if we already have a value stored in our storage data, it means we have complete one task.
    Either, we still have tasks to complete and so we keep in mind the one we already have completed.
    Either, we have completed them all, and do we don't need to keep it and we reinitialized the data.
    We have only two possible values for task_completed : 1 or 0.
    So if we have a value in our progression_bar, it means one task had been completed previously.
    */

    // if we clear all the tasks or complete them all, let's lose the score
    if (progression_bar.value == 100) {
        task_completed = 0;
        progression_bar.value = 0;
    }
    // else if a task has been completed and we still have tasks to complete
    else if (progression_bar.value > 0 && progression_bar.value < 100 ) {
        task_completed = 1;
        progression_bar.value = 0;
    }

    // else calculate a new one
    progression_bar.value =  (task_completed / (tasks.length+1)) * 100;
    // updating the data storage everytime the progression bar is updated
    localStorage.setItem('taskCompleted',progression_bar.value);
}


// initialization functions

function initData(task_list, progression_bar, input_bar) {
    // initializing datas from localStorage if we have some storage
    if (localStorage.hasOwnProperty('tasksList')) { // if we do have tasks saved in data storage
        task_list.innerHTML = localStorage.getItem('tasksList');
        updateList(task_list);

        // if we do have completed tasks saved in data storage and we have not already completed them all, show the progression in the bar
        if (localStorage.hasOwnProperty('taskCompleted') && localStorage.getItem('taskCompleted') != "100") {
            let previous_calculation = Number(localStorage.getItem('taskCompleted'));
            progression_bar.value = previous_calculation;

            // updating the data storage everytime the progression bar is updated
            localStorage.setItem('taskCompleted',previous_calculation);
        }
    }

    // initializing the task title in input bar if we have began to write it before the relaunch
    input_bar.value = localStorage.getItem('title');
}

function initAddButton(addButton, input_bar, task_completed) {
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
        createTask(title, task_completed);
        // reinitializing the input bar
        input_bar.value = "";
    });
}

function initInputBar(input_bar, task_completed) {
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
        createTask(title, task_completed);
        // reinitializing the input bar
        input_bar.value = "";
    });

    // handling data storage : for each new input letter, we store it in localStorage.
    input_bar.addEventListener("input", function() {
        localStorage.setItem('title',input_bar.value);
    });

}

function initTaskList(task_list,task_completed) {
    // Tasks List
    // handling events when we are clicking on an element of tasks list

    task_list.addEventListener("click", function(event) {
        let target = event.target;
        let div = target.closest('div');

        // if we have clicked on the task name
        if (div.id == "task") {
            editTask(target.closest('p'),task_completed);   // task name editing function
            updateList(task_list);
        }

        // else if we have clicked on one of the buttons
        else if (div.id == "button_wrapper") {

            let button = target.closest('img');
            let task = target.closest('#task')
            let task_buttons = target.closest('#button_wrapper');

            // if we don't click on buttons, return
            if (!button) return;

            // 3 possible buttons : check, edit, delete

            // button check
            if (button == task_buttons.children[0]) {
                task_buttons.parentElement.remove();
                // everytime we click on complete, we change the value of the task_completed to 1
                task_completed = 1;
                // the modal windows opens
                document.getElementById('modal_container').style.display = "flex";
            }

            // button edit
            else if (button == task_buttons.children[1]) {
                editTask(div.previousElementSibling, task_completed);
            }

            // button delete
            else if (button == task_buttons.children[2]) task_buttons.parentElement.remove();


            updateProgressionBar (task_completed);
            // checking if there is still tasks in the list, otherwise adapt the visual
            updateList(task_list);

        }
    });
}


function initModal(task_list) {
    // Modal with rewarding GIF
    // handling events when we have the modal on page
    let modal_container = document.getElementById('modal_container');

    modal_container.addEventListener("click", function(event) {
        let target = event.target;

        if (target.id != "modal_container") return;

        if (modal_container.style.display == "flex") {
            modal_container.style.display = "";
        }
        updateList(task_list);
    });

    let buttonClose = document.getElementById('modal').querySelector('button');

    // removing the modal_container if we click on the button
    buttonClose.addEventListener('click', function() {
        modal_container.style.display = "";
        updateList(task_list);
    });
}

function initListFooter(task_completed, progression_bar) {
    // Tasks list footer
    let list_footer = document.getElementById('list_footer');

    list_footer.addEventListener("click", function(event) {
        let target = event.target;
        let div = target.closest('div');
        // else if we have clicked on clear task button
        if (target.id == ('clear_tasks')) {
            // getting the tasks in the list
            let tasks = task_list.querySelectorAll('div');

            // removing the tasks one by one
            for (let task of tasks) {
                task.remove();
            };

        task_completed = 0;
        progression_bar.value = 0
        updateList(task_list);

        }
    });
}

// Input bar

let input_bar = document.getElementById('input_bar');
let addButton = document.getElementById('add_tasks');
let task_list = document.getElementById('tasks_list');
let progression_bar = document.getElementById('progress');
let task_completed = 0;
//localStorage.clear();

// Initiate Data from data storage
initData(task_list, progression_bar, input_bar);

// Handling events on page elements
initAddButton(addButton, input_bar, task_completed);
initInputBar(input_bar, task_completed);
initTaskList(task_list,task_completed);
initModal(task_list);
initListFooter(task_completed, progression_bar);
