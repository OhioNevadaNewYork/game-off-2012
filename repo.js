var GOLDEN_ANGLE = 2.39996;

Repo.prototype = new Blob();
function Repo(x, y, codeSize, name) {
  this._codeSize = codeSize;

  this._speed = 220; //Make this a function of codesize later when proper acceleration & physics are implemented.

  this._targetX = 0;
  this._targetY = 0;

  this._developers = new Array();

  Blob.call(this, x, y, RepoCodeSizeToSize(this._codeSize), name);

  for(var i = 0; i < Math.floor(this._codeSize/1000); i++) {
    this.AddDeveloper();
  }
}

Repo.prototype.AddDeveloper = function() {
  var angle = 0;
  if(this._developers.length >= 1) {
    angle = this._developers[this._developers.length-1].GetAngle() + GOLDEN_ANGLE;
  }
  this._developers.push(new Developer(this._x, this._y, this._size, angle));
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

  var repo = this;
  this._developers.forEach(function(developer){
    developer.UpdateCenter(repo._x, repo._y);
    developer.Logic(deltaTime);
  });
}

Repo.prototype.Render = function(cContext) {
  Blob.prototype.Render.call(this, cContext);

  this._developers.forEach(function(developer){
    developer.Render(cContext);
  });
}

Repo.prototype.HandleSnippetCollision = function() {
  this._codeSize += 70;
  this._size = RepoCodeSizeToSize(this._codeSize);
  var repo = this;
  this._developers.forEach(function(developer){
    developer.UpdateRadius(repo._size);
  });
}

Repo.prototype.GetCodeSize = function() {
  return this._codeSize;
}

//Going to not try testing how to make static functions, so here is a global:
function RepoCodeSizeToSize(codeSize) {
  return Math.sqrt(codeSize);
}