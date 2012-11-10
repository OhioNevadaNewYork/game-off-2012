function Camera(cContext, width, height) {
  this._width = width;
  this._height = height;
  this._zoom = 1;
  this._cContext = cContext;

  this._x = 0;
  this._y = 0;
  this._cContext.translate((this._width/2), (this._height/2));
}

Camera.prototype.Move = function(x, y) {
  // Center camera on provided coordinates.
  this._cContext.translate((this._x - x), (this._y - y));
  this._x = x;
  this._y = y;
}

Camera.prototype.ProjectX = function(x) {
  return (x + this._x);
}

Camera.prototype.ProjectY = function(y) {
  return (y + this._y);
}

Camera.prototype.ReverseProjectX = function(x) {
  return (x - (this._width/2) + this._x);
}

Camera.prototype.ReverseProjectY = function(y) {
  return (y - (this._height/2) + this._y);
}

Camera.prototype.GetViewWidth = function() {
  return this._width;
}

Camera.prototype.GetViewHeight = function() {
  return this._height;
}