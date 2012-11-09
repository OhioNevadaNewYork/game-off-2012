function Blob(cContext, camera, x, y, size) {
  this._cContext = cContext;
  this._camera = camera;

  this._x = x;
  this._y = y;
  this._size = size;

  this._xVel = 1;
  this._yVel = 1;
}

Blob.prototype.Logic = function(deltaTime) {
  this._x += this._xVel*deltaTime;
  this._y += this._yVel*deltaTime;
}

Blob.prototype.Render = function() {
  this._camera.Render(this, this._x, this._y);
}

Blob.prototype.Draw = function(x, y) {
  this._cContext.beginPath();
  this._cContext.arc(x, y, this._size, 0, 2*Math.PI);
  this._cContext.stroke();
}
