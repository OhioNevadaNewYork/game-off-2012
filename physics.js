function IsCollided(x1, y1, r1, x2, y2, r2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < r1 + r2
}

