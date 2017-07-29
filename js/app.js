// Enemies our player must avoid

// RON COMMENTS: From google doc...
// Part of the code for the Enemy is provided to you, and you will need to complete the following:
// The Enemy function, which initiates the Enemy by:
// - Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
// - Setting the Enemy initial location (you need to implement)
//     DONE: I assume random based on grid. Canvas is 505 wide by 606 high
// - Setting the Enemy speed (you need to implement)
// The update method for the Enemy
// - Updates the Enemy location (you need to implement)
// - Handles collision with the Player (you need to implement)
// - You can add your own Enemy methods as needed


var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //RON COMMENTS: Enemy class called to instantiate (create new) enemies, set their initial x, y positions and speed multiplier
    // Will need x and y position as per the Enemy.render function
    // Randomly pick a column position. There are 5 possible columns. Multiple by 101 per engine.js render function to get actual x position.
    // REMOVING THIS. ALWAYS START COL 1. this.xposition = randomposition(1,5) * 101;
    this.x = 101;  // Always start column 1
    // Randomly pick an iniital row position. Enemies are on rows 2-4. Multiple by 83 per engine.js render function to get actual y position.
    this.y = random(2,4) * 83; // pick a random row
    this.speed = random(1,5); // randomly set the speed to 1 - 5. Will use this with dt param to find next position.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.



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
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {

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
    new Enemy(),
    new Enemy(),
    new Enemy(),
];
// Code to validate enemies created properly
// console.log("allEnemies0 x = " + allEnemies[0].xposition);
// console.log("allEnemies0 y = " + allEnemies[0].yposition);
// console.log("allEnemies0 speed = " + allEnemies[0].speed);



// Place the player object in a variable called player
//RON COMMENT: Added player var using Player() class. Just skeleton
var player = Player();

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


