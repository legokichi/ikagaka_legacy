// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Shell = (function(_super) {
  var composeBaseSurfaces, loadBaseSurface, loadBaseSurfaces, loadElement, loadElements, loadSurfaces;

  __extends(Shell, _super);

  function Shell(nar, id, cb) {
    var shell,
      _this = this;
    this.nar = nar;
    this.id = id;
    Shell.__super__.constructor.apply(this, arguments);
    shell = this.nar.shell[this.id];
    loadSurfaces(shell, function(surfaces) {
      return loadBaseSurfaces(shell, surfaces, function(surfaces) {
        return composeBaseSurfaces(shell, surfaces, function(surfaces) {
          _this.surfaces = surfaces;
          return cb(_this);
        });
      });
    });
  }

  loadSurfaces = function(shell, cb) {
    shell["surfaces.txt"].load(function(text) {
      return cb(new Surfaces(text));
    });
    return void 0;
  };

  loadBaseSurfaces = function(shell, surfaces, cb) {
    var file, filename, que;
    que = new TaskQueue();
    for (filename in shell) {
      file = shell[filename];
      if (/surface(\d+)\.png/.test(filename)) {
        (function(file) {
          return que.push(function(surfaces, next) {
            return loadBaseSurface(shell, surfaces, file, function(surfaces) {
              return next(surfaces);
            });
          });
        })(file);
      }
    }
    que.run(surfaces, function(surfaces) {
      return cb(surfaces);
    });
    return void 0;
  };

  loadBaseSurface = function(shell, surfaces, file, cb) {
    var id, srf, _base;
    console.log("unzipping " + file.filename);
    id = Number(/surface(\d+)\.png/.exec(file.filename)[1]);
    srf = (_base = surfaces.surface)[id] != null ? (_base = surfaces.surface)[id] : _base[id] = {};
    file.load(function(img) {
      srf.base = transImage(img);
      return cb(surfaces);
    });
    return void 0;
  };

  composeBaseSurfaces = function(shell, surfaces, cb) {
    var id, que, srf, _fn, _ref;
    que = new TaskQueue();
    _ref = surfaces.surface;
    _fn = function(srf) {
      return que.push(function(surfaces, next) {
        return loadElements(shell, srf, function(elms) {
          if (srf.base == null) {
            srf.base = copyCanvas(new Image());
          }
          srf.base = composeElements(srf.base, elms);
          return next(surfaces);
        });
      });
    };
    for (id in _ref) {
      srf = _ref[id];
      _fn(srf);
    }
    return que.run(surfaces, function(surfaces) {
      return cb(surfaces);
    });
  };

  loadElements = function(shell, srf, cb) {
    var elm, n, que, _fn, _ref;
    que = new TaskQueue();
    _ref = srf.elements;
    _fn = function(elm) {
      return que.push(function(elms, next) {
        return loadElement(shell, elm, function(elm) {
          elms.push(elm);
          return next(elms);
        });
      });
    };
    for (n in _ref) {
      elm = _ref[n];
      _fn(elm);
    }
    que.run([], function(elms) {
      return cb(elms);
    });
    return void 0;
  };

  loadElement = function(shell, elm, cb) {
    console.log("unzipping " + elm.src);
    shell[elm.src].load(function(img) {
      return cb({
        cnv: transImage(img),
        x: elm.x,
        y: elm.y,
        cmp: elm.compositeOperation
      });
    });
    return void 0;
  };

  return Shell;

})(Root);