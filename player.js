var STARTING_CODESIZE = 500;
var PLAYER_SPEED = 1000;
var NAVIGATION_TOLERANCY = 10;

Player.prototype = new Repo();
function Player() {
  Repo.call(this, 0, 0, STARTING_CODESIZE, ".git");
  this._speed = PLAYER_SPEED;
}

Player.prototype.HandleInput = function(event) {
  this._SetTarget(event.worldX, event.worldY);
}

Player.prototype.AddDeathListener = function(listenerFunc) {
  this._deathListener = listenerFunc;
}

Player.prototype.Disintegrate = function(terminator) {
  if (this._deathListener) {
    this._deathListener(this, terminator);
  }
}
