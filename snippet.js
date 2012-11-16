var SNIPPET_SATISFACTIONMAX = 5;
var SNIPPET_FORCEMAX = 1700;
var SNIPPET_SIZE = 20;

Snippet.prototype = new Blob();
function Snippet(x, y) {
  Blob.call(this, x, y, SNIPPET_SIZE, "<code>");

  this._satisfaction = 0; //"Satisfaction" is basically a TTL for the current direction the blob is traveling.
}

Snippet.prototype.Logic = function(deltaTime) {
  this._satisfaction -= deltaTime;
  if (this._satisfaction <= 0) {
    var newDirection = Math.random()*2*Math.PI;
    var force = SNIPPET_FORCEMAX - (SNIPPET_FORCEMAX*0.5)*Math.random();
    this.AddForce(Math.cos(newDirection)*force, Math.sin(newDirection)*force);
    this._SetSatisfaction();
  }

  Blob.prototype.Logic.call(this, deltaTime);
}

Snippet.prototype._SetSatisfaction = function() {
  this._satisfaction = SNIPPET_SATISFACTIONMAX - (SNIPPET_SATISFACTIONMAX*0.9)*Math.random();
}