var dog;
var happyDogImg, dogImg;
var database;
var foodS;
var foodStock;
var readStock;
var fedTime, lastFed, feed, addFood;
var foodObj;
var feed;

function preload()
{
	dogImg = loadImage ("images/dogImg.png")
  happyDogImg = loadImage ("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 400);

   foodObj = new Food();

  database = firebase.database();
 foodStock = database.ref("food");
 foodStock.on("value", readStock);
 foodStock.set(20);

  dog = createSprite("Feed The Dog");
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createSprite(800,200,150,150);
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addfood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87)

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function (data)  {
  lastFed = data.val();
} )

fill(255,255,254);
textSize(15);
if (lastFed >= 12){
  text("Last Feed: "  + lastFed %12 + "PM", 350, 30);
}
else if(lastFed == 0){
  text("Last Feed: 12AM", 350, 30);
}
else{
  text("Last Feed: " + lastFed + "AM" , 350, 30);
}





drawSprites();
}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){

  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
  











