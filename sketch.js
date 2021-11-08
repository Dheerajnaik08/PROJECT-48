const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var teddy_con;


var bg_img;
var food;
var rabbit;

var button,blower;
var bean_standing;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var beanhappy, beansad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('Teddy.png');
  rabbit = loadImage('bean_standing.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
 
  air = loadSound('air.wav');

  beanhappy = loadImage("BeanWithTeddy.png");
  beansad = loadImage("Bean_Sad.png")

  
}

function setup() {
  createCanvas(500,700);
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  

  bean_standing = createSprite(220,620,100,100);
  bean_standing.scale = 0.2;
  bean_standing.addImage(rabbit);
  
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  teddy_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bean_standing)==true)
  {
    bean_standing.addImage(beanhappy);
 
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bean_standing.addImage(beansad);
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  teddy_con.detach();
  teddy_con = null; 
}

function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
              fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}



function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}