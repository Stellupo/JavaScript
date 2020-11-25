// handling the click on any element of the thead
document.addEventListener('click', function (event) {
let type = event.target.dataset.type;

// If the click is not made on Age or Name
if (!type) return;

// If the click is made on Age or Name
if (type == "number" || type=="string") {
    sorted(type);
}
});

// sorted function
function sorted(type) {
let table = document.getElementById('grid');

// all the tr nodes inside tbody of the table
let trs = table.tBodies[0].rows;

// creating an array from the tr nodes
let arr =  Array.from(trs);

// sorting the array according to the numeric order/ alphabetical order according to type
if (type == "number") {
    arr.sort(function(rowA, rowB) {return (rowA.cells[0].innerHTML - rowB.cells[0].innerHTML)});
  }
else if (type == "string") {
     arr.sort((rowA, rowB) => rowA.cells[1].innerHTML.localeCompare(rowB.cells[1].innerHTML));
  }

  // inserting the nodes in the correct order, no need to remove the old ones, it is automatically done
  for (let node of arr) {
      table.tBodies[0].append(node);
  }
};