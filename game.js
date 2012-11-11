var D_KEYCODE = 68; //'D'
var ESC_KEYCODE = 27;
var PAUSE_KEYCODE = 19;

function Game(canvas) {
  this._canvas = canvas;
  this._cContext = canvas.getContext("2d");
  this._camera = new Camera(this._cContext, this._canvas.width, this._canvas.height);
  this._world = new World(this._cContext, this._camera);

  this._paused = false;
  this._debugRender = true;
}

Game.prototype.HandleInput = function(event) {
  if ((event.type == "keydown") && ((event.keyCode == D_KEYCODE) || (event.keyCode == PAUSE_KEYCODE) || (event.keyCode == ESC_KEYCODE)))
  {
    this._paused = !this._paused;
    if (this._paused) {
      this._DisplayPauseScreen();
    } else {
      this._HidePauseScreen();
    }

    return;
  }

  this._world.HandleInput(event);
}

Game.prototype.Step = function(deltaTime) {
  if(this._paused) {
    return;
  }

  this._world.Logic(deltaTime);

  this._Render();
}

Game.prototype._Render = function() {
  this._cContext.clearRect(this._camera.ReverseProjectX(0), this._camera.ReverseProjectY(0), this._camera.GetViewWidth(), this._camera.GetViewHeight());
  if (this._debugRender) {
    this._world.DebugRender();
  } else {
    //this._world.Render();
  }
}

Game.prototype._DisplayPauseScreen = function() {
  var pauseScreen = document.createElement("div");
  var container = document.getElementById("overlay-container");
  container.insertBefore(pauseScreen, container.childNodes[0]);
  pauseScreen.id = "pause-screen";
  pauseScreen.innerHTML = "<h2>GAME PAUSED</h2>"+
  "<p>Press [ESC] to unpause</p>"+
  "<h3>Debug</h3>"+
  "<input type=\"checkbox\" id=\"debug-render\" name=\"debug-render\"/><label for=\"debug-render\">Debug rendering</label>";

  var debugRenderCheckbox = document.getElementById("debug-render");

  var game = this;
  debugRenderCheckbox.checked = this._debugRender;
  debugRenderCheckbox.addEventListener('click', function(event) {
    game._debugRender = debugRenderCheckbox.checked;
    game._Render();
  });

  /*this._tag = document.createElement("div");
  var container = document.getElementById("overlay-container");
  container.insertBefore(this._tag, container.childNodes[0]);
  this._tag.id = "debug-tag";
  this._tag.innerHTML = "DEBUG";*/
}

Game.prototype._HidePauseScreen = function() {
  var pauseScreen = document.getElementById("pause-screen");
  pauseScreen.parentNode.removeChild(pauseScreen);
}

