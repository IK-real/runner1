var car;
var restart;
var race;
var enemyGroup;
var edges;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

localStorage["highestScore"] = 0;


function preload(){
  carImage = loadImage("car.png");
  
  race_track = loadImage("Race.jpg");
  
  enemyCar = loadImage("car2[1].png");
  
  reImg = loadImage("Polish_20201121_190721501[1].png");
}

function setup() {
 createCanvas(500,250);

  car = createSprite(65,125,50,50);
  car.addImage(carImage);
  car.scale = 0.09
  car.setCollider("rectangle",0,0,1100,500)
 
  
  race = createSprite(450,125,50,50);
  race.addImage(race_track);
  race.scale = 2.30;
  
  edges = createEdgeSprites();
  
  
  restart = createSprite(250,125,50,50);
  restart.addImage(reImg);
  restart.scale = 0.25;
  
  
  enemyGroup = new Group();
}

function draw() {
  
  
  
  car.depth = race.depth + 1;
  
  if(race.x <= 30){
    race.x = 450;
  }
  
  
 if(gameState === PLAY){

  camera.position.x = car.x;
  camera.position.y = 250/2

   
   if(frameCount % 15 === 0){
     score = score + 1;
   }
   
   if(localStorage["highestScore"] < score){
    localStorage["highestScore"] = score;
  }
   
   restart.visible = false;
   
   
  if(keyDown("a")|| keyDown("left")){
    car.x = car.x-10;
  }
  
  console.log(frameCount)
  if(keyDown("d")|| keyDown("right")){
    car.x = car.x+10
  }
  
  
  if(frameCount > 1500){
    gameState = END;
  }
  
  if(car.isTouching(edges[3])||car.isTouching(edges[2])){
    gameState = END;
  }
   
  if(enemyGroup.isTouching(car)){
    gameState = END;
  } 
 enemy();
 }
  
  if(gameState === END){
    car.velocityY = 0
    car.x = 65;
    car.y = 125;
    race.velocityX = 0;
    enemyGroup.setLifetimeEach(2);
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  
  drawSprites();
  fill("yellow")
  text("Score:  "+ score,400,30);
  text("High Score:  " + localStorage["highestScore"], 300, 30);
}  


function enemy(){
  
  if(frameCount % 80 === 0){
    var enemy = createSprite(Math.round(random(500,1600)),Math.round(random(37,217)),50,50);
    enemy.addImage(enemyCar);
    enemy.scale = 0.15;
    enemy.lifetime = 400;
    enemy.setCollider("rectangle",0,0,700,300);
    restart.depth = enemy.depth + 1;
    car.depth = enemy.depth + 1;
    enemyGroup.add(enemy);
  }
}

function reset(){
  gameState = PLAY;
  enemyGroup.destroyEach();
  score = 0;

}


