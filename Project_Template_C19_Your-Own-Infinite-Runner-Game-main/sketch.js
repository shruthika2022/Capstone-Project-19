
var gameState="play"
var fish, seaweed1, seaweed2, seaweed3
var ocean
var seaweedGroup
var score


function preload(){

fish1Img = loadAnimation("fish1.png","fish2.png","fish3.png");
seaweed1 = loadImage("seaweed1.png");
seaweed2 = loadImage("seaweed2.png");
seaweed3 = loadImage("seaweed3.png");
oceanImage = loadImage("ocean.jpg");


}

function setup() {
 createCanvas(550,600);

 seaweedGroup = createGroup();

 ocean = createSprite(200,300,600,600);
 ocean.scale = 5.4
 ocean.x = ocean.width/2
 
 ocean.addImage("ocean", oceanImage);


 fish = createSprite(150,200,30,50);
 fish.addAnimation("fish", fish1Img);

 fish.setCollider("circle",10,10,70);
 fish.debug = true;
 fish.setCollider.visible = false;

}

function draw() {
 background(255);
 

 if(gameState === "play"){
    ocean.velocityX = -2
    spawnObstacles();
    textSize(50);
    fill("white");
    text("score"+score, 500,500)
    
    if(ocean.x < 0){
        ocean.x = ocean.width/2
    }
    if(keyDown("down")){
        fish.y = fish.y+5                                           
    }
    if(keyDown("up")){
        fish.y = fish.y-5
    }
    if(keyDown("right")){
        fish.x = fish.x+5
    }

    if(keyDown("down" || "up" || "right")){
        score = score+50
    }
    
     if(fish.isTouching(seaweedGroup)){
        gameState = "end";
    }
    
}
drawSprites();
if(gameState === "end"){
    fish.destroy()
    seaweedGroup.destroyEach();
    ocean.velocityX = 0;
    textSize(50);
    fill("white")
    text("GAME OVER",120,300);

}
}





function spawnObstacles() {
    if(frameCount % 60 === 0){
        var seaweed = createSprite(400,165,10,40);
        seaweed.velocityX = -6;
        seaweed.scale = 2
        
        seaweed.y = Math.round(random(50,550));

         //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: seaweed.addImage(seaweed1);
                   break;
           case 2: seaweed.addImage(seaweed2);
                   break;
           case 3: seaweed.addImage(seaweed3);
                   break;
           default: break;
         }
         seaweedGroup.add(seaweed);
        }
         
}