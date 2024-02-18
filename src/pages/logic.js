import Matter from 'matter-js';
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Composite = Matter.Composite;

var engine = Engine.create();

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: 'lightblue',
  }
});


var ground = Bodies.rectangle(300, 600, 200, 249, { isStatic: true,
  render: {
    sprite: {
        texture:
        "/public/fruit_stack.svg"
    }
} });
Composite.add(engine.world, [ ground]);

let tomato = Bodies.circle(300, 500, 35,  {
  render: {
      sprite: {
          texture:
          "/public/tomato.svg"
      }
  }
  });
  Composite.add(engine.world, [tomato]);


var floor = Bodies.rectangle(0, window.innerHeight, 10000, 200, { 
  render:{
fillStyle: 'gray'
  },
  isStatic: true
  
});
Composite.add(engine.world, [floor]);
var xAxis = Bodies.rectangle(100, window.innerHeight-100, 10000, 10, { 
  render:{
  
    fillStyle: 'white'
  },
    isStatic: true });
var yAxis = Bodies.rectangle(100, 0, 10, 10000, { 
  render:{
  
    fillStyle: 'white'
  },isStatic: true });
Composite.add(engine.world, [xAxis,  yAxis]);

Engine.run(engine);

Render.run(render);
var runner = Runner.create();

let btn = document.getElementById("btn");

var velocity;
var angle;

var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("demo1");
output1.innerHTML = slider1.value; // Display the default slider value
velocity = slider1.value/2;
calculateVelocityComponents();
// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  output1.innerHTML = this.value;
  velocity = this.value/2;
  calculateVelocityComponents();
}
var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value; // Display the default slider value
angle = slider2.value;
calculateVelocityComponents();
// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  output2.innerHTML = this.value;
  angle = this.value;
  calculateVelocityComponents();
}
function calculateVelocityComponents() {
  var cosA = Math.cos(angle * Math.PI / 180);
  var sinA = Math.sin(angle * Math.PI / 180);
  var velocityX = velocity * cosA;
  var velocityY = velocity * sinA;

  // Do something with velocityX and velocityY here
  btn.onclick = function() {

    Matter.Body.setVelocity( tomato, {x: velocityX, y: -velocityY});

    
   var mark;

   var impactXPos = null; // Initialize impact x-position
   
       Matter.Events.on(engine, 'afterUpdate', function(event) {
           var yPos = tomato.position.y;
           if (yPos > window.innerHeight-150 && impactXPos === null) {
               impactXPos = tomato.position.x;
               console.log("The ball hit the ground at x-coordinate:", impactXPos);
                mark = Bodies.rectangle(tomato.position.x, tomato.position.y+50, 30, 20, { 
                 render:{
                   fillStyle: 'white',
                   sprite: {
                     texture:
                     "/public/squished.svg"
                 }
                 },isStatic: true });
               Composite.add(engine.world, [mark]);
               Composite.remove(engine.world, [tomato]);
                
               let newTomato = Bodies.circle(300, 500, 35,  {
                render: {
                    sprite: {
                        texture:
                        "/public/tomato.svg"
                    }
                }
                });
                
                setTimeout(function() {Composite.add(engine.world, [newTomato]);
                  }, 800);
                
                
                tomato = newTomato;
           }
       });
   
  };
}
Engine.run(engine);


        






