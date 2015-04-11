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


