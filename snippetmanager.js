SnippetManager.prototype = new EntityManager();
function SnippetManager(world, repoMan, player) {
  this._repoMan = repoMan;
  this._player = player;
  EntityManager.call(this, world);
}

SnippetManager.prototype.SetTargetSnippetCount = function(targetSnippetCount) {
  this._targetSnippetCount = targetSnippetCount;
}

SnippetManager.prototype.SpawnSnippet = function() {
  var coord = this._world._GetSpawnableCoord(SNIPPET_SIZE);
  this.SpawnEntity(new Snippet(coord[0], coord[1]));
}

SnippetManager.prototype.Logic = function(deltaTime) {
  while (this._entitiesAlive < this._targetSnippetCount) {
    this.SpawnSnippet();
  }

  EntityManager.prototype.Logic.call(this, deltaTime);

  //Temp until physics refactor
  for (snippet in this._entities) {
    if (IsCollided(this._entities[snippet].GetX(), this._entities[snippet].GetY(), this._entities[snippet].GetSize(), this._player.GetX(), this._player.GetY(), this._player.GetSize())) {
      this._player.HandleSnippetCollision();
      this.DeleteEntity(snippet);
    } else {
      var repo = this._repoMan.CheckForCollision(this._entities[snippet].GetX(), this._entities[snippet].GetY(), this._entities[snippet].GetSize());
      if(repo) {
        repo.HandleSnippetCollision();
        this.DeleteEntity(snippet);
        break;
      }
    }
  }
}


