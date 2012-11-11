var D_KEYCODE = 68;

function Game(canvas) {
  this._canvas = canvas;
  this._cContext = canvas.getContext("2d");
  this._camera = new Camera(this._cContext, this._canvas.width, this._canvas.height);
  this._world = new World(this._cContext, this._camera);

  this._debugMode = false;
}

Game.prototype.HandleInput = function(event) {
  if ((event.type == "keydown") && (event.keyCode == D_KEYCODE))
  {
    this._debugMode = !this._debugMode;
    if (this._debugMode) {
      this._DisplayDebugScreen();
    } else {
      this._HideDebugScreen();
    }

    return;
  }

  this._world.HandleInput(event);
}

Game.prototype.Step = function(deltaTime) {
  if(this._debugMode) {
    return;
  }

  this._world.Logic(deltaTime);

  this._cContext.clearRect(this._camera.ReverseProjectX(0), this._camera.ReverseProjectY(0), this._camera.GetViewWidth(), this._camera.GetViewHeight());
  this._world.Render();
}

Game.prototype._DisplayDebugScreen = function() {
  var debugScreen = document.createElement("div");
  var container = document.getElementById("overlay-container");
  container.insertBefore(debugScreen, container.childNodes[0]);
  debugScreen.id = "debug-screen";
  debugScreen.innerHTML = "DEBUG MODE. GAME PAUSED.";
}

Game.prototype._HideDebugScreen = function() {
  var debugScreen = document.getElementById("debug-screen");
  debugScreen.parentNode.removeChild(debugScreen);
}

