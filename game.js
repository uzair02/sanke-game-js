const restart = document.getElementById('restart');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasize = 23;

let score = 0;


let snake = [];

snake[0] = {
    x: Math.floor((canvasize / 2)) * box,
    y: Math.floor((canvasize / 2)) * box
}

let dir;
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 65 && dir != 'RIGHT') {
        dir = 'LEFT';
    }
    if (event.keyCode == 87 && dir != 'DOWN') {
        dir = 'UP';
    }
    if (event.keyCode == 68 && dir != 'LEFT') {
        dir = 'RIGHT';
    }
    if (event.keyCode == 83 && dir != 'UP') {
        dir = 'DOWN';
    }
}

let food = {
    x: Math.floor(1 + (Math.random() * (canvasize - 1))) * box,
    y: Math.floor(1 + (Math.random() * (canvasize - 1))) * box,
}
function draw() {
    ctx.fillStyle = '#29ab87';
    ctx.fillRect(box, box, canvasize * box - box, canvasize * box - box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#7D3C98 ';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir == "LEFT") {
        snakeX -= box;
    }
    if (dir == "RIGHT") {
        snakeX += box;
    }
    if (dir == "UP") {
        snakeY -= box;
    }
    if (dir == "DOWN") {
        snakeY += box;
    }

    if (snakeX == food.x && snakeY == food.y) {
        score += 1;
        food = {
            x: Math.floor(1 + (Math.random() * (canvasize - 1))) * box,
            y: Math.floor(1 + (Math.random() * (canvasize - 1))) * box,
        }
    } else {
        snake.pop();
    }

    let newhead = {
        x: snakeX,
        y: snakeY
    };


    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }
    if (snakeX < box || snakeY < box || snakeX > (canvasize - 1) * box || snakeY > (canvasize - 1) * box || collision(newhead, snake)) {
        clearInterval(game);
    }
    snake.unshift(newhead);

    ctx.fillStyle = '#d4af37';
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = 'white';
    ctx.font = '24px chenga one';
    ctx.clearRect(0, 0, 50, 25);
    ctx.fillText(score, box, 0.8 * box);

}
let game = setInterval(draw, 100);

restart.addEventListener("click", rstrt);

function rstrt() {
    window.location.reload();
}