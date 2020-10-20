function loadCharlie() {
    document.getElementById('Charlie').src = "Charlie.png"
}

function moveCharlie() {
    alert('Woohoo, you win! You found Charlie!');
    let picture = document.getElementById('Charlie');
    let x = Math.random() * 300;
    let y = Math.random() * 300;
    picture.style.left = x + 'px';
    picture.style.top = y + 'px';
}