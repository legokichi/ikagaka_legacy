// Generated by CoffeeScript 1.7.1
var hash2Array, ikagaka, json,
  __slice = [].slice;

json = {
  "shell": {
    "master": {
      "surface": {
        "0": {
          "element": [["base", "./ku-/shell/master/surface0.png"]],
          "collision": [[71, 40, 168, 98, "head"], [97, 112, 164, 158, "face"], [122, 216, 150, 259, "bust"]],
          "animation": [
            {
              "timing": "sometimes",
              "pattern": [["overlayfast", 100, 5], ["overlayfast", 101, 5], ["overlayfast", 100, 15], ["overlay", 0, 0]]
            }, {
              "timing": "always",
              "pattern": [["overlay", 203, 0, 82, 6], ["overlay", 203, 15, 82, 7], ["overlay", 203, 15, 82, 8], ["overlay", 203, 30, 82, 9], ["overlay", 203, 15, 82, 8], ["overlay", 203, 15, 82, 7], ["overlay", 203, 15, 82, 6], ["overlay", 203, 15, 82, 5], ["overlay", 203, 30, 82, 4], ["overlay", 203, 15, 82, 5], ["overlay", 203, 15, 82, 6]]
            }
          ]
        },
        "10": {
          "element": [["base", "./ku-/shell/master/surface10.png"]],
          "collision": [[67, 28, 164, 71, "head"], [85, 89, 141, 126, "face"], [88, 176, 126, 198, "bust"]],
          "animation": [
            {
              "timing": "sometimes",
              "pattern": [["overlayfast", 10, 5], ["overlayfast", 11, 5], ["overlayfast", 10, 15], ["overlay", -1, 10]]
            }, {
              "timing": "always",
              "pattern": [["overlay", 19, 15, 0, 0], ["overlay", 19, 15, 0, -1], ["overlay", 19, 15, 0, -2], ["overlay", 19, 30, 0, -1], ["overlay", 19, 15, 0, 0], ["overlay", 19, 15, 0, 1], ["overlay", 19, 30, 0, 2], ["overlay", 19, 15, 0, 3], ["overlay", 19, 15, 0, 2], ["overlay", 19, 15, 0, 1], ["overlay", 19, 30, 0, 0]]
            }
          ]
        },
        "11": {
          "element": [["base", "./ku-/shell/master/surface11.png"]]
        },
        "19": {
          "element": [["base", "./ku-/shell/master/surface19.png"]]
        },
        "100": {
          "element": [["base", "./ku-/shell/master/surface100.png"]]
        },
        "101": {
          "element": [["base", "./ku-/shell/master/surface101.png"]]
        },
        "203": {
          "element": [["base", "./ku-/shell/master/surface203.png"]]
        }
      }
    }
  }
};

hash2Array = function(hash) {
  var ary, k, v, _fn;
  ary = [];
  _fn = function() {
    return ary[k] = v;
  };
  for (k in hash) {
    v = hash[k];
    _fn(k, v);
  }
  return ary;
};

json.shell.master.surface = hash2Array(json.shell.master.surface);

