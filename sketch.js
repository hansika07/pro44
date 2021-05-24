var STORY1 = 0;
var STORY2 = 1;
var STORY3 = 2;
var PLAY = 3;
var END = 4;
var gameState = STORY1;
var Player, player_img;
var enemy;
var bgImg;
var bg;
var crinimal, crinimalImg;
var speed = 1;
var food, foodGroup;
var invground;
var foodImg
var stone, Stone_img;
var stoneGroup;
var arrow, arrow_img, arrowGroup;
function preload() {
  player_img = loadAnimation("Images/Runner1.png", "Images/Runner2.png", "Images/Runner3.png", "Images/Runner4.png", "Images/Runner5.png", "Images/Runner6.png", "Images/Runner7.png", "Images/Runner8.png", "Images/Runner9.png", "Images/Runner10.png");
  crinimalImg = loadAnimation("Images/Crinimal1.png", "Images/Crinimal2.png", "Images/Crinimal3.png", "Images/Crinimal4.png", "Images/Crinimal5.png", "Images/Crinimal6.png", "Images/Crinimal7.png", "Images/Crinimal7.png", "Images/Crinimal9.png")
  bgImg = loadImage("Images/bg.jpg")
  foodImg = loadImage("Images/Apple..png")
  Stone_img = loadImage("Images/Obstacle.png")
  arrow_img = loadImage("Images/arrow2.png")
}
function setup() {
  createCanvas(1300, 750);

  bg = createSprite(650, 375)
  bg.addImage(bgImg)
  bg.x = bg.width / 2;

  Player = createSprite(1000, 588)
  Player.addAnimation("Hello", player_img)
  Player.visible = false;
  Player.scale = 1.5;

  crinimal = createSprite(83, 638)
  crinimal.addAnimation("hello", crinimalImg);
  crinimal.scale = 3.8;
  crinimal.visible = false;

  invground = createSprite(650, 718, width, 20)
  invground.visible = false;
  foodGroup = createGroup()
  stoneGroup = createGroup();
  arrowGroup = createGroup();

}

function draw() {
  background(225, 225, 225);

  if (gameState === 3) {
    Player.visible = true;
    bg.velocityX = -10;
    crinimal.visible = true;


    if (bg.x < (width / 8)) {
      bg.x = bg.width / 2;
    }

    speed = speed + Math.round(getFrameRate() / 60);
    if (Player.x > 190)
      Player.x = (Player.x - speed / 100);

    if (keyDown("space") && Player.y >= 600) {
      Player.velocityY = -22;
    }

    Player.velocityY = Player.velocityY + 1.5
    Player.collide(invground)

    console.log(Player.x)
    foodGroup.debug = true;

    //  bg.velocityX = (bg.velocityX+speed);
    if (Player.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      Player.x = Player.x + 70;
    }
    if (Player.isTouching(stoneGroup) && Player.x > 190) {
      Player.x = Player.x - 35;
      stoneGroup.destroyEach();
    }
    if (Player.isTouching(arrowGroup) && Player.x > 190) {
      Player.x = Player.x - 45;
      arrowGroup.destroyEach();
    }

    if (Player.x < 190) {
      gameState = 4;
    }

    textSize(25)
    text(mouseX + "," + mouseY, mouseX, mouseY)
    Food();
    Stone();
    Arrow()
  }
  drawSprites();
  if (gameState === 4) {
    Player.destroy();
    crinimal.destroy();
    bg.destroy();
    foodGroup.lifetime = 0;
    stoneGroup.lifetime = 0;
    foodGroup.destroyEach();
    stoneGroup.destroyEach();
    textSize(100);
    text("You lost", 550, 400)
  }


  if (gameState === 1) {
    fill("black")
    textSize(50)
    text("Now u need to save yourself from him", 305, 240)
    text("Your speed will decrease by the time", 301, 310)
    text("You need to collect food in order to increase your speed", 30, 380)
    text("If you touch the stone your speed will decrese", 160, 460)
    text("Also the crinimal will throw arrows at you", 250, 550)
    text("To decrese your speed", 490, 630)
    textSize(20)
    text("Press 3 To Continue ", 994, 695)

    if (keyCode === 51) {

      gameState = 2;
    }

  }
  if (gameState === 2) {
    fill("red")
    textSize(50)
    text("Press Space for jump", 485, 340)

    textSize(20)
    text("Press P to start", 994, 655)

    if (keyCode === 112 || keyCode === 80) {

      gameState = 3;
    }
    textSize(25)
    text(mouseX + "," + mouseY, mouseX, mouseY)
  } if (gameState === 0) {
    fill("black")
    textSize(50)
    text("There is a serial killer in city", 385, 240)
    text("Unfortunately The police don't know who is it", 210, 310)
    text("One night you saw the muderer Killing someone", 160, 380)
    textSize(20)
    text("Press 2 To Continue ", 994, 655)
    if (keyCode === 50) {

      gameState = 1;
    }
  }






}

function Food() {
  if (frameCount % 120 === 0) {
    food = createSprite(1300, 452)
    food.addImage("Hello", foodImg)
    food.velocityX = -10;
    food.scale = 2;
    foodGroup.add(food)
    food.lifetime = 100;

  }
}
function Stone() {
  if (frameCount % 190 === 0) {
    stone = createSprite(1300, 680)
    stone.addImage(Stone_img)
    stone.velocityX = -10;
    stone.lifetime = 150;
    stoneGroup.add(stone)
    stone.scale = 0.3;
  }
}
function Arrow() {
  if (frameCount % 270 === 0) {
    arrow = createSprite(crinimal.x, crinimal.y)
    arrow.addImage(arrow_img)
    arrow.velocityX = 16;
    arrow.lifetime = 300;
    arrowGroup.add(arrow)
    arrow.scale = 1.3;
    console.log(arrow.log)
  }
}



