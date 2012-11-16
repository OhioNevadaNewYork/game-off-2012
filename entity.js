function CollidableEntity(x, y, size) {
  this._x = x;
  this._y = y;
  this._size = size;
}

CollidableEntity.prototype.GetSize = function() {
  return this._size;
}

CollidableEntity.prototype.GetX = function() {
  return this._x;
}

CollidableEntity.prototype.GetY = function() {
  return this._y;
}