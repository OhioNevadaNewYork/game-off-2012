var GOLDEN_ANGLE = 2.39996;

Repo.prototype = new Blob();
function Repo(x, y, codeSize, name) {
  this._codeSize = codeSize;

  this._force = 250; //Make this a function of codesize later when proper acceleration & physics are implemented.

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

Repo.prototype.AddCode = function(codeSize) {
  this._codeSize += codeSize;
  this._size = RepoCodeSizeToSize(this._codeSize);
}

Repo.prototype._SetTarget = function(x, y) {
  this._targetX = x;
  this._targetY = y;

  //The motion is smoothed via the magic of iterative physics integration now
  var angle = Math.atan2(this._targetY-this._y, this._targetX-this._x);
  this.AddForce(Math.cos(angle)*this._force, Math.sin(angle)*this._force);
}

Repo.prototype.Logic = function(deltaTime) {

  Blob.prototype.Logic.call(this, deltaTime);

  var repo = this;
  this._developers.forEach(function(developer){
    developer.UpdateCenter(repo._x, repo._y);
    developer.Logic(deltaTime);
  });
}

Repo.prototype.DebugRender = function(cContext) {
  Blob.prototype.DebugRender.call(this, cContext);

  this._developers.forEach(function(developer){
    developer.DebugRender(cContext);
  });
}

Repo.prototype.HandleSnippetCollision = function() {
  this.AddCode(70);
  var repo = this;
  this._developers.forEach(function(developer){
    developer.UpdateParentRadius(repo._size);
  });
}

Repo.prototype.HandleRepoCollision = function(repo) {
  //To be clear - this is called only if the other repo does not destroy you.
  this.AddCode(repo.GetCodeSize()/2);

  for(var i = 0; i < repo.GetDeveloperCount() - 1; i++) {
    this.AddDeveloper();
  }
}

Repo.prototype.Disintegrate = function(terminator) {
  //Special effects etc. Need graphics.
}

Repo.prototype.GetCodeSize = function() {
  return this._codeSize;
}

Repo.prototype.GetName = function() {
  return this._text;
}

Repo.prototype.GetDeveloperCount = function() {
  return this._developers.length;
}

function RepoCodeSizeToSize(codeSize) {
  return Math.sqrt(codeSize);
}
