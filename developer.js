var DEVELOPER_REVOLVE_SPEED = 30;
var DEVELOPER_ICON_SIZE = 15;

var DEVELOPER_ICON_OFFSETY = DEVELOPER_ICON_SIZE*Math.sin(Math.PI/3)/2;
var DEVELOPER_ICON_OFFSETX = DEVELOPER_ICON_SIZE/2;


function Developer(centerX, centerY, radius, angle) {
  this._centerX = centerX;
  this._centerY = centerY;
  this.UpdateParentRadius(radius);
  this._angle = angle;
  this._x = centerX;
  this._y = centerY;
}

Developer.prototype.UpdateCenter = function(x, y) {
  this._centerX = x;
  this._centerY = y;
}

Developer.prototype.UpdateParentRadius = function(radius) {
  this._radius = radius - DEVELOPER_ICON_SIZE;
}

Developer.prototype.Logic = function(deltaTime) {
  this._angle += (deltaTime*DEVELOPER_REVOLVE_SPEED)/(this._radius);
  this._x = Math.cos(this._angle)*this._radius + this._centerX;
  this._y = Math.sin(this._angle)*this._radius + this._centerY;
}

Developer.prototype.GetAngle = function() {
  return this._angle;
}

Developer.prototype.Render = function(cContext) {
  cContext.beginPath();
  cContext.moveTo(this._x,                        this._y-DEVELOPER_ICON_OFFSETY);
  cContext.lineTo(this._x+DEVELOPER_ICON_OFFSETX, this._y+DEVELOPER_ICON_OFFSETY);
  cContext.lineTo(this._x-DEVELOPER_ICON_OFFSETX, this._y+DEVELOPER_ICON_OFFSETY);
  cContext.lineTo(this._x,                        this._y-DEVELOPER_ICON_OFFSETY);
  cContext.stroke();
}