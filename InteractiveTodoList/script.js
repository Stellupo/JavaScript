/*class Task {
  constructor() {
    this.template = template;
  }
    let Task = {
    text :,
    checked: ,
    id:,};
  render() {
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
  }
}

let array =
*/

// checking if the tasks list is empty
function listUpdate(list) {
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
    list.classList.toggle("close");
    section.querySelector('h2').classList.toggle("close");
    section.querySelector('h3').classList.toggle("close");
    footer.classList.toggle('close');
}


// handling click event on input_bar
let input_bar = document.getElementById('input_bar');
let addButton = document.getElementById('add_tasks');
let task_list = document.getElementById('tasks_list');


addButton.addEventListener("click", function() {
    // getting the title of the task
    let title = input_bar.value;

    // if the title is empty
    if (title == "") alert ("Oh, Silly! You need a name for your task :o");

    // if the title is complete
    let task = document.createElement('p');
    task.innerHTML = title; // adding the title of the task to our element p
    task_list.append(task);
    listUpdate(task_list);
});

// handling click event on clear_tasks
let clearButton = document.getElementById('clear_tasks');

clearButton.addEventListener("click", function() {
    // getting the tasks in the list
    let tasks = tasks_list.querySelectorAll('p');

    // removing the tasks one by one
    for (let task of tasks) {
        task.remove();
    }

    listUpdate(task_list);
});


/* todo
creer une tache et shooter la partie haute h2 et h3 dans section
faire le style du div tasks list
penser au local storage
pouvoir la suppr
modifier la tache
alerter quand on essaie d'ajouter une tâche vite
feliciter quand tâche est complétée
changer la phrase what to : en " Here is what I want to be done"
*/

