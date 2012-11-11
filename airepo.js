AIRepo.prototype = new Repo();
function AIRepo(x, y, codeSize, name) {
  Repo.call(this, x, y, codeSize, name);

  var tx;
  var ty;
  do {
    tx = ((Math.random()*10000)-5000) + x;
    ty = ((Math.random()*10000)-5000) + y;
  } while (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)) < 2000)

  this._SetTarget(tx, ty);
}

AIRepo.prototype.Logic = function(deltaTime) {
  //AI.. ?

  Repo.prototype.Logic.call(this, deltaTime);
}