var RANDOM_REPO_SIZE_TOLERANCY = 4000; //Essentially how volatile/unstable/variable the difficulty is. TODO: Should follow normal distribution.

RepoManager.prototype = new EntityManager();
function RepoManager(world, player) {
  this._player = player;
  EntityManager.call(this, world);
}

RepoManager.prototype.SpawnRepo = function(codeSize, name) {
  var coord = this._world._GetSpawnableCoord(RepoCodeSizeToSize(codeSize));
  this.SpawnEntity(new AIRepo(coord[0], coord[1], codeSize, name));
}

RepoManager.prototype._SpawnRandomRepo = function(targetCodeSize) {
  var upperLimit = targetCodeSize+(RANDOM_REPO_SIZE_TOLERANCY/2);
  var lowerLimit = targetCodeSize-(RANDOM_REPO_SIZE_TOLERANCY/2);

  for (repo in SOFTWARE) { //Obviously better algorithms
    codeSize = parseInt(repo);
    if ((codeSize >= lowerLimit) && (codeSize <= upperLimit)) {
      this.SpawnRepo(codeSize, SOFTWARE[repo]);
      break;
    }
  }
}

RepoManager.prototype.Logic = function(deltaTime) {
  if (this._player.GetCodeSize() >= 1000) {
    if(this.GetEntityCount() == 0) {
      this._SpawnRandomRepo(this._player.GetCodeSize());
      //this._SpawnRandomRepo(6000);
    }
  }

  EntityManager.prototype.Logic.call(this, deltaTime);
}

EntityManager.prototype.CheckForCollision = function(x, y, size) { //returns whatever repo collides with given point
  for (entity in this._entities) {
    if (IsCollided(this._entities[entity].GetX(), this._entities[entity].GetY(), this._entities[entity].GetSize(), x, y, size)) {
      return this._entities[entity];
    }
  }

  return undefined;
}
