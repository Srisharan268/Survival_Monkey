var gameState = "play";
var backGround,backGround_image;
var monkey,monkey_image,monkey_image2;
var ground;
var bananaGroup,banana_image,ObstaclesGroup,stone_image;
var score = 0;
var count = 0,count2 = 0;
var gameOver,gameOver_image,reset_button,resetButton_image;
var health1_image,health2_image;
var health_1,health_2;

function preload(){
  
  monkey_image=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);
  
  monkey_image2=loadImage("Monkey_01.png");
  
  backGround_image=loadImage("jungle.jpg");
  
  banana_image=loadImage("banana.png");
  stone_image=loadImage("stone.png");
  
  gameOver_image=loadImage("game_over.png");
  resetButton_image=loadImage("reset.png");
  
  health1_image=loadImage("health1.png");
  health2_image=loadImage("health2.png");
}

function setup() {
  createCanvas(600,300);
  
  backGround=createSprite(500,50,20,20);
  backGround.addImage(backGround_image);
  backGround.velocityX=-6;
  
  monkey = createSprite(100,200,20,20);
  monkey.addAnimation("running",monkey_image);
  monkey.addAnimation("collided",monkey_image2);
  monkey.scale=0.075;
  
  ground = createSprite(300,235,600,10);
  ground.visible=false;
  
  ObstaclesGroup = new Group();
  bananaGroup = new Group();
  
  gameOver = createSprite(300,125,20,20);
  gameOver.visible=false;
  gameOver.addImage(gameOver_image);
  
  reset_button = createSprite(290,210,20,20);
  reset_button.visible=false;
  reset_button.addImage(resetButton_image);
  reset_button.scale=0.75;
  
  health_1=createSprite(40,40,20,20);
  health_1.scale=0.25;
  health_1.addImage(health1_image);
  
  health_2=createSprite(80,40,20,20);
  health_2.scale=0.25;
  health_2.addImage(health2_image);
  
}

function draw() {
 background("darkgreen");
  
 if(gameState==="play"){
   
   if(count==0){
     health_1.visible=true;
     health_2.visible=true;
   }
   
   
   monkey.changeAnimation("running");
   
   monkey.collide(ground);
   monkey.velocityY=monkey.velocityY+0.8;
  
   if(keyWentDown("space") && monkey.y>160){
     monkey.velocityY=-13;  
   }
  
   if(backGround.x==98){
     backGround.x=500;
   }
  
   spawnFood();
   spawnObstacles();
  
   if(bananaGroup.isTouching(monkey)){
     score = score+ 2  ;
     bananaGroup.destroyEach();
   }
   
   switch(score){
     case 10:
       monkey.scale=0.1 ;
       break;
       
     case 20:
       monkey.scale=0.125;
       break;
     
     case 30:
       monkey.scale=0.15;
       break; 
     
     case 50:
       monkey.scale=0.175;
       break;
     
     case 100:
       monkey.scale=0.2;
       break;
     
     default :
       break;
       
   }
   
   if(ObstaclesGroup.isTouching(monkey)){
     monkey.scale=0.075;
   }
   
   if(ObstaclesGroup.isTouching(monkey) && count==0){
     count=count+1;
     ObstaclesGroup.destroyEach();
   }
   
   if(count==1){
     health_2.visible=false;
   }
   
   if(ObstaclesGroup.isTouching(monkey) && count==1){
     monkey.scale=0.075;
     count=count+1;
   }
   
   if(count==2){
     gameState="end";
     health_1.visible=false;
     health_2.visible=false;
   }
  }else if(gameState==="end"){
    
    monkey.setVelocity(0,0);
    backGround.velocityX=0; 
    bananaGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    ObstaclesGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    reset_button.visible=true;
    
    if(mousePressedOver(reset_button)){
      reset();
      
      reset_button.visible=false;
      gameOver.visible=false;
    }
    
   monkey.changeAnimation("collided");
   }
  
  drawSprites();
  textFont("Roboto")
  fill("white");
  textSize(20);
  stroke("white");
  text("Score : "+score,450,50);
  
}
function spawnFood(){
  if(frameCount%100==0){
    rand1 = random(60,150);
    var banana = createSprite(600,rand1,20,20);
    banana.addImage(banana_image);
    banana.scale=0.05;
    banana.velocityX=-6;
    banana.lifetime=110; 
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%150==0){
    var obstacle = createSprite(600,200,20,20);
    obstacle.setCollider("circle",0,0,200)
    obstacle.addImage(stone_image);
    obstacle.scale=0.125;
    obstacle.velocityX=-6;
    obstacle.lifetime=160;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  bananaGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  gameState="play";
  backGround.velocityX=-6;
  count=0;
  score=0;
}
