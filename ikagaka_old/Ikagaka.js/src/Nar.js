// Generated by CoffeeScript 1.7.1
window.Nar = (function() {
  var blobToBuffer, blobToDataURL, bufferToText, filetree, unzip, urlToBlob, urlToImage;

  function Nar() {}

  Nar.prototype.load = function(url, callback) {
    return urlToBlob(url, (function(_this) {
      return function(blob) {
        return unzip(blob, function(hash) {
          return filetree(hash, function(obj) {
            return callback(_.extend(_this, obj));
          });
        });
      };
    })(this));
  };

  urlToBlob = function(url, next) {
    var absUrl, error, xhr;
    error = function(ev) {
      return next(false);
    };
    if (!url) {
      return setTimeout(error);
    }
    absUrl = mm.url.resolve(url);
    if (!absUrl.isURL()) {
      return setTimeout(error);
    }
    xhr = new XMLHttpRequest;
    xhr.open("GET", absUrl, true);
    xhr.responseType = "blob";
    xhr.error = error;
    xhr.onload = function(ev) {
      if (xhr.status === 200) {
        return next(xhr.response);
      } else {
        return error(ev);
      }
    };
    return xhr.send();
  };

  unzip = function(blob, next) {
    if (!blob) {
      return setTimeout(function() {
        return next(false);
      });
    }
    zip.workerScriptsPath = "lib/";
    zip.useWebWorkers = true;
    return zip.createReader(new zip.BlobReader(blob), (function(reader) {
      return reader.getEntries(function(entries) {
        var entry, hash, _i, _len;
        hash = {};
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
          entry = entries[_i];
          hash[entry.filename] = (function() {
            var fileCache, mimetype, _entry;
            _entry = entry;
            mimetype = zip.getMimeType(_entry.filename);
            fileCache = null;
            return function(cb) {
              if (fileCache !== null) {
                return cb(fileCache);
              }
              return _entry.getData(new zip.BlobWriter(mimetype), function(blob) {
                var url;
                if (/^text/.test(mimetype)) {
                  return blobToBuffer(blob, function(buffer) {
                    return bufferToText(buffer, function(text) {
                      fileCache = text;
                      return cb(text);
                    });
                  });
                } else if (/^image/.test(mimetype)) {
                  url = URL.createObjectURL(blob);
                  return urlToImage(url, function(img) {
                    URL.revokeObjectURL(url);
                    fileCache = img;
                    return cb(img);
                  });
                } else {
                  return setTimeout(function() {
                    return cb(false);
                  });
                }
              });
            };
          })();
        }
        reader.close();
        return next(hash);
      });
    }), function(er) {
      return next(false);
    });
  };

  blobToDataURL = function(blob, next) {
    var reader;
    if (!blob) {
      return setTimeout(function() {
        return next(false);
      });
    }
    reader = new FileReader;
    reader.onerrer = function() {
      return next(false);
    };
    reader.onload = function() {
      return next(reader.result);
    };
    return reader.readAsDataURL(blob);
  };

  blobToBuffer = function(blob, next) {
    var reader;
    if (!blob) {
      return setTimeout(function() {
        return next(false);
      });
    }
    reader = new FileReader;
    reader.onerrer = function() {
      return next(false);
    };
    reader.onload = function() {
      return next(reader.result);
    };
    return reader.readAsArrayBuffer(blob);
  };

  bufferToText = function(buffer, next) {
    var text, uint8Ary, unicode;
    if (!buffer) {
      return setTimeout(function() {
        return next(false);
      });
    }
    uint8Ary = new Uint8Array(buffer);
    unicode = Encoding.convert(uint8Ary, "UNICODE", "AUTO");
    text = Encoding.codeToString(unicode);
    return setTimeout(function() {
      return next(text);
    });
  };

  urlToImage = function(src, next) {
    var img;
    if (!src) {
      return setTimeout(function() {
        return next(false);
      });
    }
    img = new Image;
    img.onerror = function() {
      return next(false);
    };
    img.onload = function() {
      return next(img);
    };
    return img.src = src;
  };

  filetree = function(hash, next) {
    var ary, dir, i, obj, parent, path, root, val, _i, _len;
    if (!hash) {
      return setTimeout(function() {
        return next(false);
      });
    }
    parent = root = {};
    for (path in hash) {
      val = hash[path];
      ary = path.split("/");
      for (i = _i = 0, _len = ary.length; _i < _len; i = ++_i) {
        dir = ary[i];
        obj = i === ary.length - 1 ? val : {};
        parent = parent[dir] = parent[dir] || obj;
      }
      parent = root;
    }
    return setTimeout(function() {
      return next(root);
    });
  };

  return Nar;

})();
