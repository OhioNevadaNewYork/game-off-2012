var SPAWN_DISTANCE = 100;
var STARTING_SNIPPETS = 15;

function World(cContext, camera) {
  this._cContext = cContext;
  this._camera = camera;

  this._player = new Player(this._cContext, this._camera, 0, 0);

  this._testSnippets = new Array();
  for (var i = 0; i < STARTING_SNIPPETS; i++) {
    var coord = this._GetSpawnableCoord();
    this._testSnippets[i] = new Snippet(this._cContext, this._camera, coord[0], coord[1]);
  }
}

World.prototype._GetSpawnableCoord = function() {
  var playerToEdgeDistX = this._camera.GetViewWidth()/2;
  var playerToEdgeDistY = this._camera.GetViewHeight()/2;

  var leftBoundry = this._player.GetX() - playerToEdgeDistX;
  var rightBoundry = this._player.GetX() + playerToEdgeDistX;
  var topBoundry = this._player.GetY() - playerToEdgeDistY;
  var bottomBoundry = this._player.GetY() + playerToEdgeDistY;

  var x, y;
  do {
    x = Math.random()*(rightBoundry-leftBoundry) + leftBoundry;
    y = Math.random()*(bottomBoundry-topBoundry) + topBoundry;
  } while (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < SPAWN_DISTANCE)

  return new Array(x, y);
}

World.prototype._IsCollided = function(x1, y1, r1, x2, y2, r2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < r1 + r2
}

World.prototype.HandleInput = function(event) {
  event.worldX = this._camera.ReverseProjectX(event.canvasX);
  event.worldY = this._camera.ReverseProjectY(event.canvasY);
  this._player.HandleInput(event);
}

World.prototype.Logic = function(deltaTime) {
  this._player.Logic(deltaTime);
  for (var i = 0; i < 10; i++) {
    if (this._testSnippets[i]) {
      this._testSnippets[i].Logic(deltaTime);

      if (this._IsCollided(this._testSnippets[i].GetX(), this._testSnippets[i].GetY(), this._testSnippets[i].GetSize(), this._player.GetX(), this._player.GetY(), this._player.GetSize())) {
        this._player.HandleSnippetCollision();
        this._testSnippets[i] = undefined;
      }
    }
  }
}

World.prototype.Render = function() {
  this._player.Render();
  for (var i = 0; i < 10; i++) {
    if (this._testSnippets[i]) {
      this._testSnippets[i].Render();
    }
  }
}