ikagaka = (function() {
  var always, canvanizeElements, composeCanvanizeElements, composeElements, copyCnv, drawSurface, isArray, isCanvas, isFunction, isImage, isNumber, isObject, isUndefined, loadImg, loadImgsToCnvs, makeNamed, namedAry, overlayCnv, overlayfastCnv, playingScript, random, rarely, runonce, setNamedDiv, setScopeDiv, sometimes, transImg, typeIs;
  isFunction = function(fn) {
    return Object.prototype.toString.apply(fn) === "[object Function]";
  };
  isArray = function(ary) {
    return Object.prototype.toString.apply(ary) === "[object Array]";
  };
  isObject = function(obj) {
    return Object.prototype.toString.apply(obj) === "[object Object]";
  };
  isImage = function(img) {
    return Object.prototype.toString.apply(img) === "[object HTMLImageElement]";
  };
  isCanvas = function(cnv) {
    return Object.prototype.toString.apply(cnv) === "[object HTMLCanvasElement]";
  };
  typeIs = function(unknown) {
    return Object.prototype.toString.apply(unknown);
  };
  isUndefined = function(undf) {
    return typeof undf === "undefined";
  };
  isNumber = function(num) {
    return isFinite(Number(num));
  };
  loadImg = function(url, callback) {
    var img;
    if (callback == null) {
      callback = function(img) {};
    }
    if (url === "") {
      callback(new Image);
    } else {
      img = new Image;
      img.src = url;
      img.onload = function() {
        return callback(img);
      };
      img.onerror = function() {
        return callback(new Image);
      };
    }
  };
  copyCnv = function(cnv) {
    var copy, ctx;
    copy = document.createElement("canvas");
    copy.width = cnv.width;
    copy.height = cnv.height;
    ctx = copy.getContext('2d');
    try {
      ctx.drawImage(cnv, 0, 0);
    } catch (_error) {}
    return copy;
  };
  transImg = function(img, callback) {
    var b, cnv, ctx, e, g, i, imgdata, r, _ref;
    if (callback == null) {
      callback = function(cnv) {};
    }
    cnv = copyCnv(img);
    ctx = cnv.getContext('2d');
    try {
      imgdata = ctx.getImageData(0, 0, img.width, img.height);
      if (imgdata.data[3] === 0) {
        setTimeout(function() {
          ctx.putImageData(imgdata, 0, 0);
          return callback(cnv);
        });
      } else {
        i = 0;
        _ref = [imgdata.data[0], imgdata.data[1], imgdata.data[2]], r = _ref[0], g = _ref[1], b = _ref[2];
        while (i < imgdata.data.length) {
          if (r === imgdata.data[i] && g === imgdata.data[i + 1] && b === imgdata.data[i + 2]) {
            imgdata.data[i + 3] = 0;
          }
          i += 4;
        }
        setTimeout(function() {
          ctx.putImageData(imgdata, 0, 0);
          return callback(cnv);
        });
      }
    } catch (_error) {
      e = _error;
      setTimeout(function() {
        return callback(cnv);
      });
    }
  };
  loadImgsToCnvs = (function() {
    var cnvCache;
    cnvCache = {};
    return function(urlAry, callback) {
      var i, ifend;
      if (callback == null) {
        callback = function(cnvAry) {};
      }
      i = urlAry.length;
      ifend = function(url) {
        var cnvAry;
        if (--i === 0) {
          cnvAry = urlAry.map(function(url) {
            return copyCnv(cnvCache[url]);
          });
          return callback(cnvAry);
        }
      };
      urlAry.forEach(function(url) {
        if (cnvCache[url] != null) {
          return setTimeout(function() {
            return ifend(url);
          });
        } else {
          return loadImg(url, function(img) {
            return transImg(img, function(cnv) {
              cnvCache[url] = cnv;
              return setTimeout(function() {
                return ifend(url);
              });
            });
          });
        }
      });
    };
  })();
  overlayCnv = function(target, cnv, x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    return overlayfastCnv(target, cnv, x, y);
  };
  overlayfastCnv = function(target, cnv, x, y) {
    var ctx;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    ctx = target.getContext('2d');
    try {
      ctx.drawImage(cnv, x, y);
    } catch (_error) {}
    return target;
  };
  canvanizeElements = function(elmAry, callback) {
    var urlAry;
    if (callback == null) {
      callback = function(cnvedElmAry) {};
    }
    urlAry = elmAry.map(function(_arg) {
      var type, url, x, y, _ref;
      _ref = _arg != null ? _arg : ary, type = _ref[0], url = _ref[1], x = _ref[2], y = _ref[3];
      return url;
    });
    loadImgsToCnvs(urlAry, function(cnvAry) {
      var cnvedElmAry;
      cnvedElmAry = elmAry.map(function(_arg, i) {
        var type, url, x, y, _ref;
        _ref = _arg != null ? _arg : ary, type = _ref[0], url = _ref[1], x = _ref[2], y = _ref[3];
        return [type, cnvAry[i], x, y];
      });
      return callback(cnvedElmAry);
    });
  };
  composeCanvanizeElements = function(cnvedElmAry) {
    var target;
    target = null;
    cnvedElmAry.forEach(function(_arg) {
      var cnv, type, x, y, _ref;
      _ref = _arg != null ? _arg : ary, type = _ref[0], cnv = _ref[1], x = _ref[2], y = _ref[3];
      if (target == null) {
        target = cnv;
      }
      switch (type) {
        case "base":
          return target = copyCnv(cnv);
        case "overlay":
          return target = overlayCnv(target, cnv, x, y);
        case "overlayfast":
          return target = overlayfastCnv(target, cnv, x, y);
      }
    });
    return target;
  };
  composeElements = function(elmAry, callback) {
    if (callback == null) {
      callback = function(cnv) {};
    }
    return canvanizeElements(elmAry, function(cnvedElmAry) {
      return callback(composeCanvanizeElements(cnvedElmAry));
    });
  };
  drawSurface = function(target, cnv) {
    var ctx;
    target.width = cnv.width;
    target.height = cnv.height;
    target.parentNode.style.width = cnv.width;
    target.parentNode.style.height = cnv.height;
    ctx = target.getContext('2d');
    try {
      ctx.drawImage(cnv, 0, 0);
    } catch (_error) {}
    return target;
  };
  sometimes = function(tidAry, fn) {
    return random(tidAry, fn, 2);
  };
  rarely = function(tidAry, fn) {
    return random(tidAry, fn, 4);
  };
  random = function(tidAry, fn, n) {
    var ms;
    ms = 1;
    while (Math.round(Math.random() * 1000) > 1000 / n) {
      ms++;
    }
    return tidAry.push(setTimeout(function() {
      fn();
      return random(tidAry, fn, n);
    }, ms * 1000));
  };
  runonce = function(tidAry, fn) {
    return tidAry.push(setTimeout(fn, 0));
  };
  always = function(tidAry, fn) {
    return tidAry.push(setTimeout(function() {
      return fn(function() {
        return always(tidAry, fn);
      });
    }));
  };
  setScopeDiv = function(target, n) {
    var blimpCnv, blimpDiv, blimpTxt, scopeDiv, surfaceCnv;
    scopeDiv = document.createElement("div");
    scopeDiv.setAttribute("class", "scope" + n);
    scopeDiv.style.bottom = "0px";
    scopeDiv.style.right = n * 240 + "px";
    surfaceCnv = document.createElement("canvas");
    surfaceCnv.setAttribute("class", "surface");
    surfaceCnv.width = 0;
    surfaceCnv.height = 0;
    blimpDiv = document.createElement("div");
    blimpDiv.setAttribute("class", "blimp");
    blimpDiv.style.top = "60px";
    blimpDiv.style.left = "-300px";
    blimpCnv = document.createElement("canvas");
    blimpCnv.width = 0;
    blimpCnv.height = 0;
    blimpTxt = document.createElement("div");
    blimpTxt.style.margin = "10px";
    blimpTxt.style.marginRight = "30px";
    blimpTxt.style.overflowY = "scroll";
    blimpTxt.style.whiteSpace = "pre";
    blimpTxt.style.whiteSpace = "pre-wrap";
    blimpTxt.style.whiteSpace = "pre-line";
    blimpTxt.style.wordWrap = "break-word";
    scopeDiv.appendChild(surfaceCnv);
    scopeDiv.appendChild(blimpDiv);
    blimpDiv.appendChild(blimpCnv);
    blimpDiv.appendChild(blimpTxt);
    target.appendChild(scopeDiv);
    return scopeDiv;
  };
  setNamedDiv = function(target, id) {
    var namedDiv, namedStyle;
    namedDiv = document.createElement("div");
    namedDiv.setAttribute("id", "named" + id);
    namedDiv.setAttribute("class", "named");
    namedStyle = document.createElement("style");
    namedStyle.setAttribute("scoped", "scoped");
    namedStyle.innerHTML = "#named" + id + " *{position:absolute;border:none;margin:0px;padding:0px;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;} .anchor,.select{color:red;cursor:pointer;} .anchor:hover,.select:hover{background-color:violet;}";
    namedDiv.appendChild(namedStyle);
    target.appendChild(namedDiv);
    return namedDiv;
  };
  playingScript = (function() {
    var regExpHash;
    regExpHash = {
      yy: /^\\\\/,
      y0: /^\\0/,
      y1: /^\\1/,
      yp: /^\\p\[(\d+)\]/,
      ys: /^\\s\[([^\]]+)\]/,
      yb: /^\\b\[([^\]]+)\]/,
      yi: /^\\i\[(\d+)\]/,
      ywN: /^\\w(\d+)/,
      y_w: /^\\_w\[(\d+)\]/,
      yq: /^\\q\[([^\]]+)\]/,
      y_aS: /^\\_a\[([^\]]+)\]/,
      y_aE: /^\\_a/,
      yc: /^\\c/,
      yn: /^\\n/,
      ynhalf: /^\\n\[half\]/,
      ye: /^\\e/
    };
    return function(script, tidAry, callback) {
      var talkWait;
      if (callback == null) {
        callback = function() {};
      }
      talkWait = 0;
      console.log(script);
      return setTimeout(callback);
    };
  })();
  makeNamed = function(n, opt) {
    var body, callback, curScopeObj, curShellName, eventHandlerHash, getSurfaceCnv, isTalking, makeScope, namedDiv, namedId, namedObj, onSecondChangeTid, scopeAry, scriptTidAry, surfaceCache;
    makeScope = function(n) {
      var blimpCnv, blimpDiv, blimpTxt, curBlimpObj, curSurfaceObj, makeBlimp, makeSurface, scopeDiv, scopeId, surfaceCnv;
      makeSurface = function(n, callback) {
        var animationNPatternElementAryAry, animationNPatternNTidAryAry, animationTimingTidAry, baseSurfaceCnv, surfaceAry, surfaceId, surfaceJson, surfaceObj;
        if (callback == null) {
          callback = function(surfaceObj) {};
        }
        console.log("makeSurface(" + n + "," + callback + ")");
        surfaceId = n;
        animationTimingTidAry = [];
        animationNPatternNTidAryAry = [];
        animationNPatternElementAryAry = [];
        surfaceAry = json.shell[curShellName].surface;
        surfaceJson = json.shell[curShellName].surface[surfaceId];
        baseSurfaceCnv = null;
        getSurfaceCnv(surfaceId, function(cnv) {
          var regExp, _ref;
          baseSurfaceCnv = copyCnv(drawSurface(surfaceCnv, cnv));
          animationNPatternElementAryAry = [["base", copyCnv(baseSurfaceCnv, 0, 0)]];
          regExp = /(\w+)(?:,\s*(\d+))?/;
          if ((_ref = surfaceJson.animation) != null) {
            _ref.forEach(function(anmN, i) {
              var timing, _ref1;
              animationNPatternNTidAryAry[i] = [];
              _ref1 = regExp.exec(anmN.timing).slice(1), timing = _ref1[0], n = _ref1[1];
              switch (timing) {
                case "sometimes":
                  return sometimes(animationTimingTidAry, function(callback) {
                    return surfaceObj.playAnimation(i, callback);
                  });
                case "rarely":
                  return rarely(animationTimingTidAry, function(callback) {
                    return surfaceObj.playAnimation(i, callback);
                  });
                case "random":
                  return random(animationTimingTidAry, (function(callback) {
                    return surfaceObj.playAnimation(i, callback);
                  }), n);
                case "runonce":
                  return runonce(animationTimingTidAry, function(callback) {
                    return surfaceObj.playAnimation(i, callback);
                  });
              }
            });
          }
          return setTimeout(callback.bind(null, surfaceObj));
        });
        surfaceObj = {
          "playAnimation": function(n, callback) {
            var i, patternAry, playPattern, target;
            if (callback == null) {
              callback = function(surfaceObj) {};
            }
            console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").playAnimation(" + n + "," + callback + ")");
            if (isNumber(n) && (surfaceJson.animation[n].pattern != null)) {
              patternAry = surfaceJson.animation[n].pattern;
              i = 0;
              target = surfaceCnv;
              playPattern = function() {
                var delay, id, type, x, y, _ref;
                _ref = patternAry[i], type = _ref[0], id = _ref[1], delay = _ref[2], x = _ref[3], y = _ref[4];
                if (x == null) {
                  x = 0;
                }
                if (y == null) {
                  y = 0;
                }
                if (id === -1) {
                  animationNPatternElementAryAry[n + 1] = [];
                  setTimeout(function() {
                    return drawSurface(target, composeCanvanizeElements(animationNPatternElementAryAry));
                  });
                } else if (surfaceAry[id] != null) {
                  getSurfaceCnv(id, function(cnv) {
                    animationNPatternElementAryAry[n + 1] = [type, cnv, x, y];
                    console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").playAnimation(" + n + ",neo)");
                    console.log(animationNPatternElementAryAry);
                    return drawSurface(target, composeCanvanizeElements(animationNPatternElementAryAry));
                  });
                }
                i += 1;
                if (patternAry[i] != null) {
                  return animationNPatternNTidAryAry[n].push(setTimeout(playPattern, delay * 10));
                } else {
                  return setTimeout(callback.bind(null, surfaceObj));
                }
              };
              setTimeout(playPattern);
            } else {
              setTimeout(callback.bind(null, surfaceObj));
            }
            return this;
          },
          "stopAnimation": function(n) {
            console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").stopAnimation(" + n + ")");
            if (n != null) {
              clearTimeout(animationTimingTidAry[n]);
              animationNPatternNTidAryAry[n].forEach(function(tid) {
                return clearTimeout(ary);
              });
            } else {
              clearTimeout(animationTimingTidAry[n]);
              animationNPatternNTidAryAry.forEach(function(ary) {
                return ary.forEach(function(tid) {
                  return clearTimeout(ary);
                });
              });
            }
            return this;
          },
          "show": function() {
            console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").show()");
            surfaceCnv.style.visivilty = "visible";
            return this;
          },
          "hide": function() {
            console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").hide()");
            surfaceCnv.style.visivilty = "hidden";
            return this;
          },
          "unload": function() {
            if (this._._._apiLogging) {
              console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + surfaceId + ").disappear()");
            }
            this.stopAnimation();
            surfaceCnv.width = 0;
            surfaceCnv.height = 0;
          }
        };
        return surfaceObj;
      };
      makeBlimp = function(n, callback) {
        if (callback == null) {
          callback = function(blimpObj) {};
        }
        console.log("makeBlimp(" + n + "," + callback + ")");
        return {
          "show": function() {
            return this;
          },
          "hide": function() {
            return this;
          },
          "talk": function(chr) {
            if (chr == null) {
              chr = "";
            }
            return this;
          },
          "selection": function(title, id) {
            if (title == null) {
              title = "";
            }
            if (id == null) {
              id = "";
            }
            return this;
          },
          "anchor": function(id) {
            if (id == null) {
              id = "";
            }
            return this;
          },
          "br": function() {
            return this;
          },
          "clear": function() {
            return this;
          },
          "unload": function() {
            return void 0;
          }
        };
      };
      console.log("makeScope(" + n + ")");
      scopeId = n;
      scopeDiv = setScopeDiv(namedDiv, scopeId);
      surfaceCnv = scopeDiv.childNodes[0];
      console.dir(surfaceCnv);
      blimpDiv = scopeDiv.childNodes[1];
      blimpCnv = blimpDiv.childNodes[0];
      blimpTxt = blimpDiv.childNodes[1];
      curSurfaceObj = makeSurface(0);
      curBlimpObj = makeBlimp(0);
      return {
        "focus": function() {
          namedDiv.appendChild(scopeDiv);
          return this;
        },
        "surface": function(n, callback) {
          if (callback == null) {
            callback = function(surfaceObj) {};
          }
          console.log("named(" + namedId + ").scope(" + scopeId + ").surface(" + n + ")");
          if (!isNumber(n)) {
            setTimeout(callback.bind(null, curSurfaceObj));
          } else if (n === -1) {
            curSurfaceObj.hide();
            setTimeout(callback.bind(null, curSurfaceObj));
          } else if (json.shell[curShellName].surface[n] != null) {
            curSurfaceObj = makeSurface(n, function(surfaceObj) {
              surfaceObj.show();
              return setTimeout(callback.bind(null, surfaceObj));
            });
          }
          return curSurfaceObj;
        },
        "blimp": function(n, callback) {
          if (callback == null) {
            callback = function(scopeObj) {};
          }
          console.log("named(" + namedId + ").scope(" + scopeId + ").blimp(" + n + ")");
          return curBlimpObj;
        },
        "disappear": function() {
          console.log("named(" + namedId + ").scope(" + scopeId + ").disappear()");
          curSurfaceObj.unload();
          curBlimpObj.unload();
          namedDiv.removeChild(scopeDiv);
          scopeAry[scopeId] = void 0;
        }
      };
    };
    console.log("makeNamed(" + n + "," + opt + ")");
    surfaceCache = [];
    getSurfaceCnv = function(n, callback) {
      var surfaceJson;
      if (callback == null) {
        callback = function(cnv) {};
      }
      surfaceJson = json.shell[curShellName].surface[n];
      if (surfaceCache[n] != null) {
        return setTimeout(function() {
          return callback(copyCnv(surfaceCache[n]));
        });
      } else if (surfaceJson != null) {
        return composeElements(surfaceJson.element, function(cnv) {
          surfaceCache[n] = cnv;
          return callback(copyCnv(cnv));
        });
      } else {
        return setTimeout(callback);
      }
    };
    namedId = n;
    json = opt.json, callback = opt.callback;
    body = document.getElementsByTagName("body")[0];
    namedDiv = setNamedDiv(body, namedId);
    curShellName = "master";
    scriptTidAry = [];
    onSecondChangeTid = 0;
    eventHandlerHash = {};
    isTalking = false;
    curScopeObj = makeScope(0);
    scopeAry = [curScopeObj];
    curScopeObj.focus();
    json.shell[curShellName].surface.forEach(function(surfaceJson, i) {
      return composeElements(surfaceJson.element, function(cnv) {
        return surfaceCache[i] = cnv;
      });
    });
    setTimeout(function() {
      return callback(namedObj);
    });
    namedObj = {
      "scope": function(n) {
        console.log("named(" + namedId + ").scope(" + n + ")");
        if (!isNumber(n)) {
          return curScopeObj;
        } else if (scopeAry[n] != null) {
          return curScopeObj = scopeAry[n];
        } else {
          curScopeObj = makeScope(n);
          scopeAry[n] = curScopeObj;
          curScopeObj.focus();
          return curScopeObj;
        }
      },
      "playScript": function(script, callback) {
        if (script == null) {
          script = "";
        }
        if (callback == null) {
          callback = function(namedObj) {};
        }
        console.log("named(" + namedId + ").playScript(\"" + script + "\")");
        this.breakScript();
        isTalking = true;
        playingScript(script, scriptTidAry, (function(_this) {
          return function() {
            scriptTidAry.forEach(function(tid) {
              return clearTimeout(tid);
            });
            isTalking = false;
            callback(_this);
            return setTimeout(function() {
              return _this.breakScript();
            });
          };
        })(this));
        return this;
      },
      "breakScript": function() {
        console.log("named(" + namedId + ").breakScript()");
        scriptTidAry.forEach(function(tid) {
          return clearTimeout(tid);
        });
        scopeAry.forEach(function(scopeObj) {
          return scopeObj.blimp().clear();
        });
        isTalking = false;
        return this;
      },
      "raiseEvent": function(e) {
        var script;
        console.log("named(" + namedId + ").raiseEvent(" + e.ID + ")");
        script = "\\0\\s[0]Hello World!";
        if (script != null) {
          this.breakScript();
          setTimeout((function(_this) {
            return function() {
              return _this.playScript(script);
            };
          })(this));
        }
        return this;
      },
      "on": function(id, handler) {
        if (id == null) {
          id = "";
        }
        if (handler == null) {
          handler = function(e) {};
        }
        console.log("named(" + namedId + ").on(\"" + id + "\")");
        eventHandlerHash[id] = handler;
        return this;
      },
      "materialize": function() {
        console.log("named(" + namedId + ").materialize()");
        onSecondChangeTid = setInterval(((function(_this) {
          return function() {
            return _this.raiseEvent({
              "ID": "OnSecondChange",
              "Reference0": 0,
              "Reference1": 0,
              "Reference2": 0,
              "Reference3": 0
            });
          };
        })(this)), 1000);
        setTimeout((function(_this) {
          return function() {
            return _this.raiseEvent({
              "ID": "OnBoot",
              "Reference0": curShellName
            });
          };
        })(this));
        return this;
      },
      "vanish": function() {
        console.log("named(" + namedId + ").vanish()");
        clearTimeout(onSecondChangeTid);
        this.breakScript();
        scopeAry.forEach(function(scopeObj) {
          return scopeObj.disappear();
        });
        body.removeChild(namedDiv);
        namedAry[namedId] = void 0;
      }
    };
    return namedObj;
  };
  namedAry = [];
  return {
    "createNamed": function() {
      var callback, json, opt, _i;
      json = arguments[0], opt = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      if (json == null) {
        json = {};
      }
      if (callback == null) {
        callback = function(namedObj) {};
      }
      opt = opt[0] || {};
      opt.json = json;
      opt.callback = callback;
      namedAry[namedAry.length] = makeNamed(namedAry.length, opt);
      return namedAry[namedAry.length - 1];
    }
  };
})();

$(function() {
  var ku_;
  ku_ = ikagaka.createNamed(json, function(ku_) {
    ku_.materialize();
    ku_.scope(1).surface(10);
    return ku_.scope(2).surface(10);
  });
  return ku_.on("OnBoot", function(e) {
    return "\\0\\s[0]\\1\\s[10]\\e";
  });
});