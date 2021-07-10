var ground,iGround;
var monkey;
var obstacle,banana;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;

function preload()
{
  background1=loadImage("jungle.jpg");
  monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
obstacle1=loadImage("stone.png");
bananaImg=loadImage("banana.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  ground=createSprite(100,100);
  ground.addImage(background1);
  ground.scale=1;
  
  iGround=createSprite(0,380,800,1);
  iGround.visible=false;
  
  monkey=createSprite(50,350);
  monkey.addAnimation("running",monkeyImg);
  monkey.scale=0.1;
  
  obstacleG=createGroup();  
  bananaG=createGroup();
}

function draw()
{
  background(220);
  
  if(gameState===PLAY)
    {
      ground.velocityX=-5;
      if(ground.x<0)
      {
      ground.x=ground.width/2;
      }
      
      if(keyDown("space"))
    {
      if(monkey.y>320)
      {
        monkey.velocityY=-10;
      }
    }
      
    if(bananaG.isTouching(monkey))
      {
        score=score+2;
        bananaG.destroyEach();
        }
      
       switch(score)
          {
            case 10:monkey.scale=0.12;
              break;
            case 20:monkey.scale=0.14;
              break;
            case 30:monkey.scale=0.16;
              break;
            case 40:monkey.scale=0.18;
              break;
            default:break;
          }
      
     spawnbanana();
     Obstacle(); 
     
    if(obstacleG.isTouching(monkey))
      {
        gameState=END;
      }
   
    }
  
  if(gameState===END)
    {
    ground.velocityX=0;
    monkey.scale=0.03;
    monkey.velocityY=0;
    obstacleG.setVelocityXEach(0);
    obstacleG.setLifetimeEach(-1);
    bananaG.setVelocityXEach(0);
    bananaG.setLifetimeEach(-1);
    }
  
   monkey.velocityY=monkey.velocityY+0.5;
    
  monkey.collide(iGround);
  
  
  drawSprites();
  stroke("black");
  textSize(20);
  fill("white");
  text("score:  "+score,280,50);
}
function Obstacle()
{
  if(frameCount%200===0)
    {
      obstacle=createSprite(400,350,10,10);
      obstacle.addImage(obstacle1);
      obstacle.velocityX=-5;
      obstacle.scale=0.2;
      obstacle.lifetime=80;
      obstacle.debug=true;
      obstacle.setCollider("circle",0,0,150)
      obstacleG.add(obstacle);
    }
}

function spawnbanana()
{
  if(frameCount%100===0)
    {
      r=random(180,200);
      banana=createSprite(400,r,10,10);
      banana.addImage(bananaImg);
      banana.velocityX=-5;
      banana.scale=0.07;
      banana.lifetime=80;
      bananaG.add(banana);
    }
}