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
      console.log("DEBUG: SPAWNING "+SOFTWARE[repo]);
      return this.SpawnRepo(codeSize, SOFTWARE[repo]);
    }
  }
}

RepoManager.prototype.Logic = function(deltaTime) {
  EntityManager.prototype.Logic.call(this, deltaTime);

  for (repo in this._entities) {
    var repo2 = this.CheckForCollision(this._entities[repo].GetX(), this._entities[repo].GetY(), this._entities[repo].GetSize(), repo);
    if (repo2) {
      var repo1 = [repo, this._entities[repo]];
      if ((repo2[1].GetSpeed() + repo1[1].GetSpeed()) > 300) {
        //There was a fatal collision
        //I strongly dislike this method of determining the outcome. It is just here for now until gameplay polishing (needs real physics!)

        var winner;
        var loser;

        if (repo2[1].GetCodeSize() > repo1[1].GetCodeSize()) {
          winner = repo2;
          loser = repo1;
        } else {
          winner = repo1;
          loser = repo2;
        }

        winner[1].HandleRepoCollision(loser[1]);
        loser[1].Disintegrate(winner[1]);
         console.log("DELETING LOSER, ID "+loser[0]+". NAME: "+loser[1].GetName());
        this.DeleteEntity(loser[0]);

        break; //Easier than worry about iterating over nonexistant entries. No real difference.
      }
    }
  }
}
