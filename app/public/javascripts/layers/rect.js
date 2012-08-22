define(function() {

  function Rect(x, y, w, h) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.w = w != null ? w : 0;
    this.h = h != null ? h : 0;
    if (typeof this.x === "object") {
      this.h = this.x.h != null ? this.x.h : 0;
      this.w = this.x.w != null ? this.x.w : 0;
      this.y = this.x.y != null ? this.x.y : 0;
      this.x = this.x.x != null ? this.x.x : 0;
    }
  }

  Rect.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")";
  };

  Rect.prototype.clone = function() {
    return new Rect(this.x, this.y, this.w, this.h);
  };

  Rect.prototype.equals = function(r) {
    return Rect.equals(r, this);
  };

  Rect.prototype.scale = function(s) {
    this.x += this.w * (0.5 - s / 2);
    this.y += this.h * (0.5 - s / 2);
    this.w *= s;
    this.h *= s;
    return this;
  };

  Rect.prototype.translate = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };

  Rect.prototype.contains = function(r) {
    return r.x >= this.x && r.y >= this.y && r.x + r.w <= this.x + this.w && r.y + r.h <= this.y + this.h;
  };

  Rect.prototype.containsPoint = function(p) {
    var _ref, _ref1;
    return ((this.l <= (_ref = p.x) && _ref <= this.r)) && ((this.t <= (_ref1 = p.y) && _ref1 <= this.b));
  };

  Rect.prototype.intersects = function(r) {
    return !(r.x + r.w <= this.x || r.y + r.h <= this.y || r.x >= this.x + this.w || r.y >= this.y + this.h);
  };

  Rect.prototype.expand = function(t, r, b, l) {
    return new Rect(this.x - l, this.y - t, this.w + l + r, this.h + t + b);
  };

  Rect.prototype.collapse = function(t, r, b, l) {
    return new Rect(this.x + l, this.y + t, this.w - l - r, this.h - t - b);
  };

  Rect.distanceBetween = function(r, o) {
    var distX, distY;
    distX = 0;
    distY = 0;
    if (o.w !== undefined && o.h !== undefined) {
      if (r.x + r.w < o.x) {
        distX = o.x - (r.x + r.w);
      }
      if (r.x > o.x + o.w) {
        distX = r.x - (o.x + o.w);
      }
      if (r.y + r.h < o.y) {
        distY = o.y - (r.y + r.h);
      }
      if (r.y > o.y + o.h) {
        distY = r.y - (o.y + o.h);
      }
      return Math.sqrt(distX * distX + distY * distY);
    }
    if (o.x !== undefined && o.y !== undefined) {
      if (r.x + r.w < o.x) {
        distX = o.x - (r.x + r.w);
      }
      if (r.x > o.x) {
        distX = r.x - o.x;
      }
      if (r.y + r.h < o.y) {
        distY = o.y - (r.y + r.h);
      }
      if (r.y > o.y) {
        distY = r.y - o.y;
      }
      return Math.sqrt(distX * distX + distY * distY);
    }
    throw "Rect.distanceTo: invalid comparison type";
  };

  Rect.alignInside = function(o, i, corner) {
    switch (corner) {
      case "TopLeft":
        return new Rect(o.x, o.y, i.w, i.h);
      case "Left":
        return new Rect(o.x, o.y + (o.h - i.h) / 2, i.w, i.h);
      case "BottomLeft":
        return new Rect(o.x, o.y + o.h - i.h, i.w, i.h);
      case "Top":
        return new Rect(o.x + (o.w - i.w) / 2, o.y, i.w, i.h);
      case "Middle":
        return new Rect(o.x + (o.w - i.w) / 2, o.y + (o.h - i.h) / 2, i.w, i.h);
      case "Bottom":
        return new Rect(o.x + (o.w - i.w) / 2, o.y + o.h - i.h, i.w, i.h);
      case "TopRight":
        return new Rect(o.x + o.w - i.w, o.y, i.w, i.h);
      case "Right":
        return new Rect(o.x + o.w - i.w, o.y + (o.h - i.h) / 2, i.w, i.h);
      case "BottomRight":
        return new Rect(o.x + o.w - i.w, o.y + o.h - i.h, i.w, i.h);
    }
  };

  Rect.expandBy = function(r, t) {
    return new Rect(r.x - t.l, r.y - t.t, r.w + t.l + t.r, r.h + t.t + t.b);
  };

  Rect.contractBy = function(r, t) {
    return new Rect(r.x + t.l, r.y + t.t, r.w - (t.l + t.r), r.h - (t.t + t.b));
  };

  Rect.equals = function(r1, r2) {
    return r1 && r2 && r1.x === r2.x && r1.y === r2.y && r1.w === r2.w && r1.h === r2.h;
  };

  Rect.intersectionOf = function(r1, r2) {
    var b, l, r, t;
    l = Math.max(r1.l, r2.l);
    t = Math.max(r1.t, r2.t);
    r = Math.min(r1.r, r2.r);
    b = Math.min(r1.b, r2.b);
    if (b < t || r < l) {
      return null;
    }
    return new Rect(l, t, r - l, b - t);
  };

  Rect.unionOf = function(r1, r2) {
    var b, l, r, t;
    l = Math.min(r1.l, r2.l);
    t = Math.min(r1.t, r2.t);
    r = Math.max(r1.r, r2.r);
    b = Math.max(r1.b, r2.b);
    return new Rect(l, t, r - l, b - t);
  };

  return Rect;

});

