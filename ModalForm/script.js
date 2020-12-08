// defining the main function
function showPrompt(html, callback) {
    let form = document.getElementById('prompt-form');
    let message = form.querySelector('div');
    let container = document.getElementById('prompt-form-container');
    let text = form.querySelector('input');

    // adding event handlers

    // click on document body handled only when the prompt bloc appears
    document.body.addEventListener("click", function(event) {
        let target = event.target;

        // if we press the button "Click to show...", nothing happens
        if (target.id == "show-button") return;

        //if we click on the body but the prompt bloc is gone, nothing happens
        if (container.style.display == "none") return;

        // if we click inside the prompt bloc, nothing happens
        if (form.contains(target)) return;

        alert('You have to do something with the prompt !');
        text.focus();
        });

    // submit the form
    form.addEventListener("submit", function() {

        // if text.value is not empty, call callback
        if (text.value) callback(text.value);
        container.style.display = "none";
    });

    // click on "Cancel"
    form.addEventListener("click", function(event) {
        if (event.target.value == "Cancel" ) {
            callback(null);
            container.style.display = "none";
            document.body.style.backgroundColor = "";
        }
    });

    // press Escape key
    form.addEventListener("keydown", function(event) {
        if (event.key == "Escape") {
            callback(null);
            container.style.display = "none";
            document.body.style.backgroundColor = "";
        }
    });

    // shift the focus between form fields with Tab, don’t allow it to leave for other page elements
    let lastInput = form.lastElementChild;
    let firstInput = form.querySelector('input');

    lastInput.addEventListener("keydown", function(event) {
        if (event.key == 'Tab') {
            firstInput.focus();
            event.preventDefault(); //avoid shifting focus between buttons only
        }
    });

    // adding the message to the prompt box
    message.innerHTML = html;

    // making the prompt box appearing
    container.style.display = "block";

    // focusing on the input box
    text.value = ""; // reinitializing the text everytime we open the form, otherwise it will show the previous input
    text.focus();

    // making the background looking unreachable
    container.style.backgroundColor = "rgba(0,0,0,0.4)";
    /* need rgba here to indicates the transparency
    of the background-color and not the element itself */
};

 /calling the function
 document.getElementById('show-button').onclick = function() {
    showPrompt("Hey enter something please!", function (value) {
        alert("You entered: " + value);
 });
};