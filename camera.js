function Camera(width, height) {
  this._x = 0;
  this._y = 0;
  this._width = width;
  this._height = height;
  this._zoom = 1;

  this.Move(0,0);
}

Camera.prototype.Move = function(x, y) {
  // Center camera on provided coordinates.
  this._x = x - this._width/2;
  this._y = y - this._height/2;
}

Camera.prototype.Render = function(entity, x, y) {
  entity.Draw(x - this._x, y - this._y);
}