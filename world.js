var TARGET_SNIPPET_DENSITY = 0.0020833333; //Measured in snippets per 100 pixels. (A 10x10 block of pixels)
var HIDDEN_SIM_SIZE_EXTEND_RATIO = 0.5; //Relative to visible sim size (what the camera can see).

function World(cContext, camera) {
  this._cContext = cContext;
  this._camera = camera;

  this._targetSnippetCount = this._GetTargetSnippetCount();
  this._hiddenSimSizeExtend = this._GetHiddenSimSizeExtend();

  this._player = new Player(this._cContext);

  this._snippets = {};
  this._snippetsSpawned = 0;

  this._UpdateSimBoundries();

  while ( this._snippetsSpawned < this._targetSnippetCount) {
    this._SpawnSnippet();
  }
}

World.prototype._SpawnSnippet = function() {
  var coord = this._GetSpawnableCoord();
  this._snippets[this._snippetsSpawned] = new Snippet(this._cContext, coord[0], coord[1]);
  this._snippetsSpawned++;
}

World.prototype._GetHiddenSimSizeExtend = function() {
  return HIDDEN_SIM_SIZE_EXTEND_RATIO*(this._camera.GetViewWidth() + this._camera.GetViewHeight())/2;
}
World.prototype._GetSimArea = function() {
  var hiddenSimSizeExtend = this._GetHiddenSimSizeExtend();
  return (2*hiddenSimSizeExtend + this._camera.GetViewWidth())*(2*hiddenSimSizeExtend + this._camera.GetViewHeight());
}
World.prototype._GetTargetSnippetCount = function() {
  return this._GetSimArea()/100 * TARGET_SNIPPET_DENSITY;
}

World.prototype._UpdateSimBoundries = function() {
  this._simBoundries = {left: this._player.GetX() - this._camera.GetViewWidth()/2 - this._hiddenSimSizeExtend,
                        right: this._player.GetX() + this._camera.GetViewWidth()/2 + this._hiddenSimSizeExtend,
                        top: this._player.GetY() - this._camera.GetViewHeight()/2 - this._hiddenSimSizeExtend,
                        bottom: this._player.GetY() + this._camera.GetViewHeight()/2 + this._hiddenSimSizeExtend};
}

World.prototype._IsWithinSimBoundries = function(x, y) {
  return (x <= this._simBoundries.right && x >= this._simBoundries.left) && (y <= this._simBoundries.bottom && y >= this._simBoundries.top);
}

World.prototype._GetSpawnableCoord = function() {
  //Spawn only within the hidden sim space

  var playerToEdgeDistX = this._camera.GetViewWidth()/2 + this._hiddenSimSizeExtend;
  var playerToEdgeDistY = this._camera.GetViewHeight()/2 + this._hiddenSimSizeExtend;

  var leftBoundry;
  var rightBoundry;
  var topBoundry;
  var bottomBoundry;

  var hiddenSection = Math.floor(Math.random()*4);
  if(hiddenSection == 0) {
    leftBoundry =   this._simBoundries.left;
    rightBoundry =  this._player.GetX() - this._camera.GetViewWidth()/2;
    topBoundry =    this._simBoundries.top;
    bottomBoundry = this._player.GetY() + this._camera.GetViewHeight()/2;
  } else if (hiddenSection == 1) {
    leftBoundry =   this._player.GetX() - this._camera.GetViewWidth()/2;
    rightBoundry =  this._simBoundries.right;
    topBoundry =    this._simBoundries.top;
    bottomBoundry = this._player.GetY() - this._camera.GetViewHeight()/2;
  } else if (hiddenSection == 2) {
    leftBoundry =   this._player.GetX() + this._camera.GetViewWidth()/2;
    rightBoundry =  this._simBoundries.right;
    topBoundry =    this._player.GetY() - this._camera.GetViewHeight()/2;
    bottomBoundry = this._simBoundries.bottom;
  } else {
    leftBoundry =   this._simBoundries.left;
    rightBoundry =  this._player.GetX() + this._camera.GetViewWidth()/2;
    topBoundry =    this._player.GetY() + this._camera.GetViewHeight()/2;
    bottomBoundry = this._simBoundries.bottom;
  }

  var x, y;
  //do {
  x = Math.random()*(rightBoundry-leftBoundry) + leftBoundry;
  y = Math.random()*(bottomBoundry-topBoundry) + topBoundry;
  //} while (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < SPAWN_DISTANCE)

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

  this._camera.Track(this._player.GetX(), this._player.GetY());
  this._UpdateSimBoundries();

  for (snippet in this._snippets) {
    this._snippets[snippet].Logic(deltaTime);
    if (this._IsCollided(this._snippets[snippet].GetX(), this._snippets[snippet].GetY(), this._snippets[snippet].GetSize(), this._player.GetX(), this._player.GetY(), this._player.GetSize())) {
      this._player.HandleSnippetCollision();
      delete this._snippets[snippet];
      this._SpawnSnippet(); //Immediately replace it for now.
    } else if (!this._IsWithinSimBoundries(this._snippets[snippet].GetX(), this._snippets[snippet].GetY())) {
      delete this._snippets[snippet];
      this._SpawnSnippet();
    }
  }
}

World.prototype.Render = function() {
  this._player.Render();

  for (snippet in this._snippets) {
    this._snippets[snippet].Render();
  }
}
