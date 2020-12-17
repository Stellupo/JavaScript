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
    task.insertAdjacentHTML('beforeend', '<div id="button_wrapper"><img src="Images/check.png" alt="check"><img src="Images/edit.png" alt="edit"> <img src="Images/delete.png" alt="delete"></div>');

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
            document.getElementById('modal_container').style.display = "flex";
            // making the page unsrollable
            document.querySelector('body').style.overflow = "hidden"; // todo add a cross to close the modal
        }

        // button edit
        else if (button == task_buttons.children[1]) {
             //to do mettre un modal ici, l'importer ..? pour avoir un GIF qui nous félicite
        }

        // button delete
        else if (button == task_buttons.children[2]) task_buttons.parentElement.remove();

        // checking if there is still tasks in the list, otherwise adapt the visual
        updateList(task_list);
    });


}


// handling click event on input_bar
let input_bar = document.getElementById('input_bar');
let addButton = document.getElementById('add_tasks');
let task_list = document.getElementById('tasks_list');


addButton.addEventListener("click", function() {
    // getting the title of the task
    let title = input_bar.value;

    // if the title is empty
    if (title == "") {
        alert ("Oh, Silly! You need a name for your task :o");
        return
    }

    // if the title is complete
    createTask(title);
    updateList(task_list);
});

// handling click event on clear_tasks
let clearButton = document.getElementById('clear_tasks');

clearButton.addEventListener("click", function() {
    // getting the tasks in the list
    let tasks = tasks_list.querySelectorAll('div');

    // removing the tasks one by one
    for (let task of tasks) {
        task.remove();
    }

    updateList(task_list);
});

// handling events when we have the modal on page
let modal_container = document.getElementById('modal_container');

modal_container.addEventListener("click", function(event) {
    let target = event.target;

    if (target.id != "modal_container") return;

    if (modal_container.style.display == "flex") modal_container.style.display = "";
});




/* todo
penser au local storage
completer la tâche
pouvoir la suppr - done
modifier la tache
feliciter quand tâche est complétée
ajouter une sorde de % des tâches déjà réalisées avec un niveau ..?
possibilité de rentrer une date .. ?


creer une tache et shooter la partie haute h2 et h3 dans section - done
faire le style du div tasks list - done
alerter quand on essaie d'ajouter une tâche vide  - done
changer la phrase what to : en " Here is what I want to be done" - done

*/

