var TARGET_FPS = 24;
var gameLoop_IntervalId = undefined;

window.onload = function() {
  var canvas = document.getElementById('canvas');
  var game = new Game(canvas);

  gameLoop_IntervalId = setInterval(function(){
    game.Step(1/TARGET_FPS);
  }, 1000/TARGET_FPS);

  document.addEventListener('click', function(event){
    event.canvasX = event.pageX-canvas.offsetLeft;
    event.canvasY = event.pageY-canvas.offsetTop;

    game.HandleInput(event);
  });

  document.addEventListener('keydown', function(event){
    game.HandleInput(event);
  });
};


function StopGameLoop() {
  clearInterval(gameLoop_IntervalId);
}