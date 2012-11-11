var RANDOM_REPO_SIZE_TOLERANCY = 4000; //Essentially how volatile/unstable/variable the difficulty is. TODO: Should follow normal distribution.

RepoManager.prototype = new EntityManager();
function RepoManager(world) {
  EntityManager.call(this, world);
}

RepoManager.prototype.SpawnRepo = function(codeSize, name) {
  var coord = this._world._GetSpawnableCoord(RepoCodeSizeToSize(codeSize));
  return this.SpawnEntity(new AIRepo(coord[0], coord[1], codeSize, name));
}

RepoManager.prototype.SpawnPlayer = function() {
  return this.SpawnEntity(new Player());
}

RepoManager.prototype.SpawnRandomRepo = function(targetCodeSize) {
  var upperLimit = targetCodeSize+(RANDOM_REPO_SIZE_TOLERANCY/2);
  var lowerLimit = targetCodeSize-(RANDOM_REPO_SIZE_TOLERANCY/2);

  for (repo in SOFTWARE) { //Obviously better algorithms
    codeSize = parseInt(repo);
    if ((codeSize >= lowerLimit) && (codeSize <= upperLimit)) {
      alert("SPAWNING "+SOFTWARE[repo]);
      return this.SpawnRepo(codeSize, SOFTWARE[repo]);
    }
  }
}

RepoManager.prototype.Logic = function(deltaTime) {
  EntityManager.prototype.Logic.call(this, deltaTime);
}
