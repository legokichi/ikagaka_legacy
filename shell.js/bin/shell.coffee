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


# custom #######################################################################


execmap = (reg, str, fn)->
  ary = []
  while true
    matches = reg.exec(str)
    if !matches? then break
    ary.push fn(matches)
  ary

loadImage = (src, cb)-> # !! side effect !!
  img = new Image
  img.onerror = error
  img.onload  = cb
  img.src = src

transImage = (img)->
  cnv = copyCanvas(img)
  ctx = cnv.getContext("2d")
  imgdata = ctx.getImageData(0, 0, img.width, img.height)
  data = imgdata.data
  [r, g, b] = [data[0], data[1], data[2]]
  for v, i in data by 4 when r is data[i]   and
                             g is data[i+1] and
                             b is data[i+2]
    data[i+3] = 0
  ctx.putImageData(imgdata, 0, 0)
  cnv

copyCanvas = (img)-> # !! side effect !!
  cnv = document.createElement("canvas")
  ctx = cnv.getContext("2d")
  cnv.width  = img.width
  cnv.height = img.height
  ctx.drawImage(img, 0, 0)
  cnv

drawImage = (a, b, x, y, cmp)-> # !! side effect !!
  ctx = a.getContext("2d")
  #ctx.globalCompositeOperation = cmp if cmp?
  ctx.drawImage(b, x, y)
  a

clearCanvas = (cnv)->
  cnv.width = cnv.width
  cnv

drawSurface = (a, b)-> # !! side effect !!
  if a.parentNode?
    a.parentNode.width  = b.width
    a.parentNode.height = b.height
  a.width  = b.width
  a.height = b.height
  drawImage(a, b, 0, 0)

composeElements = (target, ary)-> # !! side effect !!
  ary.forEach ({cnv, x, y, cmp})->
    if target.width is 0
      target.width  = cnv.width
      target.height = cnv.height
    drawImage(target, cnv, x, y, cmp)
  target

isHit = (target, x, y)->
    ctx = target.getContext("2d")
    imgdata = ctx.getImageData(0, 0, x, y)
    imgdata.data[imgdata.data.length-1] isnt 0

calcOffset = (e)->
  x: e.offsetX or e.layerX
  y: e.offsetY or e.layerY

class TaskQueue
  constructor: ->
    @queue = []
  push: (fn)->
    @queue.push(fn)
    @
  run: (rslt, cb)->
    next = (rslt)=>
      if @queue.length is 0 then cb(rslt)
      else                       @queue.shift()(rslt, next)
      undefined
    next(rslt)
    undefined


# Shell ########################################################################


class this.Shell extends Root

  constructor: (@nar, @id, cb)->
    super
    shell = @nar.shell[@id]
    loadSurfaces shell, (surfaces)=>
      loadBaseSurfaces shell, surfaces, (surfaces)=>
        composeBaseSurfaces shell, surfaces, (@surfaces)=>
          cb(@)


  loadSurfaces = (shell, cb)->
    shell["surfaces.txt"].load (text)->
      cb(new Surfaces(text))
    undefined

  loadBaseSurfaces = (shell, surfaces, cb)->
    que = new TaskQueue()
    for filename, file of shell when /surface(\d+)\.png/.test(filename) then do (file)->
      que.push (surfaces, next)->
        loadBaseSurface shell, surfaces, file, (surfaces)-> next(surfaces)
    que.run surfaces, (surfaces)-> cb(surfaces)
    undefined

  loadBaseSurface = (shell, surfaces, file, cb)->
    console.log "unzipping #{file.filename}"
    id = Number /surface(\d+)\.png/.exec(file.filename)[1]
    srf = surfaces.surface[id] ?= {}
    file.load (img)->
      srf.base = transImage(img)
      cb(surfaces)
    undefined

  composeBaseSurfaces = (shell, surfaces, cb)->
    que = new TaskQueue()
    for id, srf of surfaces.surface then do (srf)->
      que.push (surfaces, next)->
        loadElements shell, srf, (elms)->
          srf.base ?= copyCanvas(new Image())
          srf.base = composeElements(srf.base, elms)
          next(surfaces)
    que.run surfaces, (surfaces)-> cb(surfaces)

  loadElements = (shell, srf, cb)->
    que = new TaskQueue()
    for n, elm of srf.elements then do (elm)->
      que.push (elms, next)->
        loadElement shell, elm, (elm)->
          elms.push(elm)
          next(elms)
    que.run [], (elms)-> cb(elms)
    undefined

  loadElement = (shell, elm, cb)->
    console.log "unzipping #{elm.src}"
    shell[elm.src].load (img)->
      try
        cb({
          cnv: transImage(img)
          x:   elm.x
          y:   elm.y
          cmp: elm.compositeOperation
        })
      catch
        debugger
    undefined


