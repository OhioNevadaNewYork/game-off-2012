var SPAWN_DISTANCE = 100;
var STARTING_SNIPPETS = 15;

function Game(canvas) {
  this._canvas = canvas;
  this._cContext = canvas.getContext("2d");
  this._camera = new Camera(this._canvas.width, this._canvas.height);
  this._world = new World(this._cContext, this._camera);
}

Game.prototype.HandleInput = function(event) {
  this._world.HandleInput(event);
}

Game.prototype.Step = function(deltaTime) {
  this._world.Logic(deltaTime);

  this._cContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
  this._world.Render();
}
