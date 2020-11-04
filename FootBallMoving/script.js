function GetCoordinates (event) {
    // getting window-relative coordinates of the field (since we don't want the movements of the ball to consider the scrolling part)
    let coords = document.getElementById('field').getBoundingClientRect();


    let ball = document.getElementById('ball');

    // calculating coordinates of the ball
    let BallTop = (event.clientY - coords.top - field.clientTop - ball.offsetHeight/2);
    let BallLeft = (event.clientX - coords.left - field.clientLeft - ball.offsetWidth/2);

    // limiting the top & left field borders
    if (BallTop < 0) BallTop = 0;
    if (BallLeft <0) BallLeft = 0;

    // limiting the right & bottom field borders
    if (BallLeft > (field.clientWidth - ball.offsetWidth)) BallLeft = (field.clientWidth - ball.offsetWidth);
    if (BallTop > (field.clientHeight - ball.offsetWidth)) BallTop = (field.clientHeight - ball.offsetHeight);

    // attributing the values of the calculated coordinates to the ball
    ball.style.top =  BallTop + 'px';
    ball.style.left = BallLeft + 'px';
}

//adding mouse-event handler to field
field.addEventListener("click", GetCoordinates);