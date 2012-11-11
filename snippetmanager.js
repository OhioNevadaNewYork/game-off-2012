SnippetManager.prototype = new EntityManager();
function SnippetManager(world, repoMan) {
  this._repoMan = repoMan;
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

  for (snippet in this._entities) {
    var repo = this._repoMan.CheckForCollision(this._entities[snippet].GetX(), this._entities[snippet].GetY(), this._entities[snippet].GetSize());
    if(repo) {
      repo[1].HandleSnippetCollision();
      this.DeleteEntity(snippet);
    }
  }
}


