// Enemies our player must avoid
class Enemy{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.x = [-50, -100, -150, -10, -200][Math.floor(Math.random() * 5)];
        this.y = [60, 140, 60, 220, 160][Math.floor(Math.random() * 5)];   
        this.speed = Math.floor(Math.random() * 300 + 1);
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt){
        this.x += this.speed * dt;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
// Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    collision(){
        if( player.x >= this.x -40 && player.x <=this.x + 40 ){
            if( player.y >= this.y -40 && player.y <=  this.y + 40 ){
            console.log('collision');
            gameOver();
            player.x = 200;
            player.y = 405;
            }
        }
    }
};
// counting points
let pointNum = 0;
let points = document.getElementById('points');
points.innerHTML = pointNum;
// game over function
function gameOver(){
    setTimeout(function(){
        let modal = document.querySelector('.modal');
        modal.style.display = "block";
        let gameOverMsg = document.querySelector('.msg');
        gameOverMsg.innerHTML = `Game over! You have collected ${pointNum} points in ${sec} seconds.` ;
    }, 500)
    // reload
    window.addEventListener('keyup', function(){
    window.location.reload(true);  
    });
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(x, y){
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
    }
    update(){}
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
     // when reaching the water
     inWater(){if(this.y === -10){
        console.log('in water')
        this.x = 200;
        this.y = 405;
        pointNum += 100;
        points.innerHTML = pointNum;
        let toCollect = allItems.length;
        for(var x = 0; x < (4 - toCollect); x++){
            allItems.push(new Item())
        };
        }
    }
    handleInput(keyHit){
        let xChange = 101;
        let yChange = 83;        
        if(keyHit === 'left'){
            this.x <= 0 ?  null : this.x -= xChange;
        }
        if(keyHit === 'right'){
            this.x >= 400 ? null : this.x += xChange;
        }
        if(keyHit === 'down'){
            this.y >= 390 ? null : this.y += yChange;
        }
        if(keyHit === 'up'){
            this.y > 0?  this.y -= yChange : null;
        }
    }
   
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for(var i = 0; i < 5; i++) {
	allEnemies.push(new Enemy());
}

//assigning x and y value when a bug will run out from the canvas
setInterval(function reassign(){
    for(const enemy of allEnemies){ 
        if(enemy.x > 500){
            enemy.x = [-50, -100, -150, -10, -200][Math.floor(Math.random() * 5)];
            enemy.y = [60, 140, 60, 220, 160][Math.floor(Math.random() * 5)]; 
        }
    }
}, 1500);
// Place the player object in a variable called player
const player= new Player(200, 322);
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
    player.inWater();
});

// setting the timer

let sec;
let timeOn = false;
document.addEventListener('keyup',
    function count(){
        if(!(timeOn)){
            sec = 0;
            setInterval(function(){sec++}, 1000);
            const timer = document.getElementById('timer');
            setInterval( function(){
            timer.innerHTML = sec + " sec";}, 1000)
            timeOn = true;
        }
    }
);

// dropping randomly items to collect

class Item{
    constructor(img, x, y){
        this.sprite = ['images/star.png','images/star.png', 'images/key.png'][Math.floor(Math.random() * 3)];
        this.x = [0, 101, 202, 303, 404, 101][Math.floor(Math.random() * 6)]; 
        this.y =  [73, 73, 240, 240, 150][Math.floor(Math.random() * 5)]; 
    }
    update(){}
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    collectItem(){
        allItems.forEach(function(item){
            if( player.x >= item.x -40 && player.x <= item.x + 40 ){
                if( player.y >= item.y -40 && player.y <=  item.y + 40 ){
                let toDelete = allItems.indexOf(item);
                allItems.splice(toDelete, 1);
                pointNum += 50;
                points.innerHTML = pointNum
                }
            }
        })
    }
};

allItems = [];
for(var x = 0; x < 4; x++){
    allItems.push(new Item())
};