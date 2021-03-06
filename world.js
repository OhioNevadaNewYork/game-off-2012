var TARGET_SNIPPET_DENSITY = 0.0020833333; //Measured in snippets per 100 pixels. (A 10x10 block of pixels)
var HIDDEN_SIM_SIZE_EXTEND_RATIO = 0.5; //Relative to visible sim size (what the camera can see).

function World(cContext, camera) {
  this._cContext = cContext;
  this._camera = camera;

  //this._unsimulatedPersistentState = {seenRepos: {}};

  this._repoMan = new RepoManager(this);
  this._snippetMan = new SnippetManager(this, this._repoMan);
  this._snippetMan.SetTargetSnippetCount(this._GetSimArea()/100 * TARGET_SNIPPET_DENSITY);


  var world = this;
  this._camera.AddZoomListener(function(){
    world._hiddenSimSizeExtend = world._GetHiddenSimSizeExtend();
    world._UpdateSimBoundries();
    world._snippetMan.SetTargetSnippetCount(world._GetSimArea()/100 * TARGET_SNIPPET_DENSITY);
  });
  this._camera.SetZoom(1);

  this._player = this._repoMan.SpawnPlayer()[1];
  this._fatalState = false;
  this._player.AddDeathListener(function(player, terminator) {
    world._fatalState = {"codeSize": player.GetCodeSize(),
                         "aggressorCodeSize": terminator.GetCodeSize(),
                         "aggressorName": terminator.GetName()};
  });
}

World.prototype._GetHiddenSimSizeExtend = function() {
  return HIDDEN_SIM_SIZE_EXTEND_RATIO*(this._camera.GetViewWidth() + this._camera.GetViewHeight())/2;
}
World.prototype._GetSimArea = function() {
  var hiddenSimSizeExtend = this._GetHiddenSimSizeExtend();
  return (2*hiddenSimSizeExtend + this._camera.GetViewWidth())*(2*hiddenSimSizeExtend + this._camera.GetViewHeight());
}

World.prototype._UpdateSimBoundries = function() {
  this._simBoundries = {left: this._camera.GetX() - this._camera.GetViewWidth()/2 - this._hiddenSimSizeExtend,
                        right: this._camera.GetX() + this._camera.GetViewWidth()/2 + this._hiddenSimSizeExtend,
                        top: this._camera.GetY() - this._camera.GetViewHeight()/2 - this._hiddenSimSizeExtend,
                        bottom: this._camera.GetY() + this._camera.GetViewHeight()/2 + this._hiddenSimSizeExtend};
}

World.prototype.IsWithinSimBoundries = function(x, y) {
  return (x <= this._simBoundries.right && x >= this._simBoundries.left) && (y <= this._simBoundries.bottom && y >= this._simBoundries.top);
}

World.prototype._GetSpawnableCoord = function(radiusOfSpawnable) {
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
    rightBoundry =  this._camera.GetX() - this._camera.GetViewWidth()/2 - radiusOfSpawnable;
    topBoundry =    this._simBoundries.top;
    bottomBoundry = this._camera.GetY() + this._camera.GetViewHeight()/2;
  } else if (hiddenSection == 1) {
    leftBoundry =   this._camera.GetX() - this._camera.GetViewWidth()/2;
    rightBoundry =  this._simBoundries.right;
    topBoundry =    this._simBoundries.top;
    bottomBoundry = this._camera.GetY() - this._camera.GetViewHeight()/2 - radiusOfSpawnable;
  } else if (hiddenSection == 2) {
    leftBoundry =   this._camera.GetX() + this._camera.GetViewWidth()/2 + radiusOfSpawnable;
    rightBoundry =  this._simBoundries.right;
    topBoundry =    this._camera.GetY() - this._camera.GetViewHeight()/2;
    bottomBoundry = this._simBoundries.bottom;
  } else {
    leftBoundry =   this._simBoundries.left;
    rightBoundry =  this._camera.GetX() + this._camera.GetViewWidth()/2;
    topBoundry =    this._camera.GetY() + this._camera.GetViewHeight()/2 + radiusOfSpawnable;
    bottomBoundry = this._simBoundries.bottom;
  }

  var x = Math.random()*(rightBoundry-leftBoundry) + leftBoundry;
  var y = Math.random()*(bottomBoundry-topBoundry) + topBoundry;
  return new Array(x, y);
}

World.prototype.HandleInput = function(event) {
  event.worldX = this._camera.ReverseProjectX(event.canvasX);
  event.worldY = this._camera.ReverseProjectY(event.canvasY);
  this._player.HandleInput(event);
}

World.prototype.Logic = function(deltaTime) {
  this._camera.Track(this._player.GetX(), this._player.GetY());
  this._UpdateSimBoundries();

  if (this._player.GetCodeSize() >= 1000) {
    if((this._repoMan.GetEntityCount()-1) == 0) {
      this._repoMan.SpawnRandomRepo(this._player.GetCodeSize());
    }
  }

  this._repoMan.Logic(deltaTime);
  this._snippetMan.Logic(deltaTime);

  return this._fatalState;
}

World.prototype.DebugRender = function() {
  this._snippetMan.DebugRender(this._cContext);
  this._repoMan.DebugRender(this._cContext);
}