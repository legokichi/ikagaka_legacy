// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Surface = (function(_super) {
  __extends(Surface, _super);

  function Surface(shell, id, handler, cb) {
    var n, render,
      _this = this;
    this.shell = shell;
    this.id = id;
    Surface.__super__.constructor.apply(this, arguments);
    this.surface = this.shell.surfaces.surface[this.id];
    this.canvas = copyCanvas(this.surface.base);
    this.click = this.createEventListener("OnMouseClick", handler);
    this.canvas.addEventListener("click", this.click);
    this.animationLayers = {};
    for (n in this.surface.animations) {
      this.animationLayers[n] = new AnimationLayer(this, n);
    }
    render = function() {
      if (_this.rendering) {
        _this.draw();
        return requestAnimationFrame(render);
      }
    };
    this.rendering = true;
    this.showFPS = true;
    this.showCollision = false;
    this.old = Date.now();
    requestAnimationFrame(render);
    cb(this);
  }

  Surface.prototype.destructor = function() {
    this.rending = false;
    this.canvas.removeEventListener("click", this.click);
    return Surface.__super__.destructor.apply(this, arguments);
  };

  Surface.prototype.draw = function() {
    var cmp, cnv, collision, ctx, height, layer, n, name, now, past, width, x, y, _ref, _ref1, _ref2;
    now = Date.now();
    past = now - this.old;
    this.fps = 1000 / past | 0;
    clearCanvas(this.canvas);
    drawImage(this.canvas, this.surface.base, 0, 0);
    _ref = this.animationLayers;
    for (n in _ref) {
      layer = _ref[n];
      _ref1 = layer.getFrame(now), x = _ref1.x, y = _ref1.y, cnv = _ref1.cnv, cmp = _ref1.cmp;
      drawImage(this.canvas, cnv, x, y, cmp);
    }
    ctx = this.canvas.getContext("2d");
    if (this.showCollision) {
      ctx.strokeStyle = "rgb(200, 0, 0)";
      _ref2 = this.surface.collisions;
      for (n in _ref2) {
        collision = _ref2[n];
        x = collision.x, y = collision.y, width = collision.width, height = collision.height, name = collision.name;
        ctx.strokeRect(x, y, width, height);
      }
    }
    if (this.showFPS) {
      ctx.font = "18px 'Unknown Font'";
      ctx.fillText(this.fps, 10, 20);
    }
    this.old = now;
    return void 0;
  };

  Surface.prototype.createEventListener = function(id, handler) {
    var _this = this;
    return function(e) {
      var collision, event, height, n, name, offset, width, x, y, _ref, _ref1, _ref2;
      offset = calcOffset(e);
      if (isHit(_this.canvas, offset.x, offset.y)) {
        e.preventDefault();
        e.stopPropagation();
        event = {
          "ID": id,
          "Reference0": offset.x,
          "Reference1": offset.y,
          "Reference2": 0,
          "Reference3": null,
          "Reference4": "",
          "Reference5": 0
        };
        if (id === "OnMouseMove") {
          delete event.Reference5;
        }
        _ref = _this.surface.collisions;
        for (n in _ref) {
          collision = _ref[n];
          x = collision.x, y = collision.y, width = collision.width, height = collision.height, name = collision.name;
          if ((x < (_ref1 = offset.x) && _ref1 < x + width) && (y < (_ref2 = offset.y) && _ref2 < y + height)) {
            event.Reference4 = name;
          }
        }
        handler(event);
      }
      return void 0;
    };
  };

  return Surface;

})(Root);