# surfaces #####################################################################


class Surfaces extends Root

  constructor: (text)->
    super
    extend(@, root(text))

  commentout = (text)->
    execmap /(?:(?:^|\s)\/\/.*)$|^\s+?$/g, text, ([match])->
      text = text.replace(match, "")
    text

  space = (text)->
    text
      .split(" ").join("")
      .split("\t").join("")

  root = (text)->
    defs = {}
    apnds = {}
    _text = commentout(space(text))
    execmap ///
      ([^\{\}]+) #head
      \{
      ([^\{\}]+) #body
      \}
    ///g, _text, ([_, head, body])->
      if /surface/.test(head)
        isApnd = /surface\.append/.test(head)
        for n in parseHead(compatibleHead(head))
          if isApnd
            apnds[n] ?= {}
            overwrite(apnds[n], parseBody(compatibleBody(body)))
          else
            defs[n] ?= {}
            overwrite(defs[n], parseBody(compatibleBody(body)))
    for n, srf of apnds then overwrite(defs[n], srf)
    {surface: defs}

  compatibleHead = (text)->
    execmap /\,surface(\d+)/g, text, ([match,num])->
      text = text.replace match, ","+num
    execmap /sakura/g, text, ([match])->
      text = text.replace match, "char0"
    execmap /kero/g, text, ([match])->
      text = text.replace match, "char1"
    text

  compatibleBody = (text)-> #seriko 1.0 -> 2.0
    execmap  ///
      (\d+)         #animationGroup
      interval\,
      (.+)          #interval
    ///g, text, ([match,
                  animId,
                  timing])-> #seriko 1.0 -> 2.0
      text = text.replace match,
        "animation#{animId}" +
        ".interval," +
        "#{timing}"
    execmap ///
      (\d+)           #animationGroup
      pattern(\d+)\,  #pattrnId
      (\-?\d+)\,      #surfaceId
      (\d+)\,         #interval
      (\w+)           #method
      (?:\,   
        (\-?\d+)\,    #offsetX
        (\-?\d+)      #offsetY
      )?
    ///g, text, ([match,
                 anmId,
                 ptnId,
                 srfId,
                 wait,
                 layer,
                 x,
                 y])-> #seriko 1.0 -> 2.0
      text = text.replace match,
        "animation#{anmId}" +
        ".pattern#{ptnId}," +
        "#{layer}," +
        "#{srfId}," +
        "#{wait}," +
        "#{x or 0}," +
        "#{y or 0}"
    text

  parseHead = (head)->
    head = head.replace(/surface/g, "")
    rjcts = []
    aplys = []
    execmap ///
      (\!)?        #notFlag
      (\d+)        #begin
      (?:\-(\d+))? #end
      \,?
    ///g, head, ([match,
                  isRjct,
                  begin,
                  end])->
      _begin = Number begin
      _end = Number end
      nums = if isFinite _end then [_begin.._end] else [_begin]
      if isRjct? then rjcts = rjcts.concat nums
      else            aplys = aplys.concat nums
    difference(unique(aplys), unique(rjcts))

  parseBody = (body)->
    collisions: parseCollisions(body)
    elements:   parseElements(body)
    animations: parseAnimations(body)

  parseCollisions = (body)->
    hash = {}
    execmap ///
      collision(\d+)\, #collisionId
      (\-?\d+)\,       #beginX
      (\-?\d+)\,       #beginY
      (\-?\d+)\,       #endX
      (\-?\d+)\,       #endY
      (\w+)            #id
    ///g, body, ([match,
                  n,
                  beginX,
                  beginY,
                  endX,
                  endY,
                  id])->
      hash[Number(n)] =
        x: Number(beginX)
        y: Number(beginY)
        width: Number(endX) - Number(beginX)
        height: Number(endY) - Number(beginY)
        name: id
    hash

  parseElements = (body)->
    hash = {}
    execmap ///
      element(\d+)\,   #elementId
      (\w+)\,          #pattern
      ([\w\.]+)        #filename
      (?:\,
        (\-?\d+)\,     #x
        (\-?\d+)       #y
      )?
    ///g, body, ([match,
                  n,
                  layer,
                  src,
                  x,
                  y])->
      hash[Number(n)] = 
        compositeOperation: layer
        src: src
        x: Number(x or 0)
        y: Number(y or 0)
    hash

  parseAnimations = (body)->
    return {} if !body?
    animNBodies = {}
    execmap ///
      animation(\d+)\.
      ([^\r\n]+)
    ///g, body, ([match
                  num,
                  str])->
      n = Number(num)
      animNBodies[n] = (animNBodies[n] or "") + "\r\n" + str
    hash = {}
    for i, body of animNBodies
      rslts = ///
        interval\,
        (.+)
      ///.exec(body)
      if rslts?
        hash[i] =
          interval: rslts[1]
          patterns: parsePatterns body
    hash

  parsePatterns = (body)->
    hash = {}
    execmap ///
      pattern(\d+)\,    #patternId
      (\w+)\,           #layer
      (\-?\d+)\,        #surfaceId
      (\d+)             #minWait
      (?:\-(\d+))?      #maxWait
      (?:\,  
        ([\-|\+]?\d+)\, #x
        ([\-|\+]?\d+)   #y
      )?
    ///g, body, ([__,
                  n,
                  layer,
                  num,
                  minWait,
                  maxWait,
                  x,
                  y])->
      hash[n] =
        compositeOperation: layer
        surfaceID: Number(num)
        wait: Number(minWait)
        x: Number(x or 0)
        y: Number(y or 0)
      if maxWait?
        hash[n].maxWait = Number(maxWait)
    hash


# surface ######################################################################


class this.Surface extends Root

  constructor: (@shell, @id, handler, cb)->
    super
    @surface = @shell.surfaces.surface[@id]
    @canvas = copyCanvas(@surface.base)
    @click = @createEventListener("OnMouseClick", handler)
    @canvas.addEventListener("click", @click)
    @animationLayers = {}
    for n of @surface.animations
      @animationLayers[n] = new AnimationLayer(@, n)
    render = =>
      if @rendering
        @draw()
        requestAnimationFrame(render)
    @rendering = true
    @showFPS = true
    @showCollision = false
    @old = Date.now()
    requestAnimationFrame(render)
    cb(@)

  destructor: ->
    @rending = false
    @canvas.removeEventListener("click", @click)
    super

  draw: ->
    now = Date.now()
    past = now - @old
    @fps = 1000/past|0
    clearCanvas(@canvas)
    drawImage(@canvas, @surface.base, 0, 0)
    for n, layer of @animationLayers
      {x, y, cnv, cmp} = layer.getFrame(now)
      drawImage(@canvas, cnv, x, y, cmp)
    ctx = @canvas.getContext("2d")
    if @showCollision
      ctx.strokeStyle = "rgb(200, 0, 0)";
      for n, collision of @surface.collisions
        {x, y, width, height, name} = collision
        ctx.strokeRect(x, y, width, height)
    if @showFPS
      ctx.font = "18px 'Unknown Font'";
      ctx.fillText(@fps, 10, 20);
    @old = now
    undefined

  createEventListener: (id, handler)->
    (e)=>
      offset = calcOffset(e)
      if isHit(@canvas, offset.x, offset.y)
        e.preventDefault()
        e.stopPropagation()
        event =
          "ID": id
          "Reference0": offset.x
          "Reference1": offset.y
          "Reference2": 0
          "Reference3": null
          "Reference4": ""
          "Reference5": 0
        delete event.Reference5 if id is "OnMouseMove"
        for n, collision of @surface.collisions
          {x, y, width, height, name} = collision
          if x < offset.x < x+width and y < offset.y < y+height
            event.Reference4 = name
        handler(event)
      undefined






# Animation ####################################################################


class AnimationLayer extends Root
  
  constructor: (@surface, @id, @handler=->)->
    @animation = @surface.surface.animations[@id]
    @patterns = @animation.patterns
    @interval = @getInterval()
    @playing = false
    @none = document.createElement("canvas")
    @none.width = @none.height = 1
    @frame = @none
    @i = 0
    @wait = 0
    @count = 0

  getInterval: ->
    switch @animation.interval
      when "sometimes" then random(2)
      when "rarely"    then random(4)
      when "runonce"   then (if @count is 0 then 0 else Infinity)
      when "always"    then 0
      else                  Infinity

  getFrame: (now)->
    if @playing # playing animation
      if now > @wait # frame change
        id = Number @patterns[@i].surfaceID
        if id is -1 then @frame = @none
        else             @frame = @surface.shell.surfaces.surface[id].base
        @wait = now + @patterns[@i].wait
        @i++
        if !@patterns[@i]?
          @i = 0
          @playing = false
          @interval = now + @getInterval()
          @count++
          @handler()
    else if now > @interval # waiting interval timing
      @playing = true
    {
      cnv: @frame
      x: @patterns[@i].x
      y: @patterns[@i].y
      cmp: @patterns[@i].compositeOperation
    }


  random = (n)->
    ms = 0
    ms++ while 1/n < Math.random()
    ms*1000

