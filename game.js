function Game(canvas) {
  this._cContext = canvas.getContext("2d");

  this._camera = new Camera(canvas.width, canvas.height);

  this._testBlob = new Blob(this._cContext, this._camera, 0, 0, 20);
}

Game.prototype.Step = function(deltaTime) {
  this._testBlob.Logic(deltaTime);
  this._testBlob.Render();
}
