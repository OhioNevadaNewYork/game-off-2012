Blob.prototype = new CollidableEntity();
function Blob(x, y, size, text) {
  CollidableEntity.call(this, x, y, size);
  this._text = text;
  
  //force accumulator vector
  this._forceX = 0.0;
  this._forceY = 0.0;
  //velocity vector
  this._velX = 0.0;
  this._velY = 0.0;
  //mass of the blob
  this._mass = 1.0;
  //friction (drag) on the blob. The LOWER this
  //value, the MORE drag
  this._friction = 0.985;
}

Blob.prototype.Logic = function(deltaTime) {
  //Simple Euler Integration
  var accX = this._forceX / this._mass;
  var accY = this._forceY / this._mass;
  this._velX += accX * deltaTime;
  this._velY += accY * deltaTime;
  this._x += this._velX * deltaTime;
  this._y += this._velY * deltaTime;
  //clear force accumulators
  this._forceX = 0;
  this._forceY = 0;
  //friction
  this._velX *= this._friction;
  this._velY *= this._friction;
}

//Add a force to the blob
Blob.prototype.AddForce = function(fx, fy) {
  this._forceX += fx;
  this._forceY += fy;
}

Blob.prototype.DebugRender = function(cContext) {
  cContext.beginPath();
  cContext.arc(this._x, this._y, this._size, 0, 2*Math.PI);
  cContext.stroke();

  cContext.font="10px Arial";
  var textWidth = cContext.measureText(this._text).width;
  cContext.fillText(this._text, this._x - textWidth/2, this._y+2.5);
}

Blob.prototype.GetSpeed = function() {
  return Math.sqrt(Math.pow(this._velX, 2) + Math.pow(this._velY, 2));
}
