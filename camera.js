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

Camera.prototype.ProjectX = function(x) {
  return (x - this._x);
}

Camera.prototype.ProjectY = function(y) {
  return (y - this._y);
}

Camera.prototype.ReverseProjectX = function(x) {
  return (this._x + x);
}

Camera.prototype.ReverseProjectY = function(y) {
  return (this._y + y);
}

Camera.prototype.Render = function(entity, x, y) {
  entity.Draw(this.ProjectX(x), this.ProjectY(y));
  //TODO: Apparently HTML5 canvas provides a transformation matrix! Really awesome, use it.
}

Camera.prototype.GetViewWidth = function() {
  return this._width;
}

Camera.prototype.GetViewHeight = function() {
  return this._height;
}