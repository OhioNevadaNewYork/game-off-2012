function Game(canvas) {
  this._canvas = canvas;
  this._cContext = canvas.getContext("2d");

  this._camera = new Camera(this._canvas.width, this._canvas.height);

  this._testSnippets = new Array();
  for(var i = 0; i < 10; i++) {
    this._testSnippets[i] = new Snippet(this._cContext, this._camera, 0, 0);
  }

  this._player = new Player(this._cContext, this._camera, 0, 0);
}

Game.prototype.HandleInput = function(event) {
  event.worldX = this._camera.ReverseProjectX(event.canvasX);
  event.worldY = this._camera.ReverseProjectY(event.canvasY);
  this._player.HandleInput(event);
}

Game.prototype.Step = function(deltaTime) {
  this._player.Logic(deltaTime);
  for(var i = 0; i < 10; i++) {
    this._testSnippets[i].Logic(deltaTime);
  }

  this._cContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

  this._player.Render();
  for(var i = 0; i < 10; i++) {
    this._testSnippets[i].Render();
  }
}
