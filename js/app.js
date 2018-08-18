
// Number of columns (not including water)
const NUM_COLS = 5;
// Number of rows
const NUM_ROWS = 5;
// Column pixel width
const COL_SIZE = 101;
// Row pixel height
const ROW_SIZE = 83;

// start offset for row0
const ROW_START = 65;

// Left and right offset offset of canvas where the enemy can start
// The enemy starting position can range from [-CANV_OFS : ROW_SIZE * NUM_ROWS + CANV_OFS]
const CANV_OFS = 101;

// Enemy width, used for collision detection
const ENEMY_WIDTH = 101;
// Player width, used for collision detection
const PLAYER_WIDTH = 60;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Starting x position
    this.x = x;
    // Starting y position
    this.y = y;
    // Moving speed, range from 0-2
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.floor((3 + 10 * this.speed) * 50 * dt);

    // take a random bound to randomize the enemy turnaround behavior
    let bound = Math.floor(Math.random() * 700);
    if (this.x >= (bound + NUM_COLS * COL_SIZE)) {
      this.x = (-bound);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    for (let enemy of allEnemies) {
        if (enemy.y !== this.y) {
          continue;
        }

        // reset position to (2,4)
        if (Math.abs(this.x - enemy.x) < ((ENEMY_WIDTH+PLAYER_WIDTH)/2)) {
          this.x = 2 * COL_SIZE;
          this.y = ROW_START + 4 * ROW_SIZE;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x -= COL_SIZE;
            if (this.x < 0) {
              this.x = 0;
            }
            break;
        case 'up':
            this.y -= ROW_SIZE;
            if (this.y < ROW_START) {
              this.y = ROW_START;
            }
            break;
        case 'right':
            this.x += COL_SIZE;
            if (this.x >= ((NUM_COLS - 1 ) * COL_SIZE)) {
              this.x = (NUM_COLS - 1) * COL_SIZE;
            }
            break;
        case 'down':
            this.y += ROW_SIZE;
            if (this.y >= ((NUM_ROWS - 1) * ROW_SIZE)) {
              this.y = ROW_START + (NUM_ROWS - 1) * ROW_SIZE;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// row/speed pair to be used to initiate enemy objects
const rowSpeedPairs = [
    [0, 0], [0, 0], [0, 1],
//    [1, 0], [1, 1], [1, 2], [1, 2],
    [2, 0], [2, 0], [2, 1]];
var allEnemies = rowSpeedPairs.map(function (param) {
    let [row, speed] = param;
    let visible_width = NUM_COLS * COL_SIZE + 2 * CANV_OFS;
    let x = Math.floor(Math.random() * visible_width) - CANV_OFS;
    let y = ROW_START + row * ROW_SIZE;

    return new Enemy(x, y, speed);
});

var player = new Player(2 * COL_SIZE, ROW_START + 4 * ROW_SIZE);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
