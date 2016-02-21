// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.floor(Math.random() * 225);
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= 505) {
        this.x = 0;
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
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(){
	if (this.y > 435 || this.y < 45){
		this.y = 435
	} else if (this.x > 410 || this.x < -10){
		this.x = 200
	}
	//check for collisions
	if (checkCollisions(allEnemies) === true) {
		this.x = 200;
		this.y = 435;
	}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
	    if (keyCode == "left") {
	        this.x = this.x-30;
	    } else if (keyCode == "right") {
	    	this.x = this.x+30;
	    } else if (keyCode == "up"){
	    	this.y = this.y-30;
	    } else if (keyCode == "down"){
	    	this.y  = this.y+30;
	    }
	    console.log("x " + this.x + "y" + this.y);
};

//check for Enemy - Player collision
//101 x 171 img size
function checkCollisions (enemy) {
	for (var i=0; i < allEnemies.length; i++){
		if (allEnemies[i].x < player.x + 50 &&
			allEnemies[i].x + 85 > player.x &&
			allEnemies[i].y < player.y + 85 &&
			50 + allEnemies[i].y > player.y){
			console.log("collision detected");
			return true;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(10, 60), new Enemy(10, 200), new Enemy(150, 125)];
var player = new Player(200, 435);

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
