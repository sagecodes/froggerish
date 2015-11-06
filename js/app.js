"use strict";
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set Enemy x & y values to equal values passed in receptively.
    this.x=x;
    this.y=y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy x location is less than canvas length:
        // add 200 to x value multiplied by supplied time delta(dt)
    // else:
        // set enemy x value to -100(reset to other side of screen)
    if(this.x<505){
    this.x+=(200*dt);
    }
    else{
    this.x=-100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class which the user controls
var Player=function(x,y){
    // Create array containing each char image
    var sprites = Array('images/char-cat-girl.png', 'images/char-horn-girl.png',
                        'images/char-pink-girl.png','images/char-boy.png',
                        'images/char-princess-girl.png');

    // The image/sprite for our player, this uses
    // a helper Udacity provided to easily load images
    // picks random image from sprites array
    this.sprite = sprites[Math.floor(Math.random()*sprites.length)];

    // Set Player x & y values to equal values passed in receptively.
    this.x=x;
    this.y=y;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set action for each arrow key pressed to move player on canvas accordingly
Player.prototype.handleInput = function(key){
    if(key =='left'){
        this.x -= 100;
    }

    else if(key== 'up'){
        this.y-= 85;
    }

    else if(key == 'right'){
        this.x += 100;
    }

    else if(key == 'down'){
        this.y+= 85;
    }

    // get x and y value for play to use for debugging move limit
    console.log(this.x,this.y);
};

Player.prototype.update = function(){

    // if player reaches the water reset player to starting point
    if(this.y < 1){
        this.reset();
        score += 1;
    }
    // Stop player from moving down when at bottom of canvas
    else if(this.y > 400){
            this.y-= 85;
         }
    // Stop player from moving left when at left end of canvas
    else if(this.x < 0){
            this.x+= 100;
         }
    // Stop player from moving Right when at Right end of canvas
    else if(this.x > 400){
            this.x-= 100;
         }

    // Detect collision with enemies
    // add padding around player and enemy location to fit images
    // if those locations intersect reset payer to starting point
    for(var enemy in allEnemies){
        if (
            this.y + 130 >= allEnemies[enemy].y + 95
            && this.x + 25 <= allEnemies[enemy].x + 85
            && this.y + 75 <= allEnemies[enemy].y + 135
            && this.x + 75 >= allEnemies[enemy].x + 15) {
            this.reset();
            deaths += 1;
        }
    }

    //Update Score Value
    document.getElementById('score').value = score;
    //Update deaths Value
    document.getElementById('deaths').value = deaths;
};

// reset player position to same as starting point
// used for collision or making it to water
Player.prototype.reset= function(){
    this.x=200;
    this.y=400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Declare 3 enemies with hardcoded x&y values *For now*
var enemy = new Enemy(-30,220);
var enemy2 = new Enemy(-200,145);
var enemy3 = new Enemy(-100,50);

// Declare player and set harded coded location *for now*
var player = new Player(200, 400);

// place all enemies in array
var allEnemies=[enemy,enemy2,enemy3];

var score = 0;
var deaths = 0;



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