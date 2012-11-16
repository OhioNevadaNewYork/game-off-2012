AIRepo.prototype = new Repo();
function AIRepo(x, y, codeSize, name) {
  Repo.call(this, x, y, codeSize, name);

  this._targetX = 0;
  this._targetY = 0;
  do {
    this._targetX = ((Math.random()*10000)-5000) + x;
    this._targetY = ((Math.random()*10000)-5000) + y;
  } while (Math.sqrt(Math.pow(this._targetX, 2) + Math.pow(this._targetY, 2)) < 2000)
}
AIRepo.prototype.Logic = function(deltaTime) {
  //AI.. ?

  this.AddForce(this._targetX-this._x, this._targetY-this._y);

  Repo.prototype.Logic.call(this, deltaTime);
}