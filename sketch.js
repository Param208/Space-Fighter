var PLAY = 1;
var END = 0;
var gameState = 1;
var player,playerImage;
var obstacle,obstacleImage;
var gcoin,gcoinImage,bcoin,bcoinImage;
var obstacleGroup,gcoinGroup,bcoinGroup;
var score = 0;
var gameOverImage;
var backGround,backGroundImage;
var up;

function preload(){
  
  backGroundImage = loadImage("space.jpg");
  
  playerImage = loadImage("plane.png");
  gameOverImage = loadImage("Game Over.png");
  
  bcoinImage = loadImage("b_coin.png");
  gcoinImage = loadImage("g_coin.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
 createCanvas(668,500);
  
  backGround = createSprite(300,200,10,10);
  backGround.addImage(backGroundImage);
  backGround.velocityX = -1;
  
  player = createSprite(80,200,20,20);
  player.addImage(playerImage);
  player.debug = false;
  player.setCollider("rectangle",0,0,60,50);

  obstacleGroup = new Group();
  gcoinGroup = new Group();
  bcoinGroup = new Group();
  
  //up = createSprite(150,150,30,30);
}

function draw() {
  background(50);
   
  
  
  
  if(gameState===PLAY){
    
     //call obstacle & coine
    obstacles();
    gcoins();
    bcoins();

    if(touches.lenght>0){
      player.velocityY = -2;
      touches=[];
    }
    else{
      player.velocityY = +2;
    }
    
    if(gcoinGroup.isTouching(player)){
    gcoinGroup.destroyEach();
    score = score+3
  }
  
  if(bcoinGroup.isTouching(player)){
    bcoinGroup.destroyEach();
    score = score+1
  }
   player.y = World.mouseY;

  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }

  }
  
  if(gameState == END){
    
    stroke("red");
    textSize(30);
    fill("red");
    text("Game Over",300,200);
    
    gcoinGroup.destroyEach();
    bcoinGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    obstacleGroup.setVelocityXEach(0);
    gcoinGroup.setVelocityXEach(0);
    bcoinGroup.setVelocityXEach(0);
    
    player.addImage(gameOverImage);
    player.scale = 0.5;
    player.x=250;
    player.y=200;
  }
  
  
  if(backGround.x<400){
    backGround.x = backGround.width/2
  }
  
 
 
  
  drawSprites();
  
  stroke("pink");
  textSize(20)
  fill("pink");
  text("score : "+score,300,18);
}

function obstacles(){
  
  if(frameCount%125 === 0){
    obstacle = createSprite(600,200,30,20);
    obstacle.y = Math.round(random(50,350));
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 400;
    obstacle.debug = false;
    obstacle.setCollider("rectangle",0,0,70,40);
    
    obstacleGroup.add(obstacle);
  }
}

function gcoins(){
  
  if(frameCount%500 === 0){
    gcoin = createSprite(600,300,10,10);
    gcoin.y = Math.round(random(50,350));
    gcoin.velocityX = -2;
    gcoin.addImage(gcoinImage);
    gcoin.lifetime = 400;
    gcoin.scale = 0.7;
    gcoin.debug = false;
    gcoin.setCollider("rectangle",0,0,100,60);
    
    gcoinGroup.add(gcoin);
  }
}

function bcoins(){
  
  if(frameCount%300 === 0){
    bcoin = createSprite(600,200,15,15);
    bcoin.y = Math.round(random(50,350));
    bcoin.velocityX = -2;
    bcoin.addImage(bcoinImage);
    bcoin.lifetime = 400;
    bcoin.scale = 0.7;
    bcoin.debug = false;
    bcoin.setCollider("rectangle",0,0,100,60);
    
    bcoinGroup.add(bcoin);
  }
}