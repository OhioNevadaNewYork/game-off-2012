var STARTING_CODESIZE = 500;
var PLAYER_SPEED = 150;
var NAVIGATION_TOLERANCY = 10;

Player.prototype = new Repo();
function Player(cContext) {
  Repo.call(this, cContext, 0, 0, STARTING_CODESIZE, ".git");
  this._speed = PLAYER_SPEED;
}

Player.prototype.HandleInput = function(event) {
  this._SetTarget(event.worldX, event.worldY);
}