function EntityManager(world) {
  this._world = world;

  this._entities = {};
  this._entitiesSpawned = 0;
  this._entitiesAlive = 0;
}

EntityManager.prototype.SpawnEntity = function(entity) {
  this._entities[this._entitiesSpawned] = entity;
  this._entitiesSpawned++;
  this._entitiesAlive++;
}

EntityManager.prototype.DeleteEntity = function(entityId) {
  delete this._entities[entityId];
  this._entitiesAlive--;
}

EntityManager.prototype.Logic = function(deltaTime) {
  for (entity in this._entities) {
    this._entities[entity].Logic(deltaTime);
    if (!this._world.IsWithinSimBoundries(this._entities[entity].GetX(), this._entities[entity].GetY())) {
      this.DeleteEntity(entity);
    }
  }
}

EntityManager.prototype.Render = function(cContext) {
  for (entity in this._entities) {
    this._entities[entity].Render(cContext);
  }
}

EntityManager.prototype.GetEntityCount = function() {
  return this._entitiesAlive;
}