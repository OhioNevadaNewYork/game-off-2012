Blob.prototype = new CollidableEntity();
function Blob(x, y, size, text) {
  CollidableEntity.call(this, x, y, size);
  this._text = text;

  this._velX = 0;
  this._velY = 0;
}

Blob.prototype.Logic = function(deltaTime) {
  this._x += this._velX*deltaTime;
  this._y += this._velY*deltaTime;
}

Blob.prototype.DebugRender = function(cContext) {
  cContext.beginPath();
  cContext.arc(this._x, this._y, this._size, 0, 2*Math.PI);
  cContext.stroke();

  cContext.font="10px Arial";
  var textWidth = cContext.measureText(this._text).width;
  cContext.fillText(this._text, this._x - textWidth/2, this._y+2.5);
}