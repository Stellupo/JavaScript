// global variable declarations
let table = document.getElementById('bagua-table');
let editingState;
let text;
let actualCell;

// adding one click event handler to our table
table.onclick = function(event) {
    // target can be a cell, a ready-to-edit cell or a button
    let target = event.target;
    let td = target.closest('td');

    if (!table.contains(target)) return;

    // if we click on buttons OK or CANCEL when editing
    if (target.parentNode.className == "buttonLine") {
        editingState = "off";
        checkState(actualCell,target.parentNode.previousSibling);
    }
    // if we click on a cell
    else if (td) {
        // if we are already editing a cell, we can't click on another one
        if (editingState == "on") return;

        // if we click on a new cell, we can edit it
        editingState = "on";
        editingCell(td);
    };
}

function checkState(td, text) {
    // if editing mode on, textarea can be edited
    if (editingState == "on") {
        return;
    }
    // if buttons have been clicked, textarea can't be edited anymore
    else if (editingState == "off") {
        if (event.target.innerHTML == "OK") {
            td.innerHTML = text.value;
        }
        text.replaceWith(td);
        event.target.parentNode.remove();
    };
}

function editingCell(td) {

    // creating textarea
    text = document.createElement('textarea');
    text.style.width = td.clientWidth + 'px';
    text.style.height = td.clientHeight + 'px';
    text.className = "edit";
    text.value = td.innerHTML;

    // creating buttons when editing mode on
    let buttonLine = document.createElement('div');
    buttonLine.className = "buttonLine";
    buttonLine.insertAdjacentHTML('beforeEnd','<button class="button" id="buttonOk" type="button">OK</button><button class="button"id="buttonCancel" type="button">CANCEL</button>');

    // edit mode on the cell
    td.replaceWith(text);

    // buttons appears & focus on textarea cell to edit
    text.after(buttonLine);
    text.focus();

    // saving td info in actualCell to use later when we leave the editing mode by clicking on buttons
    actualCell = td;
}
