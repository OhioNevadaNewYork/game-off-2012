const TARGET_FPS = 24;

window.onload = function() {
  var canvas = document.getElementById('canvas');
  var game = new Game(canvas);

  setInterval(function(){
    game.Step(1/TARGET_FPS);
  }, 1000/TARGET_FPS);
};
