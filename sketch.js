var human,humanRunning, humanMask;
var road, roadImg;

var mask, maskImg, sanitizer, sanitizerImg;

var obstacle1, obstacle2, obstaclesGroup;

var score=0;

var boonsGroup;

var gameOverImg;

var PLAY = 1;
var END = 0;
var gameState=PLAY;

var immunityBar = 185;

var maskOn = false;


function preload(){
  humanRunning = loadAnimation("human1.png","human2.png","human3.png","human4.png","human5.png","human6.png","human7.png");
  humanMask = loadAnimation("maskHuman1.png","maskHuman2.png","maskHuman3.png","maskHuman4.png","maskHuman5.png","maskHuman6.png","maskHuman7.png");

  roadImg = loadImage("road.png");  
  
  obstacle1 = loadImage("virus.png");
  obstacle2 = loadImage("coronaVirus.png");

  mask = loadImage("mask.png");
  sanitizer = loadImage("sanitizer.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  road = createSprite(width/2,height/2);
  road.addImage(roadImg)
  road.scale = 0.8
  road.velocityY = -3

  human = createSprite(650,100,20,20);
  human.addAnimation("running", humanRunning);
  human.addAnimation("mask", humanMask);
  human.scale = 0.5
  
  obstaclesGroup = new Group()
  boonsGroup = new Group()

  human.debug = false
  human.setCollider("rectangle",0,35,50,30)

}
function draw(){

  background(0)

  //console.log(road.y);

  
  
  if(gameState === PLAY){
    if(road.y < 0){
      road.y = height/2
    }
    score = Math.round(score+getFrameRate()/63)

    spawnObstacles();
    spawnBoons();

    if(keyDown("LEFT_ARROW")){
      human.x=human.x-3
    }

    if(keyDown("RIGHT_ARROW")){
      human.x=human.x+3 
    }
    

    if(boonsGroup.isTouching(human)){
      score = score+20
      human.changeAnimation("mask")
      maskOn = true
    }
    if(obstaclesGroup.isTouching(human) && !maskOn){
      human.x=human.x+20
      immunityBar = immunityBar-35
    }
    if(immunityBar<=0){
      gameState = END
    }
  }

  if(gameState === END){
    road.velocityY = 0
    obstaclesGroup.setVelocityYEach(0)
    boonsGroup.setVelocityYEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    boonsGroup.setLifetimeEach(-1)
    text("GAME OVER",width/2,height/2)
  }

  

  drawSprites()

  fill("pink")
  textSize(20)
  text("score:"+score,450,40)

  fill("white")
  rect(width-300,200,185,20)
  fill("blue")
  rect(width-300,200,immunityBar,20)
  
}

function spawnObstacles(){
  if (frameCount % 60 == 0){
    var obstacle = createSprite(400,700,20,50);
    obstacle.velocityY = -6
    obstacle.x = random(50,width-50)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
              default:break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);          
 }
}

function spawnBoons(){
  if (frameCount % 80 == 0){
    var boon = createSprite(700,800,30,40);
    boon.velocityY = -6
    boon.x = random(40,width-40)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: boon.addImage(mask);
              break;
      case 2: boon.addImage(sanitizer);
              break;
              default:break;
    }
    boon.scale = 0.5;
    boon.lifetime = 300;
    boonsGroup.add(boon);          
 }
}

