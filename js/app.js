/* reate difficulty parameter to use as a speed multiplier.
 * 100 is default but later we can utilize this to let the user
 * select a difficulty for the game.
*/
const difficulty = 100;

/* Create an array of different enemy types that can be accessed
*  Each enemy can have a different image, path (linear or sin curve) and a speed
*/
const enemytype = [{
        sprite: 'images/enemy-bug.png',
        path: 'linear',
        speed: 1,
    },

    {
        sprite: 'images/enemy-bug.png',
        path: 'linear',
        speed: 3,
    },

    {
        sprite: 'images/enemy-bug.png',
        path: 'linear',
        speed: 5,
    },

    {
        sprite: 'images/enemy-bug-black.png',
        path: 'sine',
        speed: 7,
    },
];

/* Instantiate new enemies, set their initial x, y positions taking row input.
*  Randomly pick an enemytype and apply it.
*/
const Enemy = function(enemyrow) {
    // Randomly pick an enemy type, then apply its attibutes
    const randomenemy = random(0, 3);
    this.sprite = enemytype[randomenemy].sprite;
    this.path = enemytype[randomenemy].path;
    // Randomly set the speed to 1-5. Will use this with dt and difficulty param to change position
    this.speed = enemytype[randomenemy].speed;
    // Start off screen.
    this.x = -101;
    // Set row position based on passed enemyrow position.
    this.y = (enemyrow + 1) * 83;
};

/* Update the enemy's position.
*/
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt * difficulty); // new position is based on the speed of the enemy and a difficulty multiplier.
    if (this.path == 'sine') {
        this.y = ((allEnemies.indexOf(this) + 1) * 83) + (5 * Math.sin(this.x));
    }
    // if the enemy is offscreen, replace that enemy in the array with a new enemy object. We only ever have 3 enemies at once.
    if (this.x > 505) {
        allEnemies[allEnemies.indexOf(this)] = new Enemy(allEnemies.indexOf(this));
    };
};

/* Draw the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player class
*/
const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202; // Set starting x postion to middle column
    this.y = 415; // set starting y position to bottom of screen
    this.state = 'playing'; // Set starting state to "playing". This will change on a collision or win.
};

/*  Draw the player on the screen
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*  Update the player's position based on keystroke
*/
Player.prototype.update = function(key) {
    // For each keystroke, check if movement will take the player offscreen. If not, move that direction.
    switch (key) {
        case 'left':
            if (this.x != 0) {
                this.x = this.x - 101;
            };
            break;
        case 'up':
            if (this.y != 0) {
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if (this.x != 404) {
                this.x = this.x + 101;
            };
            break;
        case 'down':
            if (this.y != 415) {
                this.y = this.y + 83;
            };
            break;
    };
};

/* Create array to hold enemy objects. Add three enemies using enemy class
 * and passing parameter to set their initial row position.
 */
const allEnemies = [
    new Enemy(0),
    new Enemy(1),
    new Enemy(2),
];

/* Place the player object in a variable called player
 */
const player = new Player();

/* Listen for key presses and send to Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.update(allowedKeys[e.keyCode]);
});

/* Check for collision by calculating the distance between the objects.
 * If less than the size of the object a collision has occurred.
 * When a collision occurs, update the enemy image and set the player state to "dead"
 */
Player.prototype.checkCollisions = function() {
    for (i = 0; i < allEnemies.length; i++)  {
        const a = allEnemies[i].x - this.x;
        const b = allEnemies[i].y - this.y;
        const distance = Math.sqrt(a * a + b * b);
        if (distance < 81) {
            this.sprite = 'images/char-boy-crack.png';
            this.state = 'dead';
        };
    };
};


/* Check to see if the player has reached the top row and "won".
 * If so, set player state to "won"
 */
Player.prototype.checkWin = function() {
    if (this.y == 0) {
        this.state = "won";
    };
};

/* Display a message in the center of the screen when the player gets to the top.
 * Draw box in middle of screen then text on top of it.
 */
Player.prototype.celebrate = function() {
    ctx.fillStyle = '#00808b';
    ctx.fillRect(100, 200, 305, 190);
    ctx.font = '36px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('YOU WIN!', 252, 309);
};

/* Random function to support enemy speed and other needs. Accepts mim/max values.
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}