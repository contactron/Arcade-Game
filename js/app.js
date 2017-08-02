// Create difficulty parameter to use as a speed multiplier. 100 is default but later we can utilize this to let the user select a difficulty for the game.
var difficulty = 100;
var pause = false;

// Create an array of different enemy types that can be accessed
var enemytype = [
    {
    "sprite": 'images/enemy-bug.png',
    "path": 'linear',
    "speed": 1,
    },

    {
    "sprite": 'images/enemy-bug.png',
    "path": 'linear',
    "speed": 3,
    },

    {
    "sprite": 'images/enemy-bug.png',
    "path": 'linear',
    "speed": 5,
    },

    {
    "sprite": 'images/enemy-bug-black.png',
    "path": 'sine',
    "speed": 7,
    },
];

// Instantiate new enemies, set their initial x, y positions taking row input. Randomly pick an enemytype and apply it.
var Enemy = function(enemyrow) {
    var randomenemy = random(0,3);
    this.sprite = enemytype[randomenemy].sprite;
    this.path = enemytype[randomenemy].path;
    this.x = -101;  // start off screen.
    this.y = (enemyrow + 1) * 83; // set row position based on passed enemynumber.
    this.speed = enemytype[randomenemy].speed; // randomly set the speed to 1-5. Will use this with dt and difficulty param to change position
    // if (this.speed == 5) {  // take the fastest enemy
    //     this.speed = this.speed + 2;  // make the enemy even faster
    //     this.sprite = enemytype[1];  // make the super fast enemy black
    // };
};

// Update the enemy's x position.
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt * difficulty);
    if (this.path == 'sine') {
        this.y = ((allEnemies.indexOf(this)+1)*83) + (5 * Math.sin(this.x ));
    }
// if the enemy is offscreen, replace that enemy in the array with a new enemy object
    if (this.x > 505) {
        allEnemies[allEnemies.indexOf(this)] = new Enemy(allEnemies.indexOf(this));
    };
};


// Enemy.prototype.update = function(dt) {
//     this.x = this.x + (this.speed * dt * difficulty);
// // if the enemy is offscreen, replace that enemy in the array with a new enemy object
//     if (this.x > 505) {
//         allEnemies[allEnemies.indexOf(this)] = new Enemy(this.y/83);
//     };
// };


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;  // Set starting x postion to middle column
    this.y = 415; // set starting y position to bottom of screen
};

// Player.prototype.update = function(dt) {
// };

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(key) {
// For each keystroke, check if movement will take the player offscreen. If not, move that direction.
    switch(key) {
        case "left":
            if (player.x != 0) {
            player.x = player.x - 101;
            };
            break;
        case "up":
            if (player.y != 0) {
            player.y = player.y - 83;
            }
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
    if (player.y == 0) {
        restartgame();
    };
};

// Create array to hold enemy objects. Add three enemies using enemy class and passing parameter to set their initial row position.
var allEnemies = [
    new Enemy(0),
    new Enemy(1),
    new Enemy(2),
];

// Place the player object in a variable called player
var player = new Player();

// Listen for key presses and send to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.update(allowedKeys[e.keyCode]);
});

function restartgame() {
    pause = true;
    setTimeout(function() {
        window.location.reload();
    }, 5000);
};

// Random function to support enemy speed and other needs. Accepts mim/max values.
function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
    };
