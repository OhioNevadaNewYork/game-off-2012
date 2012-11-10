var STARTING_CODESIZE = 500;
var PLAYER_SPEED = 150;
var NAVIGATION_TOLERANCY = 10;

/*const W_KEYCODE = 87;
const A_KEYCODE = 65;
const S_KEYCODE = 83;
const D_KEYCODE = 68;*/

Player.prototype = new Blob();
function Player(cContext, camera, x, y) {
  this._codeSize = STARTING_CODESIZE;

  this._targetX = x; //Used for tapping/clicking controls.
  this._targetY = y;

  Blob.call(this, cContext, camera, x, y, Math.sqrt(this._codeSize), ".git");
}

Player.prototype.HandleInput = function(event) {
  //TODO: smooth the motion. [This is right up my ally as an applied math major, but you (Nate especially) are free to implement it.]

  this._targetX = event.worldX;
  this._targetY = event.worldY;

  var angle = Math.atan2(this._targetY-this._y, this._targetX-this._x);
  this._velX = Math.cos(angle)*PLAYER_SPEED;
  this._velY = Math.sin(angle)*PLAYER_SPEED;
}

Player.prototype.Logic = function(deltaTime) {
  //Navigation
  if (Math.abs(this._x - this._targetX) < NAVIGATION_TOLERANCY) {
    this._velX = 0;
  }
  if (Math.abs(this._y - this._targetY) < NAVIGATION_TOLERANCY) {
    this._velY = 0;
  }

  //this._size = Math.sqrt(this._codeSize);

  Blob.prototype.Logic.call(this, deltaTime);
}