var STARTING_CODESIZE = 500;
var PLAYER_FORCE = 1200;
var NAVIGATION_TOLERANCY = 10;

Player.prototype = new Repo();
function Player() {
  Repo.call(this, 0, 0, STARTING_CODESIZE, ".git");
  this._force = PLAYER_FORCE;
}

Player.prototype.HandleInput = function(event) {
  if (event.type == "click") {
    this._SetTarget(event.worldX, event.worldY);
  }
}

Player.prototype.AddDeathListener = function(listenerFunc) {
  this._deathListener = listenerFunc;
}

Player.prototype.Disintegrate = function(terminator) {
  if (this._deathListener) {
    this._deathListener(this, terminator);
  }
}
