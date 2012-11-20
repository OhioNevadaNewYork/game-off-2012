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
  this._friction = 0.62;
  //terminal velocity
  this._terminalVelocity = 200;

  //force over time application
  this._forceTX = 0.0;
  this._forceTY = 0.0;
  this._forceT  = 0.0;
}

Blob.prototype.Logic = function(deltaTime) {
  //force over time
  if (this._forceT > 0.0) {
    var fmul = 0.0
    if (deltaTime >= this._forceT) {
      fmul = 1.0;
    }
    else {
      fmul = deltaTime / this._forceT;
    }
    var applyForceX = fmul * this._forceTX;
    var applyForceY = fmul * this._forceTY;
    this._forceX += applyForceX;
    this._forceY += applyForceY;
    this._forceT -= deltaTime;
    if (this._forceT <= 0.0) {
      this._forceT = 0.0;
      this._forceTX = 0.0;
      this._forceTY = 0.0;
    }
    else {
      this._forceTX -= applyForceX;
      this._forceTY -= applyForceY;
    }
  }
  //Simple Euler Integration
  var accX = this._forceX / this._mass;
  var accY = this._forceY / this._mass;
  this._velX += accX * deltaTime;
  this._velY += accY * deltaTime;
  var speed = Math.sqrt(Math.pow(this._velX, 2) + Math.pow(this._velY, 2))
  //handle terminal velocity
  if (speed > this._terminalVelocity) {
    var velmul = this._terminalVelocity / speed
    this._velX *= velmul
    this._velY *= velmul
  }
  this._x += this._velX * deltaTime;
  this._y += this._velY * deltaTime;
  //clear force accumulators
  this._forceX = 0;
  this._forceY = 0;
  //integrate friction
  this._velX -= deltaTime*(this._velX-this._friction*this._velX);
  this._velY -= deltaTime*(this._velY-this._friction*this._velY);
}

//Add a force to the blob
Blob.prototype.AddForce = function(fx, fy) {
  this._forceX += fx;
  this._forceY += fy;
}

//Add a force to be applied over some amount of time
Blob.prototype.AddForceOverTime = function(fx, fy, t) {
  this._forceTX += fx;
  this._forceTY += fy;
  this._forceT  += t;
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
