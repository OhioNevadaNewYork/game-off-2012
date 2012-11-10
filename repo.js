Repo.prototype = new Blob();
function Repo(cContext, x, y, codeSize, name) {
  this._codeSize = codeSize;

  this._speed = 220; //Make this a function of codesize later when proper acceleration & physics are implemented.

  this._targetX = 0;
  this._targetY = 0;

  Blob.call(this, cContext, x, y, RepoCodeSizeToSize(this._codeSize), name);
}

Repo.prototype._SetTarget = function(x, y) {
  this._targetX = x;
  this._targetY = y;

  //TODO: smooth the motion. [This is right up my ally as an applied math major, but you (Nate especially) are free to implement it.]

  var angle = Math.atan2(this._targetY-this._y, this._targetX-this._x);
  this._velX = Math.cos(angle)*this._speed;
  this._velY = Math.sin(angle)*this._speed;
}

Repo.prototype.Logic = function(deltaTime) {
  //Navigation
  if (Math.abs(this._x - this._targetX) < NAVIGATION_TOLERANCY) {
    this._velX = 0;
  }
  if (Math.abs(this._y - this._targetY) < NAVIGATION_TOLERANCY) {
    this._velY = 0;
  }

  Blob.prototype.Logic.call(this, deltaTime);
}

Repo.prototype.HandleSnippetCollision = function() {
  this._codeSize += 70;
  this._size = RepoCodeSizeToSize(this._codeSize);
}

Repo.prototype.GetCodeSize = function() {
  return this._codeSize;
}

//Going to not try testing how to make static functions, so here is a global:
function RepoCodeSizeToSize(codeSize) {
  return Math.sqrt(codeSize);
}