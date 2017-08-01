
var difficulty = 100;

// Enemies our player must avoid
var Enemy = function(enemyrow) {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';
    //RON COMMENTS: Enemy class called to instantiate (create new) enemies, set their initial x, y positions and speed multiplier
    this.x = -101;  // Change to -101 to start off screen.
    this.y = enemyrow * 83; // set row position base on passed enemynumber.
    this.speed = random(1,5); // randomly set the speed to 1 - 5. Will use this with dt and difficulty param to change position
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//RON COMMENT increment position using randomly picked speed, difficulty level (default 100) and dt param.
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt * difficulty);
   // console.log(this.y + this.x);
// RON COMMENT: if the enemy is offscreen, replace that enemy in the array with a new enemy created with the enemy class.
    if (this.x > 505) {
       // allEnemies[(this.y/83)-1] = new Enemy(this.y/83);
       // Benny's improvement
        allEnemies[allEnemies.indexOf(this)] = new Enemy(this.y/83);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//RON comment: Building out skeleton of player class

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202  // Change to -101 to start off screen.
    this.y =  5 * 83; // set row position base on passed enemynumber.
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case "left":
            if (player.x != 0) {
            player.x = player.x - 101;
            };
            break;
        case "up":
            if (player.y != 0) {
            player.y = player.y - 83;
            };
            break;
        case "right":
            if (player.x != 404) {
            player.x = player.x + 101;
            };
            break;
        case "down":
            if (player.y != 415) {
            player.y = player.y + 83;
            };
            break;
    };
        // 37: 'left',
        // 38: 'up',
        // 39: 'right',
        // 40: 'down'
        console.log(key);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// RON COMMENTS: Video only shows three enemies at once. Thought to:
// - create allenemies array.
// - define three enemies with initial row, board position and speeds.
// - Reuse the same enemies (array only ever has three values) CONFIRMED engine.js uses FOR EACH to parse array
// - Check each enemies' position, if offscreen randomly select its new row and speed. New position always starts off screen lef of its random row

//RON COMMENT: Build enemies using Enemy class (contructor). Creats each enemy and assigns variables.
var allEnemies = [
    new Enemy(1),
    new Enemy(2),
    new Enemy(3),
];


// Place the player object in a variable called player
//RON COMMENT: Added player var using Player() class. Just skeleton
var player = new Player();

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

// RON COMMENT: Created random row / column function for enemy positioning
// Called when creating initial position of enemies
// Called when...

function random(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
};


