// Generated by CoffeeScript 1.7.1
window.SurfaceDefine = (function() {
  function SurfaceDefine(shell, id, callback) {
    var n, srfdef;
    n = id;
    if (this.surfaceCache[n] != null) {
      return setTimeout((function(_this) {
        return function() {
          return callback(_this.surfaceCache[n]);
        };
      })(this));
    }
    if ((this.surfaces[n] == null) && (this.surfaceN[n] == null)) {
      return setTimeout(function() {
        return callback(false);
      });
    }
    if ((this.surfaces[n] == null) && (this.surfaceN[n] != null)) {
      return this.surfaceN[n](function(img) {
        var srfdef;
        srfdef = {
          collisions: null,
          elements: null,
          animations: null
        };
        srfdef.baseSurfaceCanvas = util.transImg(img);
        return callback(srfdef);
      });
    }
    srfdef = util.deepcopy(this.surfaces[n]);
    this.surfaceN[n]((function(_this) {
      return function(img) {
        var elmingCnv, recursiveCall;
        if (img) {
          elmingCnv = util.transImg(img);
        } else {
          elmingCnv = util.whiteCanvas();
        }
        recursiveCall = function(i) {
          var elm, layer, src, x, y;
          elm = srfdef.elements[i++];
          if (elm == null) {
            srfdef.surfaceNumber = n;
            srfdef.baseSurfaceCanvas = elmingCnv;
            _this.surfaceCache[n] = srfdef;
            return callback(srfdef);
          }
          layer = elm.layer, src = elm.src, x = elm.x, y = elm.y;
          return _this.filelist[src](function(img) {
            if (elmingCnv.width * elmingCnv.height === 0) {
              layer = "base";
            }
            elmingCnv = (function() {
              switch (layer) {
                case "base":
                  return util.transImg(img);
                default:
                  return util.overlayfast(elmingCnv, util.transImg(img), x, y);
              }
            })();
            return recursiveCall(i);
          });
        };
        return recursiveCall(0);
      };
    })(this));
  }

  return SurfaceDefine;

})();
