//let xoff1 = 0;
//let xoff2 = 1000;
let inc = 0.1;
var scl = 10;
var cols, rows;
var canvas;
var song; 

let zoff = 0;

let fr; 

let particles = [];

let flowfield;

var colorInc = 0.5;  // Color change speed
var sat = 100; // saturation max 100
var brt = 100; // brightness max 100
var alph = 10; // alpha max 100
var hu = 0;

function preload() {
  song = loadSound('videoplayback.mp3');
}

function mouseClicked() {
  if(song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  colorMode(HSB,359,100,100,100);

  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols*rows)

  for ( let i=0; i< 10000; i++) {

  particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  
  let yoff = 0;
  
  for (let y = 0; y < rows; y++) {
    let xoff = 0; 
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      flowfield[index]
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      //stroke(0, 50);
      //push();
      //translate( x * scl, y * scl);
      //rotate(v.heading());
      //strokeWeight(1);
      //line(0, 0, scl, 0);
      //pop();
    }
    yoff+= inc;
    zoff += 0.0003;
  }

  for (let i = 0;i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  //fr.html(floor(frameRate()));
  hu +=colorInc; if (hu >359){hu=0}
}
