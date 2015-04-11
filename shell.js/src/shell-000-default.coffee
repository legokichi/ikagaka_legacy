# default ######################################################################


"use strict"

isPrimitive = (a)->
  switch typeof a
    when "number" then true
    when "string" then true
    when "boolean" then true
    when "undefined" then true
    when "null" then true
    else false

isNumber = (num)-> isFinite Number(num)
isObject = (obj)-> Object.prototype.toString.apply(obj) is "[object Object]"
isArray  = (ary)-> Array.isArray(ary)
isFunction = (fn)-> Object.prototype.toString.apply(fn) is "[object Function]"
isImage  = (img)-> Object.prototype.toString.apply(img) is "[object HTMLImageElement]"
isCanvas = (cnv)-> Object.prototype.toString.apply(cnv) is "[object HTMLCanvasElement]"

extend = (a, b)-> # !! side effect !!
  a[key] = val for key, val of b when b.hasOwnProperty(key)
  a

overwrite = (a, b)-> # !! side effect !!
  for key, val of b when b.hasOwnProperty(key)
    if isPrimitive(val) or !a[key]? then a[key] = val
    else                                 overwrite(a[key], val)
  a

copy = (a)->
  if isPrimitive a         then return a
  else if Array.isArray(a) then o = []
  else if a.constructor?   then o = Object.create(a.constructor.prototype)
  else                          o = {}
  for key, val of a when a.hasOwnProperty(key)
    if isPrimitive(val) then o[key] = val
    else                     o[key] = copy(val)
  o

has = (a, b)->
  for key, val of a when val is b
    return true
  false

unique = (a)->
  rslts = []
  seens = []
  for val in a
    if has seens, val then break
    seens.push val
    rslts.push val
  rslts

difference = (a, b)->
  a.filter (val)->
    !has(b, val)

error = (e)->
  console.error e
  throw e


class Root

  constructor: ->
    @type = /function\s?([^\(]+)/.exec(@constructor.toString())[1]

  destructor: -> # !! side effect !!
    @[key] = null for key of @ when @hasOwnProperty(key)
    undefined

  copy: ->
    copy(@)

  extend: (a)-> # !! side effect !!
    extend(@, a)

  log: -> console.log(@); @

  dir: -> console.dir(@); @

  do: (fn)-> fn.call(@)


