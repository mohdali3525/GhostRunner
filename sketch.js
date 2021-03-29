const PLAY = 1;
const END = 0;
var gameState = PLAY;

var ghost, ghostImg;
var tower, towerImg;

var door, doorImg;
var climber, climberImg;
var block;

var invisibleGround;

var doorsGroup, climbersGroup, blocksGroup;


function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
 
}


function setup(){
  createCanvas(500,500);
  
  //spookySound.loop();
  
  tower = createSprite(250,300);
  tower.addImage(towerImg)
  tower.velocityY = 2
  
  ghost = createSprite(300,430,50,50);
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  invisibleGround = createSprite(250,480,380,1);
  invisibleGround.visible=false
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blocksGroup = new Group();
  
  //console.log(tower.height/2);
  
}// ------------end of setup -------------------

function draw(){
  background(0);
  
  if (gameState == PLAY) {
    
    // for infinite ground
    if(tower.y > 400){
     tower.y = 300
     }
    
    
    //left and right movement to ghost
    if(keyDown("left")){
        ghost.x = ghost.x - 3;
      }
    if(keyDown("right")){
        ghost.x = ghost.x + 3;
      }
    if(keyDown("up")){
        ghost.velocityY = -7
      }
    // make the ghost jump using gravity
    ghost.velocityY +=0.4
    
    // call function spawnDoors()
    spawnDoors()
    
    // ghost is touching climbersGroup
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0
    }
    
    // ghost is touching blocksGroup
    if(ghost.isTouching(blocksGroup)){
      gameState=END
    }
     

    
  }else if(gameState == END){
    
    // "Game Over" should appear
    fill("green")
    textSize(25)
    text("gameOver",width/2-60,height/2)
    
    // tower should disappear
    tower.destroy()
    ghost.destroy()
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    blocksGroup.destroyEach()
  }
  
  ghost.collide(invisibleGround);
  drawSprites();
  
}
// -----------------end of draw ---------------------


function spawnDoors() {
  
  if (frameCount % 100 === 0) {
    var x = Math.round(random(120,400));
    
    var door = createSprite(x, -50);
    var climber = createSprite(x, door.y+door.height/2);
    var block = createSprite(x, climber.y+15, 100, 5);
    
    // add images
    door.addImage(doorImg)
    climber.addImage(climberImg)
    // add velocities
    door.velocityY=2
    climber.velocityY=2
    block.velocityY=2
    // add lifetime
    door.lifetime=300
    climber.lifetime=300
    block.lifetime=300
    // add sprites to different groups
    doorsGroup.add(door)
  climbersGroup.add(climber)
  blocksGroup.add(block)
    ghost.depth=door.depth+2
    //change depth of the ghost
    
  }
}


