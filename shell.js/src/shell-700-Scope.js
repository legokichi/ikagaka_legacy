// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Scope = (function(_super) {
  __extends(Scope, _super);

  function Scope(surface, balloon, cb) {
    this.surface = surface;
    this.balloon = balloon;
  }

  return Scope;

})(Root);
