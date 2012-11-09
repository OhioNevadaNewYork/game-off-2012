var TARGET_FPS = 10; //Sorry, I don't know enough Javascript to do this correctly. Your fix is appreciated :).

window.onload = function() {
  var canvas = document.getElementById('canvas');
  var game = new Game(canvas);

  setInterval(function(){
    game.Step(1/TARGET_FPS);
  }, 1000/TARGET_FPS);
};
