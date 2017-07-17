var canvas = document.getElementById("myCanvas");
canvas.width = 300;
canvas.height = 300;

var ctx = canvas.getContext("2d");

var foodPositionX = 90;
var foodPositionY = 90;

function randomRound5() {
  var randomNumber = Math.floor((Math.random() * canvas.width) - 15);
  return Math.ceil(randomNumber / 15) * 15;
}

// FOOD

function foodPosition() {
  foodPositionX = randomRound5();
  foodPositionY = randomRound5();

  var snakeBoxes = Snake.bodyParts;
  for (var i=0; i<snakeBoxes.length; i++) {
    if (foodPositionX === snakeBoxes[i].positionX && foodPositionY === snakeBoxes[i].positionY) {
      foodPosition();
      console.log("casilla ocupada");
    }
  }
}

function printFood(foodPositionX, foodPositionY) {
  ctx.beginPath();
  ctx.rect(foodPositionX,foodPositionY,15,15);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.stroke();
}

// SNAKE

var Snake = {

  direction: "right",

  previousHeadPosition: {
    prevHeadX: null,
    prevHeadY: null
  },

  bodyParts: [],

  init: function() {
    this.bodyParts.push({
      positionX: 15,
      positionY: 15
    });
  },

  moveSnake: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.getHeadPositionX() === foodPositionX && this.getHeadPositionY() === foodPositionY) {
      foodPosition();
      this.addBodyPart();
      Game.addPoint();
      console.log(Game.score);
    }
    printFood(foodPositionX, foodPositionY);
    
    this.checkHeadScreen(); 
    this.recalculateBodyPartsPosition();
    this.printSnake();
    this.colision();  
  },

  printSnake: function() {
    for (var i=0; i<this.bodyParts.length; i++) {
      ctx.beginPath();
      ctx.rect(this.bodyParts[i].positionX,this.bodyParts[i].positionY,15,15);
      ctx.fillStyle = '#008000';
      ctx.fill();
      ctx.stroke();
    }
  },

  recalculateBodyPartsPosition: function() {
    if (this.bodyParts.length > 1) {
      var reassignPosition = this.bodyParts.pop();
      reassignPosition.positionX = this.previousHeadPosition.prevHeadX;
      reassignPosition.positionY = this.previousHeadPosition.prevHeadY;
      this.bodyParts.splice(1, 0, reassignPosition);
    }
  },

  getHeadPositionX: function() {
    return this.bodyParts[0].positionX;
  },

  getHeadPositionY: function() {
    return this.bodyParts[0].positionY;
  },

  moveHeadUp: function() {
    this.bodyParts[0].positionY -= 15;
  },
  moveHeadDown: function() {
    this.bodyParts[0].positionY += 15;
  },
  moveHeadRight: function() {
    this.bodyParts[0].positionX += 15;  
  },
  moveHeadLeft: function() {
    this.bodyParts[0].positionX -= 15;
  },

  checkHeadScreen: function() {
    if (this.bodyParts[0].positionY < 0) { // up
      this.bodyParts[0].positionY = 285;
    } else if (this.bodyParts[0].positionY >= 300) { // down
      this.bodyParts[0].positionY = 0;
    } else if (this.bodyParts[0].positionX >= 300) { // right
      this.bodyParts[0].positionX = 0;
    } else if (this.bodyParts[0].positionX < 0) { // left
      this.bodyParts[0].positionX = 285;
    }  
  },

  setDirection: function(direction) {
    if (direction === "up" && this.direction !== "down") {
      this.direction = "up";
    } else if (direction === "right" && this.direction !== "left") {
      this.direction = "right";
    } else if (direction === "down" && this.direction !== "up") {
      this.direction = "down";
    } else if (direction === "left" && this.direction !== "right") {
      this.direction = "left";
    }
  },

  colision: function() {
    for (var i=1; i<this.bodyParts.length; i++) {
      if (this.getHeadPositionX() === this.bodyParts[i].positionX 
        && this.getHeadPositionY() === this.bodyParts[i].positionY) {
        clearInterval(intervalId);
        this.gameOverText();
      }
    }
  },

  gameOverText: function() {
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = '#8B0000';
    ctx.fillText("GAME OVER", 55, canvas.height/2); 
  },

  // TAIL

  addBodyPart: function(posX, posY) {
    this.bodyParts.push({});
  }

}

// GAME

var Game = {
  score: 0,

  addPoint: function() {
    return this.score++;
  },

  newGame: function() {
    var snake =  Object.create(Snake);
    snake.init();
    console.log(snake); 
  }
}

// CONTROLS

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 38) { // key up
    Snake.setDirection("up");
  }
  else if (e.keyCode === 39) { // key right
    Snake.setDirection("right");
  }
  else if (e.keyCode === 40) { // key down
    Snake.setDirection("down");
    e.preventDefault();
  }
  else if (e.keyCode === 37) { // key left
    Snake.setDirection("left");
  }
});

var intervalId = setInterval(function() {
  Snake.previousHeadPosition.prevHeadX = Snake.getHeadPositionX();
  Snake.previousHeadPosition.prevHeadY = Snake.getHeadPositionY();
  switch (Snake.direction) {
    case "up":
      Snake.moveHeadUp();
      break;
    case "right":
      Snake.moveHeadRight();
      break;
    case "down":
      Snake.moveHeadDown();
      break;
    case "left":
      Snake.moveHeadLeft();
      break;
  }
  Snake.moveSnake();
}, 150);


printFood(foodPositionX,foodPositionY);
// Snake.init();
// Snake.printSnake();
Game.newGame();
