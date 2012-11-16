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
    var angle = Math.atan2(event.worldY-this._y, event.worldX-this._x);
    this.AddForce(Math.cos(angle)*this._force, Math.sin(angle)*this._force);
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
