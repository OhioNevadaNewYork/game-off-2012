var SNIPPET_SATISFACTIONMAX = 5;
var SNIPPET_SPEEDMAX = 50;


Snippet.prototype = new Blob();
function Snippet(cContext, camera, x, y) {
  Blob.call(this, cContext, camera, x, y, 20, "<code>");

  this._satisfaction = 0; //"Satisfaction" is basically a TTL for the current direction the blob is traveling.
}

Snippet.prototype.Logic = function(deltaTime) {
  this._satisfaction -= deltaTime;
  if(this._satisfaction <= 0) {
    var newDirection = Math.random()*2*Math.PI;
    var newSpeed = SNIPPET_SPEEDMAX - (SNIPPET_SPEEDMAX*0.5)*Math.random();
    this._velX = Math.cos(newDirection)*newSpeed;
    this._velY = Math.sin(newDirection)*newSpeed;
    this._SetSatisfaction();
  }

  Blob.prototype.Logic.call(this, deltaTime); //Not really a JS programmer. Don't know what I'm doing, but this works! It seems large javascript apps seem to use .. libraries.. for OOP? Kind of like GObject for C? Please, hip JS guys, do whatever works best for inheritance.
}

Snippet.prototype._SetSatisfaction = function() {
  this._satisfaction = SNIPPET_SATISFACTIONMAX - (SNIPPET_SATISFACTIONMAX*0.9)*Math.random();
}