function Camera(cContext, width, height) {
  this._widthP = width;
  this._heightP = height;
  this._width = width;
  this._height = height;
  this._zoom = 1;
  this._cContext = cContext;

  this._x = 0;
  this._y = 0;
  this._cContext.translate((this._width/2), (this._height/2));

  this._zoomListeners = new Array();
}

Camera.prototype.Track = function(x, y) {
  // Similar to Move(), but much more loose tracking.
  //TODO: smooth the motion. [This is right up my ally as an applied math major, but you (Nate especially) are free to implement it.]

  if (this.ProjectX(x) > this._widthP*(3/4)) {
    this.Move(this._x + (this.ProjectX(x) - this._widthP*(3/4)), this._y);
  }
  else if (this.ProjectX(x) < this._widthP*(1/4)) {
    this.Move(this._x + (this.ProjectX(x) - this._widthP*(1/4)), this._y);
  }

  if (this.ProjectY(y) > this._heightP*(3/4)) {
    this.Move(this._x, this._y + (this.ProjectY(y) - this._heightP*(3/4)));
  }
  else if (this.ProjectY(y) < this._heightP*(1/4)) {
    this.Move(this._x, this._y + (this.ProjectY(y) - this._heightP*(1/4)));
  }
}

Camera.prototype.Move = function(x, y) {
  // Center camera on provided coordinates.
  this._cContext.translate((this._x - x), (this._y - y));
  this._x = x;
  this._y = y;
}

Camera.prototype.AddZoomListener = function(listenerFunc) {
  this._zoomListeners.push(listenerFunc);
}

Camera.prototype.SetZoom = function(z) {
  this._cContext.scale(1/z, 1/z); //I can't believe canvas allows this!
  this._zoom = z;
  this._width = this._widthP*z;
  this._height = this._heightP*z;

  this._zoomListeners.forEach(function(listenerFunc){
    listenerFunc();
  });
}

Camera.prototype.ProjectX = function(x) {
  return ((x - this._x) + this._width/2)/this._zoom;
}

Camera.prototype.ProjectY = function(y) {
  return ((y - this._y) + this._height/2)/this._zoom;
}

Camera.prototype.ReverseProjectX = function(x) {
  return ((x*this._zoom + this._x) - this._width/2);
}

Camera.prototype.ReverseProjectY = function(y) {
  return ((y*this._zoom + this._y) - this._height/2);
}

Camera.prototype.GetViewWidth = function() {
  return this._width;
}

Camera.prototype.GetViewHeight = function() {
  return this._height;
}

Camera.prototype.GetX = function() {
  return this._x;
}

Camera.prototype.GetY = function() {
  return this._y;
}