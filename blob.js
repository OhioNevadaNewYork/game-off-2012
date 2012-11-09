function Blob(cContext, camera, x, y, size, text) {
  this._cContext = cContext;
  this._camera = camera;

  this._x = x;
  this._y = y;
  this._size = size;
  this._text = text;

  this._xVel = 0;
  this._yVel = 0;
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

  this._cContext.font="10px Arial";
  var textWidth = this._cContext.measureText(this._text).width;
  this._cContext.fillText(this._text, x - textWidth/2, y+2.5);
}
