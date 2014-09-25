var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

var canvasWidth = 450,
    canvasHeight = 450;
canvas.height = canvasHeight;
canvas.width = canvasWidth;

var gravity = 0.2;

var ball = {},
    bounceFactor = 0.9;

ball = {
  // sound components.  Metaphor is ball = sound generator.
  // any of these can be overridden by object settings.
  pitch: 440,
  amp: 0,
  wave: "sawtooth",

  // ball position.  Starting values are center of canvas.
  x: canvasWidth/2,
  y: 50,

  // ball size and color
  radius: 15,
  color: "red",

  // velocity components
  vx: 2,
  vy: 2,

  draw: function() {
    //Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    this.amp = Math.abs(this.amp - .01);
    ballSound0.gainNode.gain.setValueAtTime(this.amp,audioContext.currentTime);
  }
};

// When we do animations in canvas, we have to repaint the whole canvas in each frame. Either clear the whole area or paint it with some color. This helps in keeping the area clean without any repetition mess.
// So, lets create a function that will do it for us.
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// A function that will update the position of the ball is also needed.
function update() {
  clearCanvas();
  ball.draw();

  // make the ball move by adding the velocity vectors to its position
  ball.y += ball.vy;
  ball.x += ball.vx;

  // ball acceleration
  ball.vy += gravity;

  //  floor rebound
  if(ball.y + ball.radius > canvasHeight) {
    // reposition the ball on top of the floor and bounce it
    ball.y = canvasHeight - ball.radius;
    ball.vy *= -bounceFactor;
    // bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
    ballSound0.makeSound(400, "sawtooth", 1);
    // call sound with pitch and wave assigned to wall object.
  }

  // ceiling rebound
  if(ball.y - ball.radius < 0) {
    // reposition the ball on top of the floor and bounce it
    ball.y = 0 + ball.radius;
    ball.vy *= -bounceFactor;
    // bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
    ballSound0.makeSound(200, "square", 1);
    // call sound with pitch and wave assigned to wall object.
  }

  // left rebound
  if(ball.x - ball.radius < 0) {
    // reposition the ball on top of the floor and bounce it
    ball.x = 0 + ball.radius;
    ball.vx *= -bounceFactor;
    // bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
    ballSound0.makeSound(800, "sine", 1);
    // call sound with pitch and wave assigned to wall object.
  }

  // right rebound
  if(ball.x + ball.radius > canvasWidth) {
    // reposition the ball on top of the floor and bounce it
    ball.x = canvasWidth - ball.radius;
    ball.vx *= -bounceFactor;
    // bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
    ballSound0.makeSound(800, "triangle", 1);
    // call sound with pitch and wave assigned to wall object.
  }
}

// in setInterval, 1000/x depicts x fps.  Set to 60fps for smoother animations.
setInterval(update, 1000/60);

var audioContext = new webkitAudioContext();
  audioContext.sampleRate = 44100;
  var Sound = {
  initialize: function(){
    this.osc = audioContext.createOscillator();
    this.osc.noteOn(0);
    this.osc.type = 'sawtooth';
    this.gainNode = audioContext.createGain();
    this.gainNode.gain.value = 0;
    this.osc.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
  },
  makeSound: function(pitch, wave, amp){
    var now = audioContext.currentTime;
    this.osc.type = wave;
    this.osc.frequency.setValueAtTime(pitch, now);
    ball.amp = amp;
    this.gainNode.gain.setValueAtTime(ball.amp, now);
  }
}

var ballSound0 = Object.create(Sound);
ballSound0.initialize();



// jQuery EventListeners
$('#gravOnButton').click(function(){
  gravity = 0.2;
});

$('#gravOffButton').click(function(){
  gravity = 0.0;
});



// var clicks = 0;
// var lastClick = [0, 0];

// document.getElementById('canvas').addEventListener('click', drawLine, false);

// function getCursorPosition(e) {
//     var x;
//     var y;

//     if (e.pageX != undefined && e.pageY != undefined) {
//         x = e.pageX;
//         y = e.pageY;
//     } else {
//         x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }

//     return [x, y];
// }

// function drawLine(e) {
//     context = this.getContext('2d');

//     x = getCursorPosition(e)[0] - this.offsetLeft;
//     y = getCursorPosition(e)[1] - this.offsetTop;

//     if (clicks != 1) {
//         clicks++;
//     } else {
//         context.beginPath();
//         context.moveTo(lastClick[0], lastClick[1]);
//         context.lineTo(x, y, 6);

//         context.strokeStyle = '#000000';
//         context.stroke();

//         clicks = 0;
//     }

//     lastClick = [x, y];
// };